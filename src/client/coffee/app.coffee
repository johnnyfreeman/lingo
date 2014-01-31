###
Active phrase styling
###
$("#phrases").on "change", "input[name=\"phrases[]\"]", (e) ->
  $this = $(this)
  $parent = $(e.relatedTarget)
  
  # toggle active state
  if $this.is(":checked")
    $this.closest("li").addClass("active").find("label").removeClass "truncate"
  else
    $this.closest("li").removeClass("active").find("label").addClass "truncate"
  
  # update active count
  $(".info-bar .badge").text $("input[name=\"phrases[]\"]").filter(":checked").length


###
Calculate the url for the link to show all phrases
###
query = _(location.search.slice(1).split("&"))
query = query.filter((q) ->
  q.split("=")[0] isnt "activeTags"
)
$(".listingInfo .clear").attr "href", "?" + query.join("&")

###
Open Search Form
###
$(document).on "click", "[data-toggle]", (e) ->
  e.preventDefault()
  targetId = $(this).attr("data-toggle")
  $target = $("#" + targetId)
  if $target.is(":hidden")
    $target.show(0).animate(width: 724).find("input").select()
  else
    $target.animate
      width: 0
    , ->
      $target.hide(0).find("input").blur()

