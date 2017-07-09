var data2 = [];

var v = [];
var vis = [];
var parseDate = d3.timeParse("%Y-%m-%d %H:%M:%S");


for(let i = 0; i < data.length; i++) {
    id = data[i]['car-id'];
    if(vis[id] === undefined){
        data2[id] = [];
    }
    vis[id] = 1;
    data2[id].push( {"time" : parseDate(data[i]['Timestamp']) , "gate" : data[i]['gate-name'] } );
}


var groupedData = [];
var mark = {};

var gateDimension = crossfilter(data).dimension(function(d) { return d['gate-name']; });

for(let i = 0; i < gates.length; i++) {

    groupedData = gateDimension.filter(gates[i]).top(Infinity);
    v[i] = [];

    for(let j = 0; j < groupedData.length; j++) {

        if(mark[ groupedData[j]['car-id'] ] === undefined) {
            mark[ groupedData[j]['car-id']] = 1;
            v[i].push(groupedData[j]['car-id']);
        }
    }

    mark = [];
    groupedData = [];
}
