// app.js
// Custom logic for the landing page

// Changes nav bar styling upon scrolling 100 pixels down
var $nav = $("nav")
$(document).scroll(function() {
	if ($(window).scrollTop() > 100) {
		$nav.addClass("nav-body")
	} else {
		$nav.removeClass("nav-body")
	}
})