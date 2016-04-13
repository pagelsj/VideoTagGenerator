VideoTagGen.directive("videoSkinOptions", function () {
	'use strict';
	
	return {
		restrict 	: "C",
		templateUrl : "./js/modules/videoSkinOptions/videoSkinOptions.template.html",
		controller : function ($scope) {
			$scope.availableSkins = [
				{
					"name": "Default",
					"cssClass" : "",
					"url" : "http://vjs.zencdn.net/5.3.0/video-js.css"
				}
			];
			$scope.videoSkin = $scope.availableSkins[0];

		}
	};
});