VideoTagGen.directive("mainNav", ["VideoTagGenServices", function (VideoTagGenServices) {
	return {
		restrict 	: "C",
		templateUrl : "./js/modules/mainNav/mainNav.template.html",
		link : function (scope, elem) {

			jQuery(elem).delegate(".createPreview", "click", function () {

				if(scope.enablePreview){
					scope.videoId = "videojs" + new Date().getTime();

					VideoTagGenServices.createPreview(scope, "previewVideoContent");

					VideoTagGenServices.createCode("previewVideoContent", "videoMarkupContent");

					videojs(scope.videoId);
					
				} else {
					jQuery("#videoMarkupContent").html("Please add at least 1 video path before trying to create a Video Tag.");
				}

			});
		}
	};
}]);