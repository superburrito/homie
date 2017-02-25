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

	return GeneralFactory;
})