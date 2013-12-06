(function ($) {

  var $toggleTriggers = $();

  $(document).on('click', function(e) {
    // save clicked element to local cache
    var $clickedEl = $(e.target);

    // prevent links from doing default behavior
    if ($clickedEl.closest($toggleTriggers).length) e.preventDefault();

    // loop through all toggle elements stored in cache
    $toggleTriggers.each(function() {
      var $toggleEl = $(this);
      var $popupEl  = $('#'+$toggleEl.data('popup'));

      // conditions
      var clickedElIsToggleEl = $clickedEl.closest($toggleEl).length;
      var clickedElIsPopupEl  = $clickedEl.closest($popupEl).length;
      var popupIsHidden = $popupEl.is(':hidden');

      // open popup
      if (clickedElIsToggleEl && popupIsHidden)
        $popupEl.show();

      // close popup
      else if (!clickedElIsPopupEl)
        $popupEl.hide();
    });
    
    console.log($toggleTriggers.toArray());
  });

  $('[data-toggle]').each(function () {
    return $toggleTriggers = this;
  });

  // $('[data-toggle]').each(function () {
  //   var trigger = this;
  //   var popover = $('#'+$(trigger).data('toggle'))[0];

  //   $toggleTriggers.add(trigger);

  //   var t = new Toggle.Trigger(trigger);
  //   var p = new Toggle.Popover(popover);

  //   t.addPopover(p);

  //   $(trigger).data('trigger', trigger);
  //   $(popover).data('popover', popover);
  // });

}(jQuery));