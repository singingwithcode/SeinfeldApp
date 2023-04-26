class Wordcloud {
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
            containerWidth: _config.containerWidth || 600,
            containerHeight: _config.containerHeight || 400,
            margin: _config.margin || { top: 20, right: 40, bottom: 35, left: 55 },
            tooltipPadding: _config.tooltipPadding || 15,
        };
        this.data = _data;
        //console.log(this.data)
        this.initVis();
    }

    initVis() {
        let vis = this;

        vis.width = vis.config.containerWidth - vis.config.margin.left - vis.config.margin.right;
        vis.height = vis.config.containerHeight - vis.config.margin.top - vis.config.margin.bottom;

        vis.svg = d3
            .select(vis.config.parentElement)
            .attr('width', vis.config.containerWidth)
            .attr('height', vis.config.containerHeight)
            .append('g')
            .attr('transform', `translate(${vis.config.margin.left},${vis.config.margin.top})`);

        const wordCount = d3.rollup(
            vis.data,
            v => v.length,
            d => d.Dialogue
        );

        const words = Array.from(wordCount, ([key, value]) => ({ text: key, value }));
        const topWords = words.sort((a, b) => b.value - a.value).slice(0, 200); // get the top 200 words
        console.log(topWords);
        vis.layout = d3.layout
            .cloud()
            .size([vis.width, vis.height])
            .words(topWords)
            .padding(1)
            .rotate(() => (~~(Math.random() * 2) - 0.5) * 90)
            .fontSize((d) => d.value / 4)
            .on('end', (words) => vis.renderVis(words));

        vis.layout.start();
    }

    renderVis(words) {
        let vis = this;

        vis.svg.selectAll('text').remove();

        vis.svg
            .append('g')
            .attr('transform', `translate(${vis.width / 2},${vis.height / 2})`)
            .selectAll('text')
            .data(words)
            .join('text')
            .style('font-size', (d) => `${d.size}px`)
            .style('font-family', 'Arial, sans-serif')
            .style('font-weight', 'bold')
            .style('fill', '#eb3500')
            .attr('text-anchor', 'middle')
            .attr('transform', (d) => `translate(${d.x},${d.y})rotate(${d.rotate})`)
            .text((d) => d.text);

        console.log(words)
    }
}
