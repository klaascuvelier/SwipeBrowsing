/*
 * SwipeBrowsing
 * @requires jQuery v1.6 or later
 *
 * SwipeBrowsing is a jQuery plugin that creates an iPhone like navigation by
 * swiping through pages.
 * It does not load pages via AJAX, all different pages already should be in the DOM 
 *
 * For usage and examples, visit:
 * https://github.com/klaascuvelier/SwipeBrowsing/
 *
 * Licensed under the MIT:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright (c) 2011, Klaas Cuvelier
 */
$.fn.extend({
	/**
	 * Initialize swipe navigation for item
	 * @param viewport 				container where the visible page is displayed
	 * @param pageChangeCallback 	callback called when swipe is done
	 */
	swipeBrowsing: function (viewport, pageChangeCallback) 
	{
		var touchEnabled = document.hasOwnProperty('ontouchend');
		var mouseX = false;
		var offsetX = false;
		var viewportX = viewport.offset()['left'];
		var pageList = $(this);
		var pageWidth = $(this).children(':first').width();
		var pageCount = pageList.find('li').length;
		var easing = (pageWidth / 4);
		var actions = {
			'touchstart': touchEnabled ? 'touchstart' : 'mousedown',
			'touchmove': touchEnabled ? 'touchmove' : 'mousemove',
			'touchend': touchEnabled ? 'touchend' : 'mouseup'
		};
		
		// callback for touchstart/mousedown
		var onTouchStart = function (e)
		{
			if (mouseX === false)
			{
				e.preventDefault();
				
				mouseX = (e.originalEvent.touches ? e.originalEvent.touches[0] : e).pageX;
				offsetX = pageList.offset()['left'];
			}
		};
		
		// callback for touchend/mouseup
		var onTouchEnd = function (e)
		{
			if (mouseX !== false)
			{
				var listLeft = $(this).offset()['left'];
				
				var movedX = listLeft - offsetX;
				var difX = (viewportX - listLeft) % pageWidth;
				var pageChange = (Math.abs(movedX) > easing);
				var newX = pageChange ? offsetX + (movedX < 0 ? -pageWidth : pageWidth) : offsetX;
				
				pageList.animate({left: newX}, 200, function () {
					if (pageChange && typeof pageChangeCallback === 'function')
					{
						var pageNr = (viewportX - newX) / pageWidth + 1;
						var page = pageList.find('li:nth-child(' + pageNr + ')').get(0);
						pageChangeCallback.call(page, e);
					}
				});

				
				mouseX = false;
				offsetX = false;
			}
		};
		
		// callback for touchmove/mousemove
		var onTouchMove = function (e)
		{
			if (mouseX !== false)
			{
				e.preventDefault();
				
				var eventX = (e.originalEvent.touches ? e.originalEvent.touches[0] : e).pageX;
				var difX = (mouseX - eventX);
				var newX = offsetX - difX;
				
				var maxLeft = viewportX - (pageWidth * (pageCount - 1)) - easing - 10;
				var minLeft = viewportX + easing - 10;
				
				if(newX > minLeft)
				{
					newX = minLeft;
				}
				else if (newX < maxLeft)
				{
					newX = maxLeft;
				}
								
				$(this).offset({left: newX});
			}
		};
		
		$(this)
			.bind(actions['touchstart'], onTouchStart)
			.bind(actions['touchmove'], onTouchMove)
			.bind(actions['touchend'], onTouchEnd);
		
		viewport
			.bind('mouseout', onTouchEnd);
	},
	
	/**
	 * Swipe to specific page
	 * @param page		the page (li) where you want to go to
	 * @param viewport	the container where the visible page is displayed in
	 * @param pageChangeCallback 	callback called when swipe is done
	 */
	swipeTo: function (page, viewport, pageChangeCallback) 
	{
		var left = viewport.offset()['left'] - (page.index() * page.width());
		page.parent().animate({left: left}, 200, function (e) {
			if (typeof pageChangeCallback === 'function')
			{
				pageChangeCallback.call(page.get(0), e);
			}
		});
	}
});