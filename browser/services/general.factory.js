'use strict'

app.factory('GeneralFactory', () => {
	var GeneralFactory = {};

	GeneralFactory.limitStr = (str, limit) => {
		if (str.length > limit) {
			return str.slice(0,limit).concat('...');
		} else {
			return str;
		}
	} 

	GeneralFactory.niceNum = (num) => {
		if (num < 10) {
			return "0" + parseInt(num); 
		} else {
			return parseInt(num);
		}
	} 

	return GeneralFactory;
})