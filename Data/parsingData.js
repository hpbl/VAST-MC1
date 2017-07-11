Array.prototype.contains = function(v) {
    for(var i = 0; i < this.length; i++) {
        if(this[i] === v) return true;
    }
    return false;
};

Array.prototype.unique = function() {
    var arr = [];
    for(var i = 0; i < this.length; i++) {
        if(!arr.contains(this[i])) {
            arr.push(this[i]);
        }
    }
    return arr;
};

// Function to get unique days, and eliminating multiple occurrences in a day.
function uniqueData(data){
	var arr = [];
	for (j=0; j<data.length; j++) {
		arr.push(data[j].Timestamp.substring(0,10));
	}
	return (arr.unique());
}

// Function to get unique type of cars, and eleminating multiple occurrences.
function uniqueCarType(data){
	var arr = [];
	for (j=0; j<data.length; j++) {
		arr.push(data[j]['car-type']);
	}
	return (arr.unique());
}

// Function get unique Ids
function uniqueCarId(data){
	var arr = [];
	for (j=0; j<data.length; j++) {
		arr.push(data[j]['car-id']);
	}
	return (arr.unique());
}

// Return a list of gates. Each gate is divided by the types of car that passed through it. Each type have the type's cars.
function groupData(gates, data, start, end){

    var dateDimension = crossfilter(data).dimension(function(d) { return d.date.getTime(); });

    let newData = dateDimension.filterRange([ start.getTime(), end.getTime()]).top(Infinity);

	var groupedData = [];
	var gateDimension = crossfilter(newData).dimension(function(d) { return d['gate-name']; });


	for(let i = 0; i < gates.length; i++) {
		groupedData.push(gateDimension.filter(gates[i]).top(Infinity));
	}

	for(let i=0; i<groupedData.length; i++){
		var typeDimension = crossfilter(groupedData[i]).dimension(function(d) { return d['car-type']; });
		var groupedCars = [];
		for(let j=0; j< car.length; j++){
			groupedCars.push(typeDimension.filter(car[j]).top(Infinity));
		}
		groupedData[i] = groupedCars;
	}
	return groupedData;
}

// Return the number of cars passed through the park per day
function numberOfCars(dates, data){
	var groupedData = [];
	data = crossfilter(data).dimension(function(d) { return d.Timestamp; });
	for(i=0; i<dates.length; i++){
		groupedData.push(data.filter([(dates[i]+' 00:00:00'), (dates[i]+' 23:59:59')]).top(Infinity));
	}
	var occ = new Array(groupedData.length).fill(0);
	for(i=0; i<groupedData.length; i++){
		data = crossfilter(groupedData[i]).dimension(function(d) { return d['gate-name']; });
		var onlyEntrance0 = data.filter('entrance0').top(Infinity);
		onlyEntrance0 = uniqueCarId(onlyEntrance0);
		occ[i] += onlyEntrance0.length;
		var onlyEntrance1 = data.filter('entrance1').top(Infinity);
		onlyEntrance1 = uniqueCarId(onlyEntrance1);
		occ[i] += onlyEntrance1.length;
		var onlyEntrance2 = data.filter('entrance2').top(Infinity);
		onlyEntrance2 = uniqueCarId(onlyEntrance2);
		occ[i] += onlyEntrance2.length;
		var onlyEntrance3 = data.filter('entrance3').top(Infinity);
		onlyEntrance3 = uniqueCarId(onlyEntrance3);
		occ[i] += onlyEntrance3.length;
		var onlyEntrance4 = data.filter('entrance4').top(Infinity);
		onlyEntrance4 = uniqueCarId(onlyEntrance4);
		occ[i] += onlyEntrance4.length;
	}

	return occ;

}

// Tudo certo nada errado
var groupedData = groupData(gates, data, new Date(2015, 4, 1), new Date(2016, 5, 1));
var groupedNumberOfCars = numberOfCars(dates, data);
