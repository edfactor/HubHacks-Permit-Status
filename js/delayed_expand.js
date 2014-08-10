function prepAccordions() {
 
  var event = (navigator.userAgent.match(/iPhone/i)) ? "touchstart" : "click";
  $('.xpandable').each(function() {
    $(this)
      .bind(event, function(e) {
        $(this).toggleClass('open').next('.xpandable-area').slideToggle();
      })
      .nextUntil('.xpandable, .xpandable-break')
      .wrapAll('<div class="xpandable-area"></div>');
  });
  $('.xpandable-area').hide();

  
  $('.review').each(function() {
    $(this)
      .bind(event, function(e) {
        $(this).toggleClass('open').next('.review-area').slideToggle();
      })
      .nextUntil('.review, h4')
      .wrapAll('<div class="review-area"></div>');
  });
  $('.review-area').hide();
  
	
}