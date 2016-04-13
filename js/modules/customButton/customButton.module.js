VideoTagGen.directive("customButtons", function () {
	'use strict';
	
	return {
		restrict 	: "C",
		templateUrl : "./js/modules/customButton/customButton.template.html",
		link : function (scope, elem) {

			jQuery(elem).delegate("input", "blur", function () {
				

				if(jQuery(this).val() == "" || jQuery(this).val() == scope.imageURL) {
					delete scope[jQuery(this).attr("data-buttonType")];
					delete scope[jQuery(this).attr("data-buttonType")+"Styling"];
				}

			}); 

		}
	};
});

VideoTagGen.directive('imageonload', function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
        element.bind('load', function() {
					
			scope.$parent.customButtonWidth = jQuery(this).width();
			scope.$parent.customButtonHeight = jQuery(this).height();

			scope.$parent.$digest();

        });

        element.bind('error', function(){
             alert('image could not be loaded');
        });

    }
  };
});

