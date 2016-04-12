VideoTagGen.directive("videoPathsLarge", function () {
	return {
		restrict 	: "C",
		templateUrl : "./js/modules/videoPathsLarge/videoPathsLarge.template.html",
		controller : function ($scope) {

			$scope.videoFormatLarge = {};

			// Manage the storage of the Large Video Formats. Rmove objcts if not needed.
			$scope.$watch("videoFormatLarge.sources", function(newVal, oldVal) {

				if(!$scope.videoFormatLarge.sources) 
					return;

				var dataFormat = Object.keys(newVal)[0];

				// Test that a value has been entered. Otherwise, delete the key/value pair from videoFormat[OBJECT]
				if(newVal[dataFormat] == "" || newVal[dataFormat] == $scope.videoURL) delete $scope.videoFormatLarge.sources[dataFormat];

				// Test that at least 1 videoFormat has been entered in order to enablePreview[BOOLEAN]
				if (!Object.keys($scope.videoFormatLarge.sources).length)
					delete $scope.videoFormatLarge.sources;
				
			}, true);

		}
	};
});