define(["jquery"], function($) {
	var Bounds = function() {};

	Bounds.prototype = {
		canvas: {
			width: 0,
			height: 0
		},
		history: {
			width: 0,
			height: 0
		},

		/**
		 * Calculate the bounds of the area we are interested in.
		 */
		calculate: function() {
			this.history.width = this.canvas.width;
			this.history.height = this.canvas.height;

			this.canvas.width = $(window).width();
			this.canvas.height = $(window).height() - $("header").outerHeight() - $("footer").outerHeight();

			this.section.css("height", this.canvas.height +"px");
			this.section.css("width", this.canvas.width +"px");
		},

		get: function() {
			return {
				height: this.canvas.height,
				width: this.canvas.width
			};
		},

		/**
		 * Get the browser boundaries prior to the current calculation.
		 * Note: this is set to 0 on initial load.
		 */
		getHistory: function() {
			return this.history;
		},

		/**
		 * Has the history been set yet?
		 * @return boolean
		 */
		isHistoryValid: function() {
			return (this.history.width !== 0 && this.history.height !== 0);
		},

		setSection: function(elem) {
			this.section = elem;
		}
	};

	return new Bounds();
});