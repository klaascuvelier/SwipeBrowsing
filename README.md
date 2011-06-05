# SwipeBrowsing jQuery plugin

SwipeBrowsing is a jQuery plugin that creates an iPhone like navigation by
swiping through pages.
It does not load pages via AJAX, all different pages already should be in the DOM

## Usage

First, load [jQuery](http://jquery.com/), and then the plugin:
	<pre>
		<script src="jquery.min.js" type="text/javascript"></script>
		<script src="jswipebrowsing.min.js" type="text/javascript"></script>
	</pre>

When the loading is done, initialize the swipebrowsing for your pagelist, and specify the viewport for the visible page

	<pre>
		$(document).ready(function() 
		{
			var viewport = $('#pages');
			var pageList = viewport.find('ul');

			pageList.swipeBrowsing(viewport);
		});
	</pre>
	
swipeBrowsing has an optional parameter for a callback function, which is called when the visible page has changed
	
For more information, look at the examples

## License

Licensed under the MIT:
http://www.opensource.org/licenses/mit-license.php