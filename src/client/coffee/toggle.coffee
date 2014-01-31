###
Toggle
###
Toggle = window.Toggle = {}

###
Trigger
###
Toggle.Trigger = (el, options) ->
  @popovers = _([])
  @el = el
  @options = _.extend({}, options)
  Toggle.triggers.push this


# invoke a method on all popovers that this trigger controls
Toggle.Trigger::invoke = (method) ->
  @popovers.invoke method


# add popover to this trigger
Toggle.Trigger::addPopover = (popover) ->
  @popovers.push popover


###
Popover
###
Toggle.Popover = (el, options) ->
  that = this
  @el = el
  @state = false
  @options = _.extend({},
    open: ->
      console.log "Opening Popover: \"" + that.el + "\""

    close: ->
      console.log "Closing Popover: \"" + that.el + "\""
  , options)
  Popover.popovers.push this


# open
Toggle.Popover::open = ->
  unless @state
    @options.open()
    @state = true
  this


# close
Toggle.Popover::close = ->
  if @state
    @options.close()
    @state = false
  this


# toggle Popover
Toggle.Popover::toggle = ->
  (if @state then @close() else @open())

Toggle.Popover::addToTrigger = (trigger) ->
  trigger.popovers.push this


###
Pools
###
Toggle.triggers = _([])
Toggle.popovers = _([])