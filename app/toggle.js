(function (_) {
  'use strict'

  /**
   * Toggle
   */
  var Toggle = window.Toggle = {};

  /**
   * Trigger
   */
  Toggle.Trigger = function (el, options) {
    this.popovers = _([]);
    this.el = el;
    this.options = _.extend({}, options);
    Toggle.triggers.push(this);
  };

  // invoke a method on all popovers that this trigger controls
  Toggle.Trigger.prototype.invoke = function (method) {
    return this.popovers.invoke(method);
  };

  // add popover to this trigger
  Toggle.Trigger.prototype.addPopover = function (popover) {
    return this.popovers.push(popover);
  };


  /**
   * Popover
   */
  Toggle.Popover = function (el, options) {
    var that = this;
    this.el = el;
    this.state = false;
    this.options = _.extend({}, {
      open: function () { console.log('Opening Popover: "'+that.el+'"'); },
      close: function () { console.log('Closing Popover: "'+that.el+'"'); }
    }, options);
    Popover.popovers.push(this);
  };

  // open
  Toggle.Popover.prototype.open = function () {

    if (!this.state) {
      this.options.open();
      this.state = true;
    };

    return this;
  };

  // close
  Toggle.Popover.prototype.close = function () {

    if (this.state) {
      this.options.close();
      this.state = false;
    };

    return this;
  };

  // toggle Popover
  Toggle.Popover.prototype.toggle = function () {
    return this.state ? this.close() : this.open();
  };

  Toggle.Popover.prototype.addToTrigger = function (trigger) {
    return trigger.popovers.push(this);
  };


  /**
   * Pools
   */
  Toggle.triggers = _([]);
  Toggle.popovers = _([]);

}(_));