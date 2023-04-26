class Linesperseason {
    /**
    * Class constructor with basic chart configuration
    * @param {Object}
    * @param {Array}
    */
    constructor(_config, _data) {
        // Configuration object with defaults
        // Important: depending on your vis and the type of interactivity you need
        // you might want to use getter and setter methods for individual attributes
        this.config = {
            parentElement: _config.parentElement,
            containerWidth: _config.containerWidth || 1000,
            containerHeight: _config.containerHeight || 500,
            margin: _config.margin || { top: 20, right: 40, bottom: 90, left: 55 },
            tooltipPadding: _config.tooltipPadding || 15
        }
        this.data = _data;
        this.initVis();
    }

    initVis() {

        let vis = this;

        vis.width = vis.config.containerWidth - vis.config.margin.left - vis.config.margin.right;
        vis.height = vis.config.containerHeight - vis.config.margin.top - vis.config.margin.bottom;

        vis.xScale = d3.scaleBand()
            .range([0, vis.width])
            .paddingInner(0.15)
            .padding(0.2);

        vis.yScale = d3.scaleLinear()
            .range([vis.height, 0]);

        // Initialize axes
        vis.xAxis = d3.axisBottom(vis.xScale)
            .tickSizeOuter(0);

        vis.yAxis = d3.axisLeft(vis.yScale)
            .scale(vis.yScale)
            .tickSizeOuter(0)
            .ticks(11);

        // Define size of SVG drawing area
        vis.svg = d3.select(vis.config.parentElement)
            .attr('width', vis.config.containerWidth)
            .attr('height', vis.config.containerHeight);

        vis.svg.append("text")
            .attr("transform", "translate(0,0)")
            .attr("x", 420)
            .attr("y", 10)
            .attr("font-size", "14px")
            .attr('font-weight', 'bold')
            .text("Service Codes by Category");

        // Append group element that will contain our actual chart 
        // and position it according to the given margin config
        vis.chart = vis.svg.append('g')
            .attr('transform', `translate(${vis.config.margin.left},${vis.config.margin.top})`);

        // Append empty x-axis group and move it to the bottom of the chart
        vis.xAxisG = vis.chart.append('g')
            .attr('class', 'axis x-axis')
            .attr('transform', `translate(0,${vis.height})`);

        // Append y-axis group 
        vis.yAxisG = vis.chart.append('g')
            .attr('class', 'axis y-axis');

        vis.updateVis();

        // Append titles, legends and other static elements here
        // ...
    }

    /**
     * This function contains all the code to prepare the data before we render it.
     * In some cases, you may not need this function but when you create more complex visualizations
     * you will probably want to organize your code in multiple functions.
     */
    updateVis() {
        let vis = this;
    
        // Set the scale input domains
        vis.xScale.domain(vis.data.map(d => d.Character));
        vis.yScale.domain([0, d3.max(vis.data, d => d.season)]);
    
        vis.xAxisG.selectAll('g')
            .remove();
    
        vis.xAxisG.call(vis.xAxis);
    
        vis.yAxisG.call(vis.yAxis);
    
        // Add rectangles
        vis.chart.selectAll('.bar')
            .data(vis.data)
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('x', d => vis.xScale(d.Character))
            .attr('width', vis.xScale.bandwidth())
            .attr('y', d => vis.yScale(d.season))
            .attr('height', d => vis.height - vis.yScale(d.season))
            .on('mouseenter', function(event, d) {
                // Add tooltip
                d3.select(this)
                    .transition()
                    .duration(50)
                    .attr('opacity', 0.7);
                vis.tooltip = vis.svg.append('g')
                    .attr('class', 'tooltip')
                    .style('opacity', 0);
                vis.tooltip.append('rect')
                    .attr('width', 120)
                    .attr('height', 50)
                    .attr('fill', 'white')
                    .style('opacity', 0.7)
                    .attr('rx', 10)
                    .attr('ry', 10);
                vis.tooltip.append('text')
                    .attr('x', 10)
                    .attr('y', 25)
                    .attr('fill', 'black')
                    .attr('font-size', '14px')
                    .text(d.season);
                vis.tooltip.attr('transform', `translate(${event.pageX + vis.config.tooltipPadding},${event.pageY + vis.config.tooltipPadding})`);
                vis.tooltip.transition()
                    .duration(200)
                    .style('opacity', 1);
            })
            .on('mouseleave', function() {
                // Remove tooltip
                d3.select(this)
                    .transition()
                    .duration(50)
                    .attr('opacity', 1);
                vis.tooltip.transition()
                    .duration(200)
                    .style('opacity', 0)
                    .remove();
            });
    
        // Append titles, legends and other static elements here
        // ...
    }
    renderVis() {
        let vis = this;
    
        // Draw the bars
        vis.bars = vis.chart.selectAll('.bar')
            .data(vis.data);
    
        vis.bars.enter()
            .append('rect')
            .attr('class', 'bar')
            .merge(vis.bars)
            .transition()
            .duration(1000)
            .attr('x', d => vis.xScale(d.Character))
            .attr('y', d => vis.yScale(d.season))
            .attr('width', vis.xScale.bandwidth())
            .attr('height', d => vis.height - vis.yScale(d.season));
    
        vis.bars.exit()
            .remove();
    
        // Update the axes
        vis.xAxisG.call(vis.xAxis);
        vis.yAxisG.call(vis.yAxis);
    
        // Add tooltips
        vis.chart.selectAll('.bar')
            .on('mouseover', function(d) {
                let x = vis.xScale(d.Character) + vis.xScale.bandwidth() / 2;
                let y = vis.yScale(d.season) - vis.config.tooltipPadding;
                let text = `Seasons: ${d.season}`;
    
                vis.tooltip = vis.svg.append('text')
                    .attr('class', 'tooltip')
                    .text(text)
                    .attr('x', x)
                    .attr('y', y)
                    .attr('text-anchor', 'middle')
                    .attr('font-size', '12px')
                    .attr('font-weight', 'bold')
                    .attr('fill', 'white')
                    .attr('opacity', 0);
    
                let bbox = vis.tooltip.node().getBBox();
    
                vis.tooltip.insert('rect', ':first-child')
                    .attr('class', 'tooltip-box')
                    .attr('x', bbox.x - vis.config.tooltipPadding / 2)
                    .attr('y', bbox.y - vis.config.tooltipPadding / 2)
                    .attr('width', bbox.width + vis.config.tooltipPadding)
                    .attr('height', bbox.height + vis.config.tooltipPadding)
                    .attr('rx', 5)
                    .attr('ry', 5)
                    .attr('fill', '#333')
                    .attr('opacity', 0.8)
                    .attr('pointer-events', 'none');
    
                vis.tooltip.transition()
                    .duration(200)
                    .attr('opacity', 1);
            })
            .on('mouseout', function() {
                vis.tooltip.transition()
                    .duration(200)
                    .attr('opacity', 0)
                    .remove();
            });
            vis.xAxisG.call(vis.xAxis);
            vis.yAxisG.call(vis.yAxis);
        
    }
};  
