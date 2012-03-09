var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

define(['jQuery', 'Underscore', 'Backbone', "order!libs/timeline.js/timeline", "order!libs/timeline.js/timeline-gui"], function($, _, Backbone) {
  "use strict";  return ThreeNodes.AppTimeline = (function(_super) {

    __extends(AppTimeline, _super);

    function AppTimeline() {
      this.update = __bind(this.update, this);
      this.remove = __bind(this.remove, this);
      this.selectAnims = __bind(this.selectAnims, this);
      this.initialize = __bind(this.initialize, this);
      AppTimeline.__super__.constructor.apply(this, arguments);
    }

    AppTimeline.prototype.initialize = function(options) {
      var _this = this;
      localStorage["timeline.js.settings.canvasHeight"] = 46 + 120;
      this.timeline = new Timeline({
        displayOnlySelected: true,
        colorBackground: "#333",
        colorButtonBackground: "#222222",
        colorButtonStroke: "#777",
        colorScrollbar: "#373737",
        colorScrollbarThumb: "#555",
        colorTimelineLabel: "#999",
        colorTimelineTick: "#555",
        colorTimeScale: "#666",
        colorHeaderBorder: "#222",
        colorTimeTicker: "#f00",
        colorTrackBottomLine: "#555",
        colorPropertyLabel: "#999",
        onGuiSave: function() {
          return ThreeNodes.events.trigger("OnUIResize");
        },
        setPropertyValue: function(propertyAnim, t) {
          return propertyAnim.target[propertyAnim.propertyName].setValue(t);
        },
        applyPropertyValue: function(propertyAnim, t) {
          return propertyAnim.target[propertyAnim.propertyName].setValue(propertyAnim.startValue + (propertyAnim.endValue - propertyAnim.startValue) * t);
        },
        getPropertyValue: function(propertyAnim) {
          return propertyAnim.target[propertyAnim.propertyName].getValue();
        },
        onTrackRebuild: function() {
          return _this.trigger("trackRebuild");
        },
        onStop: function() {
          return _this.trigger("stopSound");
        },
        onPlay: function(time) {
          return _this.trigger("startSound", time);
        }
      });
      Timeline.globalInstance = this.timeline;
      this.timeline.loop(-1);
      return this.time = 0;
    };

    AppTimeline.prototype.selectAnims = function(nodes) {
      return this.timeline.selectAnims(nodes);
    };

    AppTimeline.prototype.remove = function() {
      this.undelegateEvents();
      this.timeline.destroy();
      this.timeline = null;
      this.time = null;
      return AppTimeline.__super__.remove.apply(this, arguments);
    };

    AppTimeline.prototype.update = function() {
      var dt, n;
      n = Date.now();
      if (this.timeline) {
        dt = n - this.time;
        this.timeline.update(dt / 1000);
      }
      return this.time = n;
    };

    return AppTimeline;

  })(Backbone.View);
});
