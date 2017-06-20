// accessing data from ../Data
var dataFilter = this.crossfilter(this.data)

var gateDimension = dataFilter.dimension(function (d) { return d['gate-name'] })
var gates = []
var gatesCarArray = []

for (node in this.nodes) {
  gates.push(node)
}

for (let i = 0; i < gates.length; i++) {
  gatesCarArray.push({[gates[i]]: gateDimension.filter(gates[i]).top(Infinity)})
}

var lengths = gatesCarArray.map(function(d) {
    return Object.values(d)[0].length
})

var sizeScale = d3.scaleLinear().range([25, 40]).domain(d3.extent(lengths))

var mySVG = d3.select('body')
              .append('svg')
                .attr('height', 800)
                .attr('width', 800)

// adding bg image
var background = mySVG.append('g')
                      .attr('transform', 'translate(100, 100) scale(3, 3)')

background.append('svg:image')
            .attr('xlink:href', '../Data/Lekagul Roadways.bmp')
            .attr('x', '0')
            .attr('y', '0')
            .attr('height', '200')
            .attr('width', '200')

// plotting graph
var canvas = mySVG.append('g')
                  .attr('transform', 'translate(100, 100) scale(3, 3)')
                  .attr('class', 'canvas')

var div = d3.select('body').append('div')
            .attr('class', 'tooltip')
            .style('opacity', 0)

var points = canvas.selectAll('g')
                  .data(gatesCarArray)
                  .enter()
                  .append('g')
                  .attr('transform', function (d) { return 'translate(' + nodes[Object.keys(d)[0]].pos[0] + ',' + nodes[Object.keys(d)[0]].pos[1] + ')' })
                  .attr('class', function(d) { return Object.keys(d) })//[0]?


var piecharts = [];

gatesCarArray.forEach( function(d) {
  let currentGroup = document.getElementsByClassName(Object.keys(d)[0])[0]
  let currentDimensions = sizeScale(Object.values(d)[0].length)
  let piechart = new PieChart(currentGroup, currentDimensions, currentDimensions)
  piechart.setData(umdata)
  piecharts.push(piechart)
})

canvas.attr('transform', 'translate(55, 55) scale(3, 3)') //fixing position
/* var circles = canvas.selectAll('circle').data(gatesCarArray)

circles.enter().append('circle')
                .attr('cx', function (d) { return nodes[Object.keys(d)[0]].pos[0] })
                .attr('cy', function (d) { return nodes[Object.keys(d)[0]].pos[1] })
                .attr('r', function (d) { return Object.values(d)[0].length / 1500 })
                .attr('fill', function (d) { return "red" })
                .on("mouseover", function(d) {
                   div.transition()
                     .duration(200)
                     .style("opacity", .9);
                   div.html(Object.keys(d)[0] + "<br/>" + Object.values(d)[0].length)
                     .style("left", (d3.event.pageX) + "px")
                     .style("top", (d3.event.pageY - 28) + "px");
                })
                .on("mouseout", function(d) {
                  div.transition()
                    .duration(500)
                    .style("opacity", 0);
                  });
*/
