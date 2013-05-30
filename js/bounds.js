define(["jquery"], function($) {
	var Bounds = function() {};
	Bounds.prototype = {
		canvas: {
			width: 0,
			height: 0
		},

		/**
		 * Calculate the bounds of the area we are interested in.
		 */
		calculate: function() {
			this.canvas["width"] = $(document).width();
			this.canvas["height"] = $(document).height() - $("header").height() - $("footer").height();
		},

		getHeight: function() {
			return this.canvas["height"];
		},

		getWidth: function() {
			return this.canvas["width"];
		}
	};

	return new Bounds();
});