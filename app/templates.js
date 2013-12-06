var glob = ('undefined' === typeof window) ? global : window,

Handlebars = glob.Handlebars || require('handlebars');

this["Ember"] = this["Ember"] || {};
this["Ember"]["TEMPLATES"] = this["Ember"]["TEMPLATES"] || {};

Handlebars.registerPartial("actionBar", Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "";


  buffer += "<!-- Action Bar -->\n<div class=\"action-bar\">\n\n  <form action=\"\" id=\"searchForm\" method=\"post\">\n    "
    + "\n    \n    <!-- search field -->\n    <div class=\"search-field\">\n      <i class=\"fa fa-search\"></i>\n      <input class=\"search\" name=\"search\" type=\"text\" placeholder=\"Search your phrases&hellip;\">\n    </div>\n  </form>\n\n  "
    + "\n\n</div>";
  return buffer;
  }));

Handlebars.registerPartial("infoBar", Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "";


  buffer += "<div class=\"info-bar\">\n  <button class=\"btn btn-info pull-right\" type=\"submit\">Done <span class=\"badge\">0</span></button>\n  "
    + "\n</div>";
  return buffer;
  }));

Handlebars.registerPartial("listingInfo", Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, self=this;

function program1(depth0,data) {
  
  
  return "<a class=\"clear\" href=\"#\"><i class=\"fa fa-times-circle\"></i></a>";
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += " tagged with ";
  stack1 = helpers.each.call(depth0, depth0.activeTags, {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<span class=\"tagContainer\"><span class=\"and\"> and </span>";
  stack1 = self.invokePartial(partials.tagSpan, 'tagSpan', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</span>";
  return buffer;
  }

  buffer += "<div class=\"listingInfo\">\n  ";
  stack1 = helpers['if'].call(depth0, depth0.activeTags, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n  Listing all phrases";
  stack1 = helpers['if'].call(depth0, depth0.activeTags, {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ".\n</div>";
  return buffer;
  }));

Handlebars.registerPartial("notificationItem", Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "<a href=\"#\" class=\"close\"><i class=\"fa fa-remove\"></i></a>";
  }

  buffer += "<li class=\"animated fadeInDown notification ";
  if (stack1 = helpers.type) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.type; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n  ";
  stack1 = helpers['if'].call(depth0, depth0.closeBtn, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  <i class=\"";
  if (stack1 = helpers.iconClass) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.iconClass; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"></i> ";
  if (stack1 = helpers.message) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.message; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\n</li>";
  return buffer;
  }));

Handlebars.registerPartial("notifications", Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      ";
  stack1 = self.invokePartial(partials.notificationItem, 'notificationItem', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    ";
  return buffer;
  }

  buffer += "<div class=\"notification-wrapper\">\n  <ul class=\"notifications\">\n    ";
  stack1 = helpers.each.call(depth0, depth0.notifications, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </ul>\n</div>";
  return buffer;
  }));

Handlebars.registerPartial("addPhraseForm", Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, self=this, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"popup-title\">\n    <strong>Add a new phrase&hellip;</strong>\n  ";
  stack1 = self.invokePartial(partials.bulkInsertSetting, 'bulkInsertSetting', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>\n<input class=\"id\" name=\"id\" type=\"hidden\" value=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n<div class=\"popup-section no-padding\">\n  <input class=\"title\" name=\"title\" placeholder=\"Title&hellip;\" type=\"text\" value=\"";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n</div>\n<div class=\"popup-section no-padding\">\n  <input class=\"tags\" name=\"tags\" placeholder=\"Tags&hellip;\" type=\"text\" value=\"";
  if (stack1 = helpers.tags) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.tags; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n</div>\n<div class=\"popup-section no-padding\">\n  <textarea name=\"phrase\" placeholder=\"Body&hellip;\">";
  if (stack1 = helpers.text) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.text; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</textarea>\n</div>\n<div>\n  <button class=\"btn btn-success pull-right btn-submit\" type=\"submit\"><i class=\"fa fa-ok\"></i> Save Phrase</button>\n</div>";
  return buffer;
  }));

Handlebars.registerPartial("phraseItem", Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<li class=\"";
  if (stack1 = helpers.active) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.active; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n  <label class=\"truncate\">\n    <div class=\"checkbox\">\n      <i class=\"fa fa-check\"></i>\n      <input class=\"hidden\" name=\"phrases[]\" type=\"checkbox\" value=\"";
  if (stack1 = helpers.text) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.text; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n    </div>\n\n    <strong class=\"title\">";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</strong> <span class=\"text\">";
  if (stack1 = helpers.text) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.text; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n  </label>\n</li>";
  return buffer;
  }));

Handlebars.registerPartial("phrases", Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, self=this, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  return "\n        <li class=\"empty\">Loading&hellip;</li>\n      ";
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        ";
  stack1 = helpers.each.call(depth0, depth0.phrases, {hash:{},inverse:self.program(6, program6, data),fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      ";
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n          ";
  stack1 = self.invokePartial(partials.phraseItem, 'phraseItem', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        ";
  return buffer;
  }

function program6(depth0,data) {
  
  
  return "\n          <li class=\"empty\">No Phrases :(</li>\n        ";
  }

  buffer += "<form action=\"\" id=\"phraseForm\" method=\"post\">\n  <div class=\"scroll\">\n    <ul class=\"";
  if (stack1 = helpers.bulkDeleteMode) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.bulkDeleteMode; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" id=\"phrases\">\n      ";
  stack1 = helpers['if'].call(depth0, depth0.loading, {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </ul>\n  </div>\n\n  ";
  stack1 = self.invokePartial(partials.infoBar, 'infoBar', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</form>";
  return buffer;
  }));

Handlebars.registerPartial("bulkDeleteSetting", Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<label class=\"bulkDelete setting\">\n  <input ";
  if (stack1 = helpers.checked) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.checked; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + " name=\"bulk-delete-mode\" type=\"checkbox\">\n  Bulk Delete Mode\n</label>";
  return buffer;
  }));

Handlebars.registerPartial("bulkInsertSetting", Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<label class=\"bulkInsert setting\">\n  <input ";
  if (stack1 = helpers.checked) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.checked; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + " name=\"bulk-insert-mode\" type=\"checkbox\" value=\"true\">\n  Bulk Insert Mode\n</label>";
  return buffer;
  }));

Handlebars.registerPartial("settingsForm", Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, self=this;


  buffer += "<div class=\"popup-title\">\n  <strong>Settings</strong>\n</div>\n<div class=\"popup-section\">\n  ";
  stack1 = self.invokePartial(partials.bulkInsertSetting, 'bulkInsertSetting', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>\n<div class=\"popup-section\">\n  ";
  stack1 = self.invokePartial(partials.bulkDeleteSetting, 'bulkDeleteSetting', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>\n<div class=\"popup-section\">\n  ";
  stack1 = self.invokePartial(partials.sortPhrasesBySetting, 'sortPhrasesBySetting', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>";
  return buffer;
  }));

Handlebars.registerPartial("sortPhrasesBySetting", Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<label class=\"sortPhrasesBy setting\">\n  <select id=\"sortPhrasesBy\" name=\"sort-phrases-by\">\n    <option ";
  if (stack1 = helpers.byBody) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.byBody; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + " value=\"text\">Body</option>\n    <option ";
  if (stack1 = helpers.byDate) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.byDate; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + " value=\"timestamp\">Date</option>\n    <option ";
  if (stack1 = helpers.byTitle) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.byTitle; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + " value=\"title\">Title</option>\n  </select>\n  Sort Phrases By\n</label>";
  return buffer;
  }));

Handlebars.registerPartial("tagLink", Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<a class=\"tag ";
  if (stack1 = helpers.activeClass) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.activeClass; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" href=\"#\">";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</a>";
  return buffer;
  }));

Handlebars.registerPartial("tagLinkWithCount", Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<a class=\"truncate ";
  if (stack1 = helpers.activeClass) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.activeClass; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" href=\"#\">\n  <span class=\"count\">";
  if (stack1 = helpers.phraseCount) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.phraseCount; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n  <i class=\"fa fa-tag\"></i> ";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\n</a>";
  return buffer;
  }));

Handlebars.registerPartial("tagNav", Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, self=this;

function program1(depth0,data) {
  
  
  return "\n    <li class=\"empty\">Loading&hellip;</li>\n  ";
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    ";
  stack1 = helpers.each.call(depth0, depth0.tags, {hash:{},inverse:self.program(6, program6, data),fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  ";
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      <li>\n        ";
  stack1 = self.invokePartial(partials.tagLinkWithCount, 'tagLinkWithCount', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      </li>\n    ";
  return buffer;
  }

function program6(depth0,data) {
  
  
  return "\n      <li class=\"empty\">No Tags :(</li>\n    ";
  }

  buffer += "<ul id=\"tags\">\n  ";
  stack1 = helpers['if'].call(depth0, depth0.loading, {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</ul>";
  return buffer;
  }));

Handlebars.registerPartial("tagSpan", Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<span class=\"tag ";
  if (stack1 = helpers.activeClass) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.activeClass; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" href=\"#\">";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>";
  return buffer;
  }));

this["Ember"]["TEMPLATES"]["layout"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, self=this;


  buffer += "<!DOCTYPE html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\">\n    <title>Lingo</title>\n\n    <!-- styling -->\n    <link href=\"//netdna.bootstrapcdn.com/font-awesome/4.0.2/css/font-awesome.css\" rel=\"stylesheet\">\n    <link href=\"/assets/app.css\" rel=\"stylesheet\" type=\"text/css\" />\n\n    <!-- HTML5 shim, for IE6-8 support of HTML5 elements. All other JS at the end of file. -->\n    <!--[if lt IE 9]>\n      <script src=\"assets/flat-ui/js/html5shiv.js\"></script>\n    <![endif]-->\n  </head>\n  <body>\n\n    \n    <div id=\"container\">\n      ";
  stack1 = self.invokePartial(partials.notifications, 'notifications', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      \n      <!-- Left Column -->\n      <div class=\"layout-column\" id=\"left\">\n        <ul class=\"menu\">\n          <li>\n            <a data-toggle=\"searchForm\" href=\"#\">\n              <i class=\"fa fa-search\"></i>\n            </a>\n            <form action=\"\" id=\"searchForm\" method=\"post\">\n              <input name=\"search_term\" type=\"text\">\n            </form>\n          </li>\n         "
    + "\n        </ul>\n\n        <ul class=\"bottom menu\">\n          <li>\n            <a href=\"#\">\n              <i class=\"fa fa-question\"></i>\n            </a>\n          </li>\n        </ul>\n\n<img src=\"/assets/lingo_sideways.png\" style=\"\n    position: absolute;\n    bottom: 78px;\n    right: 7px;\n    opacity: .1;\n\">\n      </div>\n\n      <!-- Right Column -->\n      <div class=\"layout-column\" id=\"right\">\n        "
    + "        ";
  stack1 = self.invokePartial(partials.listingInfo, 'listingInfo', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        ";
  stack1 = self.invokePartial(partials.phrases, 'phrases', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      </div>\n    </div>\n\n    <script src=\"/assets/app.js\"></script>\n\n    <!-- Google Analytics -->\n    <script type=\"text/javascript\">\n      // var _gaq = _gaq || [];\n      // _gaq.push(['_setAccount', 'UA-39622852-1']);\n      // _gaq.push(['_trackPageview']);\n\n      // (function() {\n      //   var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;\n      //   ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';\n      //   var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);\n      // })();\n    </script>\n\n  </body>\n</html>\n";
  return buffer;
  });

if (typeof exports === 'object' && exports) {module.exports = this["Ember"]["TEMPLATES"];}