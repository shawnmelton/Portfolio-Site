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
			this.canvas["width"] = $(window).width();
			this.canvas["height"] = $(window).height() - $("header").outerHeight() - $("footer").outerHeight();

			this.section.css("height", this.canvas["height"] +"px");
			this.section.css("width", this.canvas["width"] +"px");
		},

		getHeight: function() {
			return this.canvas["height"];
		},

		getWidth: function() {
			return this.canvas["width"];
		},

		setSection: function(elem) {
			this.section = elem;
		}
	};

	return new Bounds();
});