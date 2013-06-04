define(["jquery", "jqueryui"], function($, jui) {
	/**
	 * Construct the Box object.
	 * @param config object properties
	 */
	function Box(config) {
		this.properties = {
			elem: null,
			left: 0,
			speed: 500,
			top: 0
		};

		if(typeof config === "object") {
			for(index in config) {
				this.properties[index] = config[index];
			}
		}
	}

	Box.prototype = {
		/**
		 * Add effects to the box.
		 */
		addEffects: function() {
			// When the user hovers over the box, raise it up above the others.
			this.properties["elem"].hover(function() {
				$(this).css("z-index", 100);
				$(this).css("opacity", 1);
			}, function() {
				$(this).css("z-index", "");
				$(this).css("opacity", 0.85);
			});

			var parentId = this.properties["elem"].parent().attr("id");
			this.properties["elem"].draggable({
				containment: "#"+ parentId,
				scroll: false
			});
		},

		/**
		 * Reposition the box according to the provided bounds.
		 */
		reposition: function(bounds) {
			this.properties["elem"].animate({
				left: (this.properties["left"] * bounds.width * .01) +"px",
				top: (this.properties["top"] * bounds.height * .01) +"px"
			}, this.properties["speed"]);
		},

		/**
		 * Resize the box according to the provided bounds.
		 */
		resize: function(bounds) {
			var _this = this;
			var height = bounds.height;
			var elem = this.properties["elem"];
			this.properties["elem"].animate({
				width: (bounds.width * .3) +"px"
			}, this.properties["speed"], function() {
				_this.verifyWithinBounds(height, elem);
			});
		},

		/**
		 * Check to make sure the box is not too tall for boundaries.  
		 * Also, make sure the that positioning doesn't leave the box running off of the view.
		 * @param height The height of the boundary
		 */
		verifyWithinBounds: function(height, elem) {
			// Shrink font size until box is able to fit in bounds.
			if(height < elem.outerHeight()) {
				window.less.modifyVars({
					'@fontSize': '11px'
				});
			}

			// Move box to fit in bounds.
			if(height < (elem.outerHeight() + parseInt(elem.css("top")))) {
				elem.animate({
					top: (height - elem.outerHeight() - 5) +"px"
				}, 100);
			}
		}
	};

	return Box;
});