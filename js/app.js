define(["jquery", "less", "bounds", "boxes"], function($, less, Bounds, Boxes){
		var resizeTimeout = false;

		/**
		 * Resize and move boxes according to the bounds of the content area.
		 */
		var adjustBoxes = function() {
			Bounds.calculate();
			Boxes.move(Bounds.getHeight(), Bounds.getWidth());
		};

		var initialize = function(){
			Bounds.setSection($("body > div > section"));

			// Create objects to map to the boxes in markup.
			Boxes.add({
				width: 35,
				height: 60,
				left: 15,
				top: 5,
				elem: $("p#one")
			});

			Boxes.add({
				width: 35,
				height: 40,
				left: 55,
				top: 40,
				elem: $("p#two")
			});

			Boxes.add({
				width: 40,
				height: 45,
				left: 5,
				top: 45,
				elem: $("p#three")
			});

			Boxes.add({
				width: 25,
				height: 55,
				left: 70,
				top: 5,
				elem: $("p#four")
			});

			Boxes.add({
				width: 15,
				height: 65,
				left: 46,
				top: 20,
				elem: $("p#five")
			});

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

			adjustBoxes();
		};
	
		return {
			initialize: initialize
		};
	}
);