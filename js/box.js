define(["jquery", "jqueryui"], function($, jui) {
	/**
	 * Construct the Box object.
	 * @param config object properties
	 */
	function Box(config, bounds) {
		this.properties = {
			elem: null,
			left: 0,
			speed: 500,
			top: 0
		};

		this.bounds = bounds;
		this.bounds.calculate();

		if(typeof config === "object") {
			for(index in config) {
				this.properties[index] = config[index];
			}
		}

		// Move box into initial placement.
		this.move((this.properties.left * this.bounds.get().width * .01), (this.properties.top * this.bounds.get().height * .01));
	}

	Box.prototype = {
		/**
		 * Add effects to the box.
		 */
		addEffects: function() {
			// When the user hovers over the box, raise it up above the others.
			this.properties.elem.hover(function() {
				$(this).css("z-index", 100);
				$(this).css("opacity", 1);
			}, function() {
				$(this).css("z-index", "");
				$(this).css("opacity", 0.85);
			});

			var _this = this;
			this.properties.elem.draggable({
				scroll: false,
				drag: function() {
					_this.resize();
				},
				stop: function() {
					_this.keepInBounds();
				}
			});
		},

		/**
		 * Get the Y coordinate for the bottom edge of this box.
		 */
		getBottomY: function() {
			return (this.getTopY() + this.properties.elem.outerHeight());
		},

		getLeftX: function() {
			return parseInt(this.properties.elem.css("left"));
		},

		/**
		 * Box should shrink as it approaches the right or left edge of the browser.
		 * Centered content should be full size.
		 */
		getNewSize: function() {
			var origBoxSize = (this.bounds.get().width * .3); // 30% of boundary width.
			var boxSizeDiff = origBoxSize * .5; // It will shrink 20% when it has reached the outer 25% of screen.
			var tippingPt = (this.bounds.get().width - origBoxSize) / 2;
			var newBoxSize = origBoxSize;

			// Left corner is past tipping point.
			if(this.getLeftX() < tippingPt) {
				newBoxSize = origBoxSize - (boxSizeDiff * (1 - (this.getLeftX() / tippingPt)));
			} else if(this.getLeftX() > (this.bounds.get().width - tippingPt - origBoxSize)) {
				newBoxSize = origBoxSize - (boxSizeDiff * (this.getLeftX() / this.bounds.get().width));
			}

			return newBoxSize;
		},

		/**
		 * Get the X coordinate for the right edge of this box.
		 */
		getRightX: function() {
			return (this.getLeftX() + this.properties.elem.outerWidth());
		},

		getTopY: function() {
			return parseInt(this.properties.elem.css("top"));
		},

		/**
		 * Make sure that this box stays within the bounds.
		 */
		keepInBounds: function() {
			// Vertical correction.
			if(this.getTopY() < 0) {
				this.properties.elem.animate({top: "3px"});
			} else if(this.getBottomY() > this.bounds.get().height) {
				this.properties.elem.animate({
					top: (this.bounds.get().height - this.properties.elem.outerHeight() - 3) +"px"
				});
			}

			// Horizontal correction.
			if(this.getLeftX() < 0) {
				this.properties.elem.animate("left", "3px");
			} else if(this.getRightX() > this.bounds.get().width) {
				this.properties.elem.css("left", (this.bounds.get().width - this.properties.elem.outerWidth() - 3) +"px");
			}
		},

		/**
		 * Move this box to the specified top and left positions.
		 */
		move: function(left, top) {
			this.properties.elem.animate({
				left: left +"px",
				top: top +"px"
			}, this.properties.speed);
		},

		/**
		 * Reposition the box according to the provided bounds.  Calculate the percentage of change and apply it to the current positioning so that items remain in the same relative position.
		 */
		reposition: function() {
			if(this.bounds.isHistoryValid()) {
				this.move((this.getLeftX() * (this.bounds.get().width / this.bounds.getHistory().width)), 
					(this.getTopY() * (this.bounds.get().height / this.bounds.getHistory().height)));
			}

			this.resize(this);
		},

		/**
		 * Resize the box according to the provided bounds.
		 */
		resize: function() {
			var newSize = this.getNewSize() +"px";
			this.properties.elem.css("width", newSize).css("height", newSize);
		}
	};

	return Box;
});