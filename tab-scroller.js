/**
 * Name:        jQuery Tab Scroller
 * Description: A tab scroller using jQuery
 * @package     Chimera Apps
 * @version     1.0.2
 * @author      Chimera.Zen
 * @copyright   Copyright (c) 2017, Chimera.Zen
 * @link        https://github.com/ChimeraZen/Chimera-Core-JS
 * @license     http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 */

var scroll_distance = 275,    // Distance .tab-container should scroll when <i> is clicked
    animate_speed   = 400;    // Speed at which .tab-container should animate the scroll

/** Load the scroller details **/
function get_scroll_details(scroller) {
  var tab_true_width 	= Math.round(scroller.siblings('.tab-container').children('ul').width()),
      container_width = Math.round(scroller.siblings('.tab-container').width()),
      left_scrolled 	= Math.round(scroller.siblings('.tab-container').scrollLeft()),
      scrolls = {
           "distance" : tab_true_width - container_width,
       "leftscrolled" : left_scrolled,
          "remaining" : tab_true_width - container_width - left_scrolled,
        "scroll_next" : scroller.parent().children('.scroller.next'),
        "scroll_prev" : scroller.parent().children('.scroller.prev')
      };
  return scrolls;
}

/** Tab Scroller **/
function tab_switch(scroller) {
  var scrolls = get_scroll_details(scroller);
  if (scrolls.leftscrolled === 0) {
    scrolls.scroll_next.css("visibility", "visible");
    scrolls.scroll_prev.css("visibility", "hidden");
  } else if (scrolls.remaining === 0) {
    scrolls.scroll_next.css("visibility", "hidden");
    scrolls.scroll_prev.css("visibility", "visible");
  } else {
    scrolls.scroll_next.css("visibility", "visible");
    scrolls.scroll_prev.css("visibility", "visible");
  }
}

/** Animate and check if <i> visibility needs to switch **/
function scroll_it(scroller, scroll) {
  scroller.siblings('.tab-container').animate({scrollLeft: scroll}, animate_speed, function () {
    tab_switch(scroller);
  });
}

/** Animate & Scroll on Click **/
$('.scroller.next').click(function () {
  var scroller = $(this),
      scrolls  = get_scroll_details(scroller);
  if (scrolls.remaining >= scroll_distance) {
    scroll_it(scroller, scrolls.leftscrolled + scroll_distance);
  } else {
    scroll_it(scroller, scrolls.leftscrolled + scrolls.remaining);
  }
});

$('.scroller.prev').click(function () {
  var scroller = $(this),
      scrolls  = get_scroll_details(scroller);
  if (scrolls.leftscrolled !== 0) {
    scroll_it(scroller, scrolls.leftscrolled - scroll_distance);
  } else {
    scroll_it(scroller, 0);
  }
});