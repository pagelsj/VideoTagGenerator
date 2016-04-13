VideoTagGen.directive("posterImage", function () {
	'use strict';
	
	return {
		restrict 	: "C",
		templateUrl : "./js/modules/posterImage/posterImage.template.html",
		controller : function ($scope) {

			$scope.$watch("posterImage", function (newVal, oldVal) {
				if(newVal == "" || newVal == $scope.imageURL) delete $scope.posterImage;
			});
		
		}
	};
});