define(["jquery", "less", "boxes"], function($, less, Boxes){
		var initialize = function(){
			// Create objects to map to the boxes in markup.
			var bx = new Boxes();
			bx.add({
				animatedWidth: 300,
				animatedHeight: 400,
				animatedLeft: 300,
				animatedTop: 100,
				elem: $("p#one")
			});

			bx.add({
				animatedWidth: 300,
				animatedHeight: 200,
				animatedLeft: 50,
				animatedTop: 250,
				elem: $("p#two")
			});

			bx.add({
				animatedWidth: 300,
				animatedHeight: 200,
				animatedLeft: 575,
				animatedTop: 25,
				elem: $("p#three")
			});

			bx.add({
				animatedWidth: 200,
				animatedHeight: 250,
				animatedLeft: 550,
				animatedTop: 375,
				elem: $("p#four")
			});

			// Move boxes into position.
			bx.animate();
		}
	
		return {
			initialize: initialize
		};
	}
);