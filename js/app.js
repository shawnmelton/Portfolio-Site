define(["jquery", "less", "bounds", "boxes"], function($, less, Bounds, Boxes){
		var resizeTimeout = false;

		/**
		 * Resize and move boxes according to the bounds of the content area.
		 */
		var adjustBoxes = function() {
			Bounds.calculate();
			Boxes.adjust(Bounds.get());
		};

		var initialize = function(){
			Bounds.setSection($("body > div > section"));
			Boxes.setBounds(Bounds);

			// Create objects to map to the boxes in markup.
			Boxes.add({
				left: 15,
				top: 5,
				elem: $("#one")
			});

			Boxes.add({
				left: 55,
				top: 40,
				elem: $("#two")
			});

			Boxes.add({
				left: 5,
				top: 45,
				elem: $("#three")
			});

			Boxes.add({
				left: 60,
				top: 5,
				elem: $("#four")
			});

			Boxes.add({
				left: 46,
				top: 20,
				elem: $("#five")
			});

			Boxes.addEffects();

			/**
			 * When window is resized, then adjust the boxes.
			 * Wait until the user has completed their drag.
			 */
			var timeout = false;
			$(window).resize(function() {
				if(resizeTimeout !== false) {
					clearTimeout(resizeTimeout);
					resizeTimeout = false;
				}

				resizeTimeout = setTimeout(adjustBoxes, 250);
			});
		};
	
		return {
			initialize: initialize
		};
	}
);