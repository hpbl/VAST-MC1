class ScatterPlot{
	 constructor(x, y, width, height, margin){
		this.x = x;
		this.y = y;
		this.totalWidth = width;
		this.totalHeight = height;

		this.margin = margin;
		//
		this.width = width - this.margin.left - this.margin.right;
		this.height = height - this.margin.top - this.margin.bottom;

		//container is either svg or g
		var that = this;

		this.mySvg = d3.select("body")
	  				  .append("svg")
	  				  .attr("width", this.width + this.margin.left + this.margin.right)
	  				  .attr("height", this.height + this.margin.top + this.margin.bottom)
	  				  .append("g")
	  				  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		this.xScale = d3.scaleLinear().range([0, this.width]);

		this.yScale = d3.scalePoint()
                        .domain(["1", "2", "2P","3", "4", "5"])
                        .range([this.height, 0 ])
                        .padding(1);

        this.colorScale = d3.scaleOrdinal(d3.schemeCategory10);
    }

    generateScatterPlot(newData){

        var that = this;
		that.xScale.domain(d3.extent(newData,function(d){ return d.x; } ));

		var xAxisGroup = that.mySvg.append("g")
	                        .attr("class", "xAxis")
	                        .attr("transform", "translate(0"  + "," + that.height + ")");

	  	var xAxis = d3.axisBottom(that.xScale);

	  	var yAxisGroup = that.mySvg.append("g")
	                        .attr("class", "yAxis");

	  	var yAxis = d3.axisLeft(that.yScale);

	 	xAxisGroup.call(xAxis);
	 	yAxisGroup.call(yAxis);

		var parse = d3.timeParse("%d/%m/%Y");

		var myCircles = that.mySvg.selectAll("circle").data(newData);

		myCircles.exit().remove();

        myCircles.attr("cx",function(d){return that.xScale(d.x);})
                 .attr("cy",function(d){return that.yScale(d.y);})
                 .attr("r", 5)
                 .attr("fill",function(d){ return that.colorScale(d.y)} );

        myCircles.enter()
                 .append("circle")
                 .attr("cx",function(d){ return that.xScale(d.x);})
                 .attr("cy",function(d){ return that.yScale(d.y);})
                 .attr("r",5)
                 .attr("fill", function(d){ return that.colorScale(d.y)} );

    }

}
