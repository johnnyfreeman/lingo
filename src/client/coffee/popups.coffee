$toggleTriggers = $()
$(document).on "click", (e) ->
  
  # save clicked element to local cache
  $clickedEl = $(e.target)
  
  # prevent links from doing default behavior
  e.preventDefault()  if $clickedEl.closest($toggleTriggers).length
  
  # loop through all toggle elements stored in cache
  $toggleTriggers.each ->
    $toggleEl = $(this)
    $popupEl = $("#" + $toggleEl.data("popup"))
    
    # conditions
    clickedElIsToggleEl = $clickedEl.closest($toggleEl).length
    clickedElIsPopupEl = $clickedEl.closest($popupEl).length
    popupIsHidden = $popupEl.is(":hidden")
    
    # open popup
    if clickedElIsToggleEl and popupIsHidden
      $popupEl.show()
    
    # close popup
    else $popupEl.hide()  unless clickedElIsPopupEl

  console.log $toggleTriggers.toArray()

$("[data-toggle]").each ->
  $toggleTriggers = this


# $('[data-toggle]').each ->
#   trigger = this
#   popover = $('#'+$(trigger).data('toggle'))[0]

#   $toggleTriggers.add trigger

#   var t = new Toggle.Trigger trigger
#   var p = new Toggle.Popover popover

#   t.addPopover p

#   $(trigger).data 'trigger', trigger
#   $(popover).data 'popover', popover