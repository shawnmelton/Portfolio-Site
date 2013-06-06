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
				containment: "#"+ this.properties.elem.parent().attr("id"),
				scroll: false,
				stop: function() {
					_this.resize(_this);
				}
			});
		},

		/**
		 * Box should shrink as it approaches the right or left edge of the browser.
		 * Centered content should be full size.
		 */
		getNewWidth: function() {
			var newBoxWidth = (this.bounds.get().width * .4); // 30% of boundary width.
			var tippingPt = (this.bounds.get().width - newBoxWidth) / 2;

			// Left corner is past tipping point.
			if(parseInt(this.properties.elem.css("left")) < tippingPt) {
				newBoxWidth *= parseInt(this.properties.elem.css("left")) / tippingPt;
			}

			// Right corner is past tipping point
			if((parseInt(this.properties.elem.css("left")) + this.properties.elem.outerWidth()) > (this.bounds.get().width - tippingPt)) {
				newBoxWidth *= (this.bounds.get().width - (parseInt(this.properties.elem.css("left")) + this.properties.elem.outerWidth())) / tippingPt;
			}

			if(newBoxWidth < 50) { // Don't let the box grow too small.
				return 50;
			}

			return newBoxWidth;
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
				this.move((parseInt(this.properties.elem.css("left")) * (this.bounds.get().width / this.bounds.getHistory().width)), 
					(parseInt(this.properties.elem.css("top")) * (this.bounds.get().height / this.bounds.getHistory().height)));
			}

			this.resize(this);
		},

		/**
		 * Resize the box according to the provided bounds.
		 */
		resize: function(_this) {
			var height = _this.bounds.get().height;
			var elem = _this.properties.elem;
			this.properties.elem.animate({
				width: _this.getNewWidth() +"px"
			}, this.properties.speed, function() {
				_this.verifyWithinBounds(height, elem);
			});
		},

		/**
		 * Check to make sure the box is not too tall for boundaries.  
		 * Also, make sure the that positioning doesn't leave the box running off of the view.
		 * @param height The height of the boundary
		 */
		verifyWithinBounds: function(height, elem) {
			// Shrink font size until box is able to fit in bounds.
			elem.css("max-height", "");
			var elemHeight = elem.outerHeight();

			if(height < elemHeight) {
				window.less.modifyVars({
					'@fontSize': '11px'
				});

				elemHeight = height - 100;
				elem.css("max-height", elemHeight +"px");
			}

			// Move box to fit in bounds.
			if(height < (elem.outerHeight() + parseInt(elem.css("top")))) {
				elem.animate({
					top: (height - elemHeight - 50) +"px"
				});
			}
		}
	};

	return Box;
});