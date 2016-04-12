VideoTagGen.directive("videoPaths", function () {
	return {
		restrict 	: "C",
		templateUrl : "./js/modules/videoPaths/videoPaths.template.html",
		controller : function ($scope) {

			$scope.videoFormat = {};


			// Manage the storage of the standard Video Formats. Rmove objcts if not needed.
			$scope.$watch("videoFormat", function(newVal, oldVal) {
				var dataFormat = Object.keys(newVal)[0];

				// Test that a value has been entered. Otherwise, delete the key/value pair from videoFormat[OBJECT]
				if(newVal[dataFormat] == "" || newVal[dataFormat] == $scope.videoURL) delete $scope.videoFormat[dataFormat];

				(Object.keys($scope.videoFormat).length) ? $scope.enablePreview = true : $scope.enablePreview = false;
					// Test that at least 1 videoFormat has been entered in order to enablePreview[BOOLEAN]

				if(!$scope.videoFormatLarge || !$scope.videoFormatLarge.sources) 
					return;

				// Test that a value has been entered. Otherwise, delete the key/value pair from videoFormat[OBJECT]
				delete $scope.videoFormatLarge.sources[dataFormat];

				// Test that at least 1 videoFormat has been entered in order to enablePreview[BOOLEAN]
				if (!Object.keys($scope.videoFormatLarge.sources).length)
					delete $scope.videoFormat.sources;
				
			}, true);

		}
	};
});