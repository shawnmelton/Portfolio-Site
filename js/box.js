define(["jquery", "jqueryui"], function($, jui) {
	/**
	 * Construct the Box object.
	 * @param config object properties
	 */
	function Box(config) {
		this.properties = {
			elem: null,
			height: 0,
			left: 0,
			speed: 500,
			top: 0,
			width: 0
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
				$(this).css("opacity", 0.7);
			});

			this.properties["elem"].draggable();
		},

		/**
		 * Adjust this box's height, width, and positioning.
		 */
		animate: function(height, width) {
			this.properties["elem"].animate({
				left: (this.properties["left"] * width) +"px",
				top: (this.properties["top"] * height) +"px",
				width: (this.properties["width"] * width) +"px",
				height: (this.properties["height"] * height) +"px"
			}, this.properties["speed"]);

			this.addEffects();
		}
	};

	return Box;
});