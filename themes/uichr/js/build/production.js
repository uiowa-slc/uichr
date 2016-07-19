/**
 * @plugin
 * @name Core
 * @description Formstone Library core. Required for all plugins.
 */

var Formstone = this.Formstone = (function ($, window, document, undefined) {

	/* global ga */

	"use strict";

	// Namespace

	var Core = function() {
			this.Version = '@version';
			this.Plugins = {};

			this.DontConflict   = false;
			this.Conflicts      = {
				fn: {}
			};
			this.ResizeHandlers = [];

			// Globals

			this.window               = window;
			this.$window              = $(window);
			this.document             = document;
			this.$document            = $(document);
			this.$body                = null;

			this.windowWidth          = 0;
			this.windowHeight         = 0;
			this.userAgent            = window.navigator.userAgent || window.navigator.vendor || window.opera;
			this.isFirefox            = /Firefox/i.test(this.userAgent);
			this.isChrome             = /Chrome/i.test(this.userAgent);
			this.isSafari             = /Safari/i.test(this.userAgent) && !this.isChrome;
			this.isMobile             = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test( this.userAgent );
			this.isFirefoxMobile      = (this.isFirefox && this.isMobile);
			this.transform            = null;
			this.transition           = null;

			this.support = {
				file          : !!(window.File && window.FileList && window.FileReader),
				history       : !!(window.history && window.history.pushState && window.history.replaceState),
				matchMedia    : !!(window.matchMedia || window.msMatchMedia),
				raf           : !!(window.requestAnimationFrame && window.cancelAnimationFrame),
				touch         : !!(("ontouchstart" in window) || window.DocumentTouch && document instanceof window.DocumentTouch),
				transition    : false,
				transform     : false
			};
		},

		Functions = {

			/**
			 * @method private
			 * @name killEvent
			 * @description Stops event action and bubble.
			 * @param e [object] "Event data"
			 */

			killEvent: function(e, immediate) {
				try {
					e.preventDefault();
					e.stopPropagation();

					if (immediate) {
						e.stopImmediatePropagation();
					}
				} catch(error) {
					//
				}
			},

			/**
			 * @method private
			 * @name startTimer
			 * @description Starts an internal timer.
			 * @param timer [int] "Timer ID"
			 * @param time [int] "Time until execution"
			 * @param callback [function] "Function to execute"
			 * @return [int] "Timer ID"
			 */

			startTimer: function(timer, time, callback, interval) {
				Functions.clearTimer(timer);

				return (interval) ? setInterval(callback, time) : setTimeout(callback, time);
			},

			/**
			 * @method private
			 * @name clearTimer
			 * @description Clears an internal timer.
			 * @param timer [int] "Timer ID"
			 */

			clearTimer: function(timer, interval) {
				if (timer) {
					if (interval) {
						clearInterval(timer);
					} else {
						clearTimeout(timer);
					}

					timer = null;
				}
			},

			/**
			 * @method private
			 * @name sortAsc
			 * @description Sorts an array (ascending).
			 * @param a [mixed] "First value"
			 * @param b [mixed] "Second value"
			 * @return Difference between second and first values
			 */

			sortAsc: function(a, b) {
				return (parseInt(b) - parseInt(a));
			},

			/**
			 * @method private
			 * @name sortDesc
			 * @description Sorts an array (descending).
			 * @param a [mixed] "First value"
			 * @param b [mixed] "Second value"
			 * @return Difference between second and first values
			 */

			sortDesc: function(a, b) {
				return (parseInt(b) - parseInt(a));
			}
		},

		Formstone = new Core(),

		// Deferred ready

		$Ready = $.Deferred(),

		// Classes

		Classes = {
			base                 : "{ns}",
			element              : "{ns}-element"
		},

		// Events

		Events = {
			namespace            : ".{ns}",
			blur                 : "blur.{ns}",
			change               : "change.{ns}",
			click                : "click.{ns}",
			dblClick             : "dblclick.{ns}",
			drag                 : "drag.{ns}",
			dragEnd              : "dragend.{ns}",
			dragEnter            : "dragenter.{ns}",
			dragLeave            : "dragleave.{ns}",
			dragOver             : "dragover.{ns}",
			dragStart            : "dragstart.{ns}",
			drop                 : "drop.{ns}",
			error                : "error.{ns}",
			focus                : "focus.{ns}",
			focusIn              : "focusin.{ns}",
			focusOut             : "focusout.{ns}",
			input                : "input.{ns}",
			keyDown              : "keydown.{ns}",
			keyPress             : "keypress.{ns}",
			keyUp                : "keyup.{ns}",
			load                 : "load.{ns}",
			mouseDown            : "mousedown.{ns}",
			mouseEnter           : "mouseenter.{ns}",
			mouseLeave           : "mouseleave.{ns}",
			mouseMove            : "mousemove.{ns}",
			mouseOut             : "mouseout.{ns}",
			mouseOver            : "mouseover.{ns}",
			mouseUp              : "mouseup.{ns}",
			resize               : "resize.{ns}",
			scroll               : "scroll.{ns}",
			select               : "select.{ns}",
			touchCancel          : "touchcancel.{ns}",
			touchEnd             : "touchend.{ns}",
			touchLeave           : "touchleave.{ns}",
			touchMove            : "touchmove.{ns}",
			touchStart           : "touchstart.{ns}"
		};

	/**
	 * @method
	 * @name NoConflict
	 * @description Resolves plugin namespace conflicts
	 * @example Formstone.NoConflict();
	 */

	Core.prototype.NoConflict = function() {
		Formstone.DontConflict = true;

		for (var i in Formstone.Plugins) {
			if (Formstone.Plugins.hasOwnProperty(i)) {
				$[i]    = Formstone.Conflicts[i];
				$.fn[i] = Formstone.Conflicts.fn[i];
			}
		}
	};

	/**
	 * @method
	 * @name Plugin
	 * @description Builds a plugin and registers it with jQuery.
	 * @param namespace [string] "Plugin namespace"
	 * @param settings [object] "Plugin settings"
	 * @return [object] "Plugin properties. Includes `defaults`, `classes`, `events`, `functions`, `methods` and `utilities` keys"
	 * @example Formstone.Plugin("namespace", { ... });
	 */

	Core.prototype.Plugin = function(namespace, settings) {
		Formstone.Plugins[namespace] = (function(namespace, settings) {

			var namespaceDash  = "fs-" + namespace,
				namespaceDot   = "fs." + namespace,
				namespaceClean = "fs" + namespace.replace(/(^|\s)([a-z])/g, function(m, p1, p2) { return p1 + p2.toUpperCase(); });

			/**
			 * @method private
			 * @name initialize
			 * @description Creates plugin instance by adding base classname, creating data and scoping a _construct call.
			 * @param options [object] <{}> "Instance options"
			 */

			function initialize(options) {
				// Extend Defaults

				var hasOptions = $.type(options) === "object";

				options = $.extend(true, {}, settings.defaults || {}, (hasOptions ? options : {}));

				// Maintain Chain

				var $targets = this;

				for (var i = 0, count = $targets.length; i < count; i++) {
					var $element = $targets.eq(i);

					// Gaurd Against Exiting Instances

					if (!getData($element)) {

						// Extend w/ Local Options

						var guid    = "__" + settings.guid++,
							rawGuid = settings.classes.raw.base + guid,
							locals  = $element.data(namespace + "-options"),
							data    = $.extend(true, {
								$el     : $element,
								guid    : guid,
								rawGuid : rawGuid,
								dotGuid : "." + rawGuid
							}, options, ($.type(locals) === "object" ? locals : {}) );

						// Cache Instance

						$element.addClass(settings.classes.raw.element)
						        .data(namespaceClean, data);

						// Constructor

						settings.methods._construct.apply($element, [ data ].concat(Array.prototype.slice.call(arguments, (hasOptions ? 1 : 0) )));
					}

				}

				return $targets;
			}

			/**
			 * @method private
			 * @name destroy
			 * @description Removes plugin instance by scoping a _destruct call, and removing the base classname and data.
			 * @param data [object] <{}> "Instance data"
			 */

			/**
			 * @method widget
			 * @name destroy
			 * @description Removes plugin instance.
			 * @example $(".target").{ns}("destroy");
			 */

			function destroy(data) {
				settings.functions.iterate.apply(this, [ settings.methods._destruct ].concat(Array.prototype.slice.call(arguments, 1)));

				this.removeClass(settings.classes.raw.element)
					.removeData(namespaceClean);
			}

			/**
			 * @method private
			 * @name getData
			 * @description Creates class selector from text.
			 * @param $element [jQuery] "Target jQuery object"
			 * @return [object] "Instance data"
			 */

			function getData($element) {
				return $element.data(namespaceClean);
			}

			/**
			 * @method private
			 * @name delegateWidget
			 * @description Delegates public methods.
			 * @param method [string] "Method to execute"
			 * @return [jQuery] "jQuery object"
			 */

			function delegateWidget(method) {

				// If jQuery object

				if (this instanceof $) {

					var _method = settings.methods[method];

					// Public method OR false

					if ($.type(method) === "object" || !method) {

						// Initialize

						return initialize.apply(this, arguments);
					} else if (_method && method.indexOf("_") !== 0) {

						// Wrap Public Methods

						return settings.functions.iterate.apply(this, [ _method ].concat(Array.prototype.slice.call(arguments, 1)));
					}

					return this;
				}
			}

			/**
			 * @method private
			 * @name delegateUtility
			 * @description Delegates utility methods.
			 * @param method [string] "Method to execute"
			 */

			function delegateUtility(method) {

				// public utility OR utility init OR false

				var _method = settings.utilities[method] || settings.utilities._initialize || false;

				if (_method) {

					// Wrap Utility Methods

					return _method.apply(window, Array.prototype.slice.call(arguments, ($.type(method) === "object" ? 0 : 1) ));
				}
			}

			/**
			 * @method utility
			 * @name defaults
			 * @description Extends plugin default settings; effects instances created hereafter.
			 * @param options [object] <{}> "New plugin defaults"
			 * @example $.{ns}("defaults", { ... });
			 */

			function defaults(options) {
				settings.defaults = $.extend(true, settings.defaults, options || {});
			}

			/**
			 * @method private
			 * @name iterate
			 * @description Loops scoped function calls over jQuery object with instance data as first parameter.
			 * @param func [function] "Function to execute"
			 * @return [jQuery] "jQuery object"
			 */

			function iterate(fn) {
				var $targets = this;

				for (var i = 0, count = $targets.length; i < count; i++) {
					var $element = $targets.eq(i),
						data = getData($element) || {};

					if ($.type(data.$el) !== "undefined") {
						fn.apply($element, [ data ].concat(Array.prototype.slice.call(arguments, 1)));
					}
				}

				return $targets;
			}

			// Locals

			settings.initialized = false;
			settings.priority    = settings.priority || 10;

			// Namespace Classes & Events

			settings.classes   = namespaceProperties("classes", namespaceDash, Classes, settings.classes);
			settings.events    = namespaceProperties("events",  namespace,     Events,  settings.events);

			// Extend Functions

			settings.functions = $.extend({
				getData    : getData,
				iterate    : iterate
			}, Functions, settings.functions);

			// Extend Methods

			settings.methods = $.extend(true, {

				// Private Methods

				_setup         : $.noop,    // Document ready
				_construct     : $.noop,    // Constructor
				_destruct      : $.noop,    // Destructor
				_resize        : false,    // Window resize

				// Public Methods

				destroy        : destroy

			}, settings.methods);

			// Extend Utilities

			settings.utilities = $.extend(true, {

				// Private Utilities

				_initialize    : false,    // First Run
				_delegate      : false,    // Custom Delegation

				// Public Utilities

				defaults       : defaults

			}, settings.utilities);

			// Register Plugin

			// Widget

			if (settings.widget) {

				// Store conflicting namesapaces
				Formstone.Conflicts.fn[namespace] = $.fn[namespace];

				// Widget Delegation: $(".target").fsPlugin("method", ...);
				$.fn[namespaceClean] = delegateWidget;

				if (!Formstone.DontConflict) {

					// $(".target").plugin("method", ...);
					$.fn[namespace] = $.fn[namespaceClean];
				}
			}

			// Utility

				Formstone.Conflicts[namespace] = $[namespace];

				// Utility Delegation: $.fsPlugin("method", ... );
				$[namespaceClean] = settings.utilities._delegate || delegateUtility;

				if (!Formstone.DontConflict) {

					// $.plugin("method", ... );
					$[namespace] = $[namespaceClean];
				}

			// Run Setup

			settings.namespace      = namespace;
			settings.namespaceClean = namespaceClean;

			settings.guid = 0;

			// Resize handler

			if (settings.methods._resize) {
				Formstone.ResizeHandlers.push({
					namespace: namespace,
					priority: settings.priority,
					callback: settings.methods._resize
				});

				// Sort handlers on push
				Formstone.ResizeHandlers.sort(sortPriority);
			}

			return settings;
		})(namespace, settings);

		// Setup, catches lazy-loaded components, ensures order

		$Ready.then(function() {
			setupPlugin(namespace);
		});

		return Formstone.Plugins[namespace];
	};

	// Setup Plugins

	function setupPlugin(namespace) {
		if (!Formstone.Plugins[namespace].initialized) {
			Formstone.Plugins[namespace].methods._setup.call(document);
			Formstone.Plugins[namespace].initialized = true;
		}
	}

	// Namespace Properties

	function namespaceProperties(type, namespace, globalProps, customProps) {
		var _props = {
				raw: {}
			},
			i;

		customProps = customProps || {};

		for (i in customProps) {
			if (customProps.hasOwnProperty(i)) {
				if (type === "classes") {

					// Custom classes
					_props.raw[ customProps[i] ] = namespace + "-" + customProps[i];
					_props[ customProps[i] ]     = "." + namespace + "-" + customProps[i];
				} else {
					// Custom events
					_props.raw[ i ] = customProps[i];
					_props[ i ]     = customProps[i] + "." + namespace;
				}
			}
		}

		for (i in globalProps) {
			if (globalProps.hasOwnProperty(i)) {
				if (type === "classes") {

					// Global classes
					_props.raw[ i ] = globalProps[i].replace(/{ns}/g, namespace);
					_props[ i ]     = globalProps[i].replace(/{ns}/g, "." + namespace);
				} else {
					// Global events
					_props.raw[ i ] = globalProps[i].replace(/.{ns}/g, "");
					_props[ i ]     = globalProps[i].replace(/{ns}/g, namespace);
				}
			}
		}

		return _props;
	}

	// Set Transition Information

	function setTransitionInformation() {
		var transitionEvents = {
				"transition"          : "transitionend",
				"MozTransition"       : "transitionend",
				"OTransition"         : "otransitionend",
				"WebkitTransition"    : "webkitTransitionEnd"
			},
			transitionProperties = [
				"transition",
				"-webkit-transition"
			],
			transformProperties = {
				'transform'          : 'transform',
				'MozTransform'       : '-moz-transform',
				'OTransform'         : '-o-transform',
				'msTransform'        : '-ms-transform',
				'webkitTransform'    : '-webkit-transform'
			},
			transitionEvent       = "transitionend",
			transitionProperty    = "",
			transformProperty     = "",
			test                  = document.createElement("div"),
			i;


		for (i in transitionEvents) {
			if (transitionEvents.hasOwnProperty(i) && i in test.style) {
				transitionEvent = transitionEvents[i];
				Formstone.support.transition = true;
				break;
			}
		}

		Events.transitionEnd = transitionEvent + ".{ns}";

		for (i in transitionProperties) {
			if (transitionProperties.hasOwnProperty(i) && transitionProperties[i] in test.style) {
				transitionProperty = transitionProperties[i];
				break;
			}
		}

		Formstone.transition = transitionProperty;

		for (i in transformProperties) {
			if (transformProperties.hasOwnProperty(i) && transformProperties[i] in test.style) {
				Formstone.support.transform = true;
				transformProperty = transformProperties[i];
				break;
			}
		}

		Formstone.transform = transformProperty;
	}

	// Window resize

	var ResizeTimer = null,
		Debounce = 20;

	function onWindowResize() {
		Formstone.windowWidth  = Formstone.$window.width();
		Formstone.windowHeight = Formstone.$window.height();

		ResizeTimer = Functions.startTimer(ResizeTimer, Debounce, handleWindowResize);
	}

	function handleWindowResize() {
		for (var i in Formstone.ResizeHandlers) {
			if (Formstone.ResizeHandlers.hasOwnProperty(i)) {
				Formstone.ResizeHandlers[i].callback.call(window, Formstone.windowWidth, Formstone.windowHeight);
			}
		}
	}

	Formstone.$window.on("resize.fs", onWindowResize);
	onWindowResize();

	// Sort Priority

	function sortPriority(a, b) {
		return (parseInt(a.priority) - parseInt(b.priority));
	}

	// Document Ready

	$(function() {
		Formstone.$body = $("body");

		$Ready.resolve();
	});

	// Custom Events

	Events.clickTouchStart = Events.click + " " + Events.touchStart;

	// Transitions

	setTransitionInformation();

	return Formstone;

})(jQuery, this, document);
;(function ($, Formstone, undefined) {

	"use strict";

	/**
	 * @method private
	 * @name construct
	 * @description Builds instance.
	 * @param data [object] "Instance Data"
	 * @param callback [object] "Function to call"
	 */

	function construct(data, callback) {
		if (callback) {
			// Target child element, for event delegation

			data.$target     = this.find(data.target);
			data.$check      = data.target ? data.$target : this;
			data.callback    = callback;
			data.styles      = getStyles(data.$check);
			data.timer       = null;

			var duration = data.$check.css( Formstone.transition + "-duration" ),
				durationValue = parseFloat(duration);

			if (Formstone.support.transition && duration && durationValue) {
				// If transitions supported and active

				this.on(Events.transitionEnd, data, onTranistionEnd);
			} else {
				data.timer = Functions.startTimer(data.timer, 50, function() {
					checkStyles(data);
				}, true);
			}
		}
	}

	/**
	 * @method private
	 * @name destruct
	 * @description Tears down instance.
	 * @param data [object] "Instance data"
	 */

	function destruct(data) {
		Functions.clearTimer(data.timer, true);

		this.off(Events.namespace);
	}

	/**
	 * @method private
	 * @name onTransitionEnd
	 * @description Handles transition end events.
	 * @param e [object] "Event data"
	 */

	function onTranistionEnd(e) {
		e.stopPropagation();
		e.preventDefault();

		var data           = e.data,
			oe             = e.originalEvent,
			$target        = data.target ? data.$target : data.$el;

		// Check property and target
		if ( (!data.property || oe.propertyName === data.property) && $(oe.target).is($target) ) {
			resolve(data);
		}
	}

	/**
	 * @method private
	 * @name resolve
	 * @description Resolves transition end events.
	 * @param e [object] "Event data"
	 */
	/**
	 * @method
	 * @name resolve
	 * @description Resolves current transition end events.
	 * @example $(".target").transition("resolve");
	 */

	function resolve(data) {
		if (!data.always) {
			// Unbind events, clear timers, similiar to .one()

			data.$el[Plugin.namespaceClean]("destroy"); // clean up old data?
		}

		// fire callback

		data.callback.apply(data.$el);
	}

	/**
	 * @method private
	 * @name checkStyles
	 * @description Compares current CSS to previous styles.
	 * @param data [object] "Instance data"
	 */

	function checkStyles(data) {
		var styles = getStyles(data.$check);

		if (!isEqual(data.styles, styles)) {
			resolve(data);
		}

		data.styles = styles;
	}

	/**
	 * @method private
	 * @name getStyles
	 * @description Returns element's styles.
	 * @param el [DOM] "Element to check"
	 */

	function getStyles(el) {
		var computed,
			styles = {},
			prop,
			val;

		if (el instanceof $) {
			el = el[0];
		}

		if (Window.getComputedStyle) {
			// FireFox, Chrome, Safari

			computed = Window.getComputedStyle(el, null);

			for (var i = 0, count = computed.length; i < count; i++) {
				prop = computed[i];
				val = computed.getPropertyValue(prop);

				styles[prop] = val;
			}
		} else if (el.currentStyle) {
			// IE, Opera

			computed = el.currentStyle;

			for (prop in computed) {
				if (computed[prop]) { // ie8...
					styles[prop] = computed[prop];
				}
			}
		}

		return styles;
	}

	/**
	 * @method private
	 * @name isEqual
	 * @description Compares two obejcts.
	 * @param a [object] "Object to compare"
	 * @param b [object] "Object to compare"
	 */

	function isEqual(a, b) {
		if ($.type(a) !== $.type(b)) {
			return false;
		}

		for (var i in a) {
			if ( !(a.hasOwnProperty(i) && b.hasOwnProperty(i) && a[i] === b[i]) ) {
				return false;
			}
		}

		return true;
	}

	/**
	 * @plugin
	 * @name Transition
	 * @description A jQuery plugin for CSS transition events.
	 * @type widget
	 * @dependency core.js
	 */

	var Plugin = Formstone.Plugin("transition", {
			widget: true,

			/**
			 * @options
			 * @param always [boolean] <False> "Flag to always react to transition end (.on vs .one)"
			 * @param property [string] <null> "Property to react to"
			 * @param target [string] <null> "Target child selector"
			 */

			defaults: {
				always      : false,
				property    : null,
				target      : null
			},

			methods : {
				_construct    : construct,
				_destruct     : destruct,
				resolve       : resolve
			}
		}),

		// Localize References

		Events       = Plugin.events,
		Functions    = Plugin.functions,

		Window       = Formstone.window;

})(jQuery, Formstone);
/* 
 * Shifter v3.1.2 - 2014-10-28 
 * A jQuery plugin for simple slide-out mobile navigation. Part of the Formstone Library. 
 * http://formstone.it/shifter/ 
 * 
 * Copyright 2014 Ben Plum; MIT Licensed 
 */

