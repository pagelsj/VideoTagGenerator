VideoTagGen.directive("previewModal", function () {
	'use strict';
	
	return {
		restrict 	: "C",
		templateUrl : "./js/modules/previewModal/previewModal.template.html",
		link : function (scope, element) {

			var copyTextareaBtn = document.querySelector('.js-textareacopybtn');

			jQuery(element).delegate("#videoMarkupContent", 'click', function(event) {
				var copyTextarea = jQuery(this).text(); //.replace(/([^<br>]*)/, "");


				var ta = jQuery("<textarea/>");
					//ta.attr("style","position:fixed; top:-10000px;");
					jQuery(ta).text(copyTextarea);

				jQuery(element).find(".modal-content").append(ta);
				
				ta.select();

				try {
					var successful = document.execCommand('copy');
					jQuery(ta).detach();
					var msg = successful ? 'successful' : 'unsuccessful';
					jQuery(element).find(".alert").removeClass("hide");
					setTimeout(function() {
						jQuery(element).find(".alert").addClass("hide");
					}, 2000);
				} catch (err) {
					console.log('Oops, unable to copy', err);
				}
				
			});
		}
	};
});

