var margin = {"left": 50, "right": 50, "bottom": 50, "top": 50};

var scp = new ScatterPlot(0,0, 500, 500, margin);

var ddd = [{"x":100, "y": "1"}, {"x":300, "y": "2P"}, {"x":150, "y": "2"}, {"x":200, "y": "3"}, {"x":1000, "y": "3"}, {"x":50, "y": "2"}];
scp.generateScatterPlot(ddd);