;(function ($, window) {
	"use strict";

	var namespace = "shifter",
		initialized = false,
		hasTouched = false,
		data = {},
		classes = {
			handle: "shifter-handle",
			page: "shifter-page",
			header: "shifter-header",
			navigation: "shifter-navigation",
			isEnabled: "shifter-enabled",
			isOpen: "shifter-open"
		},
		events = {
			click: "touchstart." + namespace + " click." + namespace
		};

	/**
	 * @options
	 * @param maxWidth [string] <'980px'> "Width at which to auto-disable plugin"
	 */
	var options = {
		maxWidth: "980px"
	};

	var pub = {

		/**
		 * @method
		 * @name close
		 * @description Closes navigation if open
		 * @example $.shifter("close");
		 */
		close: function() {
			if (initialized) {
				data.$html.removeClass(classes.isOpen);
				data.$body.removeClass(classes.isOpen);
				data.$shifts.off( classify(namespace) );
				// Close mobile keyboard if open
				data.$nav.find("input").trigger("blur");
			}
		},

		/**
		 * @method
		 * @name enable
		 * @description Enables navigation system
		 * @example $.shifter("enable");
		 */
		enable: function() {
			if (initialized) {
				data.$body.addClass(classes.isEnabled);
			}
		},

		/**
		 * @method
		 * @name destroy
		 * @description Removes instance of plugin
		 * @example $.shifter("destroy");
		 */
		destroy: function() {
			if (initialized) {
				data.$html.removeClass(classes.isOpen);
				data.$body.removeClass( [classes.isEnabled, classes.isOpen].join(" ") )
					      .off(events.click);

				// Navtive MQ Support
				if (window.matchMedia !== undefined) {
					data.mediaQuery.removeListener(onRespond);
				}

				data = {};
				initialized = false;
			}
		},

		/**
		 * @method
		 * @name disable
		 * @description Disables navigation system
		 * @example $.shifter("disable");
		 */
		disable: function() {
			if (initialized) {
				pub.close();
				data.$body.removeClass(classes.isEnabled);
			}
		},

		/**
		 * @method
		 * @name open
		 * @description Opens navigation if closed
		 * @example $.shifter("open");
		 */
		open: function() {
			if (initialized) {
				data.$html.addClass(classes.isOpen);
				data.$body.addClass(classes.isOpen);
				data.$shifts.one(events.click, onClick);
			}
		}
	};

	/**
	 * @method private
	 * @name init
	 * @description Initializes plugin
	 * @param opts [object] "Initialization options"
	 */
	function init(opts) {
		if (!initialized) {
			data = $.extend({}, options, opts || {});

			data.$html = $("html");
			data.$body = $("body");
			data.$shifts = $( [classify(classes.page), classify(classes.header)].join(", ") );
			data.$nav = $( classify(classes.navigation) );

			if (data.$shifts.length > 0 && data.$nav.length > 0) {
				initialized = true;

				data.$body.on(events.click, classify(classes.handle), onClick);

				// Navtive MQ Support
				if (window.matchMedia !== undefined) {
					data.mediaQuery = window.matchMedia("(max-width:" + (data.maxWidth === Infinity ? "100000px" : data.maxWidth) + ")");
					data.mediaQuery.addListener(onRespond);
					onRespond();
				}
			}
		}
	}

	/**
	 * @method private
	 * @name onRespond
	 * @description Handles media query match change
	 */
	function onRespond() {
		if (data.mediaQuery.matches) {
			pub.enable();
		} else {
			pub.disable();
		}
	}

	/**
	 * @method private
	 * @name onClick
	 * @description Determines proper click / touch action
	 * @param e [object] "Event data"
	 */
	function onClick(e) {
		e.preventDefault();
		e.stopPropagation();

		if (!hasTouched) {
			if (data.$body.hasClass(classes.isOpen)) {
				pub.close();
			} else {
				pub.open();
			}
		}

		if (e.type === "touchstart") {
			hasTouched = true;

			setTimeout(resetTouch, 500);
		}
	}

	/**
	 * @method private
	 * @name resetTouch
	 * @description Resets touch state
	 */
	function resetTouch() {
		hasTouched = false;
	}

	/**
	 * @method private
	 * @name classify
	 * @description Create class selector from text
	 * @param text [string] "Text to convert"
	 * @return [string] "New class name"
	 */
	function classify(text) {
		return "." + text;
	}

	$[namespace] = function(method) {
		if (pub[method]) {
			return pub[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return init.apply(this, arguments);
		}
		return this;
	};
})(jQuery, window);
/*! formstone v0.6.9 [mediaquery.js] 2015-06-17 | MIT License | formstone.it */

!function(a,b){"use strict";function c(b){b=b||{};for(var c in t)t.hasOwnProperty(c)&&(l[c]=b[c]?a.merge(b[c],l[c]):l[c]);l=a.extend(l,b),l.minWidth.sort(p.sortDesc),l.maxWidth.sort(p.sortAsc),l.minHeight.sort(p.sortDesc),l.maxHeight.sort(p.sortAsc);for(var d in t)if(t.hasOwnProperty(d)){s[d]={};for(var e in l[d])if(l[d].hasOwnProperty(e)){var f=window.matchMedia("("+t[d]+": "+(l[d][e]===1/0?1e5:l[d][e])+l.unit+")");f.addListener(g),s[d][l[d][e]]=f}}g()}function d(a,b,c){var d=o.matchMedia(b),e=i(d.media);r[e]||(r[e]={mq:d,active:!0,enter:{},leave:{}},r[e].mq.addListener(h));for(var f in c)c.hasOwnProperty(f)&&r[e].hasOwnProperty(f)&&(r[e][f][a]=c[f]);h(r[e].mq)}function e(a,b){if(a)if(b){var c=i(b);r[c]&&(r[c].enter[a]&&delete r[c].enter[a],r[c].leave[a]&&delete r[c].leave[a])}else for(var d in r)r.hasOwnProperty(d)&&(r[d].enter[a]&&delete r[d].enter[a],r[d].leave[a]&&delete r[d].leave[a])}function f(){q={unit:l.unit};for(var a in t)if(t.hasOwnProperty(a))for(var b in s[a])if(s[a].hasOwnProperty(b)&&s[a][b].matches){var c="Infinity"===b?1/0:parseInt(b,10);a.indexOf("max")>-1?(!q[a]||c<q[a])&&(q[a]=c):(!q[a]||c>q[a])&&(q[a]=c)}}function g(){f(),n.trigger(m.mqChange,[q])}function h(a){var b=i(a.media),c=r[b],d=a.matches?m.enter:m.leave;if(c&&c.active||!c.active&&a.matches){for(var e in c[d])c[d].hasOwnProperty(e)&&c[d][e].apply(c.mq);c.active=!0}}function i(a){return a.replace(/[^a-z0-9\s]/gi,"").replace(/[_\s]/g,"").replace(/^\s+|\s+$/g,"")}function j(){return q}var k=b.Plugin("mediaquery",{utilities:{_initialize:c,state:j,bind:d,unbind:e},events:{mqChange:"mqchange"}}),l={minWidth:[0],maxWidth:[1/0],minHeight:[0],maxHeight:[1/0],unit:"px"},m=a.extend(k.events,{enter:"enter",leave:"leave"}),n=b.$window,o=n[0],p=k.functions,q=null,r=[],s={},t={minWidth:"min-width",maxWidth:"max-width",minHeight:"min-height",maxHeight:"max-height"}}(jQuery,Formstone);
;(function ($, Formstone, undefined) {

	"use strict";

	/**
	 * @method private
	 * @name setup
	 * @description Setup plugin.
	 */

	function setup() {
		$Locks = $("html, body");
	}

	/**
	 * @method private
	 * @name construct
	 * @description Builds instance.
	 * @param data [object] "Instance data"
	 */

	function construct(data) {
		// guid
		data.handleGuid   = RawClasses.handle + data.guid;

		data.isToggle     = (data.type === "toggle");
		data.open         = false;

		if (data.isToggle) {
			data.gravity  = "";
		}

		var baseClass     = RawClasses.base,
			typeClass     = [baseClass, data.type].join("-"),
			gravityClass  = data.gravity ? [typeClass, data.gravity].join("-") : "",
			classGroup    = [data.rawGuid, data.customClass].join(" ");

		data.handle       = this.data(Namespace + "-handle");
		data.content      = this.data(Namespace + "-content");

		data.handleClasses = [
			RawClasses.handle,
			RawClasses.handle.replace(baseClass, typeClass),
			gravityClass ? RawClasses.handle.replace(baseClass, gravityClass) : "",
			data.handleGuid,
			classGroup
		].join(" ");

		data.navClasses = [
			RawClasses.nav.replace(baseClass, typeClass),
			gravityClass ? RawClasses.nav.replace(baseClass, gravityClass) : "",
			classGroup
		].join(" ");

		data.contentClasses = [
			RawClasses.content.replace(baseClass, typeClass),
			gravityClass ? RawClasses.content.replace(baseClass, gravityClass) : "",
			classGroup
		].join(" ");

		// DOM

		data.$nav        = this.addClass(data.navClasses);
		data.$handle     = $(data.handle).addClass(data.handleClasses);
		data.$content    = $(data.content).addClass(data.contentClasses);
		data.$animate    = $().add(data.$nav).add(data.$content);

		cacheLabel(data);

		// toggle

		data.$handle.attr("data-swap-target", data.dotGuid)
					.attr("data-swap-linked", "." + data.handleGuid)
					.attr("data-swap-group", RawClasses.base)
					.on("activate.swap" + data.dotGuid, data, onOpen)
					.on("deactivate.swap" + data.dotGuid, data, onClose)
					.on("enable.swap" + data.dotGuid, data, onEnable)
					.on("disable.swap" + data.dotGuid, data, onDisable)
					.fsSwap({
						maxWidth: data.maxWidth,
						classes: {
							target  : data.dotGuid,
							enabled : Classes.enabled,
							active  : Classes.open,
							raw: {
								target  : data.rawGuid,
								enabled : RawClasses.enabled,
								active  : RawClasses.open
							}
						}
					});
	}

	/**
	 * @method private
	 * @name destruct
	 * @description Tears down instance.
	 * @param data [object] "Instance data"
	 */

	function destruct(data) {
		data.$content.removeClass(data.contentClasses)
					 .off(Events.namespace);

		data.$handle.removeAttr("data-swap-target")
					.removeData("swap-target")
					.removeAttr("data-swap-linked")
					.removeData("swap-linked")
					.removeClass(data.handleClasses)
					.off(data.dotGuid)
					.text(data.originalLabel)
					.fsSwap("destroy");

		restoreLabel(data);

		clearLocks(data);

		this.removeClass(data.navClasses)
			.off(Events.namespace);
	}

	/**
	 * @method
	 * @name open
	 * @description Opens instance.
	 * @example $(".target").navigation("open");
	 */

	function open(data) {
		data.$handle.fsSwap("activate");
	}

	/**
	 * @method
	 * @name close
	 * @description Closes instance.
	 * @example $(".target").navigation("close");
	 */

	function close(data) {
		data.$handle.fsSwap("deactivate");
	}

	/**
	 * @method
	 * @name enable
	 * @description Enables instance.
	 * @example $(".target").navigation("enable");
	 */

	function enable(data) {
		data.$handle.fsSwap("enable");
	}

	/**
	 * @method
	 * @name disable
	 * @description Disables instance.
	 * @example $(".target").navigation("disable");
	 */

	function disable(data) {
		data.$handle.fsSwap("disable");
	}

	/**
	 * @method private
	 * @name onOpen
	 * @description Handles nav open event.
	 * @param e [object] "Event data"
	 */

	function onOpen(e) {
		if (!e.originalEvent) { // thanks IE :/
			var data = e.data;

			if (!data.open) {
				data.$el.trigger(Events.open);

				data.$content.addClass(RawClasses.open)
							 .one(Events.clickTouchStart, function() {
								close(data);
							 });

				if (data.label) {
					data.$handle.text(data.labels.open);
				}

				addLocks(data);

				data.open = true;
			}
		}
	}

	/**
	 * @method private
	 * @name onClose
	 * @description Handles nav close event.
	 * @param e [object] "Event data"
	 */

	function onClose(e) {
		if (!e.originalEvent) { // thanks IE :/
			var data = e.data;

			if (data.open) {
				data.$el.trigger(Events.close);

				data.$content.removeClass(RawClasses.open)
							 .off(Events.namespace);

				if (data.label) {
					data.$handle.text(data.labels.closed);
				}

				clearLocks(data);

				data.open = false;
			}
		}
	}

	/**
	 * @method private
	 * @name onEnable
	 * @description Handles nav enable event.
	 * @param e [object] "Event data"
	 */

	function onEnable(e) {
		var data = e.data;

		data.$content.addClass(RawClasses.enabled);

		setTimeout(function() {
			data.$animate.addClass(RawClasses.animated);
		}, 0);

		if (data.label) {
			data.$handle.text(data.labels.closed);
		}
	}

	/**
	 * @method private
	 * @name onDisable
	 * @description Handles nav disable event.
	 * @param e [object] "Event data"
	 */

	function onDisable(e) {
		var data = e.data;

		data.$content.removeClass(RawClasses.enabled, RawClasses.animated);
		data.$animate.removeClass(RawClasses.animated);

		restoreLabel(data);

		clearLocks(data);
	}

	/**
	 * @method private
	 * @name addLocks
	 * @description Locks scrolling
	 * @param data [object] "Instance data"
	 */

	function addLocks(data) {
		if (!data.isToggle) {
			$Locks.addClass(RawClasses.lock);
		}
	}

	/**
	 * @method private
	 * @name clearLocks
	 * @description Unlocks scrolling
	 * @param data [object] "Instance data"
	 */

	function clearLocks(data) {
		if (!data.isToggle) {
			$Locks.removeClass(RawClasses.lock);
		}
	}

	/**
	 * @method private
	 * @name cacheLabel
	 * @description Sets handle labels
	 * @param data [object] "Instance data"
	 */

	function cacheLabel(data) {
		if (data.label) {
			if (data.$handle.length > 1) {
				data.originalLabel = [];

				for (var i = 0, count = data.$handle.length; i < count; i++) {
					data.originalLabel[i] = data.$handle.eq(i).text();
				}
			} else {
				data.originalLabel = data.$handle.text();
			}
		}
	}

	/**
	 * @method private
	 * @name restoreLabel
	 * @description restores handle labels
	 * @param data [object] "Instance data"
	 */

	function restoreLabel(data) {
		if (data.label) {
			if (data.$handle.length > 1) {
				for (var i = 0, count = data.$handle.length; i < count; i++) {
					data.$handle.eq(i).text(data.originalLabel[i]);
				}
			} else {
				data.$handle.text(data.originalLabel);
			}
		}
	}

	/**
	 * @plugin
	 * @name Navigation
	 * @description A jQuery plugin for simple responsive navigation.
	 * @type widget
	 * @dependency core.js
	 * @dependency mediaquery.js
	 * @dependency swap.js
	 * @dependency touch.js
	 */

	var Plugin = Formstone.Plugin("navigation", {
			widget: true,

			/**
			 * @options
			 * @param customClass [string] <''> "Class applied to instance"
			 * @param gravity [string] <'left'> "Gravity of 'push', 'reveal' and 'overlay' navigation; 'right', 'left'"
			 * @param label [boolean] <true> "Display handle width label"
			 * @param labels.closed [string] <'Menu'> "Closed state text"
			 * @param labels.open [string] <'Close'> "Open state text"
			 * @param maxWidth [string] <'980px'> "Width at which to auto-disable plugin"
			 * @param type [string] <'toggle'> "Type of navigation; 'toggle', 'push', 'reveal', 'overlay'"
			 */

			defaults: {
				customClass    : "",
				gravity        : "left",
				label          : true,
				labels: {
					closed     : "Expand Menu",
					open       : "Close"
				},
				maxWidth       : "980px",
				type           : "toggle"
			},

			classes: [
				"handle",
				"nav",
				"content",
				"animated",
				"enabled",
				"open",
				"toggle",
				"push",
				"reveal",
				"overlay",
				"left",
				"right",
				"lock"
			],

			/**
			 * @events
			 * @event open.navigation "Navigation opened"
			 * @event close.navigation "Navigation closed"
			 */

			events: {
				tap      : "tap",
				open     : "open",
				close    : "close"
			},

			methods: {
				_setup        : setup,
				_construct    : construct,
				_destruct     : destruct,

				// Public Methods

				open          : open,
				close         : close,
				enable        : enable,
				disable       : disable
			}
		}),

		// Localize References

		Namespace     = Plugin.namespace,
		Classes       = Plugin.classes,
		RawClasses    = Classes.raw,
		Events        = Plugin.events,
		Functions     = Plugin.functions,

		// Internal

		$Locks        = null;

})(jQuery, Formstone);
;(function ($, Formstone, undefined) {

	"use strict";

	/**
	 * @method private
	 * @name construct
	 * @description Builds instance.
	 * @param data [object] "Instance data"
	 */

	function construct(data) {
		data.enabled    = false;
		data.active     = false;

		data.classes    = $.extend(true, {}, Classes, data.classes);

		data.target     = this.data(Namespace + "-target");
		data.$target    = $(data.target).addClass(data.classes.raw.target);

		data.linked     = this.data(Namespace + "-linked");

		data.mq         = "(max-width:" + (data.maxWidth === Infinity ? "100000px" : data.maxWidth) + ")";

		// live query for the group to avoid missing new elements
		var group       = this.data(Namespace + "-group");
		data.group      = group ? '[data-' + Namespace + '-group="' + group + '"]' : false;

		if (!data.collapse && data.group) {
			$(data.group).eq(0).attr("data-" + Namespace + "-active", "true");
		}

		// Should be activate when enabled
		data.onEnable = this.data(Namespace + "-active");

		data.$swaps = $().add(this).add(data.$target);

		this.fsTouch({
				tap: true
			})
			.on(Events.tap + data.dotGuid, data, onClick);

		// Media Query support
		$.fsMediaquery("bind", data.rawGuid, data.mq, {
			enter: function() {
				enable.call(data.$el, data);
			},
			leave: function() {
				disable.call(data.$el, data);
			}
		});
	}

	/**
	 * @method private
	 * @name destruct
	 * @description Tears down instance.
	 * @param data [object] "Instance data"
	 */

	function destruct(data) {
		$.fsMediaquery("unbind", data.rawGuid);

		data.$swaps.removeClass( [data.classes.raw.enabled, data.classes.raw.active].join(" ") )
				   .off(Events.namespace);

		this.fsTouch("destroy");
	}

	/**
	 * @method
	 * @name activate
	 * @description Activate instance.
	 * @example $(".target").swap("activate");
	 */

	function activate(data, fromLinked) {
		if (data.enabled && !data.active) {
			// Deactivates grouped instances
			$(data.group).not(data.$el)[Plugin.namespaceClean]("deactivate");

			// index in group
			var index    = (data.group) ? $(data.group).index(data.$el) : null;

			data.$swaps.addClass(data.classes.raw.active);

			if (!fromLinked) {
				if (data.linked) {
					// Linked handles
					$(data.linked).not(data.$el).swap("activate", true);
				}

				this.trigger(Events.activate, [index]);
			}

			data.active = true;
		}
	}

	/**
	 * @method
	 * @name deactivate
	 * @description Deactivates instance.
	 * @example $(".target").swap("deactivate");
	 */

	function deactivate(data, fromLinked) {
		if (data.enabled && data.active) {
			data.$swaps.removeClass(data.classes.raw.active);

			if (!fromLinked) {
				if (data.linked) {
					// Linked handles
					$(data.linked).not(data.$el).swap("deactivate", true);
				}

				this.trigger(Events.deactivate);
			}

			data.active = false;
		}
	}

	/**
	 * @method
	 * @name enable
	 * @description Enables instance.
	 * @example $(".target").swap("enable");
	 */

	function enable(data, fromLinked) {
		if (!data.enabled) {
			data.enabled = true;

			data.$swaps.addClass(data.classes.raw.enabled);

			if (!fromLinked) {
				// Linked handles
				$(data.linked).not(data.$el).swap("enable");
			}

			this.trigger(Events.enable);

			if (data.onEnable) {
				data.active = true;
				data.$swaps.addClass(data.classes.raw.active);
				// activate.call(this, data);
			} else {
				data.active = true;
				deactivate.call(this, data);
			}
		}
	}

	/**
	 * @method
	 * @name disable
	 * @description Disables instance.
	 * @example $(".target").swap("disable");
	 */

	function disable(data, fromLinked) {
		if (data.enabled) {
			data.enabled = false;

			data.$swaps.removeClass( [data.classes.raw.enabled, data.classes.raw.active].join(" ") );

			if (!fromLinked) {
				// Linked handles
				$(data.linked).not(data.$el).swap("disable");
			}

			this.trigger(Events.disable);
		}
	}

	/**
	 * @method private
	 * @name onClick
	 * @description Handles click nav click.
	 * @param e [object] "Event data"
	 */

	function onClick(e) {
		Functions.killEvent(e);

		var data = e.data;

		if (data.active && data.collapse) {
			deactivate.call(data.$el, data);
		} else {
			activate.call(data.$el, data);
		}
	}

	/**
	 * @plugin
	 * @name Swap
	 * @description A jQuery plugin for toggling states.
	 * @type widget
	 * @dependency core.js
	 * @dependency mediaquery.js
	 * @dependency touch.js
	 */

	var Plugin = Formstone.Plugin("swap", {
			widget: true,

			/**
			 * @options
			 * @param collapse [boolean] <true> "Allow swap to collapse it's target"
			 * @param maxWidth [string] <Infinity> "Width at which to auto-disable plugin"
			 */

			defaults: {
				collapse       : true,
				maxWidth       : Infinity
			},

			classes: [
				"target",
				"enabled",
				"active"
			],

			/**
			 * @events
			 * @event activate.swap "Swap activated"
			 * @event deactivate.swap "Swap deactivated"
			 * @event enable.swap "Swap enabled"
			 * @event disable.swap "Swap diabled"
			 */

			events: {
				tap           : "tap",
				activate      : "activate",
				deactivate    : "deactivate",
				enable        : "enable",
				disable       : "disable"
			},

			methods: {
				_construct    : construct,
				_destruct     : destruct,

				// Public Methods

				activate      : activate,
				deactivate    : deactivate,
				enable        : enable,
				disable       : disable
			}
		}),

		// Localize References

		Namespace     = Plugin.namespace,
		Classes       = Plugin.classes,
		Events        = Plugin.events,
		Functions     = Plugin.functions;

})(jQuery, Formstone);
;(function ($, Formstone, undefined) {

	"use strict";

	/**
	 * @method private
	 * @name construct
	 * @description Builds instance.
	 * @param data [object] "Instance data"
	 */

	function construct(data) {
		data.touches     = [];
		data.touching    = false;

		this.on( Events.dragStart, Functions.killEvent );

		if (data.tap) {
			// Tap

			data.pan   = false;
			data.scale = false;
			data.swipe = false;

			if (Formstone.support.touch) {
				this.on( [Events.touchStart, Events.pointerDown].join(" "), data, onPointerStart);
			} else {
				this.on(Events.click, data, onClick);
			}
		} else if (data.pan || data.swipe || data.scale) {
			// Pan / Swipe / Scale

			data.tap = false;

			if (data.swipe) {
				data.pan = true;
			}

			if (data.scale) {
				data.axis = false;
			}

			if (data.axis) {
				data.axisX = data.axis === "x";
				data.axisY = data.axis === "y";

				// touchAction(this, "pan-" + (data.axisY ? "y" : "x"));
			} else {
				touchAction(this, "none");
			}

			this.on( [Events.touchStart, Events.pointerDown].join(" "), data, onTouch);

			if (data.pan && !Formstone.support.touch) {
				this.on( Events.mouseDown, data, onPointerStart);
			}
		}
	}

	/**
	 * @method private
	 * @name destruct
	 * @description Tears down instance.
	 * @param data [object] "Instance data"
	 */

	function destruct(data) {
		this.off(Events.namespace);

		touchAction(this, "");
	}

	/**
	 * @method private
	 * @name onTouch
	 * @description Delegates touch events.
	 * @param e [object] "Event data"
	 */

	function onTouch(e) {
		// Stop panning and zooming
		if (e.preventManipulation) {
			e.preventManipulation();
		}

		var data    = e.data,
			oe      = e.originalEvent;

		if (oe.type.match(/(up|end)$/i)) {
			onPointerEnd(e);
			return;
		}

		if (oe.pointerId) {
			// Normalize MS pointer events back to standard touches
			var activeTouch = false;
			for (var i in data.touches) {
				if (data.touches[i].id === oe.pointerId) {
					activeTouch = true;
					data.touches[i].pageX    = oe.clientX;
					data.touches[i].pageY    = oe.clientY;
				}
			}
			if (!activeTouch) {
				data.touches.push({
					id       : oe.pointerId,
					pageX    : oe.clientX,
					pageY    : oe.clientY
				});
			}
		} else {
			// Alias normal touches
			data.touches = oe.touches;
		}

		// Delegate touch actions
		if (oe.type.match(/(down|start)$/i)) {
			onPointerStart(e);
		} else if (oe.type.match(/move$/i)) {
			onPointerMove(e);
		}
	}

	/**
	 * @method private
	 * @name onPointerStart
	 * @description Handles pointer start.
	 * @param e [object] "Event data"
	 */

	function onPointerStart(e) {
		var data     = e.data,
			touch    = ($.type(data.touches) !== "undefined") ? data.touches[0] : null;

		if (!data.touching) {
			data.startE      = e.originalEvent;
			data.startX      = (touch) ? touch.pageX : e.pageX;
			data.startY      = (touch) ? touch.pageY : e.pageY;
			data.startT      = new Date().getTime();
			data.scaleD      = 1;
			data.passed      = false;
		}

		if (data.tap) {
			// Tap

			data.clicked = false;

			data.$el.on( [Events.touchMove, Events.pointerMove].join(" "), data, onTouch)
					.on( [Events.touchEnd, Events.touchCancel, Events.pointerUp, Events.pointerCancel].join(" ") , data, onTouch);

		} else if (data.pan || data.scale) {
			// Clear old click events

			if (data.$links) {
				data.$links.off(Events.click);
			}

			// Pan / Scale

			var newE = buildEvent(data.scale ? Events.scaleStart : Events.panStart, e, data.startX, data.startY, data.scaleD, 0, 0, "", "");

			if (data.scale && data.touches && data.touches.length >= 2) {
				var t = data.touches;

				data.pinch = {
					startX     : midpoint(t[0].pageX, t[1].pageX),
					startY     : midpoint(t[0].pageY, t[1].pageY),
					startD     : pythagorus((t[1].pageX - t[0].pageX), (t[1].pageY - t[0].pageY))
				};

				newE.pageX    = data.startX   = data.pinch.startX;
				newE.pageY    = data.startY   = data.pinch.startY;
			}

			// Only bind at first touch
			if (!data.touching) {
				data.touching = true;

				if (data.pan) {
					$Window.on(Events.mouseMove, data, onPointerMove)
						   .on(Events.mouseUp, data, onPointerEnd);
				}

				$Window.on( [
					Events.touchMove,
					Events.touchEnd,
					Events.touchCancel,
					Events.pointerMove,
					Events.pointerUp,
					Events.pointerCancel
				].join(" ") , data, onTouch);

				data.$el.trigger(newE);
			}
		}
	}

	/**
	 * @method private
	 * @name onPointerMove
	 * @description Handles pointer move.
	 * @param e [object] "Event data"
	 */

	function onPointerMove(e) {
		var data      = e.data,
			touch     = ($.type(data.touches) !== "undefined") ? data.touches[0] : null,
			newX      = (touch) ? touch.pageX : e.pageX,
			newY      = (touch) ? touch.pageY : e.pageY,
			deltaX    = newX - data.startX,
			deltaY    = newY - data.startY,
			dirX      = (deltaX > 0) ? "right" : "left",
			dirY      = (deltaY > 0) ? "down"  : "up",
			movedX    = Math.abs(deltaX) > TouchThreshold,
			movedY    = Math.abs(deltaY) > TouchThreshold;

		if (data.tap) {
			// Tap

			if (movedX || movedY) {
				data.$el.off( [
					Events.touchMove,
					Events.touchEnd,
					Events.touchCancel,
					Events.pointerMove,
					Events.pointerUp,
					Events.pointerCancel
				].join(" ") );
			}
		} else if (data.pan || data.scale) {
			if (!data.passed && data.axis && ((data.axisX && movedY) || (data.axisY && movedX)) ) {
				// if axis and moved in opposite direction
				onPointerEnd(e);
			} else {
				if (!data.passed && (!data.axis || (data.axis && (data.axisX && movedX) || (data.axisY && movedY)))) {
					// if has axis and moved in same direction
					data.passed = true;
				}

				if (data.passed) {
					Functions.killEvent(e);
					Functions.killEvent(data.startE);
				}

				// Pan / Scale

				var fire    = true,
					newE    = buildEvent(data.scale ? Events.scale : Events.pan, e, newX, newY, data.scaleD, deltaX, deltaY, dirX, dirY);

				if (data.scale) {
					if (data.touches && data.touches.length >= 2) {
						var t = data.touches;

						data.pinch.endX     = midpoint(t[0].pageX, t[1].pageX);
						data.pinch.endY     = midpoint(t[0].pageY, t[1].pageY);
						data.pinch.endD     = pythagorus((t[1].pageX - t[0].pageX), (t[1].pageY - t[0].pageY));
						data.scaleD    = (data.pinch.endD / data.pinch.startD);
						newE.pageX     = data.pinch.endX;
						newE.pageY     = data.pinch.endY;
						newE.scale     = data.scaleD;
						newE.deltaX    = data.pinch.endX - data.pinch.startX;
						newE.deltaY    = data.pinch.endY - data.pinch.startY;
					} else if (!data.pan) {
						fire = false;
					}
				}

				if (fire) {
					data.$el.trigger( newE );
				}
			}
		}
	}

	/**
	 * @method private
	 * @name bindLink
	 * @description Bind events to internal links
	 * @param $link [object] "Object to bind"
	 * @param data [object] "Instance data"
	 */

	function bindLink($link, data) {
		$link.on(Events.click, data, onLinkClick);

		// http://www.elijahmanor.com/how-to-access-jquerys-internal-data/
		var events = $._data($link[0], "events")["click"];
		events.unshift(events.pop());
	}

	/**
	 * @method private
	 * @name onLinkClick
	 * @description Handles clicks to internal links
	 * @param e [object] "Event data"
	 */

	function onLinkClick(e) {
		Functions.killEvent(e, true);
		e.data.$links.off(Events.click);
	}

	/**
	 * @method private
	 * @name onPointerEnd
	 * @description Handles pointer end / cancel.
	 * @param e [object] "Event data"
	 */

	function onPointerEnd(e) {
		var data = e.data;

		if (data.tap) {
			// Tap

			data.$el.off( [
				Events.touchMove,
				Events.touchEnd,
				Events.touchCancel,
				Events.pointerMove,
				Events.pointerUp,
				Events.pointerCancel,
				Events.mouseMove,
				Events.mouseUp
			].join(" ") );

			data.startE.preventDefault();

			onClick(e);
		} else if (data.pan || data.scale) {

			// Pan / Swipe / Scale

			var touch     = ($.type(data.touches) !== "undefined") ? data.touches[0] : null,
				newX      = (touch) ? touch.pageX : e.pageX,
				newY      = (touch) ? touch.pageY : e.pageY,
				deltaX    = newX - data.startX,
				deltaY    = newY - data.startY,
				endT      = new Date().getTime(),
				eType     = data.scale ? Events.scaleEnd : Events.panEnd,
				dirX      = (deltaX > 0) ? "right" : "left",
				dirY      = (deltaY > 0) ? "down"  : "up",
				movedX    = Math.abs(deltaX) > 1,
				movedY    = Math.abs(deltaY) > 1;

			// Swipe

			if (data.swipe && Math.abs(deltaX) > TouchThreshold && (endT - data.startT) < TouchTime) {
				eType = Events.swipe;
			}

			// Kill clicks to internal links

			if ( (data.axis && ((data.axisX && movedY) || (data.axisY && movedX))) || (movedX || movedY) ) {
				data.$links = data.$el.find("a");

				for (var i = 0, count = data.$links.length; i < count; i++) {
					bindLink(data.$links.eq(i), data);
				}
			}

			var newE = buildEvent(eType, e, newX, newY, data.scaleD, deltaX, deltaY, dirX, dirY);

			$Window.off( [
				Events.touchMove,
				Events.touchEnd,
				Events.touchCancel,
				Events.mouseMove,
				Events.mouseUp,
				Events.pointerMove,
				Events.pointerUp,
				Events.pointerCancel
			].join(" ") );

			data.$el.trigger(newE);

			data.touches = [];

			if (data.scale) {
				/*
				if (e.originalEvent.pointerId) {
					for (var i in data.touches) {
						if (data.touches[i].id === e.originalEvent.pointerId) {
							data.touches.splice(i, 1);
						}
					}
				} else {
					data.touches = e.originalEvent.touches;
				}
				*/

				/*
				if (data.touches.length) {
					onPointerStart($.extend(e, {
						data: data,
						originalEvent: {
							touches: data.touches
						}
					}));
				}
				*/
			}
		}

		data.touching = false;
	}

	/**
	 * @method private
	 * @name onClick
	 * @description Handles click.
	 * @param e [object] "Event data"
	 */

	function onClick(e) {
		Functions.killEvent(e);

		var data = e.data;

		if (!data.clicked) {
			if (e.type !== "click") {
				data.clicked = true;
			}

			var newX    = (data.startE) ? data.startX : e.pageX,
				newY    = (data.startE) ? data.startY : e.pageY,
				newE    = buildEvent(Events.tap, e.originalEvent, newX, newY, 1, 0, 0);

			data.$el.trigger( newE );
		}
	}

	/**
	 * @method private
	 * @name buildEvents
	 * @description Builds new event.
	 * @param type [type] "Event type"
	 * @param oe [object] "Original event"
	 * @param x [int] "X value"
	 * @param y [int] "Y value"
	 * @param scale [float] "Scale value"
	 * @param dx [float] "Delta X value"
	 * @param dy [float] "Delta Y value"
	 */

	function buildEvent(type, oe, px, py, s, dx, dy, dirx, diry) {
		return $.Event(type, {
			originalEvent : oe,
			bubbles       : true,
			pageX         : px,
			pageY         : py,
			scale         : s,
			deltaX        : dx,
			deltaY        : dy,
			directionX    : dirx,
			directionY    : diry
		});
	}

	/**
	 * @method private
	 * @name midpoint
	 * @description Calculates midpoint.
	 * @param a [float] "Value 1"
	 * @param b [float] "Value 2"
	 */

	function midpoint(a, b) {
		return (a + b) / 2.0;
	}

	/**
	 * @method private
	 * @name pythagorus
	 * @description Pythagorean theorem.
	 * @param a [float] "Value 1"
	 * @param b [float] "Value 2"
	 */

	function pythagorus(a, b) {
		return Math.sqrt((a * a) + (b * b));
	}

	/**
	 * @method private
	 * @name touchAction
	 * @description Set ms touch action on target.
	 * @param action [string] "Touch action value"
	 */

	function touchAction($target, action) {
		$target.css({
			"-ms-touch-action": action,
			    "touch-action": action
		});
	}

	/**
	 * @plugin
	 * @name Touch
	 * @description A jQuery plugin for multi-touch events.
	 * @type widget
	 * @dependency core.js
	 */

	var legacyPointer = !(Formstone.window.PointerEvent),
		Plugin = Formstone.Plugin("touch", {
			widget: true,

			/**
			 * @options
			 * @param axis [string] <null> "Limit axis for pan and swipe; 'x' or 'y'"
			 * @param pan [boolean] <false> "Pan events"
			 * @param scale [boolean] <false> "Scale events"
			 * @param swipe [boolean] <false> "Swipe events"
			 * @param tap [boolean] <false> "'Fastclick' event"
			 */

			defaults : {
				axis     : false,
				pan      : false,
				scale    : false,
				swipe    : false,
				tap      : false
			},

			methods : {
				_construct    : construct,
				_destruct     : destruct
			},

			events: {
				pointerDown    : legacyPointer ? "MSPointerDown"   : "pointerdown",
				pointerUp      : legacyPointer ? "MSPointerUp"     : "pointerup",
				pointerMove    : legacyPointer ? "MSPointerMove"   : "pointermove",
				pointerCancel  : legacyPointer ? "MSPointerCancel" : "pointercancel"
			}
		}),

		// Localize References

		Events        = Plugin.events,
		Functions     = Plugin.functions,

		// Local

		$Window           = Formstone.$window,
		TouchThreshold    = 10,
		TouchTime         = 50;

		/**
		 * @events
		 * @event tap "'Fastclick' event; Prevents ghost clicks on mobile"
		 * @event panstart "Panning started"
		 * @event pan "Panning"
		 * @event panend "Panning ended"
		 * @event scalestart "Scaling started"
		 * @event scale "Scaling"
		 * @event scaleend "Scaling ended"
		 * @event swipe "Swipe"
		 */

		Events.tap           = "tap";
		Events.pan           = "pan";
		Events.panStart      = "panstart";
		Events.panEnd        = "panend";
		Events.scale         = "scale";
		Events.scaleStart    = "scalestart";
		Events.scaleEnd      = "scaleend";
		Events.swipe         = "swipe";

})(jQuery, Formstone);
/*
     _ _      _       _
 ___| (_) ___| | __  (_)___
/ __| | |/ __| |/ /  | / __|
\__ \ | | (__|   < _ | \__ \
|___/_|_|\___|_|\_(_)/ |___/
                   |__/

 Version: 1.6.0
  Author: Ken Wheeler
 Website: http://kenwheeler.github.io
    Docs: http://kenwheeler.github.io/slick
    Repo: http://github.com/kenwheeler/slick
  Issues: http://github.com/kenwheeler/slick/issues

 */
/* global window, document, define, jQuery, setInterval, clearInterval */
(function(factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports !== 'undefined') {
        module.exports = factory(require('jquery'));
    } else {
        factory(jQuery);
    }

}(function($) {
    'use strict';
    var Slick = window.Slick || {};

    Slick = (function() {

        var instanceUid = 0;

        function Slick(element, settings) {

            var _ = this, dataSettings;

            _.defaults = {
                accessibility: true,
                adaptiveHeight: false,
                appendArrows: $(element),
                appendDots: $(element),
                arrows: true,
                asNavFor: null,
                prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',
                nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',
                autoplay: false,
                autoplaySpeed: 3000,
                centerMode: false,
                centerPadding: '50px',
                cssEase: 'ease',
                customPaging: function(slider, i) {
                    return $('<button type="button" data-role="none" role="button" tabindex="0" />').text(i + 1);
                },
                dots: false,
                dotsClass: 'slick-dots',
                draggable: true,
                easing: 'linear',
                edgeFriction: 0.35,
                fade: false,
                focusOnSelect: false,
                infinite: true,
                initialSlide: 0,
                lazyLoad: 'ondemand',
                mobileFirst: false,
                pauseOnHover: true,
                pauseOnFocus: true,
                pauseOnDotsHover: false,
                respondTo: 'window',
                responsive: null,
                rows: 1,
                rtl: false,
                slide: '',
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: true,
                swipeToSlide: false,
                touchMove: true,
                touchThreshold: 5,
                useCSS: true,
                useTransform: true,
                variableWidth: false,
                vertical: false,
                verticalSwiping: false,
                waitForAnimate: true,
                zIndex: 1000
            };

            _.initials = {
                animating: false,
                dragging: false,
                autoPlayTimer: null,
                currentDirection: 0,
                currentLeft: null,
                currentSlide: 0,
                direction: 1,
                $dots: null,
                listWidth: null,
                listHeight: null,
                loadIndex: 0,
                $nextArrow: null,
                $prevArrow: null,
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: false,
                slideOffset: 0,
                swipeLeft: null,
                $list: null,
                touchObject: {},
                transformsEnabled: false,
                unslicked: false
            };

            $.extend(_, _.initials);

            _.activeBreakpoint = null;
            _.animType = null;
            _.animProp = null;
            _.breakpoints = [];
            _.breakpointSettings = [];
            _.cssTransitions = false;
            _.focussed = false;
            _.interrupted = false;
            _.hidden = 'hidden';
            _.paused = true;
            _.positionProp = null;
            _.respondTo = null;
            _.rowCount = 1;
            _.shouldClick = true;
            _.$slider = $(element);
            _.$slidesCache = null;
            _.transformType = null;
            _.transitionType = null;
            _.visibilityChange = 'visibilitychange';
            _.windowWidth = 0;
            _.windowTimer = null;

            dataSettings = $(element).data('slick') || {};

            _.options = $.extend({}, _.defaults, settings, dataSettings);

            _.currentSlide = _.options.initialSlide;

            _.originalSettings = _.options;

            if (typeof document.mozHidden !== 'undefined') {
                _.hidden = 'mozHidden';
                _.visibilityChange = 'mozvisibilitychange';
            } else if (typeof document.webkitHidden !== 'undefined') {
                _.hidden = 'webkitHidden';
                _.visibilityChange = 'webkitvisibilitychange';
            }

            _.autoPlay = $.proxy(_.autoPlay, _);
            _.autoPlayClear = $.proxy(_.autoPlayClear, _);
            _.autoPlayIterator = $.proxy(_.autoPlayIterator, _);
            _.changeSlide = $.proxy(_.changeSlide, _);
            _.clickHandler = $.proxy(_.clickHandler, _);
            _.selectHandler = $.proxy(_.selectHandler, _);
            _.setPosition = $.proxy(_.setPosition, _);
            _.swipeHandler = $.proxy(_.swipeHandler, _);
            _.dragHandler = $.proxy(_.dragHandler, _);
            _.keyHandler = $.proxy(_.keyHandler, _);

            _.instanceUid = instanceUid++;

            // A simple way to check for HTML strings
            // Strict HTML recognition (must start with <)
            // Extracted from jQuery v1.11 source
            _.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/;


            _.registerBreakpoints();
            _.init(true);

        }

        return Slick;

    }());

    Slick.prototype.activateADA = function() {
        var _ = this;

        _.$slideTrack.find('.slick-active').attr({
            'aria-hidden': 'false'
        }).find('a, input, button, select').attr({
            'tabindex': '0'
        });

    };

    Slick.prototype.addSlide = Slick.prototype.slickAdd = function(markup, index, addBefore) {

        var _ = this;

        if (typeof(index) === 'boolean') {
            addBefore = index;
            index = null;
        } else if (index < 0 || (index >= _.slideCount)) {
            return false;
        }

        _.unload();

        if (typeof(index) === 'number') {
            if (index === 0 && _.$slides.length === 0) {
                $(markup).appendTo(_.$slideTrack);
            } else if (addBefore) {
                $(markup).insertBefore(_.$slides.eq(index));
            } else {
                $(markup).insertAfter(_.$slides.eq(index));
            }
        } else {
            if (addBefore === true) {
                $(markup).prependTo(_.$slideTrack);
            } else {
                $(markup).appendTo(_.$slideTrack);
            }
        }

        _.$slides = _.$slideTrack.children(this.options.slide);

        _.$slideTrack.children(this.options.slide).detach();

        _.$slideTrack.append(_.$slides);

        _.$slides.each(function(index, element) {
            $(element).attr('data-slick-index', index);
        });

        _.$slidesCache = _.$slides;

        _.reinit();

    };

    Slick.prototype.animateHeight = function() {
        var _ = this;
        if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
            var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
            _.$list.animate({
                height: targetHeight
            }, _.options.speed);
        }
    };

    Slick.prototype.animateSlide = function(targetLeft, callback) {

        var animProps = {},
            _ = this;

        _.animateHeight();

        if (_.options.rtl === true && _.options.vertical === false) {
            targetLeft = -targetLeft;
        }
        if (_.transformsEnabled === false) {
            if (_.options.vertical === false) {
                _.$slideTrack.animate({
                    left: targetLeft
                }, _.options.speed, _.options.easing, callback);
            } else {
                _.$slideTrack.animate({
                    top: targetLeft
                }, _.options.speed, _.options.easing, callback);
            }

        } else {

            if (_.cssTransitions === false) {
                if (_.options.rtl === true) {
                    _.currentLeft = -(_.currentLeft);
                }
                $({
                    animStart: _.currentLeft
                }).animate({
                    animStart: targetLeft
                }, {
                    duration: _.options.speed,
                    easing: _.options.easing,
                    step: function(now) {
                        now = Math.ceil(now);
                        if (_.options.vertical === false) {
                            animProps[_.animType] = 'translate(' +
                                now + 'px, 0px)';
                            _.$slideTrack.css(animProps);
                        } else {
                            animProps[_.animType] = 'translate(0px,' +
                                now + 'px)';
                            _.$slideTrack.css(animProps);
                        }
                    },
                    complete: function() {
                        if (callback) {
                            callback.call();
                        }
                    }
                });

            } else {

                _.applyTransition();
                targetLeft = Math.ceil(targetLeft);

                if (_.options.vertical === false) {
                    animProps[_.animType] = 'translate3d(' + targetLeft + 'px, 0px, 0px)';
                } else {
                    animProps[_.animType] = 'translate3d(0px,' + targetLeft + 'px, 0px)';
                }
                _.$slideTrack.css(animProps);

                if (callback) {
                    setTimeout(function() {

                        _.disableTransition();

                        callback.call();
                    }, _.options.speed);
                }

            }

        }

    };

    Slick.prototype.getNavTarget = function() {

        var _ = this,
            asNavFor = _.options.asNavFor;

        if ( asNavFor && asNavFor !== null ) {
            asNavFor = $(asNavFor).not(_.$slider);
        }

        return asNavFor;

    };

    Slick.prototype.asNavFor = function(index) {

        var _ = this,
            asNavFor = _.getNavTarget();

        if ( asNavFor !== null && typeof asNavFor === 'object' ) {
            asNavFor.each(function() {
                var target = $(this).slick('getSlick');
                if(!target.unslicked) {
                    target.slideHandler(index, true);
                }
            });
        }

    };

    Slick.prototype.applyTransition = function(slide) {

        var _ = this,
            transition = {};

        if (_.options.fade === false) {
            transition[_.transitionType] = _.transformType + ' ' + _.options.speed + 'ms ' + _.options.cssEase;
        } else {
            transition[_.transitionType] = 'opacity ' + _.options.speed + 'ms ' + _.options.cssEase;
        }

        if (_.options.fade === false) {
            _.$slideTrack.css(transition);
        } else {
            _.$slides.eq(slide).css(transition);
        }

    };

    Slick.prototype.autoPlay = function() {

        var _ = this;

        _.autoPlayClear();

        if ( _.slideCount > _.options.slidesToShow ) {
            _.autoPlayTimer = setInterval( _.autoPlayIterator, _.options.autoplaySpeed );
        }

    };

    Slick.prototype.autoPlayClear = function() {

        var _ = this;

        if (_.autoPlayTimer) {
            clearInterval(_.autoPlayTimer);
        }

    };

    Slick.prototype.autoPlayIterator = function() {

        var _ = this,
            slideTo = _.currentSlide + _.options.slidesToScroll;

        if ( !_.paused && !_.interrupted && !_.focussed ) {

            if ( _.options.infinite === false ) {

                if ( _.direction === 1 && ( _.currentSlide + 1 ) === ( _.slideCount - 1 )) {
                    _.direction = 0;
                }

                else if ( _.direction === 0 ) {

                    slideTo = _.currentSlide - _.options.slidesToScroll;

                    if ( _.currentSlide - 1 === 0 ) {
                        _.direction = 1;
                    }

                }

            }

            _.slideHandler( slideTo );

        }

    };

    Slick.prototype.buildArrows = function() {

        var _ = this;

        if (_.options.arrows === true ) {

            _.$prevArrow = $(_.options.prevArrow).addClass('slick-arrow');
            _.$nextArrow = $(_.options.nextArrow).addClass('slick-arrow');

            if( _.slideCount > _.options.slidesToShow ) {

                _.$prevArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');
                _.$nextArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');

                if (_.htmlExpr.test(_.options.prevArrow)) {
                    _.$prevArrow.prependTo(_.options.appendArrows);
                }

                if (_.htmlExpr.test(_.options.nextArrow)) {
                    _.$nextArrow.appendTo(_.options.appendArrows);
                }

                if (_.options.infinite !== true) {
                    _.$prevArrow
                        .addClass('slick-disabled')
                        .attr('aria-disabled', 'true');
                }

            } else {

                _.$prevArrow.add( _.$nextArrow )

                    .addClass('slick-hidden')
                    .attr({
                        'aria-disabled': 'true',
                        'tabindex': '-1'
                    });

            }

        }

    };

    Slick.prototype.buildDots = function() {

        var _ = this,
            i, dot;

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

            _.$slider.addClass('slick-dotted');

            dot = $('<ul />').addClass(_.options.dotsClass);

            for (i = 0; i <= _.getDotCount(); i += 1) {
                dot.append($('<li />').append(_.options.customPaging.call(this, _, i)));
            }

            _.$dots = dot.appendTo(_.options.appendDots);

            _.$dots.find('li').first().addClass('slick-active').attr('aria-hidden', 'false');

        }

    };

    Slick.prototype.buildOut = function() {

        var _ = this;

        _.$slides =
            _.$slider
                .children( _.options.slide + ':not(.slick-cloned)')
                .addClass('slick-slide');

        _.slideCount = _.$slides.length;

        _.$slides.each(function(index, element) {
            $(element)
                .attr('data-slick-index', index)
                .data('originalStyling', $(element).attr('style') || '');
        });

        _.$slider.addClass('slick-slider');

        _.$slideTrack = (_.slideCount === 0) ?
            $('<div class="slick-track"/>').appendTo(_.$slider) :
            _.$slides.wrapAll('<div class="slick-track"/>').parent();

        _.$list = _.$slideTrack.wrap(
            '<div aria-live="polite" class="slick-list"/>').parent();
        _.$slideTrack.css('opacity', 0);

        if (_.options.centerMode === true || _.options.swipeToSlide === true) {
            _.options.slidesToScroll = 1;
        }

        $('img[data-lazy]', _.$slider).not('[src]').addClass('slick-loading');

        _.setupInfinite();

        _.buildArrows();

        _.buildDots();

        _.updateDots();


        _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);

        if (_.options.draggable === true) {
            _.$list.addClass('draggable');
        }

    };

    Slick.prototype.buildRows = function() {

        var _ = this, a, b, c, newSlides, numOfSlides, originalSlides,slidesPerSection;

        newSlides = document.createDocumentFragment();
        originalSlides = _.$slider.children();

        if(_.options.rows > 1) {

            slidesPerSection = _.options.slidesPerRow * _.options.rows;
            numOfSlides = Math.ceil(
                originalSlides.length / slidesPerSection
            );

            for(a = 0; a < numOfSlides; a++){
                var slide = document.createElement('div');
                for(b = 0; b < _.options.rows; b++) {
                    var row = document.createElement('div');
                    for(c = 0; c < _.options.slidesPerRow; c++) {
                        var target = (a * slidesPerSection + ((b * _.options.slidesPerRow) + c));
                        if (originalSlides.get(target)) {
                            row.appendChild(originalSlides.get(target));
                        }
                    }
                    slide.appendChild(row);
                }
                newSlides.appendChild(slide);
            }

            _.$slider.empty().append(newSlides);
            _.$slider.children().children().children()
                .css({
                    'width':(100 / _.options.slidesPerRow) + '%',
                    'display': 'inline-block'
                });

        }

    };

    Slick.prototype.checkResponsive = function(initial, forceUpdate) {

        var _ = this,
            breakpoint, targetBreakpoint, respondToWidth, triggerBreakpoint = false;
        var sliderWidth = _.$slider.width();
        var windowWidth = window.innerWidth || $(window).width();

        if (_.respondTo === 'window') {
            respondToWidth = windowWidth;
        } else if (_.respondTo === 'slider') {
            respondToWidth = sliderWidth;
        } else if (_.respondTo === 'min') {
            respondToWidth = Math.min(windowWidth, sliderWidth);
        }

        if ( _.options.responsive &&
            _.options.responsive.length &&
            _.options.responsive !== null) {

            targetBreakpoint = null;

            for (breakpoint in _.breakpoints) {
                if (_.breakpoints.hasOwnProperty(breakpoint)) {
                    if (_.originalSettings.mobileFirst === false) {
                        if (respondToWidth < _.breakpoints[breakpoint]) {
                            targetBreakpoint = _.breakpoints[breakpoint];
                        }
                    } else {
                        if (respondToWidth > _.breakpoints[breakpoint]) {
                            targetBreakpoint = _.breakpoints[breakpoint];
                        }
                    }
                }
            }

            if (targetBreakpoint !== null) {
                if (_.activeBreakpoint !== null) {
                    if (targetBreakpoint !== _.activeBreakpoint || forceUpdate) {
                        _.activeBreakpoint =
                            targetBreakpoint;
                        if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
                            _.unslick(targetBreakpoint);
                        } else {
                            _.options = $.extend({}, _.originalSettings,
                                _.breakpointSettings[
                                    targetBreakpoint]);
                            if (initial === true) {
                                _.currentSlide = _.options.initialSlide;
                            }
                            _.refresh(initial);
                        }
                        triggerBreakpoint = targetBreakpoint;
                    }
                } else {
                    _.activeBreakpoint = targetBreakpoint;
                    if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
                        _.unslick(targetBreakpoint);
                    } else {
                        _.options = $.extend({}, _.originalSettings,
                            _.breakpointSettings[
                                targetBreakpoint]);
                        if (initial === true) {
                            _.currentSlide = _.options.initialSlide;
                        }
                        _.refresh(initial);
                    }
                    triggerBreakpoint = targetBreakpoint;
                }
            } else {
                if (_.activeBreakpoint !== null) {
                    _.activeBreakpoint = null;
                    _.options = _.originalSettings;
                    if (initial === true) {
                        _.currentSlide = _.options.initialSlide;
                    }
                    _.refresh(initial);
                    triggerBreakpoint = targetBreakpoint;
                }
            }

            // only trigger breakpoints during an actual break. not on initialize.
            if( !initial && triggerBreakpoint !== false ) {
                _.$slider.trigger('breakpoint', [_, triggerBreakpoint]);
            }
        }

    };

    Slick.prototype.changeSlide = function(event, dontAnimate) {

        var _ = this,
            $target = $(event.currentTarget),
            indexOffset, slideOffset, unevenOffset;

        // If target is a link, prevent default action.
        if($target.is('a')) {
            event.preventDefault();
        }

        // If target is not the <li> element (ie: a child), find the <li>.
        if(!$target.is('li')) {
            $target = $target.closest('li');
        }

        unevenOffset = (_.slideCount % _.options.slidesToScroll !== 0);
        indexOffset = unevenOffset ? 0 : (_.slideCount - _.currentSlide) % _.options.slidesToScroll;

        switch (event.data.message) {

            case 'previous':
                slideOffset = indexOffset === 0 ? _.options.slidesToScroll : _.options.slidesToShow - indexOffset;
                if (_.slideCount > _.options.slidesToShow) {
                    _.slideHandler(_.currentSlide - slideOffset, false, dontAnimate);
                }
                break;

            case 'next':
                slideOffset = indexOffset === 0 ? _.options.slidesToScroll : indexOffset;
                if (_.slideCount > _.options.slidesToShow) {
                    _.slideHandler(_.currentSlide + slideOffset, false, dontAnimate);
                }
                break;

            case 'index':
                var index = event.data.index === 0 ? 0 :
                    event.data.index || $target.index() * _.options.slidesToScroll;

                _.slideHandler(_.checkNavigable(index), false, dontAnimate);
                $target.children().trigger('focus');
                break;

            default:
                return;
        }

    };

    Slick.prototype.checkNavigable = function(index) {

        var _ = this,
            navigables, prevNavigable;

        navigables = _.getNavigableIndexes();
        prevNavigable = 0;
        if (index > navigables[navigables.length - 1]) {
            index = navigables[navigables.length - 1];
        } else {
            for (var n in navigables) {
                if (index < navigables[n]) {
                    index = prevNavigable;
                    break;
                }
                prevNavigable = navigables[n];
            }
        }

        return index;
    };

    Slick.prototype.cleanUpEvents = function() {

        var _ = this;

        if (_.options.dots && _.$dots !== null) {

            $('li', _.$dots)
                .off('click.slick', _.changeSlide)
                .off('mouseenter.slick', $.proxy(_.interrupt, _, true))
                .off('mouseleave.slick', $.proxy(_.interrupt, _, false));

        }

        _.$slider.off('focus.slick blur.slick');

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
            _.$prevArrow && _.$prevArrow.off('click.slick', _.changeSlide);
            _.$nextArrow && _.$nextArrow.off('click.slick', _.changeSlide);
        }

        _.$list.off('touchstart.slick mousedown.slick', _.swipeHandler);
        _.$list.off('touchmove.slick mousemove.slick', _.swipeHandler);
        _.$list.off('touchend.slick mouseup.slick', _.swipeHandler);
        _.$list.off('touchcancel.slick mouseleave.slick', _.swipeHandler);

        _.$list.off('click.slick', _.clickHandler);

        $(document).off(_.visibilityChange, _.visibility);

        _.cleanUpSlideEvents();

        if (_.options.accessibility === true) {
            _.$list.off('keydown.slick', _.keyHandler);
        }

        if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().off('click.slick', _.selectHandler);
        }

        $(window).off('orientationchange.slick.slick-' + _.instanceUid, _.orientationChange);

        $(window).off('resize.slick.slick-' + _.instanceUid, _.resize);

        $('[draggable!=true]', _.$slideTrack).off('dragstart', _.preventDefault);

        $(window).off('load.slick.slick-' + _.instanceUid, _.setPosition);
        $(document).off('ready.slick.slick-' + _.instanceUid, _.setPosition);

    };

    Slick.prototype.cleanUpSlideEvents = function() {

        var _ = this;

        _.$list.off('mouseenter.slick', $.proxy(_.interrupt, _, true));
        _.$list.off('mouseleave.slick', $.proxy(_.interrupt, _, false));

    };

    Slick.prototype.cleanUpRows = function() {

        var _ = this, originalSlides;

        if(_.options.rows > 1) {
            originalSlides = _.$slides.children().children();
            originalSlides.removeAttr('style');
            _.$slider.empty().append(originalSlides);
        }

    };

    Slick.prototype.clickHandler = function(event) {

        var _ = this;

        if (_.shouldClick === false) {
            event.stopImmediatePropagation();
            event.stopPropagation();
            event.preventDefault();
        }

    };

    Slick.prototype.destroy = function(refresh) {

        var _ = this;

        _.autoPlayClear();

        _.touchObject = {};

        _.cleanUpEvents();

        $('.slick-cloned', _.$slider).detach();

        if (_.$dots) {
            _.$dots.remove();
        }


        if ( _.$prevArrow && _.$prevArrow.length ) {

            _.$prevArrow
                .removeClass('slick-disabled slick-arrow slick-hidden')
                .removeAttr('aria-hidden aria-disabled tabindex')
                .css('display','');

            if ( _.htmlExpr.test( _.options.prevArrow )) {
                _.$prevArrow.remove();
            }
        }

        if ( _.$nextArrow && _.$nextArrow.length ) {

            _.$nextArrow
                .removeClass('slick-disabled slick-arrow slick-hidden')
                .removeAttr('aria-hidden aria-disabled tabindex')
                .css('display','');

            if ( _.htmlExpr.test( _.options.nextArrow )) {
                _.$nextArrow.remove();
            }

        }


        if (_.$slides) {

            _.$slides
                .removeClass('slick-slide slick-active slick-center slick-visible slick-current')
                .removeAttr('aria-hidden')
                .removeAttr('data-slick-index')
                .each(function(){
                    $(this).attr('style', $(this).data('originalStyling'));
                });

            _.$slideTrack.children(this.options.slide).detach();

            _.$slideTrack.detach();

            _.$list.detach();

            _.$slider.append(_.$slides);
        }

        _.cleanUpRows();

        _.$slider.removeClass('slick-slider');
        _.$slider.removeClass('slick-initialized');
        _.$slider.removeClass('slick-dotted');

        _.unslicked = true;

        if(!refresh) {
            _.$slider.trigger('destroy', [_]);
        }

    };

    Slick.prototype.disableTransition = function(slide) {

        var _ = this,
            transition = {};

        transition[_.transitionType] = '';

        if (_.options.fade === false) {
            _.$slideTrack.css(transition);
        } else {
            _.$slides.eq(slide).css(transition);
        }

    };

    Slick.prototype.fadeSlide = function(slideIndex, callback) {

        var _ = this;

        if (_.cssTransitions === false) {

            _.$slides.eq(slideIndex).css({
                zIndex: _.options.zIndex
            });

            _.$slides.eq(slideIndex).animate({
                opacity: 1
            }, _.options.speed, _.options.easing, callback);

        } else {

            _.applyTransition(slideIndex);

            _.$slides.eq(slideIndex).css({
                opacity: 1,
                zIndex: _.options.zIndex
            });

            if (callback) {
                setTimeout(function() {

                    _.disableTransition(slideIndex);

                    callback.call();
                }, _.options.speed);
            }

        }

    };

    Slick.prototype.fadeSlideOut = function(slideIndex) {

        var _ = this;

        if (_.cssTransitions === false) {

            _.$slides.eq(slideIndex).animate({
                opacity: 0,
                zIndex: _.options.zIndex - 2
            }, _.options.speed, _.options.easing);

        } else {

            _.applyTransition(slideIndex);

            _.$slides.eq(slideIndex).css({
                opacity: 0,
                zIndex: _.options.zIndex - 2
            });

        }

    };

    Slick.prototype.filterSlides = Slick.prototype.slickFilter = function(filter) {

        var _ = this;

        if (filter !== null) {

            _.$slidesCache = _.$slides;

            _.unload();

            _.$slideTrack.children(this.options.slide).detach();

            _.$slidesCache.filter(filter).appendTo(_.$slideTrack);

            _.reinit();

        }

    };

    Slick.prototype.focusHandler = function() {

        var _ = this;

        _.$slider
            .off('focus.slick blur.slick')
            .on('focus.slick blur.slick',
                '*:not(.slick-arrow)', function(event) {

            event.stopImmediatePropagation();
            var $sf = $(this);

            setTimeout(function() {

                if( _.options.pauseOnFocus ) {
                    _.focussed = $sf.is(':focus');
                    _.autoPlay();
                }

            }, 0);

        });
    };

    Slick.prototype.getCurrent = Slick.prototype.slickCurrentSlide = function() {

        var _ = this;
        return _.currentSlide;

    };

    Slick.prototype.getDotCount = function() {

        var _ = this;

        var breakPoint = 0;
        var counter = 0;
        var pagerQty = 0;

        if (_.options.infinite === true) {
            while (breakPoint < _.slideCount) {
                ++pagerQty;
                breakPoint = counter + _.options.slidesToScroll;
                counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
            }
        } else if (_.options.centerMode === true) {
            pagerQty = _.slideCount;
        } else if(!_.options.asNavFor) {
            pagerQty = 1 + Math.ceil((_.slideCount - _.options.slidesToShow) / _.options.slidesToScroll);
        }else {
            while (breakPoint < _.slideCount) {
                ++pagerQty;
                breakPoint = counter + _.options.slidesToScroll;
                counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
            }
        }

        return pagerQty - 1;

    };

    Slick.prototype.getLeft = function(slideIndex) {

        var _ = this,
            targetLeft,
            verticalHeight,
            verticalOffset = 0,
            targetSlide;

        _.slideOffset = 0;
        verticalHeight = _.$slides.first().outerHeight(true);

        if (_.options.infinite === true) {
            if (_.slideCount > _.options.slidesToShow) {
                _.slideOffset = (_.slideWidth * _.options.slidesToShow) * -1;
                verticalOffset = (verticalHeight * _.options.slidesToShow) * -1;
            }
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                if (slideIndex + _.options.slidesToScroll > _.slideCount && _.slideCount > _.options.slidesToShow) {
                    if (slideIndex > _.slideCount) {
                        _.slideOffset = ((_.options.slidesToShow - (slideIndex - _.slideCount)) * _.slideWidth) * -1;
                        verticalOffset = ((_.options.slidesToShow - (slideIndex - _.slideCount)) * verticalHeight) * -1;
                    } else {
                        _.slideOffset = ((_.slideCount % _.options.slidesToScroll) * _.slideWidth) * -1;
                        verticalOffset = ((_.slideCount % _.options.slidesToScroll) * verticalHeight) * -1;
                    }
                }
            }
        } else {
            if (slideIndex + _.options.slidesToShow > _.slideCount) {
                _.slideOffset = ((slideIndex + _.options.slidesToShow) - _.slideCount) * _.slideWidth;
                verticalOffset = ((slideIndex + _.options.slidesToShow) - _.slideCount) * verticalHeight;
            }
        }

        if (_.slideCount <= _.options.slidesToShow) {
            _.slideOffset = 0;
            verticalOffset = 0;
        }

        if (_.options.centerMode === true && _.options.infinite === true) {
            _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2) - _.slideWidth;
        } else if (_.options.centerMode === true) {
            _.slideOffset = 0;
            _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2);
        }

        if (_.options.vertical === false) {
            targetLeft = ((slideIndex * _.slideWidth) * -1) + _.slideOffset;
        } else {
            targetLeft = ((slideIndex * verticalHeight) * -1) + verticalOffset;
        }

        if (_.options.variableWidth === true) {

            if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
                targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
            } else {
                targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow);
            }

            if (_.options.rtl === true) {
                if (targetSlide[0]) {
                    targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
                } else {
                    targetLeft =  0;
                }
            } else {
                targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
            }

            if (_.options.centerMode === true) {
                if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
                    targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
                } else {
                    targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow + 1);
                }

                if (_.options.rtl === true) {
                    if (targetSlide[0]) {
                        targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
                    } else {
                        targetLeft =  0;
                    }
                } else {
                    targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
                }

                targetLeft += (_.$list.width() - targetSlide.outerWidth()) / 2;
            }
        }

        return targetLeft;

    };

    Slick.prototype.getOption = Slick.prototype.slickGetOption = function(option) {

        var _ = this;

        return _.options[option];

    };

    Slick.prototype.getNavigableIndexes = function() {

        var _ = this,
            breakPoint = 0,
            counter = 0,
            indexes = [],
            max;

        if (_.options.infinite === false) {
            max = _.slideCount;
        } else {
            breakPoint = _.options.slidesToScroll * -1;
            counter = _.options.slidesToScroll * -1;
            max = _.slideCount * 2;
        }

        while (breakPoint < max) {
            indexes.push(breakPoint);
            breakPoint = counter + _.options.slidesToScroll;
            counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
        }

        return indexes;

    };

    Slick.prototype.getSlick = function() {

        return this;

    };

    Slick.prototype.getSlideCount = function() {

        var _ = this,
            slidesTraversed, swipedSlide, centerOffset;

        centerOffset = _.options.centerMode === true ? _.slideWidth * Math.floor(_.options.slidesToShow / 2) : 0;

        if (_.options.swipeToSlide === true) {
            _.$slideTrack.find('.slick-slide').each(function(index, slide) {
                if (slide.offsetLeft - centerOffset + ($(slide).outerWidth() / 2) > (_.swipeLeft * -1)) {
                    swipedSlide = slide;
                    return false;
                }
            });

            slidesTraversed = Math.abs($(swipedSlide).attr('data-slick-index') - _.currentSlide) || 1;

            return slidesTraversed;

        } else {
            return _.options.slidesToScroll;
        }

    };

    Slick.prototype.goTo = Slick.prototype.slickGoTo = function(slide, dontAnimate) {

        var _ = this;

        _.changeSlide({
            data: {
                message: 'index',
                index: parseInt(slide)
            }
        }, dontAnimate);

    };

    Slick.prototype.init = function(creation) {

        var _ = this;

        if (!$(_.$slider).hasClass('slick-initialized')) {

            $(_.$slider).addClass('slick-initialized');

            _.buildRows();
            _.buildOut();
            _.setProps();
            _.startLoad();
            _.loadSlider();
            _.initializeEvents();
            _.updateArrows();
            _.updateDots();
            _.checkResponsive(true);
            _.focusHandler();

        }

        if (creation) {
            _.$slider.trigger('init', [_]);
        }

        if (_.options.accessibility === true) {
            _.initADA();
        }

        if ( _.options.autoplay ) {

            _.paused = false;
            _.autoPlay();

        }

    };

    Slick.prototype.initADA = function() {
        var _ = this;
        _.$slides.add(_.$slideTrack.find('.slick-cloned')).attr({
            'aria-hidden': 'true',
            'tabindex': '-1'
        }).find('a, input, button, select').attr({
            'tabindex': '-1'
        });

        _.$slideTrack.attr('role', 'listbox');

        _.$slides.not(_.$slideTrack.find('.slick-cloned')).each(function(i) {
            $(this).attr({
                'role': 'option',
                'aria-describedby': 'slick-slide' + _.instanceUid + i + ''
            });
        });

        if (_.$dots !== null) {
            _.$dots.attr('role', 'tablist').find('li').each(function(i) {
                $(this).attr({
                    'role': 'presentation',
                    'aria-selected': 'false',
                    'aria-controls': 'navigation' + _.instanceUid + i + '',
                    'id': 'slick-slide' + _.instanceUid + i + ''
                });
            })
                .first().attr('aria-selected', 'true').end()
                .find('button').attr('role', 'button').end()
                .closest('div').attr('role', 'toolbar');
        }
        _.activateADA();

    };

    Slick.prototype.initArrowEvents = function() {

        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
            _.$prevArrow
               .off('click.slick')
               .on('click.slick', {
                    message: 'previous'
               }, _.changeSlide);
            _.$nextArrow
               .off('click.slick')
               .on('click.slick', {
                    message: 'next'
               }, _.changeSlide);
        }

    };

    Slick.prototype.initDotEvents = function() {

        var _ = this;

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
            $('li', _.$dots).on('click.slick', {
                message: 'index'
            }, _.changeSlide);
        }

        if ( _.options.dots === true && _.options.pauseOnDotsHover === true ) {

            $('li', _.$dots)
                .on('mouseenter.slick', $.proxy(_.interrupt, _, true))
                .on('mouseleave.slick', $.proxy(_.interrupt, _, false));

        }

    };

    Slick.prototype.initSlideEvents = function() {

        var _ = this;

        if ( _.options.pauseOnHover ) {

            _.$list.on('mouseenter.slick', $.proxy(_.interrupt, _, true));
            _.$list.on('mouseleave.slick', $.proxy(_.interrupt, _, false));

        }

    };

    Slick.prototype.initializeEvents = function() {

        var _ = this;

        _.initArrowEvents();

        _.initDotEvents();
        _.initSlideEvents();

        _.$list.on('touchstart.slick mousedown.slick', {
            action: 'start'
        }, _.swipeHandler);
        _.$list.on('touchmove.slick mousemove.slick', {
            action: 'move'
        }, _.swipeHandler);
        _.$list.on('touchend.slick mouseup.slick', {
            action: 'end'
        }, _.swipeHandler);
        _.$list.on('touchcancel.slick mouseleave.slick', {
            action: 'end'
        }, _.swipeHandler);

        _.$list.on('click.slick', _.clickHandler);

        $(document).on(_.visibilityChange, $.proxy(_.visibility, _));

        if (_.options.accessibility === true) {
            _.$list.on('keydown.slick', _.keyHandler);
        }

        if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().on('click.slick', _.selectHandler);
        }

        $(window).on('orientationchange.slick.slick-' + _.instanceUid, $.proxy(_.orientationChange, _));

        $(window).on('resize.slick.slick-' + _.instanceUid, $.proxy(_.resize, _));

        $('[draggable!=true]', _.$slideTrack).on('dragstart', _.preventDefault);

        $(window).on('load.slick.slick-' + _.instanceUid, _.setPosition);
        $(document).on('ready.slick.slick-' + _.instanceUid, _.setPosition);

    };

    Slick.prototype.initUI = function() {

        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {

            _.$prevArrow.show();
            _.$nextArrow.show();

        }

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

            _.$dots.show();

        }

    };

    Slick.prototype.keyHandler = function(event) {

        var _ = this;
         //Dont slide if the cursor is inside the form fields and arrow keys are pressed
        if(!event.target.tagName.match('TEXTAREA|INPUT|SELECT')) {
            if (event.keyCode === 37 && _.options.accessibility === true) {
                _.changeSlide({
                    data: {
                        message: _.options.rtl === true ? 'next' :  'previous'
                    }
                });
            } else if (event.keyCode === 39 && _.options.accessibility === true) {
                _.changeSlide({
                    data: {
                        message: _.options.rtl === true ? 'previous' : 'next'
                    }
                });
            }
        }

    };

    Slick.prototype.lazyLoad = function() {

        var _ = this,
            loadRange, cloneRange, rangeStart, rangeEnd;

        function loadImages(imagesScope) {

            $('img[data-lazy]', imagesScope).each(function() {

                var image = $(this),
                    imageSource = $(this).attr('data-lazy'),
                    imageToLoad = document.createElement('img');

                imageToLoad.onload = function() {

                    image
                        .animate({ opacity: 0 }, 100, function() {
                            image
                                .attr('src', imageSource)
                                .animate({ opacity: 1 }, 200, function() {
                                    image
                                        .removeAttr('data-lazy')
                                        .removeClass('slick-loading');
                                });
                            _.$slider.trigger('lazyLoaded', [_, image, imageSource]);
                        });

                };

                imageToLoad.onerror = function() {

                    image
                        .removeAttr( 'data-lazy' )
                        .removeClass( 'slick-loading' )
                        .addClass( 'slick-lazyload-error' );

                    _.$slider.trigger('lazyLoadError', [ _, image, imageSource ]);

                };

                imageToLoad.src = imageSource;

            });

        }

        if (_.options.centerMode === true) {
            if (_.options.infinite === true) {
                rangeStart = _.currentSlide + (_.options.slidesToShow / 2 + 1);
                rangeEnd = rangeStart + _.options.slidesToShow + 2;
            } else {
                rangeStart = Math.max(0, _.currentSlide - (_.options.slidesToShow / 2 + 1));
                rangeEnd = 2 + (_.options.slidesToShow / 2 + 1) + _.currentSlide;
            }
        } else {
            rangeStart = _.options.infinite ? _.options.slidesToShow + _.currentSlide : _.currentSlide;
            rangeEnd = Math.ceil(rangeStart + _.options.slidesToShow);
            if (_.options.fade === true) {
                if (rangeStart > 0) rangeStart--;
                if (rangeEnd <= _.slideCount) rangeEnd++;
            }
        }

        loadRange = _.$slider.find('.slick-slide').slice(rangeStart, rangeEnd);
        loadImages(loadRange);

        if (_.slideCount <= _.options.slidesToShow) {
            cloneRange = _.$slider.find('.slick-slide');
            loadImages(cloneRange);
        } else
        if (_.currentSlide >= _.slideCount - _.options.slidesToShow) {
            cloneRange = _.$slider.find('.slick-cloned').slice(0, _.options.slidesToShow);
            loadImages(cloneRange);
        } else if (_.currentSlide === 0) {
            cloneRange = _.$slider.find('.slick-cloned').slice(_.options.slidesToShow * -1);
            loadImages(cloneRange);
        }

    };

    Slick.prototype.loadSlider = function() {

        var _ = this;

        _.setPosition();

        _.$slideTrack.css({
            opacity: 1
        });

        _.$slider.removeClass('slick-loading');

        _.initUI();

        if (_.options.lazyLoad === 'progressive') {
            _.progressiveLazyLoad();
        }

    };

    Slick.prototype.next = Slick.prototype.slickNext = function() {

        var _ = this;

        _.changeSlide({
            data: {
                message: 'next'
            }
        });

    };

    Slick.prototype.orientationChange = function() {

        var _ = this;

        _.checkResponsive();
        _.setPosition();

    };

    Slick.prototype.pause = Slick.prototype.slickPause = function() {

        var _ = this;

        _.autoPlayClear();
        _.paused = true;

    };

    Slick.prototype.play = Slick.prototype.slickPlay = function() {

        var _ = this;

        _.autoPlay();
        _.options.autoplay = true;
        _.paused = false;
        _.focussed = false;
        _.interrupted = false;

    };

    Slick.prototype.postSlide = function(index) {

        var _ = this;

        if( !_.unslicked ) {

            _.$slider.trigger('afterChange', [_, index]);

            _.animating = false;

            _.setPosition();

            _.swipeLeft = null;

            if ( _.options.autoplay ) {
                _.autoPlay();
            }

            if (_.options.accessibility === true) {
                _.initADA();
            }

        }

    };

    Slick.prototype.prev = Slick.prototype.slickPrev = function() {

        var _ = this;

        _.changeSlide({
            data: {
                message: 'previous'
            }
        });

    };

    Slick.prototype.preventDefault = function(event) {

        event.preventDefault();

    };

    Slick.prototype.progressiveLazyLoad = function( tryCount ) {

        tryCount = tryCount || 1;

        var _ = this,
            $imgsToLoad = $( 'img[data-lazy]', _.$slider ),
            image,
            imageSource,
            imageToLoad;

        if ( $imgsToLoad.length ) {

            image = $imgsToLoad.first();
            imageSource = image.attr('data-lazy');
            imageToLoad = document.createElement('img');

            imageToLoad.onload = function() {

                image
                    .attr( 'src', imageSource )
                    .removeAttr('data-lazy')
                    .removeClass('slick-loading');

                if ( _.options.adaptiveHeight === true ) {
                    _.setPosition();
                }

                _.$slider.trigger('lazyLoaded', [ _, image, imageSource ]);
                _.progressiveLazyLoad();

            };

            imageToLoad.onerror = function() {

                if ( tryCount < 3 ) {

                    /**
                     * try to load the image 3 times,
                     * leave a slight delay so we don't get
                     * servers blocking the request.
                     */
                    setTimeout( function() {
                        _.progressiveLazyLoad( tryCount + 1 );
                    }, 500 );

                } else {

                    image
                        .removeAttr( 'data-lazy' )
                        .removeClass( 'slick-loading' )
                        .addClass( 'slick-lazyload-error' );

                    _.$slider.trigger('lazyLoadError', [ _, image, imageSource ]);

                    _.progressiveLazyLoad();

                }

            };

            imageToLoad.src = imageSource;

        } else {

            _.$slider.trigger('allImagesLoaded', [ _ ]);

        }

    };

    Slick.prototype.refresh = function( initializing ) {

        var _ = this, currentSlide, lastVisibleIndex;

        lastVisibleIndex = _.slideCount - _.options.slidesToShow;

        // in non-infinite sliders, we don't want to go past the
        // last visible index.
        if( !_.options.infinite && ( _.currentSlide > lastVisibleIndex )) {
            _.currentSlide = lastVisibleIndex;
        }

        // if less slides than to show, go to start.
        if ( _.slideCount <= _.options.slidesToShow ) {
            _.currentSlide = 0;

        }

        currentSlide = _.currentSlide;

        _.destroy(true);

        $.extend(_, _.initials, { currentSlide: currentSlide });

        _.init();

        if( !initializing ) {

            _.changeSlide({
                data: {
                    message: 'index',
                    index: currentSlide
                }
            }, false);

        }

    };

    Slick.prototype.registerBreakpoints = function() {

        var _ = this, breakpoint, currentBreakpoint, l,
            responsiveSettings = _.options.responsive || null;

        if ( $.type(responsiveSettings) === 'array' && responsiveSettings.length ) {

            _.respondTo = _.options.respondTo || 'window';

            for ( breakpoint in responsiveSettings ) {

                l = _.breakpoints.length-1;
                currentBreakpoint = responsiveSettings[breakpoint].breakpoint;

                if (responsiveSettings.hasOwnProperty(breakpoint)) {

                    // loop through the breakpoints and cut out any existing
                    // ones with the same breakpoint number, we don't want dupes.
                    while( l >= 0 ) {
                        if( _.breakpoints[l] && _.breakpoints[l] === currentBreakpoint ) {
                            _.breakpoints.splice(l,1);
                        }
                        l--;
                    }

                    _.breakpoints.push(currentBreakpoint);
                    _.breakpointSettings[currentBreakpoint] = responsiveSettings[breakpoint].settings;

                }

            }

            _.breakpoints.sort(function(a, b) {
                return ( _.options.mobileFirst ) ? a-b : b-a;
            });

        }

    };

    Slick.prototype.reinit = function() {

        var _ = this;

        _.$slides =
            _.$slideTrack
                .children(_.options.slide)
                .addClass('slick-slide');

        _.slideCount = _.$slides.length;

        if (_.currentSlide >= _.slideCount && _.currentSlide !== 0) {
            _.currentSlide = _.currentSlide - _.options.slidesToScroll;
        }

        if (_.slideCount <= _.options.slidesToShow) {
            _.currentSlide = 0;
        }

        _.registerBreakpoints();

        _.setProps();
        _.setupInfinite();
        _.buildArrows();
        _.updateArrows();
        _.initArrowEvents();
        _.buildDots();
        _.updateDots();
        _.initDotEvents();
        _.cleanUpSlideEvents();
        _.initSlideEvents();

        _.checkResponsive(false, true);

        if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().on('click.slick', _.selectHandler);
        }

        _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);

        _.setPosition();
        _.focusHandler();

        _.paused = !_.options.autoplay;
        _.autoPlay();

        _.$slider.trigger('reInit', [_]);

    };

    Slick.prototype.resize = function() {

        var _ = this;

        if ($(window).width() !== _.windowWidth) {
            clearTimeout(_.windowDelay);
            _.windowDelay = window.setTimeout(function() {
                _.windowWidth = $(window).width();
                _.checkResponsive();
                if( !_.unslicked ) { _.setPosition(); }
            }, 50);
        }
    };

    Slick.prototype.removeSlide = Slick.prototype.slickRemove = function(index, removeBefore, removeAll) {

        var _ = this;

        if (typeof(index) === 'boolean') {
            removeBefore = index;
            index = removeBefore === true ? 0 : _.slideCount - 1;
        } else {
            index = removeBefore === true ? --index : index;
        }

        if (_.slideCount < 1 || index < 0 || index > _.slideCount - 1) {
            return false;
        }

        _.unload();

        if (removeAll === true) {
            _.$slideTrack.children().remove();
        } else {
            _.$slideTrack.children(this.options.slide).eq(index).remove();
        }

        _.$slides = _.$slideTrack.children(this.options.slide);

        _.$slideTrack.children(this.options.slide).detach();

        _.$slideTrack.append(_.$slides);

        _.$slidesCache = _.$slides;

        _.reinit();

    };

    Slick.prototype.setCSS = function(position) {

        var _ = this,
            positionProps = {},
            x, y;

        if (_.options.rtl === true) {
            position = -position;
        }
        x = _.positionProp == 'left' ? Math.ceil(position) + 'px' : '0px';
        y = _.positionProp == 'top' ? Math.ceil(position) + 'px' : '0px';

        positionProps[_.positionProp] = position;

        if (_.transformsEnabled === false) {
            _.$slideTrack.css(positionProps);
        } else {
            positionProps = {};
            if (_.cssTransitions === false) {
                positionProps[_.animType] = 'translate(' + x + ', ' + y + ')';
                _.$slideTrack.css(positionProps);
            } else {
                positionProps[_.animType] = 'translate3d(' + x + ', ' + y + ', 0px)';
                _.$slideTrack.css(positionProps);
            }
        }

    };

    Slick.prototype.setDimensions = function() {

        var _ = this;

        if (_.options.vertical === false) {
            if (_.options.centerMode === true) {
                _.$list.css({
                    padding: ('0px ' + _.options.centerPadding)
                });
            }
        } else {
            _.$list.height(_.$slides.first().outerHeight(true) * _.options.slidesToShow);
            if (_.options.centerMode === true) {
                _.$list.css({
                    padding: (_.options.centerPadding + ' 0px')
                });
            }
        }

        _.listWidth = _.$list.width();
        _.listHeight = _.$list.height();


        if (_.options.vertical === false && _.options.variableWidth === false) {
            _.slideWidth = Math.ceil(_.listWidth / _.options.slidesToShow);
            _.$slideTrack.width(Math.ceil((_.slideWidth * _.$slideTrack.children('.slick-slide').length)));

        } else if (_.options.variableWidth === true) {
            _.$slideTrack.width(5000 * _.slideCount);
        } else {
            _.slideWidth = Math.ceil(_.listWidth);
            _.$slideTrack.height(Math.ceil((_.$slides.first().outerHeight(true) * _.$slideTrack.children('.slick-slide').length)));
        }

        var offset = _.$slides.first().outerWidth(true) - _.$slides.first().width();
        if (_.options.variableWidth === false) _.$slideTrack.children('.slick-slide').width(_.slideWidth - offset);

    };

    Slick.prototype.setFade = function() {

        var _ = this,
            targetLeft;

        _.$slides.each(function(index, element) {
            targetLeft = (_.slideWidth * index) * -1;
            if (_.options.rtl === true) {
                $(element).css({
                    position: 'relative',
                    right: targetLeft,
                    top: 0,
                    zIndex: _.options.zIndex - 2,
                    opacity: 0
                });
            } else {
                $(element).css({
                    position: 'relative',
                    left: targetLeft,
                    top: 0,
                    zIndex: _.options.zIndex - 2,
                    opacity: 0
                });
            }
        });

        _.$slides.eq(_.currentSlide).css({
            zIndex: _.options.zIndex - 1,
            opacity: 1
        });

    };

    Slick.prototype.setHeight = function() {

        var _ = this;

        if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
            var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
            _.$list.css('height', targetHeight);
        }

    };

    Slick.prototype.setOption =
    Slick.prototype.slickSetOption = function() {

        /**
         * accepts arguments in format of:
         *
         *  - for changing a single option's value:
         *     .slick("setOption", option, value, refresh )
         *
         *  - for changing a set of responsive options:
         *     .slick("setOption", 'responsive', [{}, ...], refresh )
         *
         *  - for updating multiple values at once (not responsive)
         *     .slick("setOption", { 'option': value, ... }, refresh )
         */

        var _ = this, l, item, option, value, refresh = false, type;

        if( $.type( arguments[0] ) === 'object' ) {

            option =  arguments[0];
            refresh = arguments[1];
            type = 'multiple';

        } else if ( $.type( arguments[0] ) === 'string' ) {

            option =  arguments[0];
            value = arguments[1];
            refresh = arguments[2];

            if ( arguments[0] === 'responsive' && $.type( arguments[1] ) === 'array' ) {

                type = 'responsive';

            } else if ( typeof arguments[1] !== 'undefined' ) {

                type = 'single';

            }

        }

        if ( type === 'single' ) {

            _.options[option] = value;


        } else if ( type === 'multiple' ) {

            $.each( option , function( opt, val ) {

                _.options[opt] = val;

            });


        } else if ( type === 'responsive' ) {

            for ( item in value ) {

                if( $.type( _.options.responsive ) !== 'array' ) {

                    _.options.responsive = [ value[item] ];

                } else {

                    l = _.options.responsive.length-1;

                    // loop through the responsive object and splice out duplicates.
                    while( l >= 0 ) {

                        if( _.options.responsive[l].breakpoint === value[item].breakpoint ) {

                            _.options.responsive.splice(l,1);

                        }

                        l--;

                    }

                    _.options.responsive.push( value[item] );

                }

            }

        }

        if ( refresh ) {

            _.unload();
            _.reinit();

        }

    };

    Slick.prototype.setPosition = function() {

        var _ = this;

        _.setDimensions();

        _.setHeight();

        if (_.options.fade === false) {
            _.setCSS(_.getLeft(_.currentSlide));
        } else {
            _.setFade();
        }

        _.$slider.trigger('setPosition', [_]);

    };

    Slick.prototype.setProps = function() {

        var _ = this,
            bodyStyle = document.body.style;

        _.positionProp = _.options.vertical === true ? 'top' : 'left';

        if (_.positionProp === 'top') {
            _.$slider.addClass('slick-vertical');
        } else {
            _.$slider.removeClass('slick-vertical');
        }

        if (bodyStyle.WebkitTransition !== undefined ||
            bodyStyle.MozTransition !== undefined ||
            bodyStyle.msTransition !== undefined) {
            if (_.options.useCSS === true) {
                _.cssTransitions = true;
            }
        }

        if ( _.options.fade ) {
            if ( typeof _.options.zIndex === 'number' ) {
                if( _.options.zIndex < 3 ) {
                    _.options.zIndex = 3;
                }
            } else {
                _.options.zIndex = _.defaults.zIndex;
            }
        }

        if (bodyStyle.OTransform !== undefined) {
            _.animType = 'OTransform';
            _.transformType = '-o-transform';
            _.transitionType = 'OTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.MozTransform !== undefined) {
            _.animType = 'MozTransform';
            _.transformType = '-moz-transform';
            _.transitionType = 'MozTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.MozPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.webkitTransform !== undefined) {
            _.animType = 'webkitTransform';
            _.transformType = '-webkit-transform';
            _.transitionType = 'webkitTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.msTransform !== undefined) {
            _.animType = 'msTransform';
            _.transformType = '-ms-transform';
            _.transitionType = 'msTransition';
            if (bodyStyle.msTransform === undefined) _.animType = false;
        }
        if (bodyStyle.transform !== undefined && _.animType !== false) {
            _.animType = 'transform';
            _.transformType = 'transform';
            _.transitionType = 'transition';
        }
        _.transformsEnabled = _.options.useTransform && (_.animType !== null && _.animType !== false);
    };


    Slick.prototype.setSlideClasses = function(index) {

        var _ = this,
            centerOffset, allSlides, indexOffset, remainder;

        allSlides = _.$slider
            .find('.slick-slide')
            .removeClass('slick-active slick-center slick-current')
            .attr('aria-hidden', 'true');

        _.$slides
            .eq(index)
            .addClass('slick-current');

        if (_.options.centerMode === true) {

            centerOffset = Math.floor(_.options.slidesToShow / 2);

            if (_.options.infinite === true) {

                if (index >= centerOffset && index <= (_.slideCount - 1) - centerOffset) {

                    _.$slides
                        .slice(index - centerOffset, index + centerOffset + 1)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');

                } else {

                    indexOffset = _.options.slidesToShow + index;
                    allSlides
                        .slice(indexOffset - centerOffset + 1, indexOffset + centerOffset + 2)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');

                }

                if (index === 0) {

                    allSlides
                        .eq(allSlides.length - 1 - _.options.slidesToShow)
                        .addClass('slick-center');

                } else if (index === _.slideCount - 1) {

                    allSlides
                        .eq(_.options.slidesToShow)
                        .addClass('slick-center');

                }

            }

            _.$slides
                .eq(index)
                .addClass('slick-center');

        } else {

            if (index >= 0 && index <= (_.slideCount - _.options.slidesToShow)) {

                _.$slides
                    .slice(index, index + _.options.slidesToShow)
                    .addClass('slick-active')
                    .attr('aria-hidden', 'false');

            } else if (allSlides.length <= _.options.slidesToShow) {

                allSlides
                    .addClass('slick-active')
                    .attr('aria-hidden', 'false');

            } else {

                remainder = _.slideCount % _.options.slidesToShow;
                indexOffset = _.options.infinite === true ? _.options.slidesToShow + index : index;

                if (_.options.slidesToShow == _.options.slidesToScroll && (_.slideCount - index) < _.options.slidesToShow) {

                    allSlides
                        .slice(indexOffset - (_.options.slidesToShow - remainder), indexOffset + remainder)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');

                } else {

                    allSlides
                        .slice(indexOffset, indexOffset + _.options.slidesToShow)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');

                }

            }

        }

        if (_.options.lazyLoad === 'ondemand') {
            _.lazyLoad();
        }

    };

    Slick.prototype.setupInfinite = function() {

        var _ = this,
            i, slideIndex, infiniteCount;

        if (_.options.fade === true) {
            _.options.centerMode = false;
        }

        if (_.options.infinite === true && _.options.fade === false) {

            slideIndex = null;

            if (_.slideCount > _.options.slidesToShow) {

                if (_.options.centerMode === true) {
                    infiniteCount = _.options.slidesToShow + 1;
                } else {
                    infiniteCount = _.options.slidesToShow;
                }

                for (i = _.slideCount; i > (_.slideCount -
                        infiniteCount); i -= 1) {
                    slideIndex = i - 1;
                    $(_.$slides[slideIndex]).clone(true).attr('id', '')
                        .attr('data-slick-index', slideIndex - _.slideCount)
                        .prependTo(_.$slideTrack).addClass('slick-cloned');
                }
                for (i = 0; i < infiniteCount; i += 1) {
                    slideIndex = i;
                    $(_.$slides[slideIndex]).clone(true).attr('id', '')
                        .attr('data-slick-index', slideIndex + _.slideCount)
                        .appendTo(_.$slideTrack).addClass('slick-cloned');
                }
                _.$slideTrack.find('.slick-cloned').find('[id]').each(function() {
                    $(this).attr('id', '');
                });

            }

        }

    };

    Slick.prototype.interrupt = function( toggle ) {

        var _ = this;

        if( !toggle ) {
            _.autoPlay();
        }
        _.interrupted = toggle;

    };

    Slick.prototype.selectHandler = function(event) {

        var _ = this;

        var targetElement =
            $(event.target).is('.slick-slide') ?
                $(event.target) :
                $(event.target).parents('.slick-slide');

        var index = parseInt(targetElement.attr('data-slick-index'));

        if (!index) index = 0;

        if (_.slideCount <= _.options.slidesToShow) {

            _.setSlideClasses(index);
            _.asNavFor(index);
            return;

        }

        _.slideHandler(index);

    };

    Slick.prototype.slideHandler = function(index, sync, dontAnimate) {

        var targetSlide, animSlide, oldSlide, slideLeft, targetLeft = null,
            _ = this, navTarget;

        sync = sync || false;

        if (_.animating === true && _.options.waitForAnimate === true) {
            return;
        }

        if (_.options.fade === true && _.currentSlide === index) {
            return;
        }

        if (_.slideCount <= _.options.slidesToShow) {
            return;
        }

        if (sync === false) {
            _.asNavFor(index);
        }

        targetSlide = index;
        targetLeft = _.getLeft(targetSlide);
        slideLeft = _.getLeft(_.currentSlide);

        _.currentLeft = _.swipeLeft === null ? slideLeft : _.swipeLeft;

        if (_.options.infinite === false && _.options.centerMode === false && (index < 0 || index > _.getDotCount() * _.options.slidesToScroll)) {
            if (_.options.fade === false) {
                targetSlide = _.currentSlide;
                if (dontAnimate !== true) {
                    _.animateSlide(slideLeft, function() {
                        _.postSlide(targetSlide);
                    });
                } else {
                    _.postSlide(targetSlide);
                }
            }
            return;
        } else if (_.options.infinite === false && _.options.centerMode === true && (index < 0 || index > (_.slideCount - _.options.slidesToScroll))) {
            if (_.options.fade === false) {
                targetSlide = _.currentSlide;
                if (dontAnimate !== true) {
                    _.animateSlide(slideLeft, function() {
                        _.postSlide(targetSlide);
                    });
                } else {
                    _.postSlide(targetSlide);
                }
            }
            return;
        }

        if ( _.options.autoplay ) {
            clearInterval(_.autoPlayTimer);
        }

        if (targetSlide < 0) {
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                animSlide = _.slideCount - (_.slideCount % _.options.slidesToScroll);
            } else {
                animSlide = _.slideCount + targetSlide;
            }
        } else if (targetSlide >= _.slideCount) {
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                animSlide = 0;
            } else {
                animSlide = targetSlide - _.slideCount;
            }
        } else {
            animSlide = targetSlide;
        }

        _.animating = true;

        _.$slider.trigger('beforeChange', [_, _.currentSlide, animSlide]);

        oldSlide = _.currentSlide;
        _.currentSlide = animSlide;

        _.setSlideClasses(_.currentSlide);

        if ( _.options.asNavFor ) {

            navTarget = _.getNavTarget();
            navTarget = navTarget.slick('getSlick');

            if ( navTarget.slideCount <= navTarget.options.slidesToShow ) {
                navTarget.setSlideClasses(_.currentSlide);
            }

        }

        _.updateDots();
        _.updateArrows();

        if (_.options.fade === true) {
            if (dontAnimate !== true) {

                _.fadeSlideOut(oldSlide);

                _.fadeSlide(animSlide, function() {
                    _.postSlide(animSlide);
                });

            } else {
                _.postSlide(animSlide);
            }
            _.animateHeight();
            return;
        }

        if (dontAnimate !== true) {
            _.animateSlide(targetLeft, function() {
                _.postSlide(animSlide);
            });
        } else {
            _.postSlide(animSlide);
        }

    };

    Slick.prototype.startLoad = function() {

        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {

            _.$prevArrow.hide();
            _.$nextArrow.hide();

        }

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

            _.$dots.hide();

        }

        _.$slider.addClass('slick-loading');

    };

    Slick.prototype.swipeDirection = function() {

        var xDist, yDist, r, swipeAngle, _ = this;

        xDist = _.touchObject.startX - _.touchObject.curX;
        yDist = _.touchObject.startY - _.touchObject.curY;
        r = Math.atan2(yDist, xDist);

        swipeAngle = Math.round(r * 180 / Math.PI);
        if (swipeAngle < 0) {
            swipeAngle = 360 - Math.abs(swipeAngle);
        }

        if ((swipeAngle <= 45) && (swipeAngle >= 0)) {
            return (_.options.rtl === false ? 'left' : 'right');
        }
        if ((swipeAngle <= 360) && (swipeAngle >= 315)) {
            return (_.options.rtl === false ? 'left' : 'right');
        }
        if ((swipeAngle >= 135) && (swipeAngle <= 225)) {
            return (_.options.rtl === false ? 'right' : 'left');
        }
        if (_.options.verticalSwiping === true) {
            if ((swipeAngle >= 35) && (swipeAngle <= 135)) {
                return 'down';
            } else {
                return 'up';
            }
        }

        return 'vertical';

    };

    Slick.prototype.swipeEnd = function(event) {

        var _ = this,
            slideCount,
            direction;

        _.dragging = false;
        _.interrupted = false;
        _.shouldClick = ( _.touchObject.swipeLength > 10 ) ? false : true;

        if ( _.touchObject.curX === undefined ) {
            return false;
        }

        if ( _.touchObject.edgeHit === true ) {
            _.$slider.trigger('edge', [_, _.swipeDirection() ]);
        }

        if ( _.touchObject.swipeLength >= _.touchObject.minSwipe ) {

            direction = _.swipeDirection();

            switch ( direction ) {

                case 'left':
                case 'down':

                    slideCount =
                        _.options.swipeToSlide ?
                            _.checkNavigable( _.currentSlide + _.getSlideCount() ) :
                            _.currentSlide + _.getSlideCount();

                    _.currentDirection = 0;

                    break;

                case 'right':
                case 'up':

                    slideCount =
                        _.options.swipeToSlide ?
                            _.checkNavigable( _.currentSlide - _.getSlideCount() ) :
                            _.currentSlide - _.getSlideCount();

                    _.currentDirection = 1;

                    break;

                default:


            }

            if( direction != 'vertical' ) {

                _.slideHandler( slideCount );
                _.touchObject = {};
                _.$slider.trigger('swipe', [_, direction ]);

            }

        } else {

            if ( _.touchObject.startX !== _.touchObject.curX ) {

                _.slideHandler( _.currentSlide );
                _.touchObject = {};

            }

        }

    };

    Slick.prototype.swipeHandler = function(event) {

        var _ = this;

        if ((_.options.swipe === false) || ('ontouchend' in document && _.options.swipe === false)) {
            return;
        } else if (_.options.draggable === false && event.type.indexOf('mouse') !== -1) {
            return;
        }

        _.touchObject.fingerCount = event.originalEvent && event.originalEvent.touches !== undefined ?
            event.originalEvent.touches.length : 1;

        _.touchObject.minSwipe = _.listWidth / _.options
            .touchThreshold;

        if (_.options.verticalSwiping === true) {
            _.touchObject.minSwipe = _.listHeight / _.options
                .touchThreshold;
        }

        switch (event.data.action) {

            case 'start':
                _.swipeStart(event);
                break;

            case 'move':
                _.swipeMove(event);
                break;

            case 'end':
                _.swipeEnd(event);
                break;

        }

    };

    Slick.prototype.swipeMove = function(event) {

        var _ = this,
            edgeWasHit = false,
            curLeft, swipeDirection, swipeLength, positionOffset, touches;

        touches = event.originalEvent !== undefined ? event.originalEvent.touches : null;

        if (!_.dragging || touches && touches.length !== 1) {
            return false;
        }

        curLeft = _.getLeft(_.currentSlide);

        _.touchObject.curX = touches !== undefined ? touches[0].pageX : event.clientX;
        _.touchObject.curY = touches !== undefined ? touches[0].pageY : event.clientY;

        _.touchObject.swipeLength = Math.round(Math.sqrt(
            Math.pow(_.touchObject.curX - _.touchObject.startX, 2)));

        if (_.options.verticalSwiping === true) {
            _.touchObject.swipeLength = Math.round(Math.sqrt(
                Math.pow(_.touchObject.curY - _.touchObject.startY, 2)));
        }

        swipeDirection = _.swipeDirection();

        if (swipeDirection === 'vertical') {
            return;
        }

        if (event.originalEvent !== undefined && _.touchObject.swipeLength > 4) {
            event.preventDefault();
        }

        positionOffset = (_.options.rtl === false ? 1 : -1) * (_.touchObject.curX > _.touchObject.startX ? 1 : -1);
        if (_.options.verticalSwiping === true) {
            positionOffset = _.touchObject.curY > _.touchObject.startY ? 1 : -1;
        }


        swipeLength = _.touchObject.swipeLength;

        _.touchObject.edgeHit = false;

        if (_.options.infinite === false) {
            if ((_.currentSlide === 0 && swipeDirection === 'right') || (_.currentSlide >= _.getDotCount() && swipeDirection === 'left')) {
                swipeLength = _.touchObject.swipeLength * _.options.edgeFriction;
                _.touchObject.edgeHit = true;
            }
        }

        if (_.options.vertical === false) {
            _.swipeLeft = curLeft + swipeLength * positionOffset;
        } else {
            _.swipeLeft = curLeft + (swipeLength * (_.$list.height() / _.listWidth)) * positionOffset;
        }
        if (_.options.verticalSwiping === true) {
            _.swipeLeft = curLeft + swipeLength * positionOffset;
        }

        if (_.options.fade === true || _.options.touchMove === false) {
            return false;
        }

        if (_.animating === true) {
            _.swipeLeft = null;
            return false;
        }

        _.setCSS(_.swipeLeft);

    };

    Slick.prototype.swipeStart = function(event) {

        var _ = this,
            touches;

        _.interrupted = true;

        if (_.touchObject.fingerCount !== 1 || _.slideCount <= _.options.slidesToShow) {
            _.touchObject = {};
            return false;
        }

        if (event.originalEvent !== undefined && event.originalEvent.touches !== undefined) {
            touches = event.originalEvent.touches[0];
        }

        _.touchObject.startX = _.touchObject.curX = touches !== undefined ? touches.pageX : event.clientX;
        _.touchObject.startY = _.touchObject.curY = touches !== undefined ? touches.pageY : event.clientY;

        _.dragging = true;

    };

    Slick.prototype.unfilterSlides = Slick.prototype.slickUnfilter = function() {

        var _ = this;

        if (_.$slidesCache !== null) {

            _.unload();

            _.$slideTrack.children(this.options.slide).detach();

            _.$slidesCache.appendTo(_.$slideTrack);

            _.reinit();

        }

    };

    Slick.prototype.unload = function() {

        var _ = this;

        $('.slick-cloned', _.$slider).remove();

        if (_.$dots) {
            _.$dots.remove();
        }

        if (_.$prevArrow && _.htmlExpr.test(_.options.prevArrow)) {
            _.$prevArrow.remove();
        }

        if (_.$nextArrow && _.htmlExpr.test(_.options.nextArrow)) {
            _.$nextArrow.remove();
        }

        _.$slides
            .removeClass('slick-slide slick-active slick-visible slick-current')
            .attr('aria-hidden', 'true')
            .css('width', '');

    };

    Slick.prototype.unslick = function(fromBreakpoint) {

        var _ = this;
        _.$slider.trigger('unslick', [_, fromBreakpoint]);
        _.destroy();

    };

    Slick.prototype.updateArrows = function() {

        var _ = this,
            centerOffset;

        centerOffset = Math.floor(_.options.slidesToShow / 2);

        if ( _.options.arrows === true &&
            _.slideCount > _.options.slidesToShow &&
            !_.options.infinite ) {

            _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
            _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            if (_.currentSlide === 0) {

                _.$prevArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            } else if (_.currentSlide >= _.slideCount - _.options.slidesToShow && _.options.centerMode === false) {

                _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            } else if (_.currentSlide >= _.slideCount - 1 && _.options.centerMode === true) {

                _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            }

        }

    };

    Slick.prototype.updateDots = function() {

        var _ = this;

        if (_.$dots !== null) {

            _.$dots
                .find('li')
                .removeClass('slick-active')
                .attr('aria-hidden', 'true');

            _.$dots
                .find('li')
                .eq(Math.floor(_.currentSlide / _.options.slidesToScroll))
                .addClass('slick-active')
                .attr('aria-hidden', 'false');

        }

    };

    Slick.prototype.visibility = function() {

        var _ = this;

        if ( _.options.autoplay ) {

            if ( document[_.hidden] ) {

                _.interrupted = true;

            } else {

                _.interrupted = false;

            }

        }

    };

    $.fn.slick = function() {
        var _ = this,
            opt = arguments[0],
            args = Array.prototype.slice.call(arguments, 1),
            l = _.length,
            i,
            ret;
        for (i = 0; i < l; i++) {
            if (typeof opt == 'object' || typeof opt == 'undefined')
                _[i].slick = new Slick(_[i], opt);
            else
                ret = _[i].slick[opt].apply(_[i].slick, args);
            if (typeof ret != 'undefined') return ret;
        }
        return _;
    };

}));


