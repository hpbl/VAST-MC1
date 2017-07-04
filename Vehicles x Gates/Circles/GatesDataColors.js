//Tooltip
var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);


// accessing data from ../Data
var dataFilter = this.crossfilter(this.data)

var gateDimension = dataFilter.dimension(function (d) { return d['gate-name'] })
var gates = []
var gatesCarArray = []

for (node in this.nodes) {
  gates.push(node)
}

for (index in gates) {
  gatesCarArray.push({[gates[index]]: gateDimension.filter(gates[index]).top(Infinity)})
}

var max = 0;
var min = 10000;

for (var i in gatesCarArray) {
  for(var key in gatesCarArray[Object.keys(gatesCarArray)[i]]) break;
  if(gatesCarArray[i][key].length>max) {
    max = gatesCarArray[i][key].length;
  }
  if(gatesCarArray[i][key].length<min) {
    min = gatesCarArray[i][key].length;
  }
}

var sizeScale = d3.scaleLinear().range([1.3,10]).domain([min,max]);

var mySVG = d3.select('body')
              .append('svg')
                .attr('height', 800)
                .attr('width', 800)

// adding bg image
var background = mySVG.append('g')
                      .attr('transform', "translate(100, 100) scale(3, 3)")

background.append("svg:image")
            .attr("xlink:href", "../Data/Lekagul Roadways.bmp")
            .attr("x", "0")
            .attr("y", "0")
            .attr("height", "200")
            .attr("width", "200")

// plotting graph
var canvas = mySVG.append('g')
                  .attr("transform", "translate(100, 100) scale(3, 3)")

var circles = canvas.selectAll('circle').data(gatesCarArray)

circles.enter().append('circle')
                .attr('cx', function (d) { return nodes[Object.keys(d)[0]].pos[0] })
                .attr('cy', function (d) { return nodes[Object.keys(d)[0]].pos[1] })
                .attr('r', function (d) { return sizeScale(Object.values(d)[0].length) })
                .attr('fill', "red")
                .on("mouseover", function(d) {
                  div.transition()
                    .duration(200)
                    .style("opacity", .9);
                  div.html(Object.values(d)[0].length)
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
                })
                .on("mouseout", function (d) {
                  div.transition()
                    .duration(500)
                    .style("opacity", 0);
                });



