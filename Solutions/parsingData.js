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
}

// Function to get unique days, and eliminating multiple occurrences in a day.
function uniqueData(data){
	var arr = new Array();
	for (j=0; j<data.length; j++) {
		arr.push(data[j].Timestamp.substring(0,10));
	}
	return (arr.unique());
}

// Function to get unique type of cars, and eleminating multiple occurrences.
function uniqueCarType(data){
	var arr = new Array();
	for (j=0; j<data.length; j++) {
		arr.push(data[j]["car-type"]);
	}
	return (arr.unique());
}

// Return each day with the cars that passes through. These days are divided by the types of the cars that passed.
function groupData(dates, data){
	var groupedData = new Array();
	data = crossfilter(data).dimension(function(d) { return d.Timestamp; });
	for(i=0; i<dates.length; i++){
		groupedData.push(data.filter([(dates[i]+" 00:00:00"), (dates[i]+" 23:59:59")]).top(Infinity));
	}
	for(i=0; i<groupedData.length; i++){
		data = crossfilter(groupedData[i]).dimension(function(d) { return d["car-type"]; })
		var groupedCars = new Array();
		for(j=0; j<car.length; j++){
			groupedCars.push(data.filter(car[j]).top(Infinity));
		}
		groupedData[i] = groupedCars;
	}
	return groupedData;
}

// Tudo certo nada errado
var groupedData = groupData(dates, data);