$(function(){
	$('.main-nav').setup_navigation();
});

var keyCodeMap = {
        48:"0", 49:"1", 50:"2", 51:"3", 52:"4", 53:"5", 54:"6", 55:"7", 56:"8", 57:"9", 59:";",
        65:"a", 66:"b", 67:"c", 68:"d", 69:"e", 70:"f", 71:"g", 72:"h", 73:"i", 74:"j", 75:"k", 76:"l",
        77:"m", 78:"n", 79:"o", 80:"p", 81:"q", 82:"r", 83:"s", 84:"t", 85:"u", 86:"v", 87:"w", 88:"x", 89:"y", 90:"z",
        96:"0", 97:"1", 98:"2", 99:"3", 100:"4", 101:"5", 102:"6", 103:"7", 104:"8", 105:"9"
}

$.fn.setup_navigation = function(settings) {

	settings = jQuery.extend({
		menuHoverClass: 'show-menu',
	}, settings);

	// Add ARIA role to menubar and menu items
	$(this).attr('role', 'menubar').find('li').attr('role', 'menuitem');

	var top_level_links = $(this).find('> li > a');

	// Added by Terrill: (removed temporarily: doesn't fix the JAWS problem after all)
	// Add tabindex="0" to all top-level links
	// Without at least one of these, JAWS doesn't read widget as a menu, despite all the other ARIA
	//$(top_level_links).attr('tabindex','0');

	// Set tabIndex to -1 so that top_level_links can't receive focus until menu is open
	$(top_level_links).next('ul')
		.attr('data-test','true')
		.attr({ 'aria-hidden': 'true', 'role': 'menu' })
		.find('a')
			.attr('tabIndex',-1);

	// Adding aria-haspopup for appropriate items
	$(top_level_links).each(function(){
		if($(this).next('ul').length > 0)
			$(this).parent('li').attr('aria-haspopup', 'true');
	});

	$(top_level_links).hover(function(){
		$(this).closest('ul')
			.attr('aria-hidden', 'false')
			.find('.'+settings.menuHoverClass)
				.attr('aria-hidden', 'true')
				.removeClass(settings.menuHoverClass)
				.find('a')
					.attr('tabIndex',-1);
		$(this).next('ul')
			.attr('aria-hidden', 'false')
			.find('a').attr('tabIndex',0);
	});
	$(top_level_links).focus(function(){
		$(this).closest('ul')
			// Removed by Terrill
			// The following was adding aria-hidden="false" to root ul since menu is never hidden
			// and seemed to be causing flakiness in JAWS (needs more testing)
			// .attr('aria-hidden', 'false')
			.find('.'+settings.menuHoverClass)
				.attr('aria-hidden', 'true')
				.removeClass(settings.menuHoverClass)
				.find('a')
					.attr('tabIndex',-1);
		$(this).next('ul')
			.attr('aria-hidden', 'false')
			.addClass(settings.menuHoverClass)
			.find('a').attr('tabIndex',0);
	});

	// Bind arrow keys for navigation
	$(top_level_links).keydown(function(e){
		if(e.keyCode == 37) {
			e.preventDefault();
			// This is the first item
			if($(this).parent('li').prev('li').length == 0) {
				$(this).parents('ul').find('> li').last().find('a').first().focus();
			} else {
				$(this).parent('li').prev('li').find('a').first().focus();
			}
		} else if(e.keyCode == 38) {
			e.preventDefault();
			if($(this).parent('li').find('ul').length > 0) {
				$(this).parent('li').find('ul')
					.attr('aria-hidden', 'false')
					.addClass(settings.menuHoverClass)
					.find('a').attr('tabIndex',0)
						.last().focus();
			}
		} else if(e.keyCode == 39) {
			e.preventDefault();
			// This is the last item
			if($(this).parent('li').next('li').length == 0) {
				$(this).parents('ul').find('> li').first().find('a').first().focus();
			} else {
				$(this).parent('li').next('li').find('a').first().focus();
			}
		} else if(e.keyCode == 40) {
			e.preventDefault();
			if($(this).parent('li').find('ul').length > 0) {
				$(this).parent('li').find('ul')
					.attr('aria-hidden', 'false')
					.addClass(settings.menuHoverClass)
					.find('a').attr('tabIndex',0)
						.first().focus();
			}
		} else if(e.keyCode == 13 || e.keyCode == 32) {
			// If submenu is hidden, open it
			e.preventDefault();
			$(this).parent('li').find('ul[aria-hidden=true]')
					.attr('aria-hidden', 'false')
					.addClass(settings.menuHoverClass)
					.find('a').attr('tabIndex',0)
						.first().focus();
		} else if(e.keyCode == 27) {
			e.preventDefault();
			$('.'+settings.menuHoverClass)
				.attr('aria-hidden', 'true')
				.removeClass(settings.menuHoverClass)
				.find('a')
					.attr('tabIndex',-1);
		} else {
			$(this).parent('li').find('ul[aria-hidden=false] a').each(function(){
				if($(this).text().substring(0,1).toLowerCase() == keyCodeMap[e.keyCode]) {
					$(this).focus();
					return false;
				}
			});
		}
	});


	var links = $(top_level_links).parent('li').find('ul').find('a');
	$(links).keydown(function(e){
		if(e.keyCode == 38) {
			e.preventDefault();
			// This is the first item
			if($(this).parent('li').prev('li').length == 0) {
				$(this).parents('ul').parents('li').find('a').first().focus();
			} else {
				$(this).parent('li').prev('li').find('a').first().focus();
			}
		} else if(e.keyCode == 40) {
			e.preventDefault();
			if($(this).parent('li').next('li').length == 0) {
				$(this).parents('ul').parents('li').find('a').first().focus();
			} else {
				$(this).parent('li').next('li').find('a').first().focus();
			}
		} else if(e.keyCode == 27 || e.keyCode == 37) {
			e.preventDefault();
			$(this)
				.parents('ul').first()
					.prev('a').focus()
					.parents('ul').first().find('.'+settings.menuHoverClass)
						.attr('aria-hidden', 'true')
						.removeClass(settings.menuHoverClass)
						.find('a')
							.attr('tabIndex',-1);
		} else if(e.keyCode == 32) {
			e.preventDefault();
			window.location = $(this).attr('href');
		} else {
			var found = false;
			$(this).parent('li').nextAll('li').find('a').each(function(){
				if($(this).text().substring(0,1).toLowerCase() == keyCodeMap[e.keyCode]) {
					$(this).focus();
					found = true;
					return false;
				}
			});

			if(!found) {
				$(this).parent('li').prevAll('li').find('a').each(function(){
					if($(this).text().substring(0,1).toLowerCase() == keyCodeMap[e.keyCode]) {
						$(this).focus();
						return false;
					}
				});
			}
		}
	});


	// Hide menu if click or focus occurs outside of navigation
	$(this).find('a').last().keydown(function(e){
		if(e.keyCode == 9) {
			// If the user tabs out of the navigation hide all menus
			$('.'+settings.menuHoverClass)
				.attr('aria-hidden', 'true')
				.removeClass(settings.menuHoverClass)
				.find('a')
					.attr('tabIndex',-1);
		}
	});
	$(document).click(function(){ $('.'+settings.menuHoverClass).attr('aria-hidden', 'true').removeClass(settings.menuHoverClass).find('a').attr('tabIndex',-1); });

	$(this).click(function(e){
		e.stopPropagation();
	});
}

