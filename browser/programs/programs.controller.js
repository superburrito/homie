'use strict';

app.controller('ProgramsCtrl', ($scope) => { 

	$scope.events = [
		{
			title: "Computer and English Language Courses",
			// http://maxpixel.freegreatpicture.com/Laptop-Computer-Technology-Close-Up-Keyboard-791030 
			bgUrl: "/media/programsComp.jpg",
			description: "Computer classes at HOME will teach you how to use essential programs such as Internet Explorer, MS Power Point, and MS Excel.",

			link: "http://www.home.org.sg/what-we-do/vocational-skills/"
		},
		{
			title: "Caregiving Courses",
			// https://upload.wikimedia.org/wikipedia/commons/e/e6/Half_the_Sky's_China_Care_Home_1.jpg
			bgUrl: "/media/programsCare.jpg",
			description: "HOME provides vocational skills courses every Sunday. This caregiving course is led by an experienced and qualified domestic worker.",
			link: "http://www.home.org.sg/what-we-do/vocational-skills/"
		}
	]

});
