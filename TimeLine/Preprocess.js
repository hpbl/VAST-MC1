var data2 = [];

var v = [];
var vis = [];
for(var i = 0; i < data.length; i++) {
    id = data[i]['car-id'];
    if(vis[id] === undefined) data2[id] = [];
    vis[id] = 1;
    data2[id].push( {"time" : data[i]['Timestamp'] , "gate" : data[i]['gate-name'] } );
}

var groupedData = [];
var mark = {};

var gateDimension = crossfilter(data).dimension(function(d) { return d['gate-name']; });

for(var i = 0; i < gates.length; i++) {

    groupedData = gateDimension.filter(gates[i]).top(Infinity);
    v[i] = [];

    for(var j = 0; j < groupedData.length; j++) {

        if(mark[ groupedData[j]['car-id'] ] === undefined) {
            mark[ groupedData[j]['car-id']] = 1;
            v[i].push(groupedData[j]['car-id']);
        }
    }

    mark = [];
    groupedData = [];
}
