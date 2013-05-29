define(["jquery", "box"], function($, Box) {
	var Boxes = function() {};
	Boxes.prototype = {
		items: [],

		/**
		 * Add a new Box object and push it to the list of items.
		 * @param config object of properties for Box.
		 */
		add: function(config) {
			if(typeof config === "object") {
				this.items.push(new Box(config));
			}
		},

		/**
		 * Fire the animations for all of the boxes.
		 */
		animate: function() {
			for(index in this.items) {
				this.items[index].animate();
			}
		}
	}

	return Boxes;
});