var margin = {top:10, left:50, right:50, bottom:50};
var colors = ["#1b70fc", "#faff16", "#d50527", "#158940", "#f898fd", "#24c9d7", "#cb9b64", "#866888", "#22e67a", "#e509ae", "#9dabfa", "#437e8a", "#b21bff", "#ff7b91", "#94aa05", "#ac5906", "#82a68d", "#fe6616", "#7a7352", "#f9bc0f", "#b65d66", "#07a2e6", "#c091ae", "#8a91a7", "#88fc07", "#ea42fe", "#9e8010", "#10b437", "#c281fe", "#f92b75", "#07c99d", "#a946aa", "#bfd544", "#16977e", "#ff6ac8", "#a88178", "#5776a9", "#678007", "#fa9316", "#85c070"];


height2 = 8000, width2 = 600;

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
    let gate = currentGates[0];
    var id = gates.indexOf(gate);

    var tv = v[id];
    var cars = [];
    var numCar = 0;
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
                    str += aux[j]['gate'];
                    pass[aux[j]['gate']] = 1;
                }
            }

            let boo2 = 1;
            for(let j = 0; j < currentGates.length; j++) {
                boo2 &= pass[currentGates[j]];
            }

            if(mySet.has(str) === false && boo2 == 1) {
                mySet.add(str);
                conta = 0;
                numCar++;
                for(let j = 0; j < aux.length; j++) {
                    if(aux[j].time > end) break;
                        cars.push({"x": 32*conta, "y" : 1.2*numCar, "gate": aux[j]['gate'], "time" : aux[j].time } );
                        conta++;
                    }
                }
            }
        }


    var timeLine = mySvg2.selectAll("rect")
                           .data(cars);

    timeLine.exit().remove();

    timeLine.attr("x", function(d){ return xScale(d.x); })
             .attr("y", function(d){ return height2 - yScale(d.y); } )
             .attr("width", 20 )
             .attr("height", 5 )
             .attr("fill", function(d){ return colorScale(d.gate); })
             .on("mouseover", mouseover)
			 .on("mouseout", mouseout)
			 .on("mousemove", function(d){ mousemove(d); });

     timeLine.enter()
             .append("rect")
             .attr("x", function(d){ return xScale(d.x); })
             .attr("y", function(d){ return height2 - yScale(d.y); } )
             .attr("width", 20 )
             .attr("height", 5 )
             .attr("fill", function(d){ return colorScale(d.gate); })
             .on("mouseover", mouseover)
			 .on("mouseout", mouseout)
			 .on("mousemove", function(d){ mousemove(d); });

       console.log(mySet)

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
