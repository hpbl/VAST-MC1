var margin = {top:10, left:50, right:50, bottom:50};
var colors = ["#158940", "#158940", "#158940", "#158940", "#158940", "#f92b75", "#f92b75", "#f92b75", "#f92b75", "#f92b75", "#f92b75", "#f92b75", "#f92b75", "#f92b75", "#f9bc0f", "#f9bc0f", "#f9bc0f", "#f9bc0f", "#f9bc0f", "#f9bc0f", "#f9bc0f", "#f9bc0f", "#f9b000", "#fa9316", "#fa9316", "#fa9316", "#fa9316", "#fa9316", "#fa9316", "#fa9316", "#fa9316", "#fa9316", "#5776a9", "#5776a9", "#5776a9", "#5776a9", "#5776a9", "#5776a9", "#5776a9", "#5776a9"];


height2 = 8000, width2 = 1500;

var cars  = [];
var mark  = [];

var mySvg2 = d3.select(".timeline")
  				  .append("svg")
  				  .attr("width", width2 + margin.left + margin.right)
  				  .attr("height", height2 + margin.top + margin.bottom)
                  .append("g")
                  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var div = d3.select(".timeline").append("div")
  					.attr("class", "tooltip")
  					.style("display", "none");

var yScale = d3.scaleLinear().domain([0, 1000]).range([height2, 0]);
var xScale = d3.scaleLinear().domain([0,1000]).range([0,width2]);



var colorScale = d3.scaleOrdinal().domain(gates).range(colors);

var format = d3.timeFormat("%Y-%m-%d %H:%M:%S");

function generateTimeLine(currentGates, start, end) {

    var cars = [];
    if(currentGates.length > 0) {

        let gate = currentGates[0];

        let paths = [];
        var id = gates.indexOf(gate);

        var tv = v[id];

        var mySet = new Set();
        for(let i = 0; i < tv.length; i++) {
            var pass = [], str = "";
            var aux = data2[tv[i]];
            var boo = 0;

            for ( let j = 0; j < aux.length; j++) {
                if (aux[j].time >= start && aux[j].time <= end && aux[j]['gate'] == gate) {
                    boo = 1;

                    break;
                }
            }

            if(boo === 1 ) {

                for(let j = 0; j < currentGates.length; j++) {
                    pass[currentGates[j]] = 0;
                }

                for(let j = 0; j < aux.length; j++) {
                    if(aux[j].time > end) break;
                    if(aux[j].time >= start) {
                        str += aux[j]['gate'] + " ";
                        pass[aux[j]['gate']] = 1;
                    }
                }

                let boo2 = 1;
                for(let j = 0; j < currentGates.length; j++) {
                    boo2 &= pass[currentGates[j]];
                }

                if(mySet.has(str) == false && boo2 == 1) {
                    mySet.add(str);
                    paths.push(str);
                }
            }
        }

        paths.sort();
        for(let i = 0; i < paths.length; i++) {
            let tpaths = paths[i].split(" ");
            tpaths.pop();

            for(let j = 0; j < tpaths.length; j++) {
                cars.push({"x": 9*j, "y": 0.7*i, "gate": tpaths[j] } );
            }
        }

    }

    var timeLine = mySvg2.selectAll("rect")
                         .data(cars);

    timeLine.exit().remove();

    timeLine.attr("x", function(d){ return xScale(d.x); })
             .attr("y", function(d){ return height2 - yScale(d.y); } )
             .attr("width", 13 )
             .attr("height", 5 )
             .attr("fill", function(d){ return colorScale(d.gate); })
             .on("mouseover", mouseover)
			 .on("mouseout", mouseout)
			 .on("mousemove", function(d){ mousemove(d); });

     timeLine.enter()
             .append("rect")
             .attr("x", function(d){ return xScale(d.x); })
             .attr("y", function(d){ return height2 - yScale(d.y); } )
             .attr("width", 13 )
             .attr("height", 5 )
             .attr("fill", function(d){ return colorScale(d.gate); })
             .on("mouseover", mouseover)
			 .on("mouseout", mouseout)
			 .on("mousemove", function(d){ mousemove(d); });

}

function mouseover() {
    div.style("display", "inline");
}

function mousemove(d){
	div.html("State: " + d.gate  + "<br/>" + "Timestamp: " + format(d.time) )
		   .style("left", (d3.event.pageX) + "px")
		   .style("top", (d3.event.pageY) + "px");
}

function mouseout() {
		div.style("display", "none");
}
