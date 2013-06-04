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

		addEffects: function() {
			for(index in this.items) {
				this.items[index].addEffects();
			}
		},

		/**
		 * Adjust the boxes when the window changes.
		 */
		adjust: function(bounds) {
			for(index in this.items) {
				this.items[index].reposition(bounds);
				this.items[index].resize(bounds);
			}
		}
	};

	return new Boxes();
});