var VideoTagGen = (VideoTagGen) ? VideoTagGen : {};

VideoTagGen.service("VideoTagGenServices", ["$q", "settings", function ($q, settings) {
	var that = this;
	
	this.createPreview = function (scope, videoContainer) {
		try {
			that.dataSetupObj = {};

			// CREATE A NEW <video> NODE FOR US TO BUILD ON TOP OF.
			var videoNode = document.createElement("video");
				videoNode.setAttribute("class", "video-js");
				videoNode.setAttribute("id", scope.videoId);



/*
	DIRECTIVE : videoPaths.directive.js
	LOOP THROUGH THE IDEO FORMATS AND ADD THEM
*/
			for(var format in scope.videoFormat) {
				var sourceTag = document.createElement("source");
					sourceTag.setAttribute("type", "video/"+format);
					sourceTag.setAttribute("src", scope.videoFormat[format]);
				videoNode.appendChild(sourceTag);
			}



/*
	DIRECTIVE : videoFormatLarge.directive.js
	ADD THE URLS FOR THE LARGE VIDEOS
*/			
			if (scope.videoFormatLarge.sources) {
				that.createDataSetup("fullscreenSourceSwitch", scope.videoFormatLarge);
			}



/*
	DIRECTIVE : posterImage.directive.js
	ADD POSTER IMAGE
*/			
			if (scope.posterImage) {
				that.createDataSetup("poster",scope.posterImage);
			}



/*
	DIRECTIVE : customPlayButton.directive.js
	CREATE THE CUSTOM PLAY BUTTON STYLING IF A URL HAS BEEN PROVIDED.
*/
			if (scope.customPlayButton) {
				var customButtonStyling = document.createElement("style");
				var buttonStyle = that.buildCustomButtonStyles(scope, "vjs-big-play-button", scope.customPlayButton);
					
				customButtonStyling.type = "text/css";

				console.log("buttonStyle", buttonStyle);
				
				if (customButtonStyling.styleSheet){
					console.log("customButtonStyling", customButtonStyling);
					customButtonStyling.styleSheet.cssText = buttonStyle
				} else {
					customButtonStyling.appendChild(document.createTextNode(buttonStyle));
				}

			}



/*
	DIRECTIVE : videoSizes.directive.js
	ADD THE HEIGHT AND WIDTH PROPERTIES IF THEY HAVE BEEN SET
*/	
			if(scope.videoSize){
				if(scope.videoSize.height) { 
					//videoNode.setAttribute("height", scope.videoSize.height);
					that.createDataSetup("height", scope.videoSize.height+"%");
				}
				if(scope.videoSize.width) {
					//videoNode.setAttribute("width", scope.videoSize.width);
					that.createDataSetup("width", scope.videoSize.width+"%");
				}
			}

			if (scope.fluid) {
				var cssClasses = videoNode.getAttribute("class");
				videoNode.setAttribute("class", cssClasses + " fluid");
			}



/*
	DIRECTIVE : videoOptions.directive.js
	ADD THE EXTRA OPTIONS TO THE VIDEO TAG
*/
			for (var i in scope.options) {
				that.createDataSetup(i, scope.options[i]);
			}



/*
	DIRECTIVE : videoJSComponents.directive.js
	ADD THE VIDEOJS COMPONENT OPTIONS TO THE VIDEO TAG
*/
			for (var i in scope.vjsComponents) {
				that.createDataSetup(i, scope.vjsComponents[i]);
			}



/*
	DIRECTIVE : videoSkins.directive.js
	ADD THE SELECTED SKIN CLASS TO THE VIDEO AND ADD THE <link> TO THE CSS FILE
*/		
			var currentClass = videoNode.getAttribute("class"),
				cssLink = "&lt;style rel='stylesheet' href='"+scope.videoSkin.url+"' /&gt;";
			
			videoNode.setAttribute("class", currentClass + " " + scope.videoSkin.cssClass);



/*
	REMOVE THE OLD VIDEO TAGS AND APPEND THE NEW ONE.
*/
			var containerNode = jQuery("#" + videoContainer);

				// ADD THE DATA SETUP OBJECT TO THE VIDEO.
				videoNode.setAttribute("data-setup", JSON.stringify(that.dataSetupObj));
				
				// ADD THE VIDEO NODE TO THE DOM.
				containerNode.html(videoNode);

				// ADD THE CUSTOM BUTTON STYLING TO THE DOM IF PRESENT.
				if (customButtonStyling)
					containerNode.prepend(customButtonStyling);

				// ADD THE PLAYER SKIN TO THE DOM.
				containerNode.prepend(cssLink);
			
			// JUST FOR GOOD MEASURE...RETURN EVERYTHING.
			return {
				cssLink : cssLink,
				videoNode : videoNode
			};
		
		} catch(e) {

			console.log("THERE SEEMS TO HAVE BEEN AN ERROR: ", e);
			return e;
		
		};
	};



	// METHOD IS USED TO APPEND PROPERTIES TO THE 'data-setup' OBJECT
	this.createDataSetup = function (property, value) {
		that.dataSetupObj[property] = value;
	};



	// METHOD IS USED TO GRAB THE HTML FROM THE PREVIEW VIDEO AND ENCODE IT SO IT CAN BE DISPLAYED ON SCREEN.
	this.createCode = function (previewVideoElement, markupContainer) {
		
		var videoElement = jQuery("#" + previewVideoElement)[0],

			runScript = that.createRunScript(jQuery(videoElement).find('video').attr("id")),

			htmlDisplayMarkup = (videoElement.innerHTML + runScript)
				.replace(/"/g, "'")
				.replace(/&quot;/g, "\"")
				.replace(/,/g, ", ")
				.replace(/</g, "&lt;")
				.replace(/>/g, "&gt;</br>");

		jQuery("#"+markupContainer).html(htmlDisplayMarkup);

	};



	// METHOD IS USED TO CREATE THE JS NEEDED TO RUN THE vdeoJS PLUGIN FROM WITHIN THE ARCADIA FRAMEWORK
	this.createRunScript = function (videoId) {
		var runScript = [
			'<script type="text/javascript">',
			'var _ArcQ = _ArcQ || [];',
			'function init'+videoId+'() {',
			'new Arcadia.UI.VideoJs({target: "#'+videoId+'",selector: "'+videoId+'"});',
			'};',
			'_ArcQ.push([init'+videoId+']);',
			'</script>'

		].join("\n");

		return runScript;
	};



	// METHOD USED TO CREATE THE CUSTOM PLAY BUTTON STYLING.
	this.buildCustomButtonStyles = function (scope, buttonType, buttonUrl) {

		var style = [
			'.' + buttonType + '{',
				'width:'+ scope.customButtonWidth +'px !important;',
				'height:'+ scope.customButtonHeight +'px !important;',
				'top:50% !important;',
				'left:50% !important;',
				'border:0 !important;',
				'box-shadow:0 !important;',
				'margin:-' + scope.customButtonHeight / 2 + 'px 0 0 -' + scope.customButtonWidth / 2 + 'px !important;',
				'background:url("' + scope.imageURL + buttonUrl + '") no-repeat 50% 50%/100% 100% !important;',
			'}',
			'.' + buttonType + ':before{',
				'display:none;',
			'}'
		].join("\n");

		return style;
	};



}]);
