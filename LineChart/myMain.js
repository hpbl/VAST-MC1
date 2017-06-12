var margin = { left:100, right:100, top:100, bottom:100};
var lineGraph  = new LineGraph(0, 0, 1200, 600, margin);
var lineGraph2 = new LineGraph(0, 0, 1200, 250, margin);

lineGraph.setData(groupedData);
lineGraph2.setData(groupedData);



