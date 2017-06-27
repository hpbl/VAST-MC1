var dataset = groupedNumberOfCars;

var	width	= 800,
	height 	= 300;

var xScale = d3.scaleOrdinal()
					.domain(d3.range(dataset.length))
					.rangeRoundBands([0,width], 0.02);

