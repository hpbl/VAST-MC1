var margin = {top: 10, right: 40, bottom: 30, left: 40};

let width = 960 - margin.left - margin.right;
let height = 200 - margin.top - margin.bottom;

var currentGates = ['entrance1']
var currentX0, currentX1


var mySvg = d3.select(".histogram")
  				  .append("svg")
  				  .attr("width", width + margin.left + margin.right)
  				  .attr("height", height + margin.top + margin.bottom)
                  .append("g")
                  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



var x = d3.scaleTime()
          .domain([new Date(2015, 4, 1), new Date(2016, 5, 1)])
          .rangeRound([0, width]);



var parseDate = d3.timeParse("%Y-%m-%d %H:%M:%S");

data.forEach(function(d) {
    d.date = parseDate(d.Timestamp);
});


var histogram = d3.histogram()
    .value(function(d) { return d.date; })
    .domain(x.domain())
    .thresholds(x.ticks(d3.timeMonth));


var bins = histogram(data);


var y = d3.scaleLinear()
          .domain([0, d3.max(bins, function(d) { return d.length; })])
          .range([height, 0]);



mySvg.selectAll("rect")
      .data(bins)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", 1)
      .attr("transform", function(d) {
		  return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
      .attr("width", function(d) { return (x(d.x1) - x(d.x0) -1 < 0)?0:(x(d.x1) - x(d.x0) -1) ; })
      .attr("height", function(d) { return (height - y(d.length) < 0)?0:height - y(d.length); });


var brush = d3.brushX()
  .extent([[0, 2*height/3], [width, height]])
  .on("end", brushed);

mySvg.append("g")
  .attr("class", "brush")
  .call(brush)
  .call(brush.move, x.range());

mySvg.append("g")
     .attr("transform", "translate(0," + height + ")")
     .call(d3.axisBottom(x));

// add the y Axis
mySvg.append("g")
     .call(d3.axisLeft(y));


function brushed() {

    if (d3.event.sourceEvent && d3.event.sourceEvent.type === "zoom") return;
    // var s = d3.event.selection || x.range();
    // x.domain(s.map(x.invert, x));

    currentX0 = x.invert(d3.event.selection[0]), currentX1 = x.invert(d3.event.selection[1]);

    if (currentX0 !== null && currentX1 !== null)
        generateTimeLine(currentGates, currentX0, currentX1);
}