function skipLink(el) {
	// bind a click event to the 'skip' link
	$(el).click(function(event){

		// strip the leading hash and declare
		// the content we're skipping to
		var skipTo="#"+this.href.split('#')[1];

		// Setting 'tabindex' to -1 takes an element out of normal
		// tab flow but allows it to be focused via javascript
		$(skipTo).attr('tabindex', -1).on('blur focusout', function () {

		// when focus leaves this element,
		// remove the tabindex attribute
		$(this).removeAttr('tabindex');

		}).focus(); // focus on the content container
	});
};

$(document).ready(function() {
	skipLink('.skip-link');

	$(".more-link").click(function(e){
		$(this).closest(".text-container").toggleClass("show-more");
		e.preventDefault();
	});

	// Shifter
	$.shifter({
		maxWidth: "979px"
	});

	// Naver
	$(".subnavigation").navigation({
		maxWidth: "979px"
	});

	// Slick

	$('.slider-for').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		fade: true,
		asNavFor: '.slider-nav',
		responsive: [
	    {
	      breakpoint: 768,
	      settings: {
				arrows: false,
				dots: true,
				slidesToShow: 1,
				slidesToScroll: 1,
				fade: false,
				adaptiveHeight: true
	      }
	    },
	    {
	      breakpoint: 480,
	      settings: {
				arrows: false,
				dots: true,
				slidesToShow: 1,
				slidesToScroll: 1,
				fade: false,
				adaptiveHeight: true
	      }
	    }
	   ]
	});
	$('.slider-nav').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		asNavFor: '.slider-for',
		dots: false,
		focusOnSelect: true
	});



});
