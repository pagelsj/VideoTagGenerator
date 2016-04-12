var VideoTagGen = (VideoTagGen) ? VideoTagGen : {};

VideoTagGen.controller("VideoTagGenController", ["$scope", "settings", function ($scope, settings) {

	$scope.brand = "topshop";

	$scope.$watch("brand", function () {
		settings.load($scope);
	});

}]);

