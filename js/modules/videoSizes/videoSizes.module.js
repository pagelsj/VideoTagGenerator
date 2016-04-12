VideoTagGen.directive("videoSizes", function () {
	return {
		restrict 	: "C",
		templateUrl : "./js/modules/videoSizes/videoSizes.template.html",
		controller : function ($scope) {
			
			$scope.$watch("fluid", function (newVal, oldVal) {

				if (newVal && $scope.videoSize) {
				
					delete $scope.videoSize;

				}

			});
		}
	};
});