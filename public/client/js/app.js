/*
Active phrase styling
*/


(function() {
  var query;

  $("#phrases").on("change", "input[name=\"phrases[]\"]", function(e) {
    var $parent, $this;
    $this = $(this);
    $parent = $(e.relatedTarget);
    if ($this.is(":checked")) {
      $this.closest("li").addClass("active").find("label").removeClass("truncate");
    } else {
      $this.closest("li").removeClass("active").find("label").addClass("truncate");
    }
    return $(".info-bar .badge").text($("input[name=\"phrases[]\"]").filter(":checked").length);
  });

  /*
  Calculate the url for the link to show all phrases
  */


  query = _(location.search.slice(1).split("&"));

  query = query.filter(function(q) {
    return q.split("=")[0] !== "activeTags";
  });

  $(".listingInfo .clear").attr("href", "?" + query.join("&"));

  /*
  Open Search Form
  */


  $(document).on("click", "[data-toggle]", function(e) {
    var $target, targetId;
    e.preventDefault();
    targetId = $(this).attr("data-toggle");
    $target = $("#" + targetId);
    if ($target.is(":hidden")) {
      return $target.show(0).animate({
        width: 724
      }).find("input").select();
    } else {
      return $target.animate({
        width: 0
      }, function() {
        return $target.hide(0).find("input").blur();
      });
    }
  });

}).call(this);

(function() {
  var $toggleTriggers;

  $toggleTriggers = $();

  $(document).on("click", function(e) {
    var $clickedEl;
    $clickedEl = $(e.target);
    if ($clickedEl.closest($toggleTriggers).length) {
      e.preventDefault();
    }
    $toggleTriggers.each(function() {
      var $popupEl, $toggleEl, clickedElIsPopupEl, clickedElIsToggleEl, popupIsHidden;
      $toggleEl = $(this);
      $popupEl = $("#" + $toggleEl.data("popup"));
      clickedElIsToggleEl = $clickedEl.closest($toggleEl).length;
      clickedElIsPopupEl = $clickedEl.closest($popupEl).length;
      popupIsHidden = $popupEl.is(":hidden");
      if (clickedElIsToggleEl && popupIsHidden) {
        return $popupEl.show();
      } else {
        if (!clickedElIsPopupEl) {
          return $popupEl.hide();
        }
      }
    });
    return console.log($toggleTriggers.toArray());
  });

  $("[data-toggle]").each(function() {
    return $toggleTriggers = this;
  });

}).call(this);

/*
Toggle
*/


(function() {
  var Toggle;

  Toggle = window.Toggle = {};

  /*
  Trigger
  */


  Toggle.Trigger = function(el, options) {
    this.popovers = _([]);
    this.el = el;
    this.options = _.extend({}, options);
    return Toggle.triggers.push(this);
  };

  Toggle.Trigger.prototype.invoke = function(method) {
    return this.popovers.invoke(method);
  };

  Toggle.Trigger.prototype.addPopover = function(popover) {
    return this.popovers.push(popover);
  };

  /*
  Popover
  */


  Toggle.Popover = function(el, options) {
    var that;
    that = this;
    this.el = el;
    this.state = false;
    this.options = _.extend({}, {
      open: function() {
        return console.log("Opening Popover: \"" + that.el + "\"");
      },
      close: function() {
        return console.log("Closing Popover: \"" + that.el + "\"");
      }
    }, options);
    return Popover.popovers.push(this);
  };

  Toggle.Popover.prototype.open = function() {
    if (!this.state) {
      this.options.open();
      this.state = true;
    }
    return this;
  };

  Toggle.Popover.prototype.close = function() {
    if (this.state) {
      this.options.close();
      this.state = false;
    }
    return this;
  };

  Toggle.Popover.prototype.toggle = function() {
    if (this.state) {
      return this.close();
    } else {
      return this.open();
    }
  };

  Toggle.Popover.prototype.addToTrigger = function(trigger) {
    return trigger.popovers.push(this);
  };

  /*
  Pools
  */


  Toggle.triggers = _([]);

  Toggle.popovers = _([]);

}).call(this);
