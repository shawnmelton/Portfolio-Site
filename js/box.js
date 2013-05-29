define(["jquery"], function($) {
	/**
	 * Construct the Box object.
	 * @param config object properties
	 */
	function Box(config) {
		this.properties = {
			animatedHeight: 0,
			animatedTop: 0,
			animatedWidth: 0,
			animationSpeed: 500,
			elem: null
		};

		if(typeof config === "object") {
			for(index in config) {
				this.properties[index] = config[index];
			}
		}
	}

	Box.prototype = {
		/**
		 * Adjust this box's height, width, and positioning.
		 */
		animate: function() {
			this.properties["elem"].animate({
				left: this.properties["animatedLeft"] +"px",
				top: this.properties["animatedTop"] +"px",
				width: this.properties["animatedWidth"] +"px",
				height: this.properties["animatedHeight"] +"px"
			}, this.properties["animationSpeed"]);
		}
	};

	return Box;
});