class LinesPerEpisode {

    /**
    * Class constructor with basic configuration
    * @param {Object}
    * @param {Array}
    */
    constructor(_config, _data) {
        this.config = {
            parentElement: _config.parentElement,
            width: 1800,
            height: 300,
            margin: { top: 30, right: 10, bottom: 105, left: 70 },
            tooltipPadding: _config.tooltipPadding || 15,
            contextHeight: 45,
            contextMargin: { top: 350, right: 10, bottom: 40, left: 45 }
        }
        this.data = _data;
        this.initVis();
    }

    initVis() {

        let vis = this;

        vis.tickValues = vis.data[1];
        vis.aggregatedData = vis.data[1];

        console.log(vis.aggregatedData);

        // vis.aggregatedData = Array.from(vis.aggregatedData, ([key, count]) => ({ key, count }));

        vis.tickValues = Array.from(vis.tickValues, ([key1, count1]) => ({ key1, count1 }));


        for (let i = 0; i < vis.aggregatedData.length; i++) {
            vis.aggregatedData[i][0] = vis.aggregatedData[i][0].replaceAll('S', '')
            vis.aggregatedData[i][0] = vis.aggregatedData[i][0].replaceAll('E', '')
            vis.aggregatedData[i][0] = +vis.aggregatedData[i][0];
        }



        vis.xValue = d => d[0];
        vis.yValue = d => d[1];

        const containerWidth = vis.config.width + vis.config.margin.left + vis.config.margin.right;
        const containerHeight = vis.config.height + vis.config.margin.top + vis.config.margin.bottom;


        // Define the x-axis scale
        vis.xScaleFocus = d3.scalePoint()
            .range([0, vis.config.width], 0.5);

        // vis.xScaleContext = d3.scalePoint()
        //     .range([0, vis.config.width], 0.5);

        vis.yScaleFocus = d3.scaleLinear()
            .range([vis.config.height, 0])
            .nice();

        // vis.yScaleContext = d3.scaleLinear()
        //     .range([vis.config.contextHeight, 0])
        //     .nice();

        console.log(vis.tickValues);
        vis.xAxisFocus = d3.axisBottom(vis.xScaleFocus).tickFormat((d, i) => vis.tickValues[i].key1);

        // vis.xAxisContext = d3.axisBottom(vis.xScaleContext);
        vis.yAxisFocus = d3.axisLeft(vis.yScaleFocus);

        vis.svg = d3.select(vis.config.parentElement)
            .attr("width", containerWidth)
            .attr("height", containerHeight);

        vis.svg.append("text")
            .attr("transform", "translate(0,0)")
            .attr("x", 845)
            .attr("y", 11)
            .attr("font-size", "14px")
            .attr('font-weight', 'bold')
            .text("Number of Lines Spoken per Episode");

        vis.focus = vis.svg.append('g')
            .attr('transform', `translate(${vis.config.margin.left},${vis.config.margin.top})`)

        // Append empty x-axis group and move it to the bottom of the chart
        vis.focus.append('defs').append('clipPath')
            .attr('id', 'clip')
            .attr('width', vis.config.width)
            .attr('height', vis.config.height)
            .append('rect')

        vis.focusLinePath = vis.focus.append('path')
            .attr('class', 'chart-line')
            .style('stroke', '#eb3500')

        vis.xAxisFocusG = vis.focus.append('g')
            .attr('class', 'axis x-axis')
            .attr('transform', `translate(0,${vis.config.height})`);

        vis.yAxisFocusG = vis.focus.append('g')
            .attr('class', 'axis y-axis');


        vis.tooltipTrackingArea = vis.focus.append('rect')
            .attr('width', vis.config.width)
            .attr('height', vis.config.height)
            .attr('fill', 'none')
            .attr('pointer-events', 'all');

        // Empty tooltip group (hidden by default)
        vis.tooltip = vis.focus.append('g')
            .attr('class', 'tooltip2')
            .style('display', 'none');

        vis.tooltip.append('circle')
            .attr('r', 4);

        vis.tooltip.append('text');

        // 
        // Append context group with x- and y-axes
        // vis.context = vis.svg.append('g')
        //     .attr('transform', `translate(${vis.config.contextMargin.left},${vis.config.contextMargin.top})`);

        // vis.contextAreaPath = vis.context.append('path')
        //     .attr('class', 'chart-area');

        // vis.xAxisContextG = vis.context.append('g')
        //     .attr('class', 'axis x-axis')
        //     .attr('transform', `translate(0,${vis.config.contextHeight})`);

        // vis.brushG = vis.context.append('g')
        //     .attr('class', 'brush x-brush');

        // vis.brush = d3.brushX()
        //     .extent([[0, 0], [vis.config.width, vis.config.contextHeight]])
        //     .on('brush', function ({ selection }) {
        //         if (selection) vis.brushed(selection);
        //     })
        //     .on('end', function ({ selection }) {
        //         if (!selection) vis.brushed(null);
        //     });

        vis.updateVis();

    };

    updateVis() {
        let vis = this;

        vis.xAxisFocusG.selectAll('g')
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.5em")
            .attr("dy", ".4em")
            .attr("font-size", "12px")
            .attr("transform", "rotate(-60)");

        vis.xAxisFocusG.append('text')
            .attr("transform", "translate(0,0)")
            .attr("y", vis.config.height - 202)
            .attr("x", vis.config.width - 900)
            .attr("font-size", "12px")
            .attr("stroke", "black")
            .text("Season and Episode Number");


        vis.yAxisFocusG.append('text')
            .attr("transform", "rotate(-90)")
            .attr("dy", "-13.5em")
            .attr("y", vis.config.height - 200)
            .attr("x", vis.config.width - 860)
            .attr("font-size", "12px")
            .attr("stroke", "black")
            .text("Number of Lines")


        vis.xValue = d => d[0];
        vis.yValue = d => d[1];

        // Set the scale input domains
        vis.xScaleFocus.domain(vis.aggregatedData.map(function (d) {
            return d[0];
        }));
        vis.yScaleFocus.domain([0, d3.max(vis.aggregatedData, vis.yValue) + 50]);
        // vis.xScaleContext.domain(vis.xScaleFocus.domain());
        // vis.yScaleContext.domain(vis.yScaleFocus.domain());

        vis.bisectDate = d3.bisector(vis.xValue).left;


        vis.line = d3.line()
            .x(d => vis.xScaleFocus(vis.xValue(d)))
            .y(d => vis.yScaleFocus(vis.yValue(d)));

        // vis.area = d3.area()
        //     .x(d => vis.xScaleContext(vis.xValue(d)))
        //     .y1(d => vis.yScaleContext(vis.yValue(d)))
        //     .y0(vis.config.contextHeight);

        vis.renderVis();

    };

    renderVis() {

        let vis = this;

        vis.focusLinePath
            .datum(vis.aggregatedData)
            .attr('d', vis.line);

        // vis.contextAreaPath
        //     .datum(vis.aggregatedData)
        //     .attr('d', vis.area);


        vis.tooltipTrackingArea
            .on('mouseenter', () => {
                vis.tooltip.style('display', 'block');
            })
            .on('mouseleave', () => {
                vis.tooltip.style('display', 'none');
            })
            .on('mousemove', function (event) {
                // Get date that corresponds to current mouse x-coordinate
                const xPos = d3.pointer(event, this)[0]; // First array element is x, second is y
                const date = vis.xScaleFocus(xPos);

                // Find nearest data point
                const index = vis.bisectDate(vis.aggregatedData, date, 1);
                const a = vis.aggregatedData[index - 1];
                const b = vis.aggregatedData[index];
                const d = b && (date - a[0] > b[0] - date) ? b : a;

                // Update tooltip
                vis.tooltip.select('circle')
                    .attr('transform', `translate(${vis.xScaleFocus(d[0])},${vis.yScaleFocus(d[1])})`);

                vis.tooltip.select('text')
                    .attr('transform', `translate(${vis.xScaleFocus(d[0])},${(vis.yScaleFocus(d[1]) - 15)})`)
                    .text(Math.round(d[1]));
            })





        // Update the axes
        vis.xAxisFocusG.call(vis.xAxisFocus);
        vis.yAxisFocusG.call(vis.yAxisFocus);
        // vis.xAxisContextG.call(vis.xAxisContext);

        // const defaultBrushSelection = [0, vis.xScaleContext.range()[1]];
        // vis.brushG
        //     .call(vis.brush)
        //     .call(vis.brush.move, defaultBrushSelection);

    }

    //     brushed(selection) {
    //         let vis = this;


    //         // Check if the brush is still active or if it has been removed
    //         if (selection) {
    //             const selectedDomain = selection.map(vis.xScaleContext);
    //             // console.log(vis.xScaleContext.invert);
    //             // console.log(vis.xScaleContext.range()[0]);
    //             // Convert given pixel coordinates (range: [x0,x1]) into a time period (domain: [Date, Date])
    //             // Update x-scale of the focus view accordingly
    //             vis.xScaleFocus.domain(selectedDomain);
    //         } else {
    //             // Reset x-scale of the focus view (full time period)
    //             vis.xScaleFocus.domain(vis.xScaleContext.domain());
    //         }

    //         // Redraw line and update x-axis labels in focus view
    //         vis.focusLinePath.attr('d', vis.line);
    //         vis.xAxisFocusG.call(vis.xAxisFocus);
    //     }
};
