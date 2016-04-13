VideoTagGen.directive("videoOptions", function () {
	'use strict';
	
	return {
		restrict 	: "C",
		templateUrl : "./js/modules/videoOptions/videoOptions.template.html",
		controller : function ($scope) {
			
			$scope.options = {
				preload:"none"
			};

		}
	};
});