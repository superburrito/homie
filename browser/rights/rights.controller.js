'use strict';

app.controller('RightsCtrl', ($scope, $translate, $window) => {
	
	$scope.goToLink = (event) => {
		$window.ga('set', event.gaLink);
		$window.ga('send', 'pageview', event.gaLink);
		$window.location.href = event.actualLink;
	}

	// Resources 
	$scope.resources = [
		{
			title: "MOM Handy Guide (Bahasa Indo)",
			bgUrl: "/media/guideCover.png",
			description: "This guide produced by the Ministry of Manpower (MOM) will help you understand your rights and share some tips on how to adjust to your new life in Singapore.",
			actualLink: "http://www.mom.gov.sg/~/media/mom/documents/publications/guides/fdw-handy-guide-english-bahasa-indonesia.pdf",
			gaLink: "/rights/mom/guidebookIndo"

		},
		{
			title: "MOM Handy Guide (Tagalog)",
			bgUrl: "/media/guideCover.png",
			description: "This guide produced by the Ministry of Manpower (MOM) will help you understand your rights and share some tips on how to adjust to your new life in Singapore.",
			actualLink: "http://www.mom.gov.sg/~/media/mom/documents/publications/guides/fdw-handy-guide-english-tagalog.pdf",
			gaLink: "/rights/mom/guidebookTagalog"

		},
		{
			title: "MOM Safety Guidelines",
			bgUrl: "/media/safetyGuideCover.png",
			description: "These safety guidelines produced by the Ministry of Manpower (MOM) will show you how to work safely at home.",
			actualLink: "http://www.mom.gov.sg/~/media/mom/documents/publications/guides/safety-guidelines-for-fdws-dos-and-donts.pdf",
			gaLink: "/rights/mom/safety"
		}
	]
})