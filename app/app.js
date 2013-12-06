/**
 * Active phrase styling
 */
$('#phrases').on('change', 'input[name="phrases[]"]', function(e) {
  var $this = $(this);
  var $parent = $(e.relatedTarget);

  // toggle active state
  if ($this.is(':checked')) {
    $this.closest('li').addClass('active').find('label').removeClass('truncate');
  } else {
    $this.closest('li').removeClass('active').find('label').addClass('truncate');
  }

  // update active count
  $('.info-bar .badge').text($('input[name="phrases[]"]').filter(':checked').length);
});


/**
 * Calculate the url for the link to show all phrases
 */
var query = _(location.search.slice(1).split('&'));
query = query.filter(function (q) {
  return q.split('=')[0] !== 'activeTags';
});
$('.listingInfo .clear').attr('href', '?' + query.join('&'));


/**
 * Open Search Form
 */
$(document).on('click', '[data-toggle]', function (e) {
  e.preventDefault();
  var targetId = $(this).attr('data-toggle');
  var $target = $('#'+targetId);
  if ($target.is(':hidden')) {
    $target.show(0).animate({width: 724}).find('input').select();
  } else {
    $target.animate({width: 0}, function () {
      $target.hide(0).find('input').blur();
    });
  }
});