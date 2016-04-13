VideoTagGen.directive("videoJSComponents", function () {
	'use strict';
	
	return {
		restrict 	: "C",
		templateUrl : "./js/modules/videoJSComponents/videoJSComponents.template.html",
		controller : function ($scope) {
			$scope.vjsComponents = {
				bigPlayButton : true,
				loadingSpinner : true,
				textTrackDisplay : true
			};
		}
	};
});