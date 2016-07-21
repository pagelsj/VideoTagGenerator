var VideoTagGen = (VideoTagGen) ? VideoTagGen : {};

VideoTagGen.service("settings", ["$http", function ($http) {
	this.load = function (scope) {
		
		$http({
			method: 'GET',
			url: './js/brandSettings/' + scope.brand + '.settings.json'
		}).then(function successCallback(response) {
			
			jQuery.extend(true, scope, response.data);
			console.log("scope", scope);

		}, function errorCallback(response) {
			alert("There wass an error loading the config file. Please try again.");
		});
	};

	return this;
}]);