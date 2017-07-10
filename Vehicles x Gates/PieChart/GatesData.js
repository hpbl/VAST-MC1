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

var mySVG = d3.select('.piechart')
              .append('svg')
                .attr('height', 500)
                .attr('width', 800)

                mySVG.append('svg:image')
                            .attr('xlink:href', '../Vehicles x Gates/PieChart/legend.png')
                            .attr('x', '80')
                            .attr('y', '80')
                            .attr('height', '250')
                            .attr('width', '50')


// adding bg image
var background = mySVG.append('g')
                      .attr('transform', "translate(150, 10) scale(2.5, 2.5)")

background.append('svg:image')
            .attr('xlink:href', '../maps/Lekagul Roadways.bmp')
            .attr('x', '0')
            .attr('y', '0')
            .attr('height', '200')
            .attr('width', '200')


var div = d3.select('.piechart').append('div')
            .attr('class', 'tooltip')
            .style('opacity', 0)

var points = background.selectAll('g')
                  .data(gatesCarArray)
                  .enter()
                  .append('g')
                  .attr('transform', function (d) { return 'translate(' + nodes[Object.keys(d)[0]].pos[0] + ',' + nodes[Object.keys(d)[0]].pos[1] + ')' })
                  .attr('class', function(d) { return Object.keys(d)[0] })//[0]?
                  .on('click', function(d) {
                    handleClick(Object.keys(d)[0])
                  })
                  .on('mouseover', function(d) {
                    mouseon(Object.keys(d)[0]);
                  })
                  .on('mouseout', function(d) {
                    mousenoton(Object.keys(d)[0]);
                  });



function handleClick(groupClass) {
  if (!currentGates.contains(groupClass)) {
      d3.select('.'+groupClass).selectAll('path')
        .attr('opacity','1');
      d3.select('.piechart').select('#activegates')
        .select('#'+groupClass)
        .attr('style','1');
      currentGates.push(groupClass)
  } else {
    let index = currentGates.indexOf(groupClass)
    currentGates.splice(index, 1)
    d3.select('.piechart').select('#activegates')
      .select('#'+groupClass)
      .remove();
    d3.select('.'+groupClass).selectAll('path')
        .attr('opacity','0.5');
  }

  generateTimeLine(currentGates, currentX0, currentX1);
}

var piecharts = [];

gatesCarArray.forEach( function(d, index) {
  let currentGroup = document.getElementsByClassName(Object.keys(d)[0])[0]
  let currentDimensions = sizeScale(Object.values(d)[0].length)
  let piechart = new PieChart(currentGroup, currentDimensions, currentDimensions)
  piechart.setData(groupedData[index])
  piecharts.push(piechart)
})

function mouseon(d) {
  if (!currentGates.contains(d)) {
    d3.select('.piechart').select('#activegates')
        .append('span')
        .attr('id', d)
        .attr('style','opacity: 0.3;')
        .html(d+', ');
  } else {
    d3.select('#activegates').select('#'+d).attr('style','color: tomato;');
  }
}

function mousenoton(d) {
  if (!currentGates.contains(d)) {
    d3.select('#activegates').select('#'+d).remove();
  } else {
    d3.select('#activegates').select('#'+d).attr('style','color: #455A64;');
  }
}
