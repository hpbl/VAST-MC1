/*jshint esversion: 6 */
class LineGraph{
	 constructor(x, y, width,height, margin ){
		this.x = x;
		this.y = y;
		this.totalWidth = width;
		this.totalHeight = height;
		this.hash = [];
		this.days = [];
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
	  				  .style("border", "1px solid black")
	  				  .append("g")
	  				  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		//

		this.xScale = d3.scaleTime().domain([new Date(2015, 4, 0), new Date(2016, 5, 10)]).range([40,this.width]);
		this.yScale = d3.scaleLinear().domain([0,600]).range([this.height,0]);


    }

    setData(newData){

    	var parseDate = d3.timeParse("%Y-%m-%d");
    	var that = this;
    	//that.yScale.domain(d3.extent(newData, function(d){ return d; }));


	    var xAxisGroup = this.mySvg.append("g")
	                        .attr("class", "xAxis")
	                        .attr("transform", "translate(0"  + "," + this.height + ")");


	  	var xAxis = d3.axisBottom(this.xScale).tickFormat(d3.timeFormat("%b"));

	  	var yAxisGroup = this.mySvg.append("g")
	                        .attr("class", "yAxis");


	  	var yAxis = d3.axisLeft(that.yScale).tickSize(-this.width);


	 	xAxisGroup.call(xAxis);
	 	yAxisGroup.call(yAxis);



	 	var valueline = d3.line()
    		.x(function(d, i) { console.log(parseDate(dates[i]) ); return that.xScale(parseDate(dates[i])); })
    		.y(function(d) { return that.yScale(d); });



	    this.mySvg.append("path")
	      .data([newData])
	      .attr("class", "line")
	      .attr("d", valueline);




    }

}