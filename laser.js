/**
 * @author Geordie Kaytes
 */

//	Cross-browser compatibility hash for CSS transform functions.
//	Code currently adds ALL of these, because browser detection is dodgy.

var xformBrowser = {
   Moz : '-moz-transform',
   O : '-o-transform',
   Webkit : '-webkit-transform',
   MS : '-ms-transform',
   generic : 'transform'
}

jQuery(document).ready(function($) {
	
	/**
	*	Laser pointer settings
	*	Positioning should be set in your stylesheets, e.g.:
	*
	*	#laser {
	*	position: absolute;
	*	top: 250px;
	*	right: 50px;
	*	}
	*	
	* 	Note: position MUST be absolute for the laser to track properly.
	* 
	*	All other attributes are captured here for ease of use.
	*/
	
	$('#laser').css({
		'background-color'	:	'red',		// laser color; change as desired
		'height'			: 	'3px',		// laser width; change as desired
		'opacity'			: 	'0',		// opacity starts at 0
		'width'				: 	'100%'		// keep this at 100%
	})

	//	Detects where the origin of the laser is, allowing code to function
	//	no matter where the origin is positioned on the page:
	
	var laserOriginY = $('#laser').offset().top
	var laserOriginX = $('#laser').offset().left
	
	//	Following code fires on every mouse move (OFTEN).
	//	To confine laser movement to a sub-section of the document,
	//	change $(document) to the relevant selector e.g. $('#mysection')
	
	$(document).mousemove(function(event){
		
		//  Change opacity (i.e. make laser appear) during first mousemove:
		
		$('#laser').animate({opacity : 0.5},1000)
		
		//	Detect document width to allow trig math:
		
		var docWidth = $(document).width()
		var docHeight = $(document).height()

		
		//	Basic trig math to determine transform angles
		//	and hypotenuse scaling factor:
		
		var sideOppo = laserOriginY-event.pageY
		var sideAdja = event.pageX-docWidth-laserOriginX
		var sideHypo = Math.sqrt((sideOppo*sideOppo)+(sideAdja*sideAdja))
		var laserTheta = -(Math.atan(sideOppo/sideAdja)/Math.PI)*180
		var scaleX = sideHypo/docWidth
		
		//	Apply all browser-specific transform factors:
		
		for(browser in xformBrowser){
			$('#laser').css(xformBrowser[browser]+'-origin','100%').css(xformBrowser[browser],'rotate('+laserTheta+'deg) scaleX('+scaleX+')')
		}
	});

});
