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
                .attr('r', function (d) { return Object.values(d)[0].length / 1500 })
                .attr('fill', function (d) { return "red" })
