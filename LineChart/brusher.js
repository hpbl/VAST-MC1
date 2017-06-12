var margin = { left:100, right:100, top:100, bottom:100};
var showY1 = true;
var showY2 = false;
var lineGraph  = new LineGraph(0, 0, 1200, 600, margin, showY1);
var lineGraph2 = new LineGraph(0, 0, 1200, 250, margin, showY2);

lineGraph.setData(groupedData);
lineGraph2.setData(groupedData);



