var x = crossfilter([
    {
      "Timestamp": "2015-05-01 00:43:28",
      "car-id": "20154301124328-262",
      "car-type": "4",
      "gate-name": "entrance3"
    },
    {
      "Timestamp": "2015-05-01 01:03:48",
      "car-id": "20154301124328-262",
      "car-type": "4",
      "gate-name": "general-gate1"
    },
    {
      "Timestamp": "2015-05-01 01:06:24",
      "car-id": "20154301124328-262",
      "car-type": "4",
      "gate-name": "ranger-stop2"
    },
    {
      "Timestamp": "2015-05-01 01:09:25",
      "car-id": "20154301124328-262",
      "car-type": "4",
      "gate-name": "ranger-stop0"
    },
    {
      "Timestamp": "2015-05-01 01:12:36",
      "car-id": "20154301124328-262",
      "car-type": "4",
      "gate-name": "general-gate2"
    }
  ]);
var times = x.dimension(function(d) { return d.Timestamp; });
times.filter(["2015-05-01 00:43:20", "2015-05-01 01:09:25"]);
console.log(times.top(Infinity));