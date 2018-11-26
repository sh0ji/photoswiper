(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.photoswiper = factory());
}(this, (function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    }

    return target;
  }

  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }

  function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};

    var target = _objectWithoutPropertiesLoose(source, excluded);

    var key, i;

    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
        target[key] = source[key];
      }
    }

    return target;
  }

  var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function unwrapExports (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x.default : x;
  }

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var photoswipe = createCommonjsModule(function (module, exports) {
  /*! PhotoSwipe - v4.1.2 - 2017-04-05
  * http://photoswipe.com
  * Copyright (c) 2017 Dmitry Semenov; */
  (function (root, factory) { 
  	{
  		module.exports = factory();
  	}
  })(commonjsGlobal, function () {
  	var PhotoSwipe = function(template, UiClass, items, options){

  /*>>framework-bridge*/
  /**
   *
   * Set of generic functions used by gallery.
   * 
   * You're free to modify anything here as long as functionality is kept.
   * 
   */
  var framework = {
  	features: null,
  	bind: function(target, type, listener, unbind) {
  		var methodName = (unbind ? 'remove' : 'add') + 'EventListener';
  		type = type.split(' ');
  		for(var i = 0; i < type.length; i++) {
  			if(type[i]) {
  				target[methodName]( type[i], listener, false);
  			}
  		}
  	},
  	isArray: function(obj) {
  		return (obj instanceof Array);
  	},
  	createEl: function(classes, tag) {
  		var el = document.createElement(tag || 'div');
  		if(classes) {
  			el.className = classes;
  		}
  		return el;
  	},
  	getScrollY: function() {
  		var yOffset = window.pageYOffset;
  		return yOffset !== undefined ? yOffset : document.documentElement.scrollTop;
  	},
  	unbind: function(target, type, listener) {
  		framework.bind(target,type,listener,true);
  	},
  	removeClass: function(el, className) {
  		var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
  		el.className = el.className.replace(reg, ' ').replace(/^\s\s*/, '').replace(/\s\s*$/, ''); 
  	},
  	addClass: function(el, className) {
  		if( !framework.hasClass(el,className) ) {
  			el.className += (el.className ? ' ' : '') + className;
  		}
  	},
  	hasClass: function(el, className) {
  		return el.className && new RegExp('(^|\\s)' + className + '(\\s|$)').test(el.className);
  	},
  	getChildByClass: function(parentEl, childClassName) {
  		var node = parentEl.firstChild;
  		while(node) {
  			if( framework.hasClass(node, childClassName) ) {
  				return node;
  			}
  			node = node.nextSibling;
  		}
  	},
  	arraySearch: function(array, value, key) {
  		var i = array.length;
  		while(i--) {
  			if(array[i][key] === value) {
  				return i;
  			} 
  		}
  		return -1;
  	},
  	extend: function(o1, o2, preventOverwrite) {
  		for (var prop in o2) {
  			if (o2.hasOwnProperty(prop)) {
  				if(preventOverwrite && o1.hasOwnProperty(prop)) {
  					continue;
  				}
  				o1[prop] = o2[prop];
  			}
  		}
  	},
  	easing: {
  		sine: {
  			out: function(k) {
  				return Math.sin(k * (Math.PI / 2));
  			},
  			inOut: function(k) {
  				return - (Math.cos(Math.PI * k) - 1) / 2;
  			}
  		},
  		cubic: {
  			out: function(k) {
  				return --k * k * k + 1;
  			}
  		}
  		/*
  			elastic: {
  				out: function ( k ) {

  					var s, a = 0.1, p = 0.4;
  					if ( k === 0 ) return 0;
  					if ( k === 1 ) return 1;
  					if ( !a || a < 1 ) { a = 1; s = p / 4; }
  					else s = p * Math.asin( 1 / a ) / ( 2 * Math.PI );
  					return ( a * Math.pow( 2, - 10 * k) * Math.sin( ( k - s ) * ( 2 * Math.PI ) / p ) + 1 );

  				},
  			},
  			back: {
  				out: function ( k ) {
  					var s = 1.70158;
  					return --k * k * ( ( s + 1 ) * k + s ) + 1;
  				}
  			}
  		*/
  	},

  	/**
  	 * 
  	 * @return {object}
  	 * 
  	 * {
  	 *  raf : request animation frame function
  	 *  caf : cancel animation frame function
  	 *  transfrom : transform property key (with vendor), or null if not supported
  	 *  oldIE : IE8 or below
  	 * }
  	 * 
  	 */
  	detectFeatures: function() {
  		if(framework.features) {
  			return framework.features;
  		}
  		var helperEl = framework.createEl(),
  			helperStyle = helperEl.style,
  			vendor = '',
  			features = {};

  		// IE8 and below
  		features.oldIE = document.all && !document.addEventListener;

  		features.touch = 'ontouchstart' in window;

  		if(window.requestAnimationFrame) {
  			features.raf = window.requestAnimationFrame;
  			features.caf = window.cancelAnimationFrame;
  		}

  		features.pointerEvent = navigator.pointerEnabled || navigator.msPointerEnabled;

  		// fix false-positive detection of old Android in new IE
  		// (IE11 ua string contains "Android 4.0")
  		
  		if(!features.pointerEvent) { 

  			var ua = navigator.userAgent;

  			// Detect if device is iPhone or iPod and if it's older than iOS 8
  			// http://stackoverflow.com/a/14223920
  			// 
  			// This detection is made because of buggy top/bottom toolbars
  			// that don't trigger window.resize event.
  			// For more info refer to _isFixedPosition variable in core.js

  			if (/iP(hone|od)/.test(navigator.platform)) {
  				var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
  				if(v && v.length > 0) {
  					v = parseInt(v[1], 10);
  					if(v >= 1 && v < 8 ) {
  						features.isOldIOSPhone = true;
  					}
  				}
  			}

  			// Detect old Android (before KitKat)
  			// due to bugs related to position:fixed
  			// http://stackoverflow.com/questions/7184573/pick-up-the-android-version-in-the-browser-by-javascript
  			
  			var match = ua.match(/Android\s([0-9\.]*)/);
  			var androidversion =  match ? match[1] : 0;
  			androidversion = parseFloat(androidversion);
  			if(androidversion >= 1 ) {
  				if(androidversion < 4.4) {
  					features.isOldAndroid = true; // for fixed position bug & performance
  				}
  				features.androidVersion = androidversion; // for touchend bug
  			}	
  			features.isMobileOpera = /opera mini|opera mobi/i.test(ua);

  			// p.s. yes, yes, UA sniffing is bad, propose your solution for above bugs.
  		}
  		
  		var styleChecks = ['transform', 'perspective', 'animationName'],
  			vendors = ['', 'webkit','Moz','ms','O'],
  			styleCheckItem,
  			styleName;

  		for(var i = 0; i < 4; i++) {
  			vendor = vendors[i];

  			for(var a = 0; a < 3; a++) {
  				styleCheckItem = styleChecks[a];

  				// uppercase first letter of property name, if vendor is present
  				styleName = vendor + (vendor ? 
  										styleCheckItem.charAt(0).toUpperCase() + styleCheckItem.slice(1) : 
  										styleCheckItem);
  			
  				if(!features[styleCheckItem] && styleName in helperStyle ) {
  					features[styleCheckItem] = styleName;
  				}
  			}

  			if(vendor && !features.raf) {
  				vendor = vendor.toLowerCase();
  				features.raf = window[vendor+'RequestAnimationFrame'];
  				if(features.raf) {
  					features.caf = window[vendor+'CancelAnimationFrame'] || 
  									window[vendor+'CancelRequestAnimationFrame'];
  				}
  			}
  		}
  			
  		if(!features.raf) {
  			var lastTime = 0;
  			features.raf = function(fn) {
  				var currTime = new Date().getTime();
  				var timeToCall = Math.max(0, 16 - (currTime - lastTime));
  				var id = window.setTimeout(function() { fn(currTime + timeToCall); }, timeToCall);
  				lastTime = currTime + timeToCall;
  				return id;
  			};
  			features.caf = function(id) { clearTimeout(id); };
  		}

  		// Detect SVG support
  		features.svg = !!document.createElementNS && 
  						!!document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect;

  		framework.features = features;

  		return features;
  	}
  };

  framework.detectFeatures();

  // Override addEventListener for old versions of IE
  if(framework.features.oldIE) {

  	framework.bind = function(target, type, listener, unbind) {
  		
  		type = type.split(' ');

  		var methodName = (unbind ? 'detach' : 'attach') + 'Event',
  			evName,
  			_handleEv = function() {
  				listener.handleEvent.call(listener);
  			};

  		for(var i = 0; i < type.length; i++) {
  			evName = type[i];
  			if(evName) {

  				if(typeof listener === 'object' && listener.handleEvent) {
  					if(!unbind) {
  						listener['oldIE' + evName] = _handleEv;
  					} else {
  						if(!listener['oldIE' + evName]) {
  							return false;
  						}
  					}

  					target[methodName]( 'on' + evName, listener['oldIE' + evName]);
  				} else {
  					target[methodName]( 'on' + evName, listener);
  				}

  			}
  		}
  	};
  	
  }

  /*>>framework-bridge*/

  /*>>core*/
  //function(template, UiClass, items, options)

  var self = this;

  /**
   * Static vars, don't change unless you know what you're doing.
   */
  var DOUBLE_TAP_RADIUS = 25, 
  	NUM_HOLDERS = 3;

  /**
   * Options
   */
  var _options = {
  	allowPanToNext:true,
  	spacing: 0.12,
  	bgOpacity: 1,
  	mouseUsed: false,
  	loop: true,
  	pinchToClose: true,
  	closeOnScroll: true,
  	closeOnVerticalDrag: true,
  	verticalDragRange: 0.75,
  	hideAnimationDuration: 333,
  	showAnimationDuration: 333,
  	showHideOpacity: false,
  	focus: true,
  	escKey: true,
  	arrowKeys: true,
  	mainScrollEndFriction: 0.35,
  	panEndFriction: 0.35,
  	isClickableElement: function(el) {
          return el.tagName === 'A';
      },
      getDoubleTapZoom: function(isMouseClick, item) {
      	if(isMouseClick) {
      		return 1;
      	} else {
      		return item.initialZoomLevel < 0.7 ? 1 : 1.33;
      	}
      },
      maxSpreadZoom: 1.33,
  	modal: true,

  	// not fully implemented yet
  	scaleMode: 'fit' // TODO
  };
  framework.extend(_options, options);


  /**
   * Private helper variables & functions
   */

  var _getEmptyPoint = function() { 
  		return {x:0,y:0}; 
  	};

  var _isOpen,
  	_isDestroying,
  	_closedByScroll,
  	_currentItemIndex,
  	_containerStyle,
  	_containerShiftIndex,
  	_currPanDist = _getEmptyPoint(),
  	_startPanOffset = _getEmptyPoint(),
  	_panOffset = _getEmptyPoint(),
  	_upMoveEvents, // drag move, drag end & drag cancel events array
  	_downEvents, // drag start events array
  	_globalEventHandlers,
  	_viewportSize = {},
  	_currZoomLevel,
  	_startZoomLevel,
  	_translatePrefix,
  	_translateSufix,
  	_updateSizeInterval,
  	_itemsNeedUpdate,
  	_currPositionIndex = 0,
  	_offset = {},
  	_slideSize = _getEmptyPoint(), // size of slide area, including spacing
  	_itemHolders,
  	_prevItemIndex,
  	_indexDiff = 0, // difference of indexes since last content update
  	_dragStartEvent,
  	_dragMoveEvent,
  	_dragEndEvent,
  	_dragCancelEvent,
  	_transformKey,
  	_pointerEventEnabled,
  	_isFixedPosition = true,
  	_likelyTouchDevice,
  	_modules = [],
  	_requestAF,
  	_cancelAF,
  	_initalClassName,
  	_initalWindowScrollY,
  	_oldIE,
  	_currentWindowScrollY,
  	_features,
  	_windowVisibleSize = {},
  	_renderMaxResolution = false,
  	_orientationChangeTimeout,


  	// Registers PhotoSWipe module (History, Controller ...)
  	_registerModule = function(name, module) {
  		framework.extend(self, module.publicMethods);
  		_modules.push(name);
  	},

  	_getLoopedId = function(index) {
  		var numSlides = _getNumItems();
  		if(index > numSlides - 1) {
  			return index - numSlides;
  		} else  if(index < 0) {
  			return numSlides + index;
  		}
  		return index;
  	},
  	
  	// Micro bind/trigger
  	_listeners = {},
  	_listen = function(name, fn) {
  		if(!_listeners[name]) {
  			_listeners[name] = [];
  		}
  		return _listeners[name].push(fn);
  	},
  	_shout = function(name) {
  		var listeners = _listeners[name];

  		if(listeners) {
  			var args = Array.prototype.slice.call(arguments);
  			args.shift();

  			for(var i = 0; i < listeners.length; i++) {
  				listeners[i].apply(self, args);
  			}
  		}
  	},

  	_getCurrentTime = function() {
  		return new Date().getTime();
  	},
  	_applyBgOpacity = function(opacity) {
  		_bgOpacity = opacity;
  		self.bg.style.opacity = opacity * _options.bgOpacity;
  	},

  	_applyZoomTransform = function(styleObj,x,y,zoom,item) {
  		if(!_renderMaxResolution || (item && item !== self.currItem) ) {
  			zoom = zoom / (item ? item.fitRatio : self.currItem.fitRatio);	
  		}
  			
  		styleObj[_transformKey] = _translatePrefix + x + 'px, ' + y + 'px' + _translateSufix + ' scale(' + zoom + ')';
  	},
  	_applyCurrentZoomPan = function( allowRenderResolution ) {
  		if(_currZoomElementStyle) {

  			if(allowRenderResolution) {
  				if(_currZoomLevel > self.currItem.fitRatio) {
  					if(!_renderMaxResolution) {
  						_setImageSize(self.currItem, false, true);
  						_renderMaxResolution = true;
  					}
  				} else {
  					if(_renderMaxResolution) {
  						_setImageSize(self.currItem);
  						_renderMaxResolution = false;
  					}
  				}
  			}
  			

  			_applyZoomTransform(_currZoomElementStyle, _panOffset.x, _panOffset.y, _currZoomLevel);
  		}
  	},
  	_applyZoomPanToItem = function(item) {
  		if(item.container) {

  			_applyZoomTransform(item.container.style, 
  								item.initialPosition.x, 
  								item.initialPosition.y, 
  								item.initialZoomLevel,
  								item);
  		}
  	},
  	_setTranslateX = function(x, elStyle) {
  		elStyle[_transformKey] = _translatePrefix + x + 'px, 0px' + _translateSufix;
  	},
  	_moveMainScroll = function(x, dragging) {

  		if(!_options.loop && dragging) {
  			var newSlideIndexOffset = _currentItemIndex + (_slideSize.x * _currPositionIndex - x) / _slideSize.x,
  				delta = Math.round(x - _mainScrollPos.x);

  			if( (newSlideIndexOffset < 0 && delta > 0) || 
  				(newSlideIndexOffset >= _getNumItems() - 1 && delta < 0) ) {
  				x = _mainScrollPos.x + delta * _options.mainScrollEndFriction;
  			} 
  		}
  		
  		_mainScrollPos.x = x;
  		_setTranslateX(x, _containerStyle);
  	},
  	_calculatePanOffset = function(axis, zoomLevel) {
  		var m = _midZoomPoint[axis] - _offset[axis];
  		return _startPanOffset[axis] + _currPanDist[axis] + m - m * ( zoomLevel / _startZoomLevel );
  	},
  	
  	_equalizePoints = function(p1, p2) {
  		p1.x = p2.x;
  		p1.y = p2.y;
  		if(p2.id) {
  			p1.id = p2.id;
  		}
  	},
  	_roundPoint = function(p) {
  		p.x = Math.round(p.x);
  		p.y = Math.round(p.y);
  	},

  	_mouseMoveTimeout = null,
  	_onFirstMouseMove = function() {
  		// Wait until mouse move event is fired at least twice during 100ms
  		// We do this, because some mobile browsers trigger it on touchstart
  		if(_mouseMoveTimeout ) { 
  			framework.unbind(document, 'mousemove', _onFirstMouseMove);
  			framework.addClass(template, 'pswp--has_mouse');
  			_options.mouseUsed = true;
  			_shout('mouseUsed');
  		}
  		_mouseMoveTimeout = setTimeout(function() {
  			_mouseMoveTimeout = null;
  		}, 100);
  	},

  	_bindEvents = function() {
  		framework.bind(document, 'keydown', self);

  		if(_features.transform) {
  			// don't bind click event in browsers that don't support transform (mostly IE8)
  			framework.bind(self.scrollWrap, 'click', self);
  		}
  		

  		if(!_options.mouseUsed) {
  			framework.bind(document, 'mousemove', _onFirstMouseMove);
  		}

  		framework.bind(window, 'resize scroll orientationchange', self);

  		_shout('bindEvents');
  	},

  	_unbindEvents = function() {
  		framework.unbind(window, 'resize scroll orientationchange', self);
  		framework.unbind(window, 'scroll', _globalEventHandlers.scroll);
  		framework.unbind(document, 'keydown', self);
  		framework.unbind(document, 'mousemove', _onFirstMouseMove);

  		if(_features.transform) {
  			framework.unbind(self.scrollWrap, 'click', self);
  		}

  		if(_isDragging) {
  			framework.unbind(window, _upMoveEvents, self);
  		}

  		clearTimeout(_orientationChangeTimeout);

  		_shout('unbindEvents');
  	},
  	
  	_calculatePanBounds = function(zoomLevel, update) {
  		var bounds = _calculateItemSize( self.currItem, _viewportSize, zoomLevel );
  		if(update) {
  			_currPanBounds = bounds;
  		}
  		return bounds;
  	},
  	
  	_getMinZoomLevel = function(item) {
  		if(!item) {
  			item = self.currItem;
  		}
  		return item.initialZoomLevel;
  	},
  	_getMaxZoomLevel = function(item) {
  		if(!item) {
  			item = self.currItem;
  		}
  		return item.w > 0 ? _options.maxSpreadZoom : 1;
  	},

  	// Return true if offset is out of the bounds
  	_modifyDestPanOffset = function(axis, destPanBounds, destPanOffset, destZoomLevel) {
  		if(destZoomLevel === self.currItem.initialZoomLevel) {
  			destPanOffset[axis] = self.currItem.initialPosition[axis];
  			return true;
  		} else {
  			destPanOffset[axis] = _calculatePanOffset(axis, destZoomLevel); 

  			if(destPanOffset[axis] > destPanBounds.min[axis]) {
  				destPanOffset[axis] = destPanBounds.min[axis];
  				return true;
  			} else if(destPanOffset[axis] < destPanBounds.max[axis] ) {
  				destPanOffset[axis] = destPanBounds.max[axis];
  				return true;
  			}
  		}
  		return false;
  	},

  	_setupTransforms = function() {

  		if(_transformKey) {
  			// setup 3d transforms
  			var allow3dTransform = _features.perspective && !_likelyTouchDevice;
  			_translatePrefix = 'translate' + (allow3dTransform ? '3d(' : '(');
  			_translateSufix = _features.perspective ? ', 0px)' : ')';	
  			return;
  		}

  		// Override zoom/pan/move functions in case old browser is used (most likely IE)
  		// (so they use left/top/width/height, instead of CSS transform)
  	
  		_transformKey = 'left';
  		framework.addClass(template, 'pswp--ie');

  		_setTranslateX = function(x, elStyle) {
  			elStyle.left = x + 'px';
  		};
  		_applyZoomPanToItem = function(item) {

  			var zoomRatio = item.fitRatio > 1 ? 1 : item.fitRatio,
  				s = item.container.style,
  				w = zoomRatio * item.w,
  				h = zoomRatio * item.h;

  			s.width = w + 'px';
  			s.height = h + 'px';
  			s.left = item.initialPosition.x + 'px';
  			s.top = item.initialPosition.y + 'px';

  		};
  		_applyCurrentZoomPan = function() {
  			if(_currZoomElementStyle) {

  				var s = _currZoomElementStyle,
  					item = self.currItem,
  					zoomRatio = item.fitRatio > 1 ? 1 : item.fitRatio,
  					w = zoomRatio * item.w,
  					h = zoomRatio * item.h;

  				s.width = w + 'px';
  				s.height = h + 'px';


  				s.left = _panOffset.x + 'px';
  				s.top = _panOffset.y + 'px';
  			}
  			
  		};
  	},

  	_onKeyDown = function(e) {
  		var keydownAction = '';
  		if(_options.escKey && e.keyCode === 27) { 
  			keydownAction = 'close';
  		} else if(_options.arrowKeys) {
  			if(e.keyCode === 37) {
  				keydownAction = 'prev';
  			} else if(e.keyCode === 39) { 
  				keydownAction = 'next';
  			}
  		}

  		if(keydownAction) {
  			// don't do anything if special key pressed to prevent from overriding default browser actions
  			// e.g. in Chrome on Mac cmd+arrow-left returns to previous page
  			if( !e.ctrlKey && !e.altKey && !e.shiftKey && !e.metaKey ) {
  				if(e.preventDefault) {
  					e.preventDefault();
  				} else {
  					e.returnValue = false;
  				} 
  				self[keydownAction]();
  			}
  		}
  	},

  	_onGlobalClick = function(e) {
  		if(!e) {
  			return;
  		}

  		// don't allow click event to pass through when triggering after drag or some other gesture
  		if(_moved || _zoomStarted || _mainScrollAnimating || _verticalDragInitiated) {
  			e.preventDefault();
  			e.stopPropagation();
  		}
  	},

  	_updatePageScrollOffset = function() {
  		self.setScrollOffset(0, framework.getScrollY());		
  	};
  	


  	



  // Micro animation engine
  var _animations = {},
  	_numAnimations = 0,
  	_stopAnimation = function(name) {
  		if(_animations[name]) {
  			if(_animations[name].raf) {
  				_cancelAF( _animations[name].raf );
  			}
  			_numAnimations--;
  			delete _animations[name];
  		}
  	},
  	_registerStartAnimation = function(name) {
  		if(_animations[name]) {
  			_stopAnimation(name);
  		}
  		if(!_animations[name]) {
  			_numAnimations++;
  			_animations[name] = {};
  		}
  	},
  	_stopAllAnimations = function() {
  		for (var prop in _animations) {

  			if( _animations.hasOwnProperty( prop ) ) {
  				_stopAnimation(prop);
  			} 
  			
  		}
  	},
  	_animateProp = function(name, b, endProp, d, easingFn, onUpdate, onComplete) {
  		var startAnimTime = _getCurrentTime(), t;
  		_registerStartAnimation(name);

  		var animloop = function(){
  			if ( _animations[name] ) {
  				
  				t = _getCurrentTime() - startAnimTime; // time diff
  				//b - beginning (start prop)
  				//d - anim duration

  				if ( t >= d ) {
  					_stopAnimation(name);
  					onUpdate(endProp);
  					if(onComplete) {
  						onComplete();
  					}
  					return;
  				}
  				onUpdate( (endProp - b) * easingFn(t/d) + b );

  				_animations[name].raf = _requestAF(animloop);
  			}
  		};
  		animloop();
  	};
  	


  var publicMethods = {

  	// make a few local variables and functions public
  	shout: _shout,
  	listen: _listen,
  	viewportSize: _viewportSize,
  	options: _options,

  	isMainScrollAnimating: function() {
  		return _mainScrollAnimating;
  	},
  	getZoomLevel: function() {
  		return _currZoomLevel;
  	},
  	getCurrentIndex: function() {
  		return _currentItemIndex;
  	},
  	isDragging: function() {
  		return _isDragging;
  	},	
  	isZooming: function() {
  		return _isZooming;
  	},
  	setScrollOffset: function(x,y) {
  		_offset.x = x;
  		_currentWindowScrollY = _offset.y = y;
  		_shout('updateScrollOffset', _offset);
  	},
  	applyZoomPan: function(zoomLevel,panX,panY,allowRenderResolution) {
  		_panOffset.x = panX;
  		_panOffset.y = panY;
  		_currZoomLevel = zoomLevel;
  		_applyCurrentZoomPan( allowRenderResolution );
  	},

  	init: function() {

  		if(_isOpen || _isDestroying) {
  			return;
  		}

  		var i;

  		self.framework = framework; // basic functionality
  		self.template = template; // root DOM element of PhotoSwipe
  		self.bg = framework.getChildByClass(template, 'pswp__bg');

  		_initalClassName = template.className;
  		_isOpen = true;
  				
  		_features = framework.detectFeatures();
  		_requestAF = _features.raf;
  		_cancelAF = _features.caf;
  		_transformKey = _features.transform;
  		_oldIE = _features.oldIE;
  		
  		self.scrollWrap = framework.getChildByClass(template, 'pswp__scroll-wrap');
  		self.container = framework.getChildByClass(self.scrollWrap, 'pswp__container');

  		_containerStyle = self.container.style; // for fast access

  		// Objects that hold slides (there are only 3 in DOM)
  		self.itemHolders = _itemHolders = [
  			{el:self.container.children[0] , wrap:0, index: -1},
  			{el:self.container.children[1] , wrap:0, index: -1},
  			{el:self.container.children[2] , wrap:0, index: -1}
  		];

  		// hide nearby item holders until initial zoom animation finishes (to avoid extra Paints)
  		_itemHolders[0].el.style.display = _itemHolders[2].el.style.display = 'none';

  		_setupTransforms();

  		// Setup global events
  		_globalEventHandlers = {
  			resize: self.updateSize,

  			// Fixes: iOS 10.3 resize event
  			// does not update scrollWrap.clientWidth instantly after resize
  			// https://github.com/dimsemenov/PhotoSwipe/issues/1315
  			orientationchange: function() {
  				clearTimeout(_orientationChangeTimeout);
  				_orientationChangeTimeout = setTimeout(function() {
  					if(_viewportSize.x !== self.scrollWrap.clientWidth) {
  						self.updateSize();
  					}
  				}, 500);
  			},
  			scroll: _updatePageScrollOffset,
  			keydown: _onKeyDown,
  			click: _onGlobalClick
  		};

  		// disable show/hide effects on old browsers that don't support CSS animations or transforms, 
  		// old IOS, Android and Opera mobile. Blackberry seems to work fine, even older models.
  		var oldPhone = _features.isOldIOSPhone || _features.isOldAndroid || _features.isMobileOpera;
  		if(!_features.animationName || !_features.transform || oldPhone) {
  			_options.showAnimationDuration = _options.hideAnimationDuration = 0;
  		}

  		// init modules
  		for(i = 0; i < _modules.length; i++) {
  			self['init' + _modules[i]]();
  		}
  		
  		// init
  		if(UiClass) {
  			var ui = self.ui = new UiClass(self, framework);
  			ui.init();
  		}

  		_shout('firstUpdate');
  		_currentItemIndex = _currentItemIndex || _options.index || 0;
  		// validate index
  		if( isNaN(_currentItemIndex) || _currentItemIndex < 0 || _currentItemIndex >= _getNumItems() ) {
  			_currentItemIndex = 0;
  		}
  		self.currItem = _getItemAt( _currentItemIndex );

  		
  		if(_features.isOldIOSPhone || _features.isOldAndroid) {
  			_isFixedPosition = false;
  		}
  		
  		template.setAttribute('aria-hidden', 'false');
  		if(_options.modal) {
  			if(!_isFixedPosition) {
  				template.style.position = 'absolute';
  				template.style.top = framework.getScrollY() + 'px';
  			} else {
  				template.style.position = 'fixed';
  			}
  		}

  		if(_currentWindowScrollY === undefined) {
  			_shout('initialLayout');
  			_currentWindowScrollY = _initalWindowScrollY = framework.getScrollY();
  		}
  		
  		// add classes to root element of PhotoSwipe
  		var rootClasses = 'pswp--open ';
  		if(_options.mainClass) {
  			rootClasses += _options.mainClass + ' ';
  		}
  		if(_options.showHideOpacity) {
  			rootClasses += 'pswp--animate_opacity ';
  		}
  		rootClasses += _likelyTouchDevice ? 'pswp--touch' : 'pswp--notouch';
  		rootClasses += _features.animationName ? ' pswp--css_animation' : '';
  		rootClasses += _features.svg ? ' pswp--svg' : '';
  		framework.addClass(template, rootClasses);

  		self.updateSize();

  		// initial update
  		_containerShiftIndex = -1;
  		_indexDiff = null;
  		for(i = 0; i < NUM_HOLDERS; i++) {
  			_setTranslateX( (i+_containerShiftIndex) * _slideSize.x, _itemHolders[i].el.style);
  		}

  		if(!_oldIE) {
  			framework.bind(self.scrollWrap, _downEvents, self); // no dragging for old IE
  		}	

  		_listen('initialZoomInEnd', function() {
  			self.setContent(_itemHolders[0], _currentItemIndex-1);
  			self.setContent(_itemHolders[2], _currentItemIndex+1);

  			_itemHolders[0].el.style.display = _itemHolders[2].el.style.display = 'block';

  			if(_options.focus) {
  				// focus causes layout, 
  				// which causes lag during the animation, 
  				// that's why we delay it untill the initial zoom transition ends
  				template.focus();
  			}
  			 

  			_bindEvents();
  		});

  		// set content for center slide (first time)
  		self.setContent(_itemHolders[1], _currentItemIndex);
  		
  		self.updateCurrItem();

  		_shout('afterInit');

  		if(!_isFixedPosition) {

  			// On all versions of iOS lower than 8.0, we check size of viewport every second.
  			// 
  			// This is done to detect when Safari top & bottom bars appear, 
  			// as this action doesn't trigger any events (like resize). 
  			// 
  			// On iOS8 they fixed this.
  			// 
  			// 10 Nov 2014: iOS 7 usage ~40%. iOS 8 usage 56%.
  			
  			_updateSizeInterval = setInterval(function() {
  				if(!_numAnimations && !_isDragging && !_isZooming && (_currZoomLevel === self.currItem.initialZoomLevel)  ) {
  					self.updateSize();
  				}
  			}, 1000);
  		}

  		framework.addClass(template, 'pswp--visible');
  	},

  	// Close the gallery, then destroy it
  	close: function() {
  		if(!_isOpen) {
  			return;
  		}

  		_isOpen = false;
  		_isDestroying = true;
  		_shout('close');
  		_unbindEvents();

  		_showOrHide(self.currItem, null, true, self.destroy);
  	},

  	// destroys the gallery (unbinds events, cleans up intervals and timeouts to avoid memory leaks)
  	destroy: function() {
  		_shout('destroy');

  		if(_showOrHideTimeout) {
  			clearTimeout(_showOrHideTimeout);
  		}
  		
  		template.setAttribute('aria-hidden', 'true');
  		template.className = _initalClassName;

  		if(_updateSizeInterval) {
  			clearInterval(_updateSizeInterval);
  		}

  		framework.unbind(self.scrollWrap, _downEvents, self);

  		// we unbind scroll event at the end, as closing animation may depend on it
  		framework.unbind(window, 'scroll', self);

  		_stopDragUpdateLoop();

  		_stopAllAnimations();

  		_listeners = null;
  	},

  	/**
  	 * Pan image to position
  	 * @param {Number} x     
  	 * @param {Number} y     
  	 * @param {Boolean} force Will ignore bounds if set to true.
  	 */
  	panTo: function(x,y,force) {
  		if(!force) {
  			if(x > _currPanBounds.min.x) {
  				x = _currPanBounds.min.x;
  			} else if(x < _currPanBounds.max.x) {
  				x = _currPanBounds.max.x;
  			}

  			if(y > _currPanBounds.min.y) {
  				y = _currPanBounds.min.y;
  			} else if(y < _currPanBounds.max.y) {
  				y = _currPanBounds.max.y;
  			}
  		}
  		
  		_panOffset.x = x;
  		_panOffset.y = y;
  		_applyCurrentZoomPan();
  	},
  	
  	handleEvent: function (e) {
  		e = e || window.event;
  		if(_globalEventHandlers[e.type]) {
  			_globalEventHandlers[e.type](e);
  		}
  	},


  	goTo: function(index) {

  		index = _getLoopedId(index);

  		var diff = index - _currentItemIndex;
  		_indexDiff = diff;

  		_currentItemIndex = index;
  		self.currItem = _getItemAt( _currentItemIndex );
  		_currPositionIndex -= diff;
  		
  		_moveMainScroll(_slideSize.x * _currPositionIndex);
  		

  		_stopAllAnimations();
  		_mainScrollAnimating = false;

  		self.updateCurrItem();
  	},
  	next: function() {
  		self.goTo( _currentItemIndex + 1);
  	},
  	prev: function() {
  		self.goTo( _currentItemIndex - 1);
  	},

  	// update current zoom/pan objects
  	updateCurrZoomItem: function(emulateSetContent) {
  		if(emulateSetContent) {
  			_shout('beforeChange', 0);
  		}

  		// itemHolder[1] is middle (current) item
  		if(_itemHolders[1].el.children.length) {
  			var zoomElement = _itemHolders[1].el.children[0];
  			if( framework.hasClass(zoomElement, 'pswp__zoom-wrap') ) {
  				_currZoomElementStyle = zoomElement.style;
  			} else {
  				_currZoomElementStyle = null;
  			}
  		} else {
  			_currZoomElementStyle = null;
  		}
  		
  		_currPanBounds = self.currItem.bounds;	
  		_startZoomLevel = _currZoomLevel = self.currItem.initialZoomLevel;

  		_panOffset.x = _currPanBounds.center.x;
  		_panOffset.y = _currPanBounds.center.y;

  		if(emulateSetContent) {
  			_shout('afterChange');
  		}
  	},


  	invalidateCurrItems: function() {
  		_itemsNeedUpdate = true;
  		for(var i = 0; i < NUM_HOLDERS; i++) {
  			if( _itemHolders[i].item ) {
  				_itemHolders[i].item.needsUpdate = true;
  			}
  		}
  	},

  	updateCurrItem: function(beforeAnimation) {

  		if(_indexDiff === 0) {
  			return;
  		}

  		var diffAbs = Math.abs(_indexDiff),
  			tempHolder;

  		if(beforeAnimation && diffAbs < 2) {
  			return;
  		}


  		self.currItem = _getItemAt( _currentItemIndex );
  		_renderMaxResolution = false;
  		
  		_shout('beforeChange', _indexDiff);

  		if(diffAbs >= NUM_HOLDERS) {
  			_containerShiftIndex += _indexDiff + (_indexDiff > 0 ? -NUM_HOLDERS : NUM_HOLDERS);
  			diffAbs = NUM_HOLDERS;
  		}
  		for(var i = 0; i < diffAbs; i++) {
  			if(_indexDiff > 0) {
  				tempHolder = _itemHolders.shift();
  				_itemHolders[NUM_HOLDERS-1] = tempHolder; // move first to last

  				_containerShiftIndex++;
  				_setTranslateX( (_containerShiftIndex+2) * _slideSize.x, tempHolder.el.style);
  				self.setContent(tempHolder, _currentItemIndex - diffAbs + i + 1 + 1);
  			} else {
  				tempHolder = _itemHolders.pop();
  				_itemHolders.unshift( tempHolder ); // move last to first

  				_containerShiftIndex--;
  				_setTranslateX( _containerShiftIndex * _slideSize.x, tempHolder.el.style);
  				self.setContent(tempHolder, _currentItemIndex + diffAbs - i - 1 - 1);
  			}
  			
  		}

  		// reset zoom/pan on previous item
  		if(_currZoomElementStyle && Math.abs(_indexDiff) === 1) {

  			var prevItem = _getItemAt(_prevItemIndex);
  			if(prevItem.initialZoomLevel !== _currZoomLevel) {
  				_calculateItemSize(prevItem , _viewportSize );
  				_setImageSize(prevItem);
  				_applyZoomPanToItem( prevItem ); 				
  			}

  		}

  		// reset diff after update
  		_indexDiff = 0;

  		self.updateCurrZoomItem();

  		_prevItemIndex = _currentItemIndex;

  		_shout('afterChange');
  		
  	},



  	updateSize: function(force) {
  		
  		if(!_isFixedPosition && _options.modal) {
  			var windowScrollY = framework.getScrollY();
  			if(_currentWindowScrollY !== windowScrollY) {
  				template.style.top = windowScrollY + 'px';
  				_currentWindowScrollY = windowScrollY;
  			}
  			if(!force && _windowVisibleSize.x === window.innerWidth && _windowVisibleSize.y === window.innerHeight) {
  				return;
  			}
  			_windowVisibleSize.x = window.innerWidth;
  			_windowVisibleSize.y = window.innerHeight;

  			//template.style.width = _windowVisibleSize.x + 'px';
  			template.style.height = _windowVisibleSize.y + 'px';
  		}



  		_viewportSize.x = self.scrollWrap.clientWidth;
  		_viewportSize.y = self.scrollWrap.clientHeight;

  		_updatePageScrollOffset();

  		_slideSize.x = _viewportSize.x + Math.round(_viewportSize.x * _options.spacing);
  		_slideSize.y = _viewportSize.y;

  		_moveMainScroll(_slideSize.x * _currPositionIndex);

  		_shout('beforeResize'); // even may be used for example to switch image sources


  		// don't re-calculate size on inital size update
  		if(_containerShiftIndex !== undefined) {

  			var holder,
  				item,
  				hIndex;

  			for(var i = 0; i < NUM_HOLDERS; i++) {
  				holder = _itemHolders[i];
  				_setTranslateX( (i+_containerShiftIndex) * _slideSize.x, holder.el.style);

  				hIndex = _currentItemIndex+i-1;

  				if(_options.loop && _getNumItems() > 2) {
  					hIndex = _getLoopedId(hIndex);
  				}

  				// update zoom level on items and refresh source (if needsUpdate)
  				item = _getItemAt( hIndex );

  				// re-render gallery item if `needsUpdate`,
  				// or doesn't have `bounds` (entirely new slide object)
  				if( item && (_itemsNeedUpdate || item.needsUpdate || !item.bounds) ) {

  					self.cleanSlide( item );
  					
  					self.setContent( holder, hIndex );

  					// if "center" slide
  					if(i === 1) {
  						self.currItem = item;
  						self.updateCurrZoomItem(true);
  					}

  					item.needsUpdate = false;

  				} else if(holder.index === -1 && hIndex >= 0) {
  					// add content first time
  					self.setContent( holder, hIndex );
  				}
  				if(item && item.container) {
  					_calculateItemSize(item, _viewportSize);
  					_setImageSize(item);
  					_applyZoomPanToItem( item );
  				}
  				
  			}
  			_itemsNeedUpdate = false;
  		}	

  		_startZoomLevel = _currZoomLevel = self.currItem.initialZoomLevel;
  		_currPanBounds = self.currItem.bounds;

  		if(_currPanBounds) {
  			_panOffset.x = _currPanBounds.center.x;
  			_panOffset.y = _currPanBounds.center.y;
  			_applyCurrentZoomPan( true );
  		}
  		
  		_shout('resize');
  	},
  	
  	// Zoom current item to
  	zoomTo: function(destZoomLevel, centerPoint, speed, easingFn, updateFn) {
  		/*
  			if(destZoomLevel === 'fit') {
  				destZoomLevel = self.currItem.fitRatio;
  			} else if(destZoomLevel === 'fill') {
  				destZoomLevel = self.currItem.fillRatio;
  			}
  		*/

  		if(centerPoint) {
  			_startZoomLevel = _currZoomLevel;
  			_midZoomPoint.x = Math.abs(centerPoint.x) - _panOffset.x ;
  			_midZoomPoint.y = Math.abs(centerPoint.y) - _panOffset.y ;
  			_equalizePoints(_startPanOffset, _panOffset);
  		}

  		var destPanBounds = _calculatePanBounds(destZoomLevel, false),
  			destPanOffset = {};

  		_modifyDestPanOffset('x', destPanBounds, destPanOffset, destZoomLevel);
  		_modifyDestPanOffset('y', destPanBounds, destPanOffset, destZoomLevel);

  		var initialZoomLevel = _currZoomLevel;
  		var initialPanOffset = {
  			x: _panOffset.x,
  			y: _panOffset.y
  		};

  		_roundPoint(destPanOffset);

  		var onUpdate = function(now) {
  			if(now === 1) {
  				_currZoomLevel = destZoomLevel;
  				_panOffset.x = destPanOffset.x;
  				_panOffset.y = destPanOffset.y;
  			} else {
  				_currZoomLevel = (destZoomLevel - initialZoomLevel) * now + initialZoomLevel;
  				_panOffset.x = (destPanOffset.x - initialPanOffset.x) * now + initialPanOffset.x;
  				_panOffset.y = (destPanOffset.y - initialPanOffset.y) * now + initialPanOffset.y;
  			}

  			if(updateFn) {
  				updateFn(now);
  			}

  			_applyCurrentZoomPan( now === 1 );
  		};

  		if(speed) {
  			_animateProp('customZoomTo', 0, 1, speed, easingFn || framework.easing.sine.inOut, onUpdate);
  		} else {
  			onUpdate(1);
  		}
  	}


  };


  /*>>core*/

  /*>>gestures*/
  /**
   * Mouse/touch/pointer event handlers.
   * 
   * separated from @core.js for readability
   */

  var MIN_SWIPE_DISTANCE = 30,
  	DIRECTION_CHECK_OFFSET = 10; // amount of pixels to drag to determine direction of swipe

  var _gestureStartTime,
  	_gestureCheckSpeedTime,

  	// pool of objects that are used during dragging of zooming
  	p = {}, // first point
  	p2 = {}, // second point (for zoom gesture)
  	delta = {},
  	_currPoint = {},
  	_startPoint = {},
  	_currPointers = [],
  	_startMainScrollPos = {},
  	_releaseAnimData,
  	_posPoints = [], // array of points during dragging, used to determine type of gesture
  	_tempPoint = {},

  	_isZoomingIn,
  	_verticalDragInitiated,
  	_oldAndroidTouchEndTimeout,
  	_currZoomedItemIndex = 0,
  	_centerPoint = _getEmptyPoint(),
  	_lastReleaseTime = 0,
  	_isDragging, // at least one pointer is down
  	_isMultitouch, // at least two _pointers are down
  	_zoomStarted, // zoom level changed during zoom gesture
  	_moved,
  	_dragAnimFrame,
  	_mainScrollShifted,
  	_currentPoints, // array of current touch points
  	_isZooming,
  	_currPointsDistance,
  	_startPointsDistance,
  	_currPanBounds,
  	_mainScrollPos = _getEmptyPoint(),
  	_currZoomElementStyle,
  	_mainScrollAnimating, // true, if animation after swipe gesture is running
  	_midZoomPoint = _getEmptyPoint(),
  	_currCenterPoint = _getEmptyPoint(),
  	_direction,
  	_isFirstMove,
  	_opacityChanged,
  	_bgOpacity,
  	_wasOverInitialZoom,

  	_isEqualPoints = function(p1, p2) {
  		return p1.x === p2.x && p1.y === p2.y;
  	},
  	_isNearbyPoints = function(touch0, touch1) {
  		return Math.abs(touch0.x - touch1.x) < DOUBLE_TAP_RADIUS && Math.abs(touch0.y - touch1.y) < DOUBLE_TAP_RADIUS;
  	},
  	_calculatePointsDistance = function(p1, p2) {
  		_tempPoint.x = Math.abs( p1.x - p2.x );
  		_tempPoint.y = Math.abs( p1.y - p2.y );
  		return Math.sqrt(_tempPoint.x * _tempPoint.x + _tempPoint.y * _tempPoint.y);
  	},
  	_stopDragUpdateLoop = function() {
  		if(_dragAnimFrame) {
  			_cancelAF(_dragAnimFrame);
  			_dragAnimFrame = null;
  		}
  	},
  	_dragUpdateLoop = function() {
  		if(_isDragging) {
  			_dragAnimFrame = _requestAF(_dragUpdateLoop);
  			_renderMovement();
  		}
  	},
  	_canPan = function() {
  		return !(_options.scaleMode === 'fit' && _currZoomLevel ===  self.currItem.initialZoomLevel);
  	},
  	
  	// find the closest parent DOM element
  	_closestElement = function(el, fn) {
  	  	if(!el || el === document) {
  	  		return false;
  	  	}

  	  	// don't search elements above pswp__scroll-wrap
  	  	if(el.getAttribute('class') && el.getAttribute('class').indexOf('pswp__scroll-wrap') > -1 ) {
  	  		return false;
  	  	}

  	  	if( fn(el) ) {
  	  		return el;
  	  	}

  	  	return _closestElement(el.parentNode, fn);
  	},

  	_preventObj = {},
  	_preventDefaultEventBehaviour = function(e, isDown) {
  	    _preventObj.prevent = !_closestElement(e.target, _options.isClickableElement);

  		_shout('preventDragEvent', e, isDown, _preventObj);
  		return _preventObj.prevent;

  	},
  	_convertTouchToPoint = function(touch, p) {
  		p.x = touch.pageX;
  		p.y = touch.pageY;
  		p.id = touch.identifier;
  		return p;
  	},
  	_findCenterOfPoints = function(p1, p2, pCenter) {
  		pCenter.x = (p1.x + p2.x) * 0.5;
  		pCenter.y = (p1.y + p2.y) * 0.5;
  	},
  	_pushPosPoint = function(time, x, y) {
  		if(time - _gestureCheckSpeedTime > 50) {
  			var o = _posPoints.length > 2 ? _posPoints.shift() : {};
  			o.x = x;
  			o.y = y; 
  			_posPoints.push(o);
  			_gestureCheckSpeedTime = time;
  		}
  	},

  	_calculateVerticalDragOpacityRatio = function() {
  		var yOffset = _panOffset.y - self.currItem.initialPosition.y; // difference between initial and current position
  		return 1 -  Math.abs( yOffset / (_viewportSize.y / 2)  );
  	},

  	
  	// points pool, reused during touch events
  	_ePoint1 = {},
  	_ePoint2 = {},
  	_tempPointsArr = [],
  	_tempCounter,
  	_getTouchPoints = function(e) {
  		// clean up previous points, without recreating array
  		while(_tempPointsArr.length > 0) {
  			_tempPointsArr.pop();
  		}

  		if(!_pointerEventEnabled) {
  			if(e.type.indexOf('touch') > -1) {

  				if(e.touches && e.touches.length > 0) {
  					_tempPointsArr[0] = _convertTouchToPoint(e.touches[0], _ePoint1);
  					if(e.touches.length > 1) {
  						_tempPointsArr[1] = _convertTouchToPoint(e.touches[1], _ePoint2);
  					}
  				}
  				
  			} else {
  				_ePoint1.x = e.pageX;
  				_ePoint1.y = e.pageY;
  				_ePoint1.id = '';
  				_tempPointsArr[0] = _ePoint1;//_ePoint1;
  			}
  		} else {
  			_tempCounter = 0;
  			// we can use forEach, as pointer events are supported only in modern browsers
  			_currPointers.forEach(function(p) {
  				if(_tempCounter === 0) {
  					_tempPointsArr[0] = p;
  				} else if(_tempCounter === 1) {
  					_tempPointsArr[1] = p;
  				}
  				_tempCounter++;

  			});
  		}
  		return _tempPointsArr;
  	},

  	_panOrMoveMainScroll = function(axis, delta) {

  		var panFriction,
  			overDiff = 0,
  			newOffset = _panOffset[axis] + delta[axis],
  			startOverDiff,
  			dir = delta[axis] > 0,
  			newMainScrollPosition = _mainScrollPos.x + delta.x,
  			mainScrollDiff = _mainScrollPos.x - _startMainScrollPos.x,
  			newPanPos,
  			newMainScrollPos;

  		// calculate fdistance over the bounds and friction
  		if(newOffset > _currPanBounds.min[axis] || newOffset < _currPanBounds.max[axis]) {
  			panFriction = _options.panEndFriction;
  			// Linear increasing of friction, so at 1/4 of viewport it's at max value. 
  			// Looks not as nice as was expected. Left for history.
  			// panFriction = (1 - (_panOffset[axis] + delta[axis] + panBounds.min[axis]) / (_viewportSize[axis] / 4) );
  		} else {
  			panFriction = 1;
  		}
  		
  		newOffset = _panOffset[axis] + delta[axis] * panFriction;

  		// move main scroll or start panning
  		if(_options.allowPanToNext || _currZoomLevel === self.currItem.initialZoomLevel) {


  			if(!_currZoomElementStyle) {
  				
  				newMainScrollPos = newMainScrollPosition;

  			} else if(_direction === 'h' && axis === 'x' && !_zoomStarted ) {
  				
  				if(dir) {
  					if(newOffset > _currPanBounds.min[axis]) {
  						panFriction = _options.panEndFriction;
  						overDiff = _currPanBounds.min[axis] - newOffset;
  						startOverDiff = _currPanBounds.min[axis] - _startPanOffset[axis];
  					}
  					
  					// drag right
  					if( (startOverDiff <= 0 || mainScrollDiff < 0) && _getNumItems() > 1 ) {
  						newMainScrollPos = newMainScrollPosition;
  						if(mainScrollDiff < 0 && newMainScrollPosition > _startMainScrollPos.x) {
  							newMainScrollPos = _startMainScrollPos.x;
  						}
  					} else {
  						if(_currPanBounds.min.x !== _currPanBounds.max.x) {
  							newPanPos = newOffset;
  						}
  						
  					}

  				} else {

  					if(newOffset < _currPanBounds.max[axis] ) {
  						panFriction =_options.panEndFriction;
  						overDiff = newOffset - _currPanBounds.max[axis];
  						startOverDiff = _startPanOffset[axis] - _currPanBounds.max[axis];
  					}

  					if( (startOverDiff <= 0 || mainScrollDiff > 0) && _getNumItems() > 1 ) {
  						newMainScrollPos = newMainScrollPosition;

  						if(mainScrollDiff > 0 && newMainScrollPosition < _startMainScrollPos.x) {
  							newMainScrollPos = _startMainScrollPos.x;
  						}

  					} else {
  						if(_currPanBounds.min.x !== _currPanBounds.max.x) {
  							newPanPos = newOffset;
  						}
  					}

  				}


  				//
  			}

  			if(axis === 'x') {

  				if(newMainScrollPos !== undefined) {
  					_moveMainScroll(newMainScrollPos, true);
  					if(newMainScrollPos === _startMainScrollPos.x) {
  						_mainScrollShifted = false;
  					} else {
  						_mainScrollShifted = true;
  					}
  				}

  				if(_currPanBounds.min.x !== _currPanBounds.max.x) {
  					if(newPanPos !== undefined) {
  						_panOffset.x = newPanPos;
  					} else if(!_mainScrollShifted) {
  						_panOffset.x += delta.x * panFriction;
  					}
  				}

  				return newMainScrollPos !== undefined;
  			}

  		}

  		if(!_mainScrollAnimating) {
  			
  			if(!_mainScrollShifted) {
  				if(_currZoomLevel > self.currItem.fitRatio) {
  					_panOffset[axis] += delta[axis] * panFriction;
  				
  				}
  			}

  			
  		}
  		
  	},

  	// Pointerdown/touchstart/mousedown handler
  	_onDragStart = function(e) {

  		// Allow dragging only via left mouse button.
  		// As this handler is not added in IE8 - we ignore e.which
  		// 
  		// http://www.quirksmode.org/js/events_properties.html
  		// https://developer.mozilla.org/en-US/docs/Web/API/event.button
  		if(e.type === 'mousedown' && e.button > 0  ) {
  			return;
  		}

  		if(_initialZoomRunning) {
  			e.preventDefault();
  			return;
  		}

  		if(_oldAndroidTouchEndTimeout && e.type === 'mousedown') {
  			return;
  		}

  		if(_preventDefaultEventBehaviour(e, true)) {
  			e.preventDefault();
  		}



  		_shout('pointerDown');

  		if(_pointerEventEnabled) {
  			var pointerIndex = framework.arraySearch(_currPointers, e.pointerId, 'id');
  			if(pointerIndex < 0) {
  				pointerIndex = _currPointers.length;
  			}
  			_currPointers[pointerIndex] = {x:e.pageX, y:e.pageY, id: e.pointerId};
  		}
  		


  		var startPointsList = _getTouchPoints(e),
  			numPoints = startPointsList.length;

  		_currentPoints = null;

  		_stopAllAnimations();

  		// init drag
  		if(!_isDragging || numPoints === 1) {

  			

  			_isDragging = _isFirstMove = true;
  			framework.bind(window, _upMoveEvents, self);

  			_isZoomingIn = 
  				_wasOverInitialZoom = 
  				_opacityChanged = 
  				_verticalDragInitiated = 
  				_mainScrollShifted = 
  				_moved = 
  				_isMultitouch = 
  				_zoomStarted = false;

  			_direction = null;

  			_shout('firstTouchStart', startPointsList);

  			_equalizePoints(_startPanOffset, _panOffset);

  			_currPanDist.x = _currPanDist.y = 0;
  			_equalizePoints(_currPoint, startPointsList[0]);
  			_equalizePoints(_startPoint, _currPoint);

  			//_equalizePoints(_startMainScrollPos, _mainScrollPos);
  			_startMainScrollPos.x = _slideSize.x * _currPositionIndex;

  			_posPoints = [{
  				x: _currPoint.x,
  				y: _currPoint.y
  			}];

  			_gestureCheckSpeedTime = _gestureStartTime = _getCurrentTime();

  			//_mainScrollAnimationEnd(true);
  			_calculatePanBounds( _currZoomLevel, true );
  			
  			// Start rendering
  			_stopDragUpdateLoop();
  			_dragUpdateLoop();
  			
  		}

  		// init zoom
  		if(!_isZooming && numPoints > 1 && !_mainScrollAnimating && !_mainScrollShifted) {
  			_startZoomLevel = _currZoomLevel;
  			_zoomStarted = false; // true if zoom changed at least once

  			_isZooming = _isMultitouch = true;
  			_currPanDist.y = _currPanDist.x = 0;

  			_equalizePoints(_startPanOffset, _panOffset);

  			_equalizePoints(p, startPointsList[0]);
  			_equalizePoints(p2, startPointsList[1]);

  			_findCenterOfPoints(p, p2, _currCenterPoint);

  			_midZoomPoint.x = Math.abs(_currCenterPoint.x) - _panOffset.x;
  			_midZoomPoint.y = Math.abs(_currCenterPoint.y) - _panOffset.y;
  			_currPointsDistance = _startPointsDistance = _calculatePointsDistance(p, p2);
  		}


  	},

  	// Pointermove/touchmove/mousemove handler
  	_onDragMove = function(e) {

  		e.preventDefault();

  		if(_pointerEventEnabled) {
  			var pointerIndex = framework.arraySearch(_currPointers, e.pointerId, 'id');
  			if(pointerIndex > -1) {
  				var p = _currPointers[pointerIndex];
  				p.x = e.pageX;
  				p.y = e.pageY; 
  			}
  		}

  		if(_isDragging) {
  			var touchesList = _getTouchPoints(e);
  			if(!_direction && !_moved && !_isZooming) {

  				if(_mainScrollPos.x !== _slideSize.x * _currPositionIndex) {
  					// if main scroll position is shifted – direction is always horizontal
  					_direction = 'h';
  				} else {
  					var diff = Math.abs(touchesList[0].x - _currPoint.x) - Math.abs(touchesList[0].y - _currPoint.y);
  					// check the direction of movement
  					if(Math.abs(diff) >= DIRECTION_CHECK_OFFSET) {
  						_direction = diff > 0 ? 'h' : 'v';
  						_currentPoints = touchesList;
  					}
  				}
  				
  			} else {
  				_currentPoints = touchesList;
  			}
  		}	
  	},
  	// 
  	_renderMovement =  function() {

  		if(!_currentPoints) {
  			return;
  		}

  		var numPoints = _currentPoints.length;

  		if(numPoints === 0) {
  			return;
  		}

  		_equalizePoints(p, _currentPoints[0]);

  		delta.x = p.x - _currPoint.x;
  		delta.y = p.y - _currPoint.y;

  		if(_isZooming && numPoints > 1) {
  			// Handle behaviour for more than 1 point

  			_currPoint.x = p.x;
  			_currPoint.y = p.y;
  		
  			// check if one of two points changed
  			if( !delta.x && !delta.y && _isEqualPoints(_currentPoints[1], p2) ) {
  				return;
  			}

  			_equalizePoints(p2, _currentPoints[1]);


  			if(!_zoomStarted) {
  				_zoomStarted = true;
  				_shout('zoomGestureStarted');
  			}
  			
  			// Distance between two points
  			var pointsDistance = _calculatePointsDistance(p,p2);

  			var zoomLevel = _calculateZoomLevel(pointsDistance);

  			// slightly over the of initial zoom level
  			if(zoomLevel > self.currItem.initialZoomLevel + self.currItem.initialZoomLevel / 15) {
  				_wasOverInitialZoom = true;
  			}

  			// Apply the friction if zoom level is out of the bounds
  			var zoomFriction = 1,
  				minZoomLevel = _getMinZoomLevel(),
  				maxZoomLevel = _getMaxZoomLevel();

  			if ( zoomLevel < minZoomLevel ) {
  				
  				if(_options.pinchToClose && !_wasOverInitialZoom && _startZoomLevel <= self.currItem.initialZoomLevel) {
  					// fade out background if zooming out
  					var minusDiff = minZoomLevel - zoomLevel;
  					var percent = 1 - minusDiff / (minZoomLevel / 1.2);

  					_applyBgOpacity(percent);
  					_shout('onPinchClose', percent);
  					_opacityChanged = true;
  				} else {
  					zoomFriction = (minZoomLevel - zoomLevel) / minZoomLevel;
  					if(zoomFriction > 1) {
  						zoomFriction = 1;
  					}
  					zoomLevel = minZoomLevel - zoomFriction * (minZoomLevel / 3);
  				}
  				
  			} else if ( zoomLevel > maxZoomLevel ) {
  				// 1.5 - extra zoom level above the max. E.g. if max is x6, real max 6 + 1.5 = 7.5
  				zoomFriction = (zoomLevel - maxZoomLevel) / ( minZoomLevel * 6 );
  				if(zoomFriction > 1) {
  					zoomFriction = 1;
  				}
  				zoomLevel = maxZoomLevel + zoomFriction * minZoomLevel;
  			}

  			if(zoomFriction < 0) {
  				zoomFriction = 0;
  			}

  			// distance between touch points after friction is applied
  			_currPointsDistance = pointsDistance;

  			// _centerPoint - The point in the middle of two pointers
  			_findCenterOfPoints(p, p2, _centerPoint);
  		
  			// paning with two pointers pressed
  			_currPanDist.x += _centerPoint.x - _currCenterPoint.x;
  			_currPanDist.y += _centerPoint.y - _currCenterPoint.y;
  			_equalizePoints(_currCenterPoint, _centerPoint);

  			_panOffset.x = _calculatePanOffset('x', zoomLevel);
  			_panOffset.y = _calculatePanOffset('y', zoomLevel);

  			_isZoomingIn = zoomLevel > _currZoomLevel;
  			_currZoomLevel = zoomLevel;
  			_applyCurrentZoomPan();

  		} else {

  			// handle behaviour for one point (dragging or panning)

  			if(!_direction) {
  				return;
  			}

  			if(_isFirstMove) {
  				_isFirstMove = false;

  				// subtract drag distance that was used during the detection direction  

  				if( Math.abs(delta.x) >= DIRECTION_CHECK_OFFSET) {
  					delta.x -= _currentPoints[0].x - _startPoint.x;
  				}
  				
  				if( Math.abs(delta.y) >= DIRECTION_CHECK_OFFSET) {
  					delta.y -= _currentPoints[0].y - _startPoint.y;
  				}
  			}

  			_currPoint.x = p.x;
  			_currPoint.y = p.y;

  			// do nothing if pointers position hasn't changed
  			if(delta.x === 0 && delta.y === 0) {
  				return;
  			}

  			if(_direction === 'v' && _options.closeOnVerticalDrag) {
  				if(!_canPan()) {
  					_currPanDist.y += delta.y;
  					_panOffset.y += delta.y;

  					var opacityRatio = _calculateVerticalDragOpacityRatio();

  					_verticalDragInitiated = true;
  					_shout('onVerticalDrag', opacityRatio);

  					_applyBgOpacity(opacityRatio);
  					_applyCurrentZoomPan();
  					return ;
  				}
  			}

  			_pushPosPoint(_getCurrentTime(), p.x, p.y);

  			_moved = true;
  			_currPanBounds = self.currItem.bounds;
  			
  			var mainScrollChanged = _panOrMoveMainScroll('x', delta);
  			if(!mainScrollChanged) {
  				_panOrMoveMainScroll('y', delta);

  				_roundPoint(_panOffset);
  				_applyCurrentZoomPan();
  			}

  		}

  	},
  	
  	// Pointerup/pointercancel/touchend/touchcancel/mouseup event handler
  	_onDragRelease = function(e) {

  		if(_features.isOldAndroid ) {

  			if(_oldAndroidTouchEndTimeout && e.type === 'mouseup') {
  				return;
  			}

  			// on Android (v4.1, 4.2, 4.3 & possibly older) 
  			// ghost mousedown/up event isn't preventable via e.preventDefault,
  			// which causes fake mousedown event
  			// so we block mousedown/up for 600ms
  			if( e.type.indexOf('touch') > -1 ) {
  				clearTimeout(_oldAndroidTouchEndTimeout);
  				_oldAndroidTouchEndTimeout = setTimeout(function() {
  					_oldAndroidTouchEndTimeout = 0;
  				}, 600);
  			}
  			
  		}

  		_shout('pointerUp');

  		if(_preventDefaultEventBehaviour(e, false)) {
  			e.preventDefault();
  		}

  		var releasePoint;

  		if(_pointerEventEnabled) {
  			var pointerIndex = framework.arraySearch(_currPointers, e.pointerId, 'id');
  			
  			if(pointerIndex > -1) {
  				releasePoint = _currPointers.splice(pointerIndex, 1)[0];

  				if(navigator.pointerEnabled) {
  					releasePoint.type = e.pointerType || 'mouse';
  				} else {
  					var MSPOINTER_TYPES = {
  						4: 'mouse', // event.MSPOINTER_TYPE_MOUSE
  						2: 'touch', // event.MSPOINTER_TYPE_TOUCH 
  						3: 'pen' // event.MSPOINTER_TYPE_PEN
  					};
  					releasePoint.type = MSPOINTER_TYPES[e.pointerType];

  					if(!releasePoint.type) {
  						releasePoint.type = e.pointerType || 'mouse';
  					}
  				}

  			}
  		}

  		var touchList = _getTouchPoints(e),
  			gestureType,
  			numPoints = touchList.length;

  		if(e.type === 'mouseup') {
  			numPoints = 0;
  		}

  		// Do nothing if there were 3 touch points or more
  		if(numPoints === 2) {
  			_currentPoints = null;
  			return true;
  		}

  		// if second pointer released
  		if(numPoints === 1) {
  			_equalizePoints(_startPoint, touchList[0]);
  		}				


  		// pointer hasn't moved, send "tap release" point
  		if(numPoints === 0 && !_direction && !_mainScrollAnimating) {
  			if(!releasePoint) {
  				if(e.type === 'mouseup') {
  					releasePoint = {x: e.pageX, y: e.pageY, type:'mouse'};
  				} else if(e.changedTouches && e.changedTouches[0]) {
  					releasePoint = {x: e.changedTouches[0].pageX, y: e.changedTouches[0].pageY, type:'touch'};
  				}		
  			}

  			_shout('touchRelease', e, releasePoint);
  		}

  		// Difference in time between releasing of two last touch points (zoom gesture)
  		var releaseTimeDiff = -1;

  		// Gesture completed, no pointers left
  		if(numPoints === 0) {
  			_isDragging = false;
  			framework.unbind(window, _upMoveEvents, self);

  			_stopDragUpdateLoop();

  			if(_isZooming) {
  				// Two points released at the same time
  				releaseTimeDiff = 0;
  			} else if(_lastReleaseTime !== -1) {
  				releaseTimeDiff = _getCurrentTime() - _lastReleaseTime;
  			}
  		}
  		_lastReleaseTime = numPoints === 1 ? _getCurrentTime() : -1;
  		
  		if(releaseTimeDiff !== -1 && releaseTimeDiff < 150) {
  			gestureType = 'zoom';
  		} else {
  			gestureType = 'swipe';
  		}

  		if(_isZooming && numPoints < 2) {
  			_isZooming = false;

  			// Only second point released
  			if(numPoints === 1) {
  				gestureType = 'zoomPointerUp';
  			}
  			_shout('zoomGestureEnded');
  		}

  		_currentPoints = null;
  		if(!_moved && !_zoomStarted && !_mainScrollAnimating && !_verticalDragInitiated) {
  			// nothing to animate
  			return;
  		}
  	
  		_stopAllAnimations();

  		
  		if(!_releaseAnimData) {
  			_releaseAnimData = _initDragReleaseAnimationData();
  		}
  		
  		_releaseAnimData.calculateSwipeSpeed('x');


  		if(_verticalDragInitiated) {

  			var opacityRatio = _calculateVerticalDragOpacityRatio();

  			if(opacityRatio < _options.verticalDragRange) {
  				self.close();
  			} else {
  				var initalPanY = _panOffset.y,
  					initialBgOpacity = _bgOpacity;

  				_animateProp('verticalDrag', 0, 1, 300, framework.easing.cubic.out, function(now) {
  					
  					_panOffset.y = (self.currItem.initialPosition.y - initalPanY) * now + initalPanY;

  					_applyBgOpacity(  (1 - initialBgOpacity) * now + initialBgOpacity );
  					_applyCurrentZoomPan();
  				});

  				_shout('onVerticalDrag', 1);
  			}

  			return;
  		}


  		// main scroll 
  		if(  (_mainScrollShifted || _mainScrollAnimating) && numPoints === 0) {
  			var itemChanged = _finishSwipeMainScrollGesture(gestureType, _releaseAnimData);
  			if(itemChanged) {
  				return;
  			}
  			gestureType = 'zoomPointerUp';
  		}

  		// prevent zoom/pan animation when main scroll animation runs
  		if(_mainScrollAnimating) {
  			return;
  		}
  		
  		// Complete simple zoom gesture (reset zoom level if it's out of the bounds)  
  		if(gestureType !== 'swipe') {
  			_completeZoomGesture();
  			return;
  		}
  	
  		// Complete pan gesture if main scroll is not shifted, and it's possible to pan current image
  		if(!_mainScrollShifted && _currZoomLevel > self.currItem.fitRatio) {
  			_completePanGesture(_releaseAnimData);
  		}
  	},


  	// Returns object with data about gesture
  	// It's created only once and then reused
  	_initDragReleaseAnimationData  = function() {
  		// temp local vars
  		var lastFlickDuration,
  			tempReleasePos;

  		// s = this
  		var s = {
  			lastFlickOffset: {},
  			lastFlickDist: {},
  			lastFlickSpeed: {},
  			slowDownRatio:  {},
  			slowDownRatioReverse:  {},
  			speedDecelerationRatio:  {},
  			speedDecelerationRatioAbs:  {},
  			distanceOffset:  {},
  			backAnimDestination: {},
  			backAnimStarted: {},
  			calculateSwipeSpeed: function(axis) {
  				

  				if( _posPoints.length > 1) {
  					lastFlickDuration = _getCurrentTime() - _gestureCheckSpeedTime + 50;
  					tempReleasePos = _posPoints[_posPoints.length-2][axis];
  				} else {
  					lastFlickDuration = _getCurrentTime() - _gestureStartTime; // total gesture duration
  					tempReleasePos = _startPoint[axis];
  				}
  				s.lastFlickOffset[axis] = _currPoint[axis] - tempReleasePos;
  				s.lastFlickDist[axis] = Math.abs(s.lastFlickOffset[axis]);
  				if(s.lastFlickDist[axis] > 20) {
  					s.lastFlickSpeed[axis] = s.lastFlickOffset[axis] / lastFlickDuration;
  				} else {
  					s.lastFlickSpeed[axis] = 0;
  				}
  				if( Math.abs(s.lastFlickSpeed[axis]) < 0.1 ) {
  					s.lastFlickSpeed[axis] = 0;
  				}
  				
  				s.slowDownRatio[axis] = 0.95;
  				s.slowDownRatioReverse[axis] = 1 - s.slowDownRatio[axis];
  				s.speedDecelerationRatio[axis] = 1;
  			},

  			calculateOverBoundsAnimOffset: function(axis, speed) {
  				if(!s.backAnimStarted[axis]) {

  					if(_panOffset[axis] > _currPanBounds.min[axis]) {
  						s.backAnimDestination[axis] = _currPanBounds.min[axis];
  						
  					} else if(_panOffset[axis] < _currPanBounds.max[axis]) {
  						s.backAnimDestination[axis] = _currPanBounds.max[axis];
  					}

  					if(s.backAnimDestination[axis] !== undefined) {
  						s.slowDownRatio[axis] = 0.7;
  						s.slowDownRatioReverse[axis] = 1 - s.slowDownRatio[axis];
  						if(s.speedDecelerationRatioAbs[axis] < 0.05) {

  							s.lastFlickSpeed[axis] = 0;
  							s.backAnimStarted[axis] = true;

  							_animateProp('bounceZoomPan'+axis,_panOffset[axis], 
  								s.backAnimDestination[axis], 
  								speed || 300, 
  								framework.easing.sine.out, 
  								function(pos) {
  									_panOffset[axis] = pos;
  									_applyCurrentZoomPan();
  								}
  							);

  						}
  					}
  				}
  			},

  			// Reduces the speed by slowDownRatio (per 10ms)
  			calculateAnimOffset: function(axis) {
  				if(!s.backAnimStarted[axis]) {
  					s.speedDecelerationRatio[axis] = s.speedDecelerationRatio[axis] * (s.slowDownRatio[axis] + 
  												s.slowDownRatioReverse[axis] - 
  												s.slowDownRatioReverse[axis] * s.timeDiff / 10);

  					s.speedDecelerationRatioAbs[axis] = Math.abs(s.lastFlickSpeed[axis] * s.speedDecelerationRatio[axis]);
  					s.distanceOffset[axis] = s.lastFlickSpeed[axis] * s.speedDecelerationRatio[axis] * s.timeDiff;
  					_panOffset[axis] += s.distanceOffset[axis];

  				}
  			},

  			panAnimLoop: function() {
  				if ( _animations.zoomPan ) {
  					_animations.zoomPan.raf = _requestAF(s.panAnimLoop);

  					s.now = _getCurrentTime();
  					s.timeDiff = s.now - s.lastNow;
  					s.lastNow = s.now;
  					
  					s.calculateAnimOffset('x');
  					s.calculateAnimOffset('y');

  					_applyCurrentZoomPan();
  					
  					s.calculateOverBoundsAnimOffset('x');
  					s.calculateOverBoundsAnimOffset('y');


  					if (s.speedDecelerationRatioAbs.x < 0.05 && s.speedDecelerationRatioAbs.y < 0.05) {

  						// round pan position
  						_panOffset.x = Math.round(_panOffset.x);
  						_panOffset.y = Math.round(_panOffset.y);
  						_applyCurrentZoomPan();
  						
  						_stopAnimation('zoomPan');
  						return;
  					}
  				}

  			}
  		};
  		return s;
  	},

  	_completePanGesture = function(animData) {
  		// calculate swipe speed for Y axis (paanning)
  		animData.calculateSwipeSpeed('y');

  		_currPanBounds = self.currItem.bounds;
  		
  		animData.backAnimDestination = {};
  		animData.backAnimStarted = {};

  		// Avoid acceleration animation if speed is too low
  		if(Math.abs(animData.lastFlickSpeed.x) <= 0.05 && Math.abs(animData.lastFlickSpeed.y) <= 0.05 ) {
  			animData.speedDecelerationRatioAbs.x = animData.speedDecelerationRatioAbs.y = 0;

  			// Run pan drag release animation. E.g. if you drag image and release finger without momentum.
  			animData.calculateOverBoundsAnimOffset('x');
  			animData.calculateOverBoundsAnimOffset('y');
  			return true;
  		}

  		// Animation loop that controls the acceleration after pan gesture ends
  		_registerStartAnimation('zoomPan');
  		animData.lastNow = _getCurrentTime();
  		animData.panAnimLoop();
  	},


  	_finishSwipeMainScrollGesture = function(gestureType, _releaseAnimData) {
  		var itemChanged;
  		if(!_mainScrollAnimating) {
  			_currZoomedItemIndex = _currentItemIndex;
  		}


  		
  		var itemsDiff;

  		if(gestureType === 'swipe') {
  			var totalShiftDist = _currPoint.x - _startPoint.x,
  				isFastLastFlick = _releaseAnimData.lastFlickDist.x < 10;

  			// if container is shifted for more than MIN_SWIPE_DISTANCE, 
  			// and last flick gesture was in right direction
  			if(totalShiftDist > MIN_SWIPE_DISTANCE && 
  				(isFastLastFlick || _releaseAnimData.lastFlickOffset.x > 20) ) {
  				// go to prev item
  				itemsDiff = -1;
  			} else if(totalShiftDist < -MIN_SWIPE_DISTANCE && 
  				(isFastLastFlick || _releaseAnimData.lastFlickOffset.x < -20) ) {
  				// go to next item
  				itemsDiff = 1;
  			}
  		}

  		var nextCircle;

  		if(itemsDiff) {
  			
  			_currentItemIndex += itemsDiff;

  			if(_currentItemIndex < 0) {
  				_currentItemIndex = _options.loop ? _getNumItems()-1 : 0;
  				nextCircle = true;
  			} else if(_currentItemIndex >= _getNumItems()) {
  				_currentItemIndex = _options.loop ? 0 : _getNumItems()-1;
  				nextCircle = true;
  			}

  			if(!nextCircle || _options.loop) {
  				_indexDiff += itemsDiff;
  				_currPositionIndex -= itemsDiff;
  				itemChanged = true;
  			}
  			

  			
  		}

  		var animateToX = _slideSize.x * _currPositionIndex;
  		var animateToDist = Math.abs( animateToX - _mainScrollPos.x );
  		var finishAnimDuration;


  		if(!itemChanged && animateToX > _mainScrollPos.x !== _releaseAnimData.lastFlickSpeed.x > 0) {
  			// "return to current" duration, e.g. when dragging from slide 0 to -1
  			finishAnimDuration = 333; 
  		} else {
  			finishAnimDuration = Math.abs(_releaseAnimData.lastFlickSpeed.x) > 0 ? 
  									animateToDist / Math.abs(_releaseAnimData.lastFlickSpeed.x) : 
  									333;

  			finishAnimDuration = Math.min(finishAnimDuration, 400);
  			finishAnimDuration = Math.max(finishAnimDuration, 250);
  		}

  		if(_currZoomedItemIndex === _currentItemIndex) {
  			itemChanged = false;
  		}
  		
  		_mainScrollAnimating = true;
  		
  		_shout('mainScrollAnimStart');

  		_animateProp('mainScroll', _mainScrollPos.x, animateToX, finishAnimDuration, framework.easing.cubic.out, 
  			_moveMainScroll,
  			function() {
  				_stopAllAnimations();
  				_mainScrollAnimating = false;
  				_currZoomedItemIndex = -1;
  				
  				if(itemChanged || _currZoomedItemIndex !== _currentItemIndex) {
  					self.updateCurrItem();
  				}
  				
  				_shout('mainScrollAnimComplete');
  			}
  		);

  		if(itemChanged) {
  			self.updateCurrItem(true);
  		}

  		return itemChanged;
  	},

  	_calculateZoomLevel = function(touchesDistance) {
  		return  1 / _startPointsDistance * touchesDistance * _startZoomLevel;
  	},

  	// Resets zoom if it's out of bounds
  	_completeZoomGesture = function() {
  		var destZoomLevel = _currZoomLevel,
  			minZoomLevel = _getMinZoomLevel(),
  			maxZoomLevel = _getMaxZoomLevel();

  		if ( _currZoomLevel < minZoomLevel ) {
  			destZoomLevel = minZoomLevel;
  		} else if ( _currZoomLevel > maxZoomLevel ) {
  			destZoomLevel = maxZoomLevel;
  		}

  		var destOpacity = 1,
  			onUpdate,
  			initialOpacity = _bgOpacity;

  		if(_opacityChanged && !_isZoomingIn && !_wasOverInitialZoom && _currZoomLevel < minZoomLevel) {
  			//_closedByScroll = true;
  			self.close();
  			return true;
  		}

  		if(_opacityChanged) {
  			onUpdate = function(now) {
  				_applyBgOpacity(  (destOpacity - initialOpacity) * now + initialOpacity );
  			};
  		}

  		self.zoomTo(destZoomLevel, 0, 200,  framework.easing.cubic.out, onUpdate);
  		return true;
  	};


  _registerModule('Gestures', {
  	publicMethods: {

  		initGestures: function() {

  			// helper function that builds touch/pointer/mouse events
  			var addEventNames = function(pref, down, move, up, cancel) {
  				_dragStartEvent = pref + down;
  				_dragMoveEvent = pref + move;
  				_dragEndEvent = pref + up;
  				if(cancel) {
  					_dragCancelEvent = pref + cancel;
  				} else {
  					_dragCancelEvent = '';
  				}
  			};

  			_pointerEventEnabled = _features.pointerEvent;
  			if(_pointerEventEnabled && _features.touch) {
  				// we don't need touch events, if browser supports pointer events
  				_features.touch = false;
  			}

  			if(_pointerEventEnabled) {
  				if(navigator.pointerEnabled) {
  					addEventNames('pointer', 'down', 'move', 'up', 'cancel');
  				} else {
  					// IE10 pointer events are case-sensitive
  					addEventNames('MSPointer', 'Down', 'Move', 'Up', 'Cancel');
  				}
  			} else if(_features.touch) {
  				addEventNames('touch', 'start', 'move', 'end', 'cancel');
  				_likelyTouchDevice = true;
  			} else {
  				addEventNames('mouse', 'down', 'move', 'up');	
  			}

  			_upMoveEvents = _dragMoveEvent + ' ' + _dragEndEvent  + ' ' +  _dragCancelEvent;
  			_downEvents = _dragStartEvent;

  			if(_pointerEventEnabled && !_likelyTouchDevice) {
  				_likelyTouchDevice = (navigator.maxTouchPoints > 1) || (navigator.msMaxTouchPoints > 1);
  			}
  			// make variable public
  			self.likelyTouchDevice = _likelyTouchDevice; 
  			
  			_globalEventHandlers[_dragStartEvent] = _onDragStart;
  			_globalEventHandlers[_dragMoveEvent] = _onDragMove;
  			_globalEventHandlers[_dragEndEvent] = _onDragRelease; // the Kraken

  			if(_dragCancelEvent) {
  				_globalEventHandlers[_dragCancelEvent] = _globalEventHandlers[_dragEndEvent];
  			}

  			// Bind mouse events on device with detected hardware touch support, in case it supports multiple types of input.
  			if(_features.touch) {
  				_downEvents += ' mousedown';
  				_upMoveEvents += ' mousemove mouseup';
  				_globalEventHandlers.mousedown = _globalEventHandlers[_dragStartEvent];
  				_globalEventHandlers.mousemove = _globalEventHandlers[_dragMoveEvent];
  				_globalEventHandlers.mouseup = _globalEventHandlers[_dragEndEvent];
  			}

  			if(!_likelyTouchDevice) {
  				// don't allow pan to next slide from zoomed state on Desktop
  				_options.allowPanToNext = false;
  			}
  		}

  	}
  });


  /*>>gestures*/

  /*>>show-hide-transition*/
  /**
   * show-hide-transition.js:
   *
   * Manages initial opening or closing transition.
   *
   * If you're not planning to use transition for gallery at all,
   * you may set options hideAnimationDuration and showAnimationDuration to 0,
   * and just delete startAnimation function.
   * 
   */


  var _showOrHideTimeout,
  	_showOrHide = function(item, img, out, completeFn) {

  		if(_showOrHideTimeout) {
  			clearTimeout(_showOrHideTimeout);
  		}

  		_initialZoomRunning = true;
  		_initialContentSet = true;
  		
  		// dimensions of small thumbnail {x:,y:,w:}.
  		// Height is optional, as calculated based on large image.
  		var thumbBounds; 
  		if(item.initialLayout) {
  			thumbBounds = item.initialLayout;
  			item.initialLayout = null;
  		} else {
  			thumbBounds = _options.getThumbBoundsFn && _options.getThumbBoundsFn(_currentItemIndex);
  		}

  		var duration = out ? _options.hideAnimationDuration : _options.showAnimationDuration;

  		var onComplete = function() {
  			_stopAnimation('initialZoom');
  			if(!out) {
  				_applyBgOpacity(1);
  				if(img) {
  					img.style.display = 'block';
  				}
  				framework.addClass(template, 'pswp--animated-in');
  				_shout('initialZoom' + (out ? 'OutEnd' : 'InEnd'));
  			} else {
  				self.template.removeAttribute('style');
  				self.bg.removeAttribute('style');
  			}

  			if(completeFn) {
  				completeFn();
  			}
  			_initialZoomRunning = false;
  		};

  		// if bounds aren't provided, just open gallery without animation
  		if(!duration || !thumbBounds || thumbBounds.x === undefined) {

  			_shout('initialZoom' + (out ? 'Out' : 'In') );

  			_currZoomLevel = item.initialZoomLevel;
  			_equalizePoints(_panOffset,  item.initialPosition );
  			_applyCurrentZoomPan();

  			template.style.opacity = out ? 0 : 1;
  			_applyBgOpacity(1);

  			if(duration) {
  				setTimeout(function() {
  					onComplete();
  				}, duration);
  			} else {
  				onComplete();
  			}

  			return;
  		}

  		var startAnimation = function() {
  			var closeWithRaf = _closedByScroll,
  				fadeEverything = !self.currItem.src || self.currItem.loadError || _options.showHideOpacity;
  			
  			// apply hw-acceleration to image
  			if(item.miniImg) {
  				item.miniImg.style.webkitBackfaceVisibility = 'hidden';
  			}

  			if(!out) {
  				_currZoomLevel = thumbBounds.w / item.w;
  				_panOffset.x = thumbBounds.x;
  				_panOffset.y = thumbBounds.y - _initalWindowScrollY;

  				self[fadeEverything ? 'template' : 'bg'].style.opacity = 0.001;
  				_applyCurrentZoomPan();
  			}

  			_registerStartAnimation('initialZoom');
  			
  			if(out && !closeWithRaf) {
  				framework.removeClass(template, 'pswp--animated-in');
  			}

  			if(fadeEverything) {
  				if(out) {
  					framework[ (closeWithRaf ? 'remove' : 'add') + 'Class' ](template, 'pswp--animate_opacity');
  				} else {
  					setTimeout(function() {
  						framework.addClass(template, 'pswp--animate_opacity');
  					}, 30);
  				}
  			}

  			_showOrHideTimeout = setTimeout(function() {

  				_shout('initialZoom' + (out ? 'Out' : 'In') );
  				

  				if(!out) {

  					// "in" animation always uses CSS transitions (instead of rAF).
  					// CSS transition work faster here, 
  					// as developer may also want to animate other things, 
  					// like ui on top of sliding area, which can be animated just via CSS
  					
  					_currZoomLevel = item.initialZoomLevel;
  					_equalizePoints(_panOffset,  item.initialPosition );
  					_applyCurrentZoomPan();
  					_applyBgOpacity(1);

  					if(fadeEverything) {
  						template.style.opacity = 1;
  					} else {
  						_applyBgOpacity(1);
  					}

  					_showOrHideTimeout = setTimeout(onComplete, duration + 20);
  				} else {

  					// "out" animation uses rAF only when PhotoSwipe is closed by browser scroll, to recalculate position
  					var destZoomLevel = thumbBounds.w / item.w,
  						initialPanOffset = {
  							x: _panOffset.x,
  							y: _panOffset.y
  						},
  						initialZoomLevel = _currZoomLevel,
  						initalBgOpacity = _bgOpacity,
  						onUpdate = function(now) {
  							
  							if(now === 1) {
  								_currZoomLevel = destZoomLevel;
  								_panOffset.x = thumbBounds.x;
  								_panOffset.y = thumbBounds.y  - _currentWindowScrollY;
  							} else {
  								_currZoomLevel = (destZoomLevel - initialZoomLevel) * now + initialZoomLevel;
  								_panOffset.x = (thumbBounds.x - initialPanOffset.x) * now + initialPanOffset.x;
  								_panOffset.y = (thumbBounds.y - _currentWindowScrollY - initialPanOffset.y) * now + initialPanOffset.y;
  							}
  							
  							_applyCurrentZoomPan();
  							if(fadeEverything) {
  								template.style.opacity = 1 - now;
  							} else {
  								_applyBgOpacity( initalBgOpacity - now * initalBgOpacity );
  							}
  						};

  					if(closeWithRaf) {
  						_animateProp('initialZoom', 0, 1, duration, framework.easing.cubic.out, onUpdate, onComplete);
  					} else {
  						onUpdate(1);
  						_showOrHideTimeout = setTimeout(onComplete, duration + 20);
  					}
  				}
  			
  			}, out ? 25 : 90); // Main purpose of this delay is to give browser time to paint and
  					// create composite layers of PhotoSwipe UI parts (background, controls, caption, arrows).
  					// Which avoids lag at the beginning of scale transition.
  		};
  		startAnimation();

  		
  	};

  /*>>show-hide-transition*/

  /*>>items-controller*/
  /**
  *
  * Controller manages gallery items, their dimensions, and their content.
  * 
  */

  var _items,
  	_tempPanAreaSize = {},
  	_imagesToAppendPool = [],
  	_initialContentSet,
  	_initialZoomRunning,
  	_controllerDefaultOptions = {
  		index: 0,
  		errorMsg: '<div class="pswp__error-msg"><a href="%url%" target="_blank">The image</a> could not be loaded.</div>',
  		forceProgressiveLoading: false, // TODO
  		preload: [1,1],
  		getNumItemsFn: function() {
  			return _items.length;
  		}
  	};


  var _getItemAt,
  	_getNumItems,
  	_getZeroBounds = function() {
  		return {
  			center:{x:0,y:0}, 
  			max:{x:0,y:0}, 
  			min:{x:0,y:0}
  		};
  	},
  	_calculateSingleItemPanBounds = function(item, realPanElementW, realPanElementH ) {
  		var bounds = item.bounds;

  		// position of element when it's centered
  		bounds.center.x = Math.round((_tempPanAreaSize.x - realPanElementW) / 2);
  		bounds.center.y = Math.round((_tempPanAreaSize.y - realPanElementH) / 2) + item.vGap.top;

  		// maximum pan position
  		bounds.max.x = (realPanElementW > _tempPanAreaSize.x) ? 
  							Math.round(_tempPanAreaSize.x - realPanElementW) : 
  							bounds.center.x;
  		
  		bounds.max.y = (realPanElementH > _tempPanAreaSize.y) ? 
  							Math.round(_tempPanAreaSize.y - realPanElementH) + item.vGap.top : 
  							bounds.center.y;
  		
  		// minimum pan position
  		bounds.min.x = (realPanElementW > _tempPanAreaSize.x) ? 0 : bounds.center.x;
  		bounds.min.y = (realPanElementH > _tempPanAreaSize.y) ? item.vGap.top : bounds.center.y;
  	},
  	_calculateItemSize = function(item, viewportSize, zoomLevel) {

  		if (item.src && !item.loadError) {
  			var isInitial = !zoomLevel;
  			
  			if(isInitial) {
  				if(!item.vGap) {
  					item.vGap = {top:0,bottom:0};
  				}
  				// allows overriding vertical margin for individual items
  				_shout('parseVerticalMargin', item);
  			}


  			_tempPanAreaSize.x = viewportSize.x;
  			_tempPanAreaSize.y = viewportSize.y - item.vGap.top - item.vGap.bottom;

  			if (isInitial) {
  				var hRatio = _tempPanAreaSize.x / item.w;
  				var vRatio = _tempPanAreaSize.y / item.h;

  				item.fitRatio = hRatio < vRatio ? hRatio : vRatio;
  				//item.fillRatio = hRatio > vRatio ? hRatio : vRatio;

  				var scaleMode = _options.scaleMode;

  				if (scaleMode === 'orig') {
  					zoomLevel = 1;
  				} else if (scaleMode === 'fit') {
  					zoomLevel = item.fitRatio;
  				}

  				if (zoomLevel > 1) {
  					zoomLevel = 1;
  				}

  				item.initialZoomLevel = zoomLevel;
  				
  				if(!item.bounds) {
  					// reuse bounds object
  					item.bounds = _getZeroBounds(); 
  				}
  			}

  			if(!zoomLevel) {
  				return;
  			}

  			_calculateSingleItemPanBounds(item, item.w * zoomLevel, item.h * zoomLevel);

  			if (isInitial && zoomLevel === item.initialZoomLevel) {
  				item.initialPosition = item.bounds.center;
  			}

  			return item.bounds;
  		} else {
  			item.w = item.h = 0;
  			item.initialZoomLevel = item.fitRatio = 1;
  			item.bounds = _getZeroBounds();
  			item.initialPosition = item.bounds.center;

  			// if it's not image, we return zero bounds (content is not zoomable)
  			return item.bounds;
  		}
  		
  	},

  	


  	_appendImage = function(index, item, baseDiv, img, preventAnimation, keepPlaceholder) {
  		

  		if(item.loadError) {
  			return;
  		}

  		if(img) {

  			item.imageAppended = true;
  			_setImageSize(item, img, (item === self.currItem && _renderMaxResolution) );
  			
  			baseDiv.appendChild(img);

  			if(keepPlaceholder) {
  				setTimeout(function() {
  					if(item && item.loaded && item.placeholder) {
  						item.placeholder.style.display = 'none';
  						item.placeholder = null;
  					}
  				}, 500);
  			}
  		}
  	},
  	


  	_preloadImage = function(item) {
  		item.loading = true;
  		item.loaded = false;
  		var img = item.img = framework.createEl('pswp__img', 'img');
  		var onComplete = function() {
  			item.loading = false;
  			item.loaded = true;

  			if(item.loadComplete) {
  				item.loadComplete(item);
  			} else {
  				item.img = null; // no need to store image object
  			}
  			img.onload = img.onerror = null;
  			img = null;
  		};
  		img.onload = onComplete;
  		img.onerror = function() {
  			item.loadError = true;
  			onComplete();
  		};		

  		img.src = item.src;// + '?a=' + Math.random();

  		return img;
  	},
  	_checkForError = function(item, cleanUp) {
  		if(item.src && item.loadError && item.container) {

  			if(cleanUp) {
  				item.container.innerHTML = '';
  			}

  			item.container.innerHTML = _options.errorMsg.replace('%url%',  item.src );
  			return true;
  			
  		}
  	},
  	_setImageSize = function(item, img, maxRes) {
  		if(!item.src) {
  			return;
  		}

  		if(!img) {
  			img = item.container.lastChild;
  		}

  		var w = maxRes ? item.w : Math.round(item.w * item.fitRatio),
  			h = maxRes ? item.h : Math.round(item.h * item.fitRatio);
  		
  		if(item.placeholder && !item.loaded) {
  			item.placeholder.style.width = w + 'px';
  			item.placeholder.style.height = h + 'px';
  		}

  		img.style.width = w + 'px';
  		img.style.height = h + 'px';
  	},
  	_appendImagesPool = function() {

  		if(_imagesToAppendPool.length) {
  			var poolItem;

  			for(var i = 0; i < _imagesToAppendPool.length; i++) {
  				poolItem = _imagesToAppendPool[i];
  				if( poolItem.holder.index === poolItem.index ) {
  					_appendImage(poolItem.index, poolItem.item, poolItem.baseDiv, poolItem.img, false, poolItem.clearPlaceholder);
  				}
  			}
  			_imagesToAppendPool = [];
  		}
  	};
  	


  _registerModule('Controller', {

  	publicMethods: {

  		lazyLoadItem: function(index) {
  			index = _getLoopedId(index);
  			var item = _getItemAt(index);

  			if(!item || ((item.loaded || item.loading) && !_itemsNeedUpdate)) {
  				return;
  			}

  			_shout('gettingData', index, item);

  			if (!item.src) {
  				return;
  			}

  			_preloadImage(item);
  		},
  		initController: function() {
  			framework.extend(_options, _controllerDefaultOptions, true);
  			self.items = _items = items;
  			_getItemAt = self.getItemAt;
  			_getNumItems = _options.getNumItemsFn; //self.getNumItems;
  			if(_getNumItems() < 3) {
  				_options.loop = false; // disable loop if less then 3 items
  			}

  			_listen('beforeChange', function(diff) {

  				var p = _options.preload,
  					isNext = diff === null ? true : (diff >= 0),
  					preloadBefore = Math.min(p[0], _getNumItems() ),
  					preloadAfter = Math.min(p[1], _getNumItems() ),
  					i;


  				for(i = 1; i <= (isNext ? preloadAfter : preloadBefore); i++) {
  					self.lazyLoadItem(_currentItemIndex+i);
  				}
  				for(i = 1; i <= (isNext ? preloadBefore : preloadAfter); i++) {
  					self.lazyLoadItem(_currentItemIndex-i);
  				}
  			});

  			_listen('initialLayout', function() {
  				self.currItem.initialLayout = _options.getThumbBoundsFn && _options.getThumbBoundsFn(_currentItemIndex);
  			});

  			_listen('mainScrollAnimComplete', _appendImagesPool);
  			_listen('initialZoomInEnd', _appendImagesPool);



  			_listen('destroy', function() {
  				var item;
  				for(var i = 0; i < _items.length; i++) {
  					item = _items[i];
  					// remove reference to DOM elements, for GC
  					if(item.container) {
  						item.container = null; 
  					}
  					if(item.placeholder) {
  						item.placeholder = null;
  					}
  					if(item.img) {
  						item.img = null;
  					}
  					if(item.preloader) {
  						item.preloader = null;
  					}
  					if(item.loadError) {
  						item.loaded = item.loadError = false;
  					}
  				}
  				_imagesToAppendPool = null;
  			});
  		},


  		getItemAt: function(index) {
  			if (index >= 0) {
  				return _items[index] !== undefined ? _items[index] : false;
  			}
  			return false;
  		},

  		allowProgressiveImg: function() {
  			// 1. Progressive image loading isn't working on webkit/blink 
  			//    when hw-acceleration (e.g. translateZ) is applied to IMG element.
  			//    That's why in PhotoSwipe parent element gets zoom transform, not image itself.
  			//    
  			// 2. Progressive image loading sometimes blinks in webkit/blink when applying animation to parent element.
  			//    That's why it's disabled on touch devices (mainly because of swipe transition)
  			//    
  			// 3. Progressive image loading sometimes doesn't work in IE (up to 11).

  			// Don't allow progressive loading on non-large touch devices
  			return _options.forceProgressiveLoading || !_likelyTouchDevice || _options.mouseUsed || screen.width > 1200; 
  			// 1200 - to eliminate touch devices with large screen (like Chromebook Pixel)
  		},

  		setContent: function(holder, index) {

  			if(_options.loop) {
  				index = _getLoopedId(index);
  			}

  			var prevItem = self.getItemAt(holder.index);
  			if(prevItem) {
  				prevItem.container = null;
  			}
  	
  			var item = self.getItemAt(index),
  				img;
  			
  			if(!item) {
  				holder.el.innerHTML = '';
  				return;
  			}

  			// allow to override data
  			_shout('gettingData', index, item);

  			holder.index = index;
  			holder.item = item;

  			// base container DIV is created only once for each of 3 holders
  			var baseDiv = item.container = framework.createEl('pswp__zoom-wrap'); 

  			

  			if(!item.src && item.html) {
  				if(item.html.tagName) {
  					baseDiv.appendChild(item.html);
  				} else {
  					baseDiv.innerHTML = item.html;
  				}
  			}

  			_checkForError(item);

  			_calculateItemSize(item, _viewportSize);
  			
  			if(item.src && !item.loadError && !item.loaded) {

  				item.loadComplete = function(item) {

  					// gallery closed before image finished loading
  					if(!_isOpen) {
  						return;
  					}

  					// check if holder hasn't changed while image was loading
  					if(holder && holder.index === index ) {
  						if( _checkForError(item, true) ) {
  							item.loadComplete = item.img = null;
  							_calculateItemSize(item, _viewportSize);
  							_applyZoomPanToItem(item);

  							if(holder.index === _currentItemIndex) {
  								// recalculate dimensions
  								self.updateCurrZoomItem();
  							}
  							return;
  						}
  						if( !item.imageAppended ) {
  							if(_features.transform && (_mainScrollAnimating || _initialZoomRunning) ) {
  								_imagesToAppendPool.push({
  									item:item,
  									baseDiv:baseDiv,
  									img:item.img,
  									index:index,
  									holder:holder,
  									clearPlaceholder:true
  								});
  							} else {
  								_appendImage(index, item, baseDiv, item.img, _mainScrollAnimating || _initialZoomRunning, true);
  							}
  						} else {
  							// remove preloader & mini-img
  							if(!_initialZoomRunning && item.placeholder) {
  								item.placeholder.style.display = 'none';
  								item.placeholder = null;
  							}
  						}
  					}

  					item.loadComplete = null;
  					item.img = null; // no need to store image element after it's added

  					_shout('imageLoadComplete', index, item);
  				};

  				if(framework.features.transform) {
  					
  					var placeholderClassName = 'pswp__img pswp__img--placeholder'; 
  					placeholderClassName += (item.msrc ? '' : ' pswp__img--placeholder--blank');

  					var placeholder = framework.createEl(placeholderClassName, item.msrc ? 'img' : '');
  					if(item.msrc) {
  						placeholder.src = item.msrc;
  					}
  					
  					_setImageSize(item, placeholder);

  					baseDiv.appendChild(placeholder);
  					item.placeholder = placeholder;

  				}
  				

  				

  				if(!item.loading) {
  					_preloadImage(item);
  				}


  				if( self.allowProgressiveImg() ) {
  					// just append image
  					if(!_initialContentSet && _features.transform) {
  						_imagesToAppendPool.push({
  							item:item, 
  							baseDiv:baseDiv, 
  							img:item.img, 
  							index:index, 
  							holder:holder
  						});
  					} else {
  						_appendImage(index, item, baseDiv, item.img, true, true);
  					}
  				}
  				
  			} else if(item.src && !item.loadError) {
  				// image object is created every time, due to bugs of image loading & delay when switching images
  				img = framework.createEl('pswp__img', 'img');
  				img.style.opacity = 1;
  				img.src = item.src;
  				_setImageSize(item, img);
  				_appendImage(index, item, baseDiv, img, true);
  			}
  			

  			if(!_initialContentSet && index === _currentItemIndex) {
  				_currZoomElementStyle = baseDiv.style;
  				_showOrHide(item, (img ||item.img) );
  			} else {
  				_applyZoomPanToItem(item);
  			}

  			holder.el.innerHTML = '';
  			holder.el.appendChild(baseDiv);
  		},

  		cleanSlide: function( item ) {
  			if(item.img ) {
  				item.img.onload = item.img.onerror = null;
  			}
  			item.loaded = item.loading = item.img = item.imageAppended = false;
  		}

  	}
  });

  /*>>items-controller*/

  /*>>tap*/
  /**
   * tap.js:
   *
   * Displatches tap and double-tap events.
   * 
   */

  var tapTimer,
  	tapReleasePoint = {},
  	_dispatchTapEvent = function(origEvent, releasePoint, pointerType) {		
  		var e = document.createEvent( 'CustomEvent' ),
  			eDetail = {
  				origEvent:origEvent, 
  				target:origEvent.target, 
  				releasePoint: releasePoint, 
  				pointerType:pointerType || 'touch'
  			};

  		e.initCustomEvent( 'pswpTap', true, true, eDetail );
  		origEvent.target.dispatchEvent(e);
  	};

  _registerModule('Tap', {
  	publicMethods: {
  		initTap: function() {
  			_listen('firstTouchStart', self.onTapStart);
  			_listen('touchRelease', self.onTapRelease);
  			_listen('destroy', function() {
  				tapReleasePoint = {};
  				tapTimer = null;
  			});
  		},
  		onTapStart: function(touchList) {
  			if(touchList.length > 1) {
  				clearTimeout(tapTimer);
  				tapTimer = null;
  			}
  		},
  		onTapRelease: function(e, releasePoint) {
  			if(!releasePoint) {
  				return;
  			}

  			if(!_moved && !_isMultitouch && !_numAnimations) {
  				var p0 = releasePoint;
  				if(tapTimer) {
  					clearTimeout(tapTimer);
  					tapTimer = null;

  					// Check if taped on the same place
  					if ( _isNearbyPoints(p0, tapReleasePoint) ) {
  						_shout('doubleTap', p0);
  						return;
  					}
  				}

  				if(releasePoint.type === 'mouse') {
  					_dispatchTapEvent(e, releasePoint, 'mouse');
  					return;
  				}

  				var clickedTagName = e.target.tagName.toUpperCase();
  				// avoid double tap delay on buttons and elements that have class pswp__single-tap
  				if(clickedTagName === 'BUTTON' || framework.hasClass(e.target, 'pswp__single-tap') ) {
  					_dispatchTapEvent(e, releasePoint);
  					return;
  				}

  				_equalizePoints(tapReleasePoint, p0);

  				tapTimer = setTimeout(function() {
  					_dispatchTapEvent(e, releasePoint);
  					tapTimer = null;
  				}, 300);
  			}
  		}
  	}
  });

  /*>>tap*/

  /*>>desktop-zoom*/
  /**
   *
   * desktop-zoom.js:
   *
   * - Binds mousewheel event for paning zoomed image.
   * - Manages "dragging", "zoomed-in", "zoom-out" classes.
   *   (which are used for cursors and zoom icon)
   * - Adds toggleDesktopZoom function.
   * 
   */

  var _wheelDelta;
  	
  _registerModule('DesktopZoom', {

  	publicMethods: {

  		initDesktopZoom: function() {

  			if(_oldIE) {
  				// no zoom for old IE (<=8)
  				return;
  			}

  			if(_likelyTouchDevice) {
  				// if detected hardware touch support, we wait until mouse is used,
  				// and only then apply desktop-zoom features
  				_listen('mouseUsed', function() {
  					self.setupDesktopZoom();
  				});
  			} else {
  				self.setupDesktopZoom(true);
  			}

  		},

  		setupDesktopZoom: function(onInit) {

  			_wheelDelta = {};

  			var events = 'wheel mousewheel DOMMouseScroll';
  			
  			_listen('bindEvents', function() {
  				framework.bind(template, events,  self.handleMouseWheel);
  			});

  			_listen('unbindEvents', function() {
  				if(_wheelDelta) {
  					framework.unbind(template, events, self.handleMouseWheel);
  				}
  			});

  			self.mouseZoomedIn = false;

  			var hasDraggingClass,
  				updateZoomable = function() {
  					if(self.mouseZoomedIn) {
  						framework.removeClass(template, 'pswp--zoomed-in');
  						self.mouseZoomedIn = false;
  					}
  					if(_currZoomLevel < 1) {
  						framework.addClass(template, 'pswp--zoom-allowed');
  					} else {
  						framework.removeClass(template, 'pswp--zoom-allowed');
  					}
  					removeDraggingClass();
  				},
  				removeDraggingClass = function() {
  					if(hasDraggingClass) {
  						framework.removeClass(template, 'pswp--dragging');
  						hasDraggingClass = false;
  					}
  				};

  			_listen('resize' , updateZoomable);
  			_listen('afterChange' , updateZoomable);
  			_listen('pointerDown', function() {
  				if(self.mouseZoomedIn) {
  					hasDraggingClass = true;
  					framework.addClass(template, 'pswp--dragging');
  				}
  			});
  			_listen('pointerUp', removeDraggingClass);

  			if(!onInit) {
  				updateZoomable();
  			}
  			
  		},

  		handleMouseWheel: function(e) {

  			if(_currZoomLevel <= self.currItem.fitRatio) {
  				if( _options.modal ) {

  					if (!_options.closeOnScroll || _numAnimations || _isDragging) {
  						e.preventDefault();
  					} else if(_transformKey && Math.abs(e.deltaY) > 2) {
  						// close PhotoSwipe
  						// if browser supports transforms & scroll changed enough
  						_closedByScroll = true;
  						self.close();
  					}

  				}
  				return true;
  			}

  			// allow just one event to fire
  			e.stopPropagation();

  			// https://developer.mozilla.org/en-US/docs/Web/Events/wheel
  			_wheelDelta.x = 0;

  			if('deltaX' in e) {
  				if(e.deltaMode === 1 /* DOM_DELTA_LINE */) {
  					// 18 - average line height
  					_wheelDelta.x = e.deltaX * 18;
  					_wheelDelta.y = e.deltaY * 18;
  				} else {
  					_wheelDelta.x = e.deltaX;
  					_wheelDelta.y = e.deltaY;
  				}
  			} else if('wheelDelta' in e) {
  				if(e.wheelDeltaX) {
  					_wheelDelta.x = -0.16 * e.wheelDeltaX;
  				}
  				if(e.wheelDeltaY) {
  					_wheelDelta.y = -0.16 * e.wheelDeltaY;
  				} else {
  					_wheelDelta.y = -0.16 * e.wheelDelta;
  				}
  			} else if('detail' in e) {
  				_wheelDelta.y = e.detail;
  			} else {
  				return;
  			}

  			_calculatePanBounds(_currZoomLevel, true);

  			var newPanX = _panOffset.x - _wheelDelta.x,
  				newPanY = _panOffset.y - _wheelDelta.y;

  			// only prevent scrolling in nonmodal mode when not at edges
  			if (_options.modal ||
  				(
  				newPanX <= _currPanBounds.min.x && newPanX >= _currPanBounds.max.x &&
  				newPanY <= _currPanBounds.min.y && newPanY >= _currPanBounds.max.y
  				) ) {
  				e.preventDefault();
  			}

  			// TODO: use rAF instead of mousewheel?
  			self.panTo(newPanX, newPanY);
  		},

  		toggleDesktopZoom: function(centerPoint) {
  			centerPoint = centerPoint || {x:_viewportSize.x/2 + _offset.x, y:_viewportSize.y/2 + _offset.y };

  			var doubleTapZoomLevel = _options.getDoubleTapZoom(true, self.currItem);
  			var zoomOut = _currZoomLevel === doubleTapZoomLevel;
  			
  			self.mouseZoomedIn = !zoomOut;

  			self.zoomTo(zoomOut ? self.currItem.initialZoomLevel : doubleTapZoomLevel, centerPoint, 333);
  			framework[ (!zoomOut ? 'add' : 'remove') + 'Class'](template, 'pswp--zoomed-in');
  		}

  	}
  });


  /*>>desktop-zoom*/

  /*>>history*/
  /**
   *
   * history.js:
   *
   * - Back button to close gallery.
   * 
   * - Unique URL for each slide: example.com/&pid=1&gid=3
   *   (where PID is picture index, and GID and gallery index)
   *   
   * - Switch URL when slides change.
   * 
   */


  var _historyDefaultOptions = {
  	history: true,
  	galleryUID: 1
  };

  var _historyUpdateTimeout,
  	_hashChangeTimeout,
  	_hashAnimCheckTimeout,
  	_hashChangedByScript,
  	_hashChangedByHistory,
  	_hashReseted,
  	_initialHash,
  	_historyChanged,
  	_closedFromURL,
  	_urlChangedOnce,
  	_windowLoc,

  	_supportsPushState,

  	_getHash = function() {
  		return _windowLoc.hash.substring(1);
  	},
  	_cleanHistoryTimeouts = function() {

  		if(_historyUpdateTimeout) {
  			clearTimeout(_historyUpdateTimeout);
  		}

  		if(_hashAnimCheckTimeout) {
  			clearTimeout(_hashAnimCheckTimeout);
  		}
  	},

  	// pid - Picture index
  	// gid - Gallery index
  	_parseItemIndexFromURL = function() {
  		var hash = _getHash(),
  			params = {};

  		if(hash.length < 5) { // pid=1
  			return params;
  		}

  		var i, vars = hash.split('&');
  		for (i = 0; i < vars.length; i++) {
  			if(!vars[i]) {
  				continue;
  			}
  			var pair = vars[i].split('=');	
  			if(pair.length < 2) {
  				continue;
  			}
  			params[pair[0]] = pair[1];
  		}
  		if(_options.galleryPIDs) {
  			// detect custom pid in hash and search for it among the items collection
  			var searchfor = params.pid;
  			params.pid = 0; // if custom pid cannot be found, fallback to the first item
  			for(i = 0; i < _items.length; i++) {
  				if(_items[i].pid === searchfor) {
  					params.pid = i;
  					break;
  				}
  			}
  		} else {
  			params.pid = parseInt(params.pid,10)-1;
  		}
  		if( params.pid < 0 ) {
  			params.pid = 0;
  		}
  		return params;
  	},
  	_updateHash = function() {

  		if(_hashAnimCheckTimeout) {
  			clearTimeout(_hashAnimCheckTimeout);
  		}


  		if(_numAnimations || _isDragging) {
  			// changing browser URL forces layout/paint in some browsers, which causes noticable lag during animation
  			// that's why we update hash only when no animations running
  			_hashAnimCheckTimeout = setTimeout(_updateHash, 500);
  			return;
  		}
  		
  		if(_hashChangedByScript) {
  			clearTimeout(_hashChangeTimeout);
  		} else {
  			_hashChangedByScript = true;
  		}


  		var pid = (_currentItemIndex + 1);
  		var item = _getItemAt( _currentItemIndex );
  		if(item.hasOwnProperty('pid')) {
  			// carry forward any custom pid assigned to the item
  			pid = item.pid;
  		}
  		var newHash = _initialHash + '&'  +  'gid=' + _options.galleryUID + '&' + 'pid=' + pid;

  		if(!_historyChanged) {
  			if(_windowLoc.hash.indexOf(newHash) === -1) {
  				_urlChangedOnce = true;
  			}
  			// first time - add new hisory record, then just replace
  		}

  		var newURL = _windowLoc.href.split('#')[0] + '#' +  newHash;

  		if( _supportsPushState ) {

  			if('#' + newHash !== window.location.hash) {
  				history[_historyChanged ? 'replaceState' : 'pushState']('', document.title, newURL);
  			}

  		} else {
  			if(_historyChanged) {
  				_windowLoc.replace( newURL );
  			} else {
  				_windowLoc.hash = newHash;
  			}
  		}
  		
  		

  		_historyChanged = true;
  		_hashChangeTimeout = setTimeout(function() {
  			_hashChangedByScript = false;
  		}, 60);
  	};



  	

  _registerModule('History', {

  	

  	publicMethods: {
  		initHistory: function() {

  			framework.extend(_options, _historyDefaultOptions, true);

  			if( !_options.history ) {
  				return;
  			}


  			_windowLoc = window.location;
  			_urlChangedOnce = false;
  			_closedFromURL = false;
  			_historyChanged = false;
  			_initialHash = _getHash();
  			_supportsPushState = ('pushState' in history);


  			if(_initialHash.indexOf('gid=') > -1) {
  				_initialHash = _initialHash.split('&gid=')[0];
  				_initialHash = _initialHash.split('?gid=')[0];
  			}
  			

  			_listen('afterChange', self.updateURL);
  			_listen('unbindEvents', function() {
  				framework.unbind(window, 'hashchange', self.onHashChange);
  			});


  			var returnToOriginal = function() {
  				_hashReseted = true;
  				if(!_closedFromURL) {

  					if(_urlChangedOnce) {
  						history.back();
  					} else {

  						if(_initialHash) {
  							_windowLoc.hash = _initialHash;
  						} else {
  							if (_supportsPushState) {

  								// remove hash from url without refreshing it or scrolling to top
  								history.pushState('', document.title,  _windowLoc.pathname + _windowLoc.search );
  							} else {
  								_windowLoc.hash = '';
  							}
  						}
  					}
  					
  				}

  				_cleanHistoryTimeouts();
  			};


  			_listen('unbindEvents', function() {
  				if(_closedByScroll) {
  					// if PhotoSwipe is closed by scroll, we go "back" before the closing animation starts
  					// this is done to keep the scroll position
  					returnToOriginal();
  				}
  			});
  			_listen('destroy', function() {
  				if(!_hashReseted) {
  					returnToOriginal();
  				}
  			});
  			_listen('firstUpdate', function() {
  				_currentItemIndex = _parseItemIndexFromURL().pid;
  			});

  			

  			
  			var index = _initialHash.indexOf('pid=');
  			if(index > -1) {
  				_initialHash = _initialHash.substring(0, index);
  				if(_initialHash.slice(-1) === '&') {
  					_initialHash = _initialHash.slice(0, -1);
  				}
  			}
  			

  			setTimeout(function() {
  				if(_isOpen) { // hasn't destroyed yet
  					framework.bind(window, 'hashchange', self.onHashChange);
  				}
  			}, 40);
  			
  		},
  		onHashChange: function() {

  			if(_getHash() === _initialHash) {

  				_closedFromURL = true;
  				self.close();
  				return;
  			}
  			if(!_hashChangedByScript) {

  				_hashChangedByHistory = true;
  				self.goTo( _parseItemIndexFromURL().pid );
  				_hashChangedByHistory = false;
  			}
  			
  		},
  		updateURL: function() {

  			// Delay the update of URL, to avoid lag during transition, 
  			// and to not to trigger actions like "refresh page sound" or "blinking favicon" to often
  			
  			_cleanHistoryTimeouts();
  			

  			if(_hashChangedByHistory) {
  				return;
  			}

  			if(!_historyChanged) {
  				_updateHash(); // first time
  			} else {
  				_historyUpdateTimeout = setTimeout(_updateHash, 800);
  			}
  		}
  	
  	}
  });


  /*>>history*/
  	framework.extend(self, publicMethods); };
  	return PhotoSwipe;
  });
  });

  var tabtrap_module = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
      value: true
  });

  var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  /**
   * --------------------------------------------------------------------------
   * Tabtrap (v1.2.6): tabtrap.js
   * by Evan Yamanishi
   * Licensed under GPL-3.0
   * --------------------------------------------------------------------------
   */

  /* CONSTANTS */

  var NAME = 'tabtrap';
  var VERSION = '1.2.6';
  var DATA_KEY = 'tabtrap';

  var KEYCODE = {
      ESCAPE: 27,
      TAB: 9
  };

  var Default = {
      disableOnEscape: false,
      tabbableElements: ['a[href]:not([tabindex="-1"])', 'map[name] area[href]:not([tabindex="-1"])', 'input:not([disabled]):not([tabindex="-1"])', 'select:not([disabled]):not([tabindex="-1"])', 'textarea:not([disabled]):not([tabindex="-1"])', 'button:not([disabled]):not([tabindex="-1"])', 'iframe:not([tabindex="-1"])', 'object:not([tabindex="-1"])', 'embed:not([tabindex="-1"])', '[tabindex]:not([tabindex="-1"])', '[contentEditable=true]:not([tabindex="-1"])']
  };

  var DefaultType = {
      disableOnEscape: 'boolean',
      tabbableElements: 'object'
  };

  var Event = {
      KEYDOWN_DISABLE: 'keydown.disable.' + DATA_KEY,
      KEYDOWN_TAB: 'keydown.tab.' + DATA_KEY
  };

  var jQueryAvailable = window.jQuery !== undefined;

  var getNodeList = function getNodeList(selector) {
      switch (typeof selector === 'undefined' ? 'undefined' : _typeof(selector)) {
          case 'string':
              return document.querySelectorAll(selector);
              break;
          case 'object':
              return selector.nodeType === 1 ? selector : getNodeList(selector.selector);
              break;
          default:
              throw new Error('Must provide a selector or element');
      }
  };

  /* CLASS DEFINITION */

  var Tabtrap = function () {
      function Tabtrap(element, config) {
          _classCallCheck(this, Tabtrap);

          this.config = this._getConfig(element, config);
          this.element = this._assertElement(this.config.element);
          this.enabled = true;
          this.tabbable = this._getTabbable();

          this._createEventListener();
          if (this.config.disableOnEscape) this._setEscapeEvent();
      }

      // getters

      _createClass(Tabtrap, [{
          key: 'enable',


          // public

          value: function enable() {
              this.enabled = true;
          }
      }, {
          key: 'disable',
          value: function disable() {
              this.enabled = false;
          }
      }, {
          key: 'toggle',
          value: function toggle() {
              this.enabled = !this.enabled;
          }

          // private

      }, {
          key: '_getConfig',
          value: function _getConfig(element, config) {
              var _config = {};
              // check if element is actually the config object (with config.element)
              if ((typeof element === 'undefined' ? 'undefined' : _typeof(element)) === 'object' && element.nodeType === undefined) {
                  _config = element;
              } else {
                  _config.element = element;
              }
              return Object.assign({}, this.constructor.Default, _config);
          }
      }, {
          key: '_assertElement',
          value: function _assertElement(el) {
              return el.nodeType === 1 ? el : typeof el === 'string' ? document.querySelector(el) : null;
          }
      }, {
          key: '_getTabbable',
          value: function _getTabbable() {
              return this.element.querySelectorAll(this.config.tabbableElements.join(','));
          }
      }, {
          key: '_getKeyCode',
          value: function _getKeyCode(event) {
              return event.which || event.keyCode || 0;
          }
      }, {
          key: '_createEventListener',
          value: function _createEventListener() {
              var _this = this;

              if (jQueryAvailable) {
                  jQuery(this.element).off(Event.KEYDOWN_TAB);
                  jQuery(this.element).on(Event.KEYDOWN_TAB, function (e) {
                      return _this._manageFocus(e);
                  });
              } else {
                  this.element.addEventListener('keydown', function (e) {
                      return _this._manageFocus(e);
                  });
              }
          }
      }, {
          key: '_manageFocus',
          value: function _manageFocus(e) {
              if (this._getKeyCode(e) === KEYCODE.TAB && this.enabled) {
                  var tabIndex = Array.from(this.tabbable).indexOf(e.target);
                  var condition = {
                      outside: tabIndex < 0,
                      wrapForward: tabIndex === this.tabbable.length - 1 && !e.shiftKey,
                      wrapBackward: tabIndex === 0 && e.shiftKey
                  };
                  if (condition.outside || condition.wrapForward) {
                      e.preventDefault();
                      this.tabbable[0].focus();
                  }
                  if (condition.wrapBackward) {
                      e.preventDefault();
                      this.tabbable[this.tabbable.length - 1].focus();
                  }
              }
          }
      }, {
          key: '_setEscapeEvent',
          value: function _setEscapeEvent() {
              var _this2 = this;

              this.element.addEventListener(Event.KEYDOWN_DISABLE, function (e) {
                  if (_this2._getKeyCode(e) === KEYCODE.ESCAPE) {
                      _this2.disable();
                  }
              });
          }

          // static

      }], [{
          key: '_jQueryInterface',
          value: function _jQueryInterface(config) {
              return this.each(function () {
                  var data = jQuery(this).data(DATA_KEY);
                  var _config = (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' ? config : null;

                  if (!data && /disable/.test(config)) {
                      return;
                  }

                  if (!data) {
                      data = new Tabtrap(this, _config);
                      jQuery(this).data(DATA_KEY, data);
                  }

                  if (typeof config === 'string') {
                      if (data[config] === undefined) {
                          throw new Error('No method named "' + config + '"');
                      }
                      data[config]();
                  }
              });
          }
      }, {
          key: 'trapAll',
          value: function trapAll(element, config) {
              var nodeList = getNodeList(element);
              var _config = (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' ? config : {};
              Array.from(nodeList).forEach(function (node) {
                  _config.element = node;
                  new Tabtrap(_config);
              });
          }
      }, {
          key: 'NAME',
          get: function get() {
              return NAME;
          }
      }, {
          key: 'VERSION',
          get: function get() {
              return VERSION;
          }
      }, {
          key: 'DATA_KEY',
          get: function get() {
              return DATA_KEY;
          }
      }, {
          key: 'KEYCODE',
          get: function get() {
              return KEYCODE;
          }
      }, {
          key: 'Default',
          get: function get() {
              return Default;
          }
      }, {
          key: 'DefaultType',
          get: function get() {
              return DefaultType;
          }
      }, {
          key: 'Event',
          get: function get() {
              return Event;
          }
      }, {
          key: 'jQueryAvailable',
          get: function get() {
              return jQueryAvailable;
          }
      }]);

      return Tabtrap;
  }();

  /* JQUERY INTERFACE INITIALIZATION */

  if (jQueryAvailable) {
      (function () {
          var JQUERY_NO_CONFLICT = jQuery.fn[NAME];
          jQuery.fn[NAME] = Tabtrap._jQueryInterface;
          jQuery.fn[NAME].Constructor = Tabtrap;
          jQuery.fn[NAME].noConflict = function () {
              jQuery.fn[NAME] = JQUERY_NO_CONFLICT;
              return Tabtrap._jQueryInterface;
          };
      })();
  }

  exports.default = Tabtrap;
  });

  var tabtrap = unwrapExports(tabtrap_module);

  var photoswipeUiDefault = createCommonjsModule(function (module, exports) {
  /*! PhotoSwipe Default UI - 4.1.2 - 2017-04-05
  * http://photoswipe.com
  * Copyright (c) 2017 Dmitry Semenov; */
  /**
  *
  * UI on top of main sliding area (caption, arrows, close button, etc.).
  * Built just using public methods/properties of PhotoSwipe.
  * 
  */
  (function (root, factory) { 
  	{
  		module.exports = factory();
  	}
  })(commonjsGlobal, function () {



  var PhotoSwipeUI_Default =
   function(pswp, framework) {

  	var ui = this;
  	var _overlayUIUpdated = false,
  		_controlsVisible = true,
  		_fullscrenAPI,
  		_controls,
  		_captionContainer,
  		_fakeCaptionContainer,
  		_indexIndicator,
  		_shareButton,
  		_shareModal,
  		_shareModalHidden = true,
  		_initalCloseOnScrollValue,
  		_isIdle,
  		_listen,

  		_loadingIndicator,
  		_loadingIndicatorHidden,
  		_loadingIndicatorTimeout,

  		_galleryHasOneSlide,

  		_options,
  		_defaultUIOptions = {
  			barsSize: {top:44, bottom:'auto'},
  			closeElClasses: ['item', 'caption', 'zoom-wrap', 'ui', 'top-bar'], 
  			timeToIdle: 4000, 
  			timeToIdleOutside: 1000,
  			loadingIndicatorDelay: 1000, // 2s
  			
  			addCaptionHTMLFn: function(item, captionEl /*, isFake */) {
  				if(!item.title) {
  					captionEl.children[0].innerHTML = '';
  					return false;
  				}
  				captionEl.children[0].innerHTML = item.title;
  				return true;
  			},

  			closeEl:true,
  			captionEl: true,
  			fullscreenEl: true,
  			zoomEl: true,
  			shareEl: true,
  			counterEl: true,
  			arrowEl: true,
  			preloaderEl: true,

  			tapToClose: false,
  			tapToToggleControls: true,

  			clickToCloseNonZoomable: true,

  			shareButtons: [
  				{id:'facebook', label:'Share on Facebook', url:'https://www.facebook.com/sharer/sharer.php?u={{url}}'},
  				{id:'twitter', label:'Tweet', url:'https://twitter.com/intent/tweet?text={{text}}&url={{url}}'},
  				{id:'pinterest', label:'Pin it', url:'http://www.pinterest.com/pin/create/button/'+
  													'?url={{url}}&media={{image_url}}&description={{text}}'},
  				{id:'download', label:'Download image', url:'{{raw_image_url}}', download:true}
  			],
  			getImageURLForShare: function( /* shareButtonData */ ) {
  				return pswp.currItem.src || '';
  			},
  			getPageURLForShare: function( /* shareButtonData */ ) {
  				return window.location.href;
  			},
  			getTextForShare: function( /* shareButtonData */ ) {
  				return pswp.currItem.title || '';
  			},
  				
  			indexIndicatorSep: ' / ',
  			fitControlsWidth: 1200

  		},
  		_blockControlsTap,
  		_blockControlsTapTimeout;



  	var _onControlsTap = function(e) {
  			if(_blockControlsTap) {
  				return true;
  			}


  			e = e || window.event;

  			if(_options.timeToIdle && _options.mouseUsed && !_isIdle) {
  				// reset idle timer
  				_onIdleMouseMove();
  			}


  			var target = e.target || e.srcElement,
  				uiElement,
  				clickedClass = target.getAttribute('class') || '',
  				found;

  			for(var i = 0; i < _uiElements.length; i++) {
  				uiElement = _uiElements[i];
  				if(uiElement.onTap && clickedClass.indexOf('pswp__' + uiElement.name ) > -1 ) {
  					uiElement.onTap();
  					found = true;

  				}
  			}

  			if(found) {
  				if(e.stopPropagation) {
  					e.stopPropagation();
  				}
  				_blockControlsTap = true;

  				// Some versions of Android don't prevent ghost click event 
  				// when preventDefault() was called on touchstart and/or touchend.
  				// 
  				// This happens on v4.3, 4.2, 4.1, 
  				// older versions strangely work correctly, 
  				// but just in case we add delay on all of them)	
  				var tapDelay = framework.features.isOldAndroid ? 600 : 30;
  				_blockControlsTapTimeout = setTimeout(function() {
  					_blockControlsTap = false;
  				}, tapDelay);
  			}

  		},
  		_fitControlsInViewport = function() {
  			return !pswp.likelyTouchDevice || _options.mouseUsed || screen.width > _options.fitControlsWidth;
  		},
  		_togglePswpClass = function(el, cName, add) {
  			framework[ (add ? 'add' : 'remove') + 'Class' ](el, 'pswp__' + cName);
  		},

  		// add class when there is just one item in the gallery
  		// (by default it hides left/right arrows and 1ofX counter)
  		_countNumItems = function() {
  			var hasOneSlide = (_options.getNumItemsFn() === 1);

  			if(hasOneSlide !== _galleryHasOneSlide) {
  				_togglePswpClass(_controls, 'ui--one-slide', hasOneSlide);
  				_galleryHasOneSlide = hasOneSlide;
  			}
  		},
  		_toggleShareModalClass = function() {
  			_togglePswpClass(_shareModal, 'share-modal--hidden', _shareModalHidden);
  		},
  		_toggleShareModal = function() {

  			_shareModalHidden = !_shareModalHidden;
  			
  			
  			if(!_shareModalHidden) {
  				_toggleShareModalClass();
  				setTimeout(function() {
  					if(!_shareModalHidden) {
  						framework.addClass(_shareModal, 'pswp__share-modal--fade-in');
  					}
  				}, 30);
  			} else {
  				framework.removeClass(_shareModal, 'pswp__share-modal--fade-in');
  				setTimeout(function() {
  					if(_shareModalHidden) {
  						_toggleShareModalClass();
  					}
  				}, 300);
  			}
  			
  			if(!_shareModalHidden) {
  				_updateShareURLs();
  			}
  			return false;
  		},

  		_openWindowPopup = function(e) {
  			e = e || window.event;
  			var target = e.target || e.srcElement;

  			pswp.shout('shareLinkClick', e, target);

  			if(!target.href) {
  				return false;
  			}

  			if( target.hasAttribute('download') ) {
  				return true;
  			}

  			window.open(target.href, 'pswp_share', 'scrollbars=yes,resizable=yes,toolbar=no,'+
  										'location=yes,width=550,height=420,top=100,left=' + 
  										(window.screen ? Math.round(screen.width / 2 - 275) : 100)  );

  			if(!_shareModalHidden) {
  				_toggleShareModal();
  			}
  			
  			return false;
  		},
  		_updateShareURLs = function() {
  			var shareButtonOut = '',
  				shareButtonData,
  				shareURL,
  				image_url,
  				page_url,
  				share_text;

  			for(var i = 0; i < _options.shareButtons.length; i++) {
  				shareButtonData = _options.shareButtons[i];

  				image_url = _options.getImageURLForShare(shareButtonData);
  				page_url = _options.getPageURLForShare(shareButtonData);
  				share_text = _options.getTextForShare(shareButtonData);

  				shareURL = shareButtonData.url.replace('{{url}}', encodeURIComponent(page_url) )
  									.replace('{{image_url}}', encodeURIComponent(image_url) )
  									.replace('{{raw_image_url}}', image_url )
  									.replace('{{text}}', encodeURIComponent(share_text) );

  				shareButtonOut += '<a href="' + shareURL + '" target="_blank" '+
  									'class="pswp__share--' + shareButtonData.id + '"' +
  									(shareButtonData.download ? 'download' : '') + '>' + 
  									shareButtonData.label + '</a>';

  				if(_options.parseShareButtonOut) {
  					shareButtonOut = _options.parseShareButtonOut(shareButtonData, shareButtonOut);
  				}
  			}
  			_shareModal.children[0].innerHTML = shareButtonOut;
  			_shareModal.children[0].onclick = _openWindowPopup;

  		},
  		_hasCloseClass = function(target) {
  			for(var  i = 0; i < _options.closeElClasses.length; i++) {
  				if( framework.hasClass(target, 'pswp__' + _options.closeElClasses[i]) ) {
  					return true;
  				}
  			}
  		},
  		_idleInterval,
  		_idleTimer,
  		_idleIncrement = 0,
  		_onIdleMouseMove = function() {
  			clearTimeout(_idleTimer);
  			_idleIncrement = 0;
  			if(_isIdle) {
  				ui.setIdle(false);
  			}
  		},
  		_onMouseLeaveWindow = function(e) {
  			e = e ? e : window.event;
  			var from = e.relatedTarget || e.toElement;
  			if (!from || from.nodeName === 'HTML') {
  				clearTimeout(_idleTimer);
  				_idleTimer = setTimeout(function() {
  					ui.setIdle(true);
  				}, _options.timeToIdleOutside);
  			}
  		},
  		_setupFullscreenAPI = function() {
  			if(_options.fullscreenEl && !framework.features.isOldAndroid) {
  				if(!_fullscrenAPI) {
  					_fullscrenAPI = ui.getFullscreenAPI();
  				}
  				if(_fullscrenAPI) {
  					framework.bind(document, _fullscrenAPI.eventK, ui.updateFullscreen);
  					ui.updateFullscreen();
  					framework.addClass(pswp.template, 'pswp--supports-fs');
  				} else {
  					framework.removeClass(pswp.template, 'pswp--supports-fs');
  				}
  			}
  		},
  		_setupLoadingIndicator = function() {
  			// Setup loading indicator
  			if(_options.preloaderEl) {
  			
  				_toggleLoadingIndicator(true);

  				_listen('beforeChange', function() {

  					clearTimeout(_loadingIndicatorTimeout);

  					// display loading indicator with delay
  					_loadingIndicatorTimeout = setTimeout(function() {

  						if(pswp.currItem && pswp.currItem.loading) {

  							if( !pswp.allowProgressiveImg() || (pswp.currItem.img && !pswp.currItem.img.naturalWidth)  ) {
  								// show preloader if progressive loading is not enabled, 
  								// or image width is not defined yet (because of slow connection)
  								_toggleLoadingIndicator(false); 
  								// items-controller.js function allowProgressiveImg
  							}
  							
  						} else {
  							_toggleLoadingIndicator(true); // hide preloader
  						}

  					}, _options.loadingIndicatorDelay);
  					
  				});
  				_listen('imageLoadComplete', function(index, item) {
  					if(pswp.currItem === item) {
  						_toggleLoadingIndicator(true);
  					}
  				});

  			}
  		},
  		_toggleLoadingIndicator = function(hide) {
  			if( _loadingIndicatorHidden !== hide ) {
  				_togglePswpClass(_loadingIndicator, 'preloader--active', !hide);
  				_loadingIndicatorHidden = hide;
  			}
  		},
  		_applyNavBarGaps = function(item) {
  			var gap = item.vGap;

  			if( _fitControlsInViewport() ) {
  				
  				var bars = _options.barsSize; 
  				if(_options.captionEl && bars.bottom === 'auto') {
  					if(!_fakeCaptionContainer) {
  						_fakeCaptionContainer = framework.createEl('pswp__caption pswp__caption--fake');
  						_fakeCaptionContainer.appendChild( framework.createEl('pswp__caption__center') );
  						_controls.insertBefore(_fakeCaptionContainer, _captionContainer);
  						framework.addClass(_controls, 'pswp__ui--fit');
  					}
  					if( _options.addCaptionHTMLFn(item, _fakeCaptionContainer, true) ) {

  						var captionSize = _fakeCaptionContainer.clientHeight;
  						gap.bottom = parseInt(captionSize,10) || 44;
  					} else {
  						gap.bottom = bars.top; // if no caption, set size of bottom gap to size of top
  					}
  				} else {
  					gap.bottom = bars.bottom === 'auto' ? 0 : bars.bottom;
  				}
  				
  				// height of top bar is static, no need to calculate it
  				gap.top = bars.top;
  			} else {
  				gap.top = gap.bottom = 0;
  			}
  		},
  		_setupIdle = function() {
  			// Hide controls when mouse is used
  			if(_options.timeToIdle) {
  				_listen('mouseUsed', function() {
  					
  					framework.bind(document, 'mousemove', _onIdleMouseMove);
  					framework.bind(document, 'mouseout', _onMouseLeaveWindow);

  					_idleInterval = setInterval(function() {
  						_idleIncrement++;
  						if(_idleIncrement === 2) {
  							ui.setIdle(true);
  						}
  					}, _options.timeToIdle / 2);
  				});
  			}
  		},
  		_setupHidingControlsDuringGestures = function() {

  			// Hide controls on vertical drag
  			_listen('onVerticalDrag', function(now) {
  				if(_controlsVisible && now < 0.95) {
  					ui.hideControls();
  				} else if(!_controlsVisible && now >= 0.95) {
  					ui.showControls();
  				}
  			});

  			// Hide controls when pinching to close
  			var pinchControlsHidden;
  			_listen('onPinchClose' , function(now) {
  				if(_controlsVisible && now < 0.9) {
  					ui.hideControls();
  					pinchControlsHidden = true;
  				} else if(pinchControlsHidden && !_controlsVisible && now > 0.9) {
  					ui.showControls();
  				}
  			});

  			_listen('zoomGestureEnded', function() {
  				pinchControlsHidden = false;
  				if(pinchControlsHidden && !_controlsVisible) {
  					ui.showControls();
  				}
  			});

  		};



  	var _uiElements = [
  		{ 
  			name: 'caption', 
  			option: 'captionEl',
  			onInit: function(el) {  
  				_captionContainer = el; 
  			} 
  		},
  		{ 
  			name: 'share-modal', 
  			option: 'shareEl',
  			onInit: function(el) {  
  				_shareModal = el;
  			},
  			onTap: function() {
  				_toggleShareModal();
  			} 
  		},
  		{ 
  			name: 'button--share', 
  			option: 'shareEl',
  			onInit: function(el) { 
  				_shareButton = el;
  			},
  			onTap: function() {
  				_toggleShareModal();
  			} 
  		},
  		{ 
  			name: 'button--zoom', 
  			option: 'zoomEl',
  			onTap: pswp.toggleDesktopZoom
  		},
  		{ 
  			name: 'counter', 
  			option: 'counterEl',
  			onInit: function(el) {  
  				_indexIndicator = el;
  			} 
  		},
  		{ 
  			name: 'button--close', 
  			option: 'closeEl',
  			onTap: pswp.close
  		},
  		{ 
  			name: 'button--arrow--left', 
  			option: 'arrowEl',
  			onTap: pswp.prev
  		},
  		{ 
  			name: 'button--arrow--right', 
  			option: 'arrowEl',
  			onTap: pswp.next
  		},
  		{ 
  			name: 'button--fs', 
  			option: 'fullscreenEl',
  			onTap: function() {  
  				if(_fullscrenAPI.isFullscreen()) {
  					_fullscrenAPI.exit();
  				} else {
  					_fullscrenAPI.enter();
  				}
  			} 
  		},
  		{ 
  			name: 'preloader', 
  			option: 'preloaderEl',
  			onInit: function(el) {  
  				_loadingIndicator = el;
  			} 
  		}

  	];

  	var _setupUIElements = function() {
  		var item,
  			classAttr,
  			uiElement;

  		var loopThroughChildElements = function(sChildren) {
  			if(!sChildren) {
  				return;
  			}

  			var l = sChildren.length;
  			for(var i = 0; i < l; i++) {
  				item = sChildren[i];
  				classAttr = item.className;

  				for(var a = 0; a < _uiElements.length; a++) {
  					uiElement = _uiElements[a];

  					if(classAttr.indexOf('pswp__' + uiElement.name) > -1  ) {

  						if( _options[uiElement.option] ) { // if element is not disabled from options
  							
  							framework.removeClass(item, 'pswp__element--disabled');
  							if(uiElement.onInit) {
  								uiElement.onInit(item);
  							}
  							
  							//item.style.display = 'block';
  						} else {
  							framework.addClass(item, 'pswp__element--disabled');
  							//item.style.display = 'none';
  						}
  					}
  				}
  			}
  		};
  		loopThroughChildElements(_controls.children);

  		var topBar =  framework.getChildByClass(_controls, 'pswp__top-bar');
  		if(topBar) {
  			loopThroughChildElements( topBar.children );
  		}
  	};


  	

  	ui.init = function() {

  		// extend options
  		framework.extend(pswp.options, _defaultUIOptions, true);

  		// create local link for fast access
  		_options = pswp.options;

  		// find pswp__ui element
  		_controls = framework.getChildByClass(pswp.scrollWrap, 'pswp__ui');

  		// create local link
  		_listen = pswp.listen;


  		_setupHidingControlsDuringGestures();

  		// update controls when slides change
  		_listen('beforeChange', ui.update);

  		// toggle zoom on double-tap
  		_listen('doubleTap', function(point) {
  			var initialZoomLevel = pswp.currItem.initialZoomLevel;
  			if(pswp.getZoomLevel() !== initialZoomLevel) {
  				pswp.zoomTo(initialZoomLevel, point, 333);
  			} else {
  				pswp.zoomTo(_options.getDoubleTapZoom(false, pswp.currItem), point, 333);
  			}
  		});

  		// Allow text selection in caption
  		_listen('preventDragEvent', function(e, isDown, preventObj) {
  			var t = e.target || e.srcElement;
  			if(
  				t && 
  				t.getAttribute('class') && e.type.indexOf('mouse') > -1 && 
  				( t.getAttribute('class').indexOf('__caption') > 0 || (/(SMALL|STRONG|EM)/i).test(t.tagName) ) 
  			) {
  				preventObj.prevent = false;
  			}
  		});

  		// bind events for UI
  		_listen('bindEvents', function() {
  			framework.bind(_controls, 'pswpTap click', _onControlsTap);
  			framework.bind(pswp.scrollWrap, 'pswpTap', ui.onGlobalTap);

  			if(!pswp.likelyTouchDevice) {
  				framework.bind(pswp.scrollWrap, 'mouseover', ui.onMouseOver);
  			}
  		});

  		// unbind events for UI
  		_listen('unbindEvents', function() {
  			if(!_shareModalHidden) {
  				_toggleShareModal();
  			}

  			if(_idleInterval) {
  				clearInterval(_idleInterval);
  			}
  			framework.unbind(document, 'mouseout', _onMouseLeaveWindow);
  			framework.unbind(document, 'mousemove', _onIdleMouseMove);
  			framework.unbind(_controls, 'pswpTap click', _onControlsTap);
  			framework.unbind(pswp.scrollWrap, 'pswpTap', ui.onGlobalTap);
  			framework.unbind(pswp.scrollWrap, 'mouseover', ui.onMouseOver);

  			if(_fullscrenAPI) {
  				framework.unbind(document, _fullscrenAPI.eventK, ui.updateFullscreen);
  				if(_fullscrenAPI.isFullscreen()) {
  					_options.hideAnimationDuration = 0;
  					_fullscrenAPI.exit();
  				}
  				_fullscrenAPI = null;
  			}
  		});


  		// clean up things when gallery is destroyed
  		_listen('destroy', function() {
  			if(_options.captionEl) {
  				if(_fakeCaptionContainer) {
  					_controls.removeChild(_fakeCaptionContainer);
  				}
  				framework.removeClass(_captionContainer, 'pswp__caption--empty');
  			}

  			if(_shareModal) {
  				_shareModal.children[0].onclick = null;
  			}
  			framework.removeClass(_controls, 'pswp__ui--over-close');
  			framework.addClass( _controls, 'pswp__ui--hidden');
  			ui.setIdle(false);
  		});
  		

  		if(!_options.showAnimationDuration) {
  			framework.removeClass( _controls, 'pswp__ui--hidden');
  		}
  		_listen('initialZoomIn', function() {
  			if(_options.showAnimationDuration) {
  				framework.removeClass( _controls, 'pswp__ui--hidden');
  			}
  		});
  		_listen('initialZoomOut', function() {
  			framework.addClass( _controls, 'pswp__ui--hidden');
  		});

  		_listen('parseVerticalMargin', _applyNavBarGaps);
  		
  		_setupUIElements();

  		if(_options.shareEl && _shareButton && _shareModal) {
  			_shareModalHidden = true;
  		}

  		_countNumItems();

  		_setupIdle();

  		_setupFullscreenAPI();

  		_setupLoadingIndicator();
  	};

  	ui.setIdle = function(isIdle) {
  		_isIdle = isIdle;
  		_togglePswpClass(_controls, 'ui--idle', isIdle);
  	};

  	ui.update = function() {
  		// Don't update UI if it's hidden
  		if(_controlsVisible && pswp.currItem) {
  			
  			ui.updateIndexIndicator();

  			if(_options.captionEl) {
  				_options.addCaptionHTMLFn(pswp.currItem, _captionContainer);

  				_togglePswpClass(_captionContainer, 'caption--empty', !pswp.currItem.title);
  			}

  			_overlayUIUpdated = true;

  		} else {
  			_overlayUIUpdated = false;
  		}

  		if(!_shareModalHidden) {
  			_toggleShareModal();
  		}

  		_countNumItems();
  	};

  	ui.updateFullscreen = function(e) {

  		if(e) {
  			// some browsers change window scroll position during the fullscreen
  			// so PhotoSwipe updates it just in case
  			setTimeout(function() {
  				pswp.setScrollOffset( 0, framework.getScrollY() );
  			}, 50);
  		}
  		
  		// toogle pswp--fs class on root element
  		framework[ (_fullscrenAPI.isFullscreen() ? 'add' : 'remove') + 'Class' ](pswp.template, 'pswp--fs');
  	};

  	ui.updateIndexIndicator = function() {
  		if(_options.counterEl) {
  			_indexIndicator.innerHTML = (pswp.getCurrentIndex()+1) + 
  										_options.indexIndicatorSep + 
  										_options.getNumItemsFn();
  		}
  	};
  	
  	ui.onGlobalTap = function(e) {
  		e = e || window.event;
  		var target = e.target || e.srcElement;

  		if(_blockControlsTap) {
  			return;
  		}

  		if(e.detail && e.detail.pointerType === 'mouse') {

  			// close gallery if clicked outside of the image
  			if(_hasCloseClass(target)) {
  				pswp.close();
  				return;
  			}

  			if(framework.hasClass(target, 'pswp__img')) {
  				if(pswp.getZoomLevel() === 1 && pswp.getZoomLevel() <= pswp.currItem.fitRatio) {
  					if(_options.clickToCloseNonZoomable) {
  						pswp.close();
  					}
  				} else {
  					pswp.toggleDesktopZoom(e.detail.releasePoint);
  				}
  			}
  			
  		} else {

  			// tap anywhere (except buttons) to toggle visibility of controls
  			if(_options.tapToToggleControls) {
  				if(_controlsVisible) {
  					ui.hideControls();
  				} else {
  					ui.showControls();
  				}
  			}

  			// tap to close gallery
  			if(_options.tapToClose && (framework.hasClass(target, 'pswp__img') || _hasCloseClass(target)) ) {
  				pswp.close();
  				return;
  			}
  			
  		}
  	};
  	ui.onMouseOver = function(e) {
  		e = e || window.event;
  		var target = e.target || e.srcElement;

  		// add class when mouse is over an element that should close the gallery
  		_togglePswpClass(_controls, 'ui--over-close', _hasCloseClass(target));
  	};

  	ui.hideControls = function() {
  		framework.addClass(_controls,'pswp__ui--hidden');
  		_controlsVisible = false;
  	};

  	ui.showControls = function() {
  		_controlsVisible = true;
  		if(!_overlayUIUpdated) {
  			ui.update();
  		}
  		framework.removeClass(_controls,'pswp__ui--hidden');
  	};

  	ui.supportsFullscreen = function() {
  		var d = document;
  		return !!(d.exitFullscreen || d.mozCancelFullScreen || d.webkitExitFullscreen || d.msExitFullscreen);
  	};

  	ui.getFullscreenAPI = function() {
  		var dE = document.documentElement,
  			api,
  			tF = 'fullscreenchange';

  		if (dE.requestFullscreen) {
  			api = {
  				enterK: 'requestFullscreen',
  				exitK: 'exitFullscreen',
  				elementK: 'fullscreenElement',
  				eventK: tF
  			};

  		} else if(dE.mozRequestFullScreen ) {
  			api = {
  				enterK: 'mozRequestFullScreen',
  				exitK: 'mozCancelFullScreen',
  				elementK: 'mozFullScreenElement',
  				eventK: 'moz' + tF
  			};

  			

  		} else if(dE.webkitRequestFullscreen) {
  			api = {
  				enterK: 'webkitRequestFullscreen',
  				exitK: 'webkitExitFullscreen',
  				elementK: 'webkitFullscreenElement',
  				eventK: 'webkit' + tF
  			};

  		} else if(dE.msRequestFullscreen) {
  			api = {
  				enterK: 'msRequestFullscreen',
  				exitK: 'msExitFullscreen',
  				elementK: 'msFullscreenElement',
  				eventK: 'MSFullscreenChange'
  			};
  		}

  		if(api) {
  			api.enter = function() { 
  				// disable close-on-scroll in fullscreen
  				_initalCloseOnScrollValue = _options.closeOnScroll; 
  				_options.closeOnScroll = false; 

  				if(this.enterK === 'webkitRequestFullscreen') {
  					pswp.template[this.enterK]( Element.ALLOW_KEYBOARD_INPUT );
  				} else {
  					return pswp.template[this.enterK](); 
  				}
  			};
  			api.exit = function() { 
  				_options.closeOnScroll = _initalCloseOnScrollValue;

  				return document[this.exitK](); 

  			};
  			api.isFullscreen = function() { return document[this.elementK]; };
  		}

  		return api;
  	};



  };
  return PhotoSwipeUI_Default;


  });
  });

  var lodash_merge = createCommonjsModule(function (module, exports) {
  /**
   * Lodash (Custom Build) <https://lodash.com/>
   * Build: `lodash modularize exports="npm" -o ./`
   * Copyright JS Foundation and other contributors <https://js.foundation/>
   * Released under MIT license <https://lodash.com/license>
   * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
   * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
   */

  /** Used as the size to enable large array optimizations. */
  var LARGE_ARRAY_SIZE = 200;

  /** Used to stand-in for `undefined` hash values. */
  var HASH_UNDEFINED = '__lodash_hash_undefined__';

  /** Used to detect hot functions by number of calls within a span of milliseconds. */
  var HOT_COUNT = 800,
      HOT_SPAN = 16;

  /** Used as references for various `Number` constants. */
  var MAX_SAFE_INTEGER = 9007199254740991;

  /** `Object#toString` result references. */
  var argsTag = '[object Arguments]',
      arrayTag = '[object Array]',
      asyncTag = '[object AsyncFunction]',
      boolTag = '[object Boolean]',
      dateTag = '[object Date]',
      errorTag = '[object Error]',
      funcTag = '[object Function]',
      genTag = '[object GeneratorFunction]',
      mapTag = '[object Map]',
      numberTag = '[object Number]',
      nullTag = '[object Null]',
      objectTag = '[object Object]',
      proxyTag = '[object Proxy]',
      regexpTag = '[object RegExp]',
      setTag = '[object Set]',
      stringTag = '[object String]',
      undefinedTag = '[object Undefined]',
      weakMapTag = '[object WeakMap]';

  var arrayBufferTag = '[object ArrayBuffer]',
      dataViewTag = '[object DataView]',
      float32Tag = '[object Float32Array]',
      float64Tag = '[object Float64Array]',
      int8Tag = '[object Int8Array]',
      int16Tag = '[object Int16Array]',
      int32Tag = '[object Int32Array]',
      uint8Tag = '[object Uint8Array]',
      uint8ClampedTag = '[object Uint8ClampedArray]',
      uint16Tag = '[object Uint16Array]',
      uint32Tag = '[object Uint32Array]';

  /**
   * Used to match `RegExp`
   * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
   */
  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

  /** Used to detect host constructors (Safari). */
  var reIsHostCtor = /^\[object .+?Constructor\]$/;

  /** Used to detect unsigned integer values. */
  var reIsUint = /^(?:0|[1-9]\d*)$/;

  /** Used to identify `toStringTag` values of typed arrays. */
  var typedArrayTags = {};
  typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
  typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
  typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
  typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
  typedArrayTags[uint32Tag] = true;
  typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
  typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
  typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
  typedArrayTags[errorTag] = typedArrayTags[funcTag] =
  typedArrayTags[mapTag] = typedArrayTags[numberTag] =
  typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
  typedArrayTags[setTag] = typedArrayTags[stringTag] =
  typedArrayTags[weakMapTag] = false;

  /** Detect free variable `global` from Node.js. */
  var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

  /** Detect free variable `self`. */
  var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

  /** Used as a reference to the global object. */
  var root = freeGlobal || freeSelf || Function('return this')();

  /** Detect free variable `exports`. */
  var freeExports = exports && !exports.nodeType && exports;

  /** Detect free variable `module`. */
  var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

  /** Detect the popular CommonJS extension `module.exports`. */
  var moduleExports = freeModule && freeModule.exports === freeExports;

  /** Detect free variable `process` from Node.js. */
  var freeProcess = moduleExports && freeGlobal.process;

  /** Used to access faster Node.js helpers. */
  var nodeUtil = (function() {
    try {
      return freeProcess && freeProcess.binding && freeProcess.binding('util');
    } catch (e) {}
  }());

  /* Node.js helper references. */
  var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

  /**
   * A faster alternative to `Function#apply`, this function invokes `func`
   * with the `this` binding of `thisArg` and the arguments of `args`.
   *
   * @private
   * @param {Function} func The function to invoke.
   * @param {*} thisArg The `this` binding of `func`.
   * @param {Array} args The arguments to invoke `func` with.
   * @returns {*} Returns the result of `func`.
   */
  function apply(func, thisArg, args) {
    switch (args.length) {
      case 0: return func.call(thisArg);
      case 1: return func.call(thisArg, args[0]);
      case 2: return func.call(thisArg, args[0], args[1]);
      case 3: return func.call(thisArg, args[0], args[1], args[2]);
    }
    return func.apply(thisArg, args);
  }

  /**
   * The base implementation of `_.times` without support for iteratee shorthands
   * or max array length checks.
   *
   * @private
   * @param {number} n The number of times to invoke `iteratee`.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the array of results.
   */
  function baseTimes(n, iteratee) {
    var index = -1,
        result = Array(n);

    while (++index < n) {
      result[index] = iteratee(index);
    }
    return result;
  }

  /**
   * The base implementation of `_.unary` without support for storing metadata.
   *
   * @private
   * @param {Function} func The function to cap arguments for.
   * @returns {Function} Returns the new capped function.
   */
  function baseUnary(func) {
    return function(value) {
      return func(value);
    };
  }

  /**
   * Gets the value at `key` of `object`.
   *
   * @private
   * @param {Object} [object] The object to query.
   * @param {string} key The key of the property to get.
   * @returns {*} Returns the property value.
   */
  function getValue(object, key) {
    return object == null ? undefined : object[key];
  }

  /**
   * Creates a unary function that invokes `func` with its argument transformed.
   *
   * @private
   * @param {Function} func The function to wrap.
   * @param {Function} transform The argument transform.
   * @returns {Function} Returns the new function.
   */
  function overArg(func, transform) {
    return function(arg) {
      return func(transform(arg));
    };
  }

  /**
   * Gets the value at `key`, unless `key` is "__proto__".
   *
   * @private
   * @param {Object} object The object to query.
   * @param {string} key The key of the property to get.
   * @returns {*} Returns the property value.
   */
  function safeGet(object, key) {
    return key == '__proto__'
      ? undefined
      : object[key];
  }

  /** Used for built-in method references. */
  var arrayProto = Array.prototype,
      funcProto = Function.prototype,
      objectProto = Object.prototype;

  /** Used to detect overreaching core-js shims. */
  var coreJsData = root['__core-js_shared__'];

  /** Used to resolve the decompiled source of functions. */
  var funcToString = funcProto.toString;

  /** Used to check objects for own properties. */
  var hasOwnProperty = objectProto.hasOwnProperty;

  /** Used to detect methods masquerading as native. */
  var maskSrcKey = (function() {
    var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
    return uid ? ('Symbol(src)_1.' + uid) : '';
  }());

  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */
  var nativeObjectToString = objectProto.toString;

  /** Used to infer the `Object` constructor. */
  var objectCtorString = funcToString.call(Object);

  /** Used to detect if a method is native. */
  var reIsNative = RegExp('^' +
    funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
    .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
  );

  /** Built-in value references. */
  var Buffer = moduleExports ? root.Buffer : undefined,
      Symbol = root.Symbol,
      Uint8Array = root.Uint8Array,
      allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined,
      getPrototype = overArg(Object.getPrototypeOf, Object),
      objectCreate = Object.create,
      propertyIsEnumerable = objectProto.propertyIsEnumerable,
      splice = arrayProto.splice,
      symToStringTag = Symbol ? Symbol.toStringTag : undefined;

  var defineProperty = (function() {
    try {
      var func = getNative(Object, 'defineProperty');
      func({}, '', {});
      return func;
    } catch (e) {}
  }());

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined,
      nativeMax = Math.max,
      nativeNow = Date.now;

  /* Built-in method references that are verified to be native. */
  var Map = getNative(root, 'Map'),
      nativeCreate = getNative(Object, 'create');

  /**
   * The base implementation of `_.create` without support for assigning
   * properties to the created object.
   *
   * @private
   * @param {Object} proto The object to inherit from.
   * @returns {Object} Returns the new object.
   */
  var baseCreate = (function() {
    function object() {}
    return function(proto) {
      if (!isObject(proto)) {
        return {};
      }
      if (objectCreate) {
        return objectCreate(proto);
      }
      object.prototype = proto;
      var result = new object;
      object.prototype = undefined;
      return result;
    };
  }());

  /**
   * Creates a hash object.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function Hash(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;

    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }

  /**
   * Removes all key-value entries from the hash.
   *
   * @private
   * @name clear
   * @memberOf Hash
   */
  function hashClear() {
    this.__data__ = nativeCreate ? nativeCreate(null) : {};
    this.size = 0;
  }

  /**
   * Removes `key` and its value from the hash.
   *
   * @private
   * @name delete
   * @memberOf Hash
   * @param {Object} hash The hash to modify.
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function hashDelete(key) {
    var result = this.has(key) && delete this.__data__[key];
    this.size -= result ? 1 : 0;
    return result;
  }

  /**
   * Gets the hash value for `key`.
   *
   * @private
   * @name get
   * @memberOf Hash
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function hashGet(key) {
    var data = this.__data__;
    if (nativeCreate) {
      var result = data[key];
      return result === HASH_UNDEFINED ? undefined : result;
    }
    return hasOwnProperty.call(data, key) ? data[key] : undefined;
  }

  /**
   * Checks if a hash value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf Hash
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function hashHas(key) {
    var data = this.__data__;
    return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
  }

  /**
   * Sets the hash `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf Hash
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the hash instance.
   */
  function hashSet(key, value) {
    var data = this.__data__;
    this.size += this.has(key) ? 0 : 1;
    data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
    return this;
  }

  // Add methods to `Hash`.
  Hash.prototype.clear = hashClear;
  Hash.prototype['delete'] = hashDelete;
  Hash.prototype.get = hashGet;
  Hash.prototype.has = hashHas;
  Hash.prototype.set = hashSet;

  /**
   * Creates an list cache object.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function ListCache(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;

    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }

  /**
   * Removes all key-value entries from the list cache.
   *
   * @private
   * @name clear
   * @memberOf ListCache
   */
  function listCacheClear() {
    this.__data__ = [];
    this.size = 0;
  }

  /**
   * Removes `key` and its value from the list cache.
   *
   * @private
   * @name delete
   * @memberOf ListCache
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function listCacheDelete(key) {
    var data = this.__data__,
        index = assocIndexOf(data, key);

    if (index < 0) {
      return false;
    }
    var lastIndex = data.length - 1;
    if (index == lastIndex) {
      data.pop();
    } else {
      splice.call(data, index, 1);
    }
    --this.size;
    return true;
  }

  /**
   * Gets the list cache value for `key`.
   *
   * @private
   * @name get
   * @memberOf ListCache
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function listCacheGet(key) {
    var data = this.__data__,
        index = assocIndexOf(data, key);

    return index < 0 ? undefined : data[index][1];
  }

  /**
   * Checks if a list cache value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf ListCache
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function listCacheHas(key) {
    return assocIndexOf(this.__data__, key) > -1;
  }

  /**
   * Sets the list cache `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf ListCache
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the list cache instance.
   */
  function listCacheSet(key, value) {
    var data = this.__data__,
        index = assocIndexOf(data, key);

    if (index < 0) {
      ++this.size;
      data.push([key, value]);
    } else {
      data[index][1] = value;
    }
    return this;
  }

  // Add methods to `ListCache`.
  ListCache.prototype.clear = listCacheClear;
  ListCache.prototype['delete'] = listCacheDelete;
  ListCache.prototype.get = listCacheGet;
  ListCache.prototype.has = listCacheHas;
  ListCache.prototype.set = listCacheSet;

  /**
   * Creates a map cache object to store key-value pairs.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function MapCache(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;

    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }

  /**
   * Removes all key-value entries from the map.
   *
   * @private
   * @name clear
   * @memberOf MapCache
   */
  function mapCacheClear() {
    this.size = 0;
    this.__data__ = {
      'hash': new Hash,
      'map': new (Map || ListCache),
      'string': new Hash
    };
  }

  /**
   * Removes `key` and its value from the map.
   *
   * @private
   * @name delete
   * @memberOf MapCache
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function mapCacheDelete(key) {
    var result = getMapData(this, key)['delete'](key);
    this.size -= result ? 1 : 0;
    return result;
  }

  /**
   * Gets the map value for `key`.
   *
   * @private
   * @name get
   * @memberOf MapCache
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function mapCacheGet(key) {
    return getMapData(this, key).get(key);
  }

  /**
   * Checks if a map value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf MapCache
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function mapCacheHas(key) {
    return getMapData(this, key).has(key);
  }

  /**
   * Sets the map `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf MapCache
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the map cache instance.
   */
  function mapCacheSet(key, value) {
    var data = getMapData(this, key),
        size = data.size;

    data.set(key, value);
    this.size += data.size == size ? 0 : 1;
    return this;
  }

  // Add methods to `MapCache`.
  MapCache.prototype.clear = mapCacheClear;
  MapCache.prototype['delete'] = mapCacheDelete;
  MapCache.prototype.get = mapCacheGet;
  MapCache.prototype.has = mapCacheHas;
  MapCache.prototype.set = mapCacheSet;

  /**
   * Creates a stack cache object to store key-value pairs.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function Stack(entries) {
    var data = this.__data__ = new ListCache(entries);
    this.size = data.size;
  }

  /**
   * Removes all key-value entries from the stack.
   *
   * @private
   * @name clear
   * @memberOf Stack
   */
  function stackClear() {
    this.__data__ = new ListCache;
    this.size = 0;
  }

  /**
   * Removes `key` and its value from the stack.
   *
   * @private
   * @name delete
   * @memberOf Stack
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function stackDelete(key) {
    var data = this.__data__,
        result = data['delete'](key);

    this.size = data.size;
    return result;
  }

  /**
   * Gets the stack value for `key`.
   *
   * @private
   * @name get
   * @memberOf Stack
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function stackGet(key) {
    return this.__data__.get(key);
  }

  /**
   * Checks if a stack value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf Stack
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function stackHas(key) {
    return this.__data__.has(key);
  }

  /**
   * Sets the stack `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf Stack
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the stack cache instance.
   */
  function stackSet(key, value) {
    var data = this.__data__;
    if (data instanceof ListCache) {
      var pairs = data.__data__;
      if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
        pairs.push([key, value]);
        this.size = ++data.size;
        return this;
      }
      data = this.__data__ = new MapCache(pairs);
    }
    data.set(key, value);
    this.size = data.size;
    return this;
  }

  // Add methods to `Stack`.
  Stack.prototype.clear = stackClear;
  Stack.prototype['delete'] = stackDelete;
  Stack.prototype.get = stackGet;
  Stack.prototype.has = stackHas;
  Stack.prototype.set = stackSet;

  /**
   * Creates an array of the enumerable property names of the array-like `value`.
   *
   * @private
   * @param {*} value The value to query.
   * @param {boolean} inherited Specify returning inherited property names.
   * @returns {Array} Returns the array of property names.
   */
  function arrayLikeKeys(value, inherited) {
    var isArr = isArray(value),
        isArg = !isArr && isArguments(value),
        isBuff = !isArr && !isArg && isBuffer(value),
        isType = !isArr && !isArg && !isBuff && isTypedArray(value),
        skipIndexes = isArr || isArg || isBuff || isType,
        result = skipIndexes ? baseTimes(value.length, String) : [],
        length = result.length;

    for (var key in value) {
      if ((inherited || hasOwnProperty.call(value, key)) &&
          !(skipIndexes && (
             // Safari 9 has enumerable `arguments.length` in strict mode.
             key == 'length' ||
             // Node.js 0.10 has enumerable non-index properties on buffers.
             (isBuff && (key == 'offset' || key == 'parent')) ||
             // PhantomJS 2 has enumerable non-index properties on typed arrays.
             (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
             // Skip index properties.
             isIndex(key, length)
          ))) {
        result.push(key);
      }
    }
    return result;
  }

  /**
   * This function is like `assignValue` except that it doesn't assign
   * `undefined` values.
   *
   * @private
   * @param {Object} object The object to modify.
   * @param {string} key The key of the property to assign.
   * @param {*} value The value to assign.
   */
  function assignMergeValue(object, key, value) {
    if ((value !== undefined && !eq(object[key], value)) ||
        (value === undefined && !(key in object))) {
      baseAssignValue(object, key, value);
    }
  }

  /**
   * Assigns `value` to `key` of `object` if the existing value is not equivalent
   * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
   * for equality comparisons.
   *
   * @private
   * @param {Object} object The object to modify.
   * @param {string} key The key of the property to assign.
   * @param {*} value The value to assign.
   */
  function assignValue(object, key, value) {
    var objValue = object[key];
    if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
        (value === undefined && !(key in object))) {
      baseAssignValue(object, key, value);
    }
  }

  /**
   * Gets the index at which the `key` is found in `array` of key-value pairs.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} key The key to search for.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function assocIndexOf(array, key) {
    var length = array.length;
    while (length--) {
      if (eq(array[length][0], key)) {
        return length;
      }
    }
    return -1;
  }

  /**
   * The base implementation of `assignValue` and `assignMergeValue` without
   * value checks.
   *
   * @private
   * @param {Object} object The object to modify.
   * @param {string} key The key of the property to assign.
   * @param {*} value The value to assign.
   */
  function baseAssignValue(object, key, value) {
    if (key == '__proto__' && defineProperty) {
      defineProperty(object, key, {
        'configurable': true,
        'enumerable': true,
        'value': value,
        'writable': true
      });
    } else {
      object[key] = value;
    }
  }

  /**
   * The base implementation of `baseForOwn` which iterates over `object`
   * properties returned by `keysFunc` and invokes `iteratee` for each property.
   * Iteratee functions may exit iteration early by explicitly returning `false`.
   *
   * @private
   * @param {Object} object The object to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @param {Function} keysFunc The function to get the keys of `object`.
   * @returns {Object} Returns `object`.
   */
  var baseFor = createBaseFor();

  /**
   * The base implementation of `getTag` without fallbacks for buggy environments.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the `toStringTag`.
   */
  function baseGetTag(value) {
    if (value == null) {
      return value === undefined ? undefinedTag : nullTag;
    }
    return (symToStringTag && symToStringTag in Object(value))
      ? getRawTag(value)
      : objectToString(value);
  }

  /**
   * The base implementation of `_.isArguments`.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an `arguments` object,
   */
  function baseIsArguments(value) {
    return isObjectLike(value) && baseGetTag(value) == argsTag;
  }

  /**
   * The base implementation of `_.isNative` without bad shim checks.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a native function,
   *  else `false`.
   */
  function baseIsNative(value) {
    if (!isObject(value) || isMasked(value)) {
      return false;
    }
    var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
    return pattern.test(toSource(value));
  }

  /**
   * The base implementation of `_.isTypedArray` without Node.js optimizations.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
   */
  function baseIsTypedArray(value) {
    return isObjectLike(value) &&
      isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
  }

  /**
   * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   */
  function baseKeysIn(object) {
    if (!isObject(object)) {
      return nativeKeysIn(object);
    }
    var isProto = isPrototype(object),
        result = [];

    for (var key in object) {
      if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
        result.push(key);
      }
    }
    return result;
  }

  /**
   * The base implementation of `_.merge` without support for multiple sources.
   *
   * @private
   * @param {Object} object The destination object.
   * @param {Object} source The source object.
   * @param {number} srcIndex The index of `source`.
   * @param {Function} [customizer] The function to customize merged values.
   * @param {Object} [stack] Tracks traversed source values and their merged
   *  counterparts.
   */
  function baseMerge(object, source, srcIndex, customizer, stack) {
    if (object === source) {
      return;
    }
    baseFor(source, function(srcValue, key) {
      if (isObject(srcValue)) {
        stack || (stack = new Stack);
        baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
      }
      else {
        var newValue = customizer
          ? customizer(safeGet(object, key), srcValue, (key + ''), object, source, stack)
          : undefined;

        if (newValue === undefined) {
          newValue = srcValue;
        }
        assignMergeValue(object, key, newValue);
      }
    }, keysIn);
  }

  /**
   * A specialized version of `baseMerge` for arrays and objects which performs
   * deep merges and tracks traversed objects enabling objects with circular
   * references to be merged.
   *
   * @private
   * @param {Object} object The destination object.
   * @param {Object} source The source object.
   * @param {string} key The key of the value to merge.
   * @param {number} srcIndex The index of `source`.
   * @param {Function} mergeFunc The function to merge values.
   * @param {Function} [customizer] The function to customize assigned values.
   * @param {Object} [stack] Tracks traversed source values and their merged
   *  counterparts.
   */
  function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
    var objValue = safeGet(object, key),
        srcValue = safeGet(source, key),
        stacked = stack.get(srcValue);

    if (stacked) {
      assignMergeValue(object, key, stacked);
      return;
    }
    var newValue = customizer
      ? customizer(objValue, srcValue, (key + ''), object, source, stack)
      : undefined;

    var isCommon = newValue === undefined;

    if (isCommon) {
      var isArr = isArray(srcValue),
          isBuff = !isArr && isBuffer(srcValue),
          isTyped = !isArr && !isBuff && isTypedArray(srcValue);

      newValue = srcValue;
      if (isArr || isBuff || isTyped) {
        if (isArray(objValue)) {
          newValue = objValue;
        }
        else if (isArrayLikeObject(objValue)) {
          newValue = copyArray(objValue);
        }
        else if (isBuff) {
          isCommon = false;
          newValue = cloneBuffer(srcValue, true);
        }
        else if (isTyped) {
          isCommon = false;
          newValue = cloneTypedArray(srcValue, true);
        }
        else {
          newValue = [];
        }
      }
      else if (isPlainObject(srcValue) || isArguments(srcValue)) {
        newValue = objValue;
        if (isArguments(objValue)) {
          newValue = toPlainObject(objValue);
        }
        else if (!isObject(objValue) || (srcIndex && isFunction(objValue))) {
          newValue = initCloneObject(srcValue);
        }
      }
      else {
        isCommon = false;
      }
    }
    if (isCommon) {
      // Recursively merge objects and arrays (susceptible to call stack limits).
      stack.set(srcValue, newValue);
      mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
      stack['delete'](srcValue);
    }
    assignMergeValue(object, key, newValue);
  }

  /**
   * The base implementation of `_.rest` which doesn't validate or coerce arguments.
   *
   * @private
   * @param {Function} func The function to apply a rest parameter to.
   * @param {number} [start=func.length-1] The start position of the rest parameter.
   * @returns {Function} Returns the new function.
   */
  function baseRest(func, start) {
    return setToString(overRest(func, start, identity), func + '');
  }

  /**
   * The base implementation of `setToString` without support for hot loop shorting.
   *
   * @private
   * @param {Function} func The function to modify.
   * @param {Function} string The `toString` result.
   * @returns {Function} Returns `func`.
   */
  var baseSetToString = !defineProperty ? identity : function(func, string) {
    return defineProperty(func, 'toString', {
      'configurable': true,
      'enumerable': false,
      'value': constant(string),
      'writable': true
    });
  };

  /**
   * Creates a clone of  `buffer`.
   *
   * @private
   * @param {Buffer} buffer The buffer to clone.
   * @param {boolean} [isDeep] Specify a deep clone.
   * @returns {Buffer} Returns the cloned buffer.
   */
  function cloneBuffer(buffer, isDeep) {
    if (isDeep) {
      return buffer.slice();
    }
    var length = buffer.length,
        result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

    buffer.copy(result);
    return result;
  }

  /**
   * Creates a clone of `arrayBuffer`.
   *
   * @private
   * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
   * @returns {ArrayBuffer} Returns the cloned array buffer.
   */
  function cloneArrayBuffer(arrayBuffer) {
    var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
    new Uint8Array(result).set(new Uint8Array(arrayBuffer));
    return result;
  }

  /**
   * Creates a clone of `typedArray`.
   *
   * @private
   * @param {Object} typedArray The typed array to clone.
   * @param {boolean} [isDeep] Specify a deep clone.
   * @returns {Object} Returns the cloned typed array.
   */
  function cloneTypedArray(typedArray, isDeep) {
    var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
    return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
  }

  /**
   * Copies the values of `source` to `array`.
   *
   * @private
   * @param {Array} source The array to copy values from.
   * @param {Array} [array=[]] The array to copy values to.
   * @returns {Array} Returns `array`.
   */
  function copyArray(source, array) {
    var index = -1,
        length = source.length;

    array || (array = Array(length));
    while (++index < length) {
      array[index] = source[index];
    }
    return array;
  }

  /**
   * Copies properties of `source` to `object`.
   *
   * @private
   * @param {Object} source The object to copy properties from.
   * @param {Array} props The property identifiers to copy.
   * @param {Object} [object={}] The object to copy properties to.
   * @param {Function} [customizer] The function to customize copied values.
   * @returns {Object} Returns `object`.
   */
  function copyObject(source, props, object, customizer) {
    var isNew = !object;
    object || (object = {});

    var index = -1,
        length = props.length;

    while (++index < length) {
      var key = props[index];

      var newValue = customizer
        ? customizer(object[key], source[key], key, object, source)
        : undefined;

      if (newValue === undefined) {
        newValue = source[key];
      }
      if (isNew) {
        baseAssignValue(object, key, newValue);
      } else {
        assignValue(object, key, newValue);
      }
    }
    return object;
  }

  /**
   * Creates a function like `_.assign`.
   *
   * @private
   * @param {Function} assigner The function to assign values.
   * @returns {Function} Returns the new assigner function.
   */
  function createAssigner(assigner) {
    return baseRest(function(object, sources) {
      var index = -1,
          length = sources.length,
          customizer = length > 1 ? sources[length - 1] : undefined,
          guard = length > 2 ? sources[2] : undefined;

      customizer = (assigner.length > 3 && typeof customizer == 'function')
        ? (length--, customizer)
        : undefined;

      if (guard && isIterateeCall(sources[0], sources[1], guard)) {
        customizer = length < 3 ? undefined : customizer;
        length = 1;
      }
      object = Object(object);
      while (++index < length) {
        var source = sources[index];
        if (source) {
          assigner(object, source, index, customizer);
        }
      }
      return object;
    });
  }

  /**
   * Creates a base function for methods like `_.forIn` and `_.forOwn`.
   *
   * @private
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {Function} Returns the new base function.
   */
  function createBaseFor(fromRight) {
    return function(object, iteratee, keysFunc) {
      var index = -1,
          iterable = Object(object),
          props = keysFunc(object),
          length = props.length;

      while (length--) {
        var key = props[fromRight ? length : ++index];
        if (iteratee(iterable[key], key, iterable) === false) {
          break;
        }
      }
      return object;
    };
  }

  /**
   * Gets the data for `map`.
   *
   * @private
   * @param {Object} map The map to query.
   * @param {string} key The reference key.
   * @returns {*} Returns the map data.
   */
  function getMapData(map, key) {
    var data = map.__data__;
    return isKeyable(key)
      ? data[typeof key == 'string' ? 'string' : 'hash']
      : data.map;
  }

  /**
   * Gets the native function at `key` of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {string} key The key of the method to get.
   * @returns {*} Returns the function if it's native, else `undefined`.
   */
  function getNative(object, key) {
    var value = getValue(object, key);
    return baseIsNative(value) ? value : undefined;
  }

  /**
   * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the raw `toStringTag`.
   */
  function getRawTag(value) {
    var isOwn = hasOwnProperty.call(value, symToStringTag),
        tag = value[symToStringTag];

    try {
      value[symToStringTag] = undefined;
    } catch (e) {}

    var result = nativeObjectToString.call(value);
    {
      if (isOwn) {
        value[symToStringTag] = tag;
      } else {
        delete value[symToStringTag];
      }
    }
    return result;
  }

  /**
   * Initializes an object clone.
   *
   * @private
   * @param {Object} object The object to clone.
   * @returns {Object} Returns the initialized clone.
   */
  function initCloneObject(object) {
    return (typeof object.constructor == 'function' && !isPrototype(object))
      ? baseCreate(getPrototype(object))
      : {};
  }

  /**
   * Checks if `value` is a valid array-like index.
   *
   * @private
   * @param {*} value The value to check.
   * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
   * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
   */
  function isIndex(value, length) {
    var type = typeof value;
    length = length == null ? MAX_SAFE_INTEGER : length;

    return !!length &&
      (type == 'number' ||
        (type != 'symbol' && reIsUint.test(value))) &&
          (value > -1 && value % 1 == 0 && value < length);
  }

  /**
   * Checks if the given arguments are from an iteratee call.
   *
   * @private
   * @param {*} value The potential iteratee value argument.
   * @param {*} index The potential iteratee index or key argument.
   * @param {*} object The potential iteratee object argument.
   * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
   *  else `false`.
   */
  function isIterateeCall(value, index, object) {
    if (!isObject(object)) {
      return false;
    }
    var type = typeof index;
    if (type == 'number'
          ? (isArrayLike(object) && isIndex(index, object.length))
          : (type == 'string' && index in object)
        ) {
      return eq(object[index], value);
    }
    return false;
  }

  /**
   * Checks if `value` is suitable for use as unique object key.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
   */
  function isKeyable(value) {
    var type = typeof value;
    return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
      ? (value !== '__proto__')
      : (value === null);
  }

  /**
   * Checks if `func` has its source masked.
   *
   * @private
   * @param {Function} func The function to check.
   * @returns {boolean} Returns `true` if `func` is masked, else `false`.
   */
  function isMasked(func) {
    return !!maskSrcKey && (maskSrcKey in func);
  }

  /**
   * Checks if `value` is likely a prototype object.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
   */
  function isPrototype(value) {
    var Ctor = value && value.constructor,
        proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

    return value === proto;
  }

  /**
   * This function is like
   * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
   * except that it includes inherited enumerable properties.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   */
  function nativeKeysIn(object) {
    var result = [];
    if (object != null) {
      for (var key in Object(object)) {
        result.push(key);
      }
    }
    return result;
  }

  /**
   * Converts `value` to a string using `Object.prototype.toString`.
   *
   * @private
   * @param {*} value The value to convert.
   * @returns {string} Returns the converted string.
   */
  function objectToString(value) {
    return nativeObjectToString.call(value);
  }

  /**
   * A specialized version of `baseRest` which transforms the rest array.
   *
   * @private
   * @param {Function} func The function to apply a rest parameter to.
   * @param {number} [start=func.length-1] The start position of the rest parameter.
   * @param {Function} transform The rest array transform.
   * @returns {Function} Returns the new function.
   */
  function overRest(func, start, transform) {
    start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
    return function() {
      var args = arguments,
          index = -1,
          length = nativeMax(args.length - start, 0),
          array = Array(length);

      while (++index < length) {
        array[index] = args[start + index];
      }
      index = -1;
      var otherArgs = Array(start + 1);
      while (++index < start) {
        otherArgs[index] = args[index];
      }
      otherArgs[start] = transform(array);
      return apply(func, this, otherArgs);
    };
  }

  /**
   * Sets the `toString` method of `func` to return `string`.
   *
   * @private
   * @param {Function} func The function to modify.
   * @param {Function} string The `toString` result.
   * @returns {Function} Returns `func`.
   */
  var setToString = shortOut(baseSetToString);

  /**
   * Creates a function that'll short out and invoke `identity` instead
   * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
   * milliseconds.
   *
   * @private
   * @param {Function} func The function to restrict.
   * @returns {Function} Returns the new shortable function.
   */
  function shortOut(func) {
    var count = 0,
        lastCalled = 0;

    return function() {
      var stamp = nativeNow(),
          remaining = HOT_SPAN - (stamp - lastCalled);

      lastCalled = stamp;
      if (remaining > 0) {
        if (++count >= HOT_COUNT) {
          return arguments[0];
        }
      } else {
        count = 0;
      }
      return func.apply(undefined, arguments);
    };
  }

  /**
   * Converts `func` to its source code.
   *
   * @private
   * @param {Function} func The function to convert.
   * @returns {string} Returns the source code.
   */
  function toSource(func) {
    if (func != null) {
      try {
        return funcToString.call(func);
      } catch (e) {}
      try {
        return (func + '');
      } catch (e) {}
    }
    return '';
  }

  /**
   * Performs a
   * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
   * comparison between two values to determine if they are equivalent.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to compare.
   * @param {*} other The other value to compare.
   * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
   * @example
   *
   * var object = { 'a': 1 };
   * var other = { 'a': 1 };
   *
   * _.eq(object, object);
   * // => true
   *
   * _.eq(object, other);
   * // => false
   *
   * _.eq('a', 'a');
   * // => true
   *
   * _.eq('a', Object('a'));
   * // => false
   *
   * _.eq(NaN, NaN);
   * // => true
   */
  function eq(value, other) {
    return value === other || (value !== value && other !== other);
  }

  /**
   * Checks if `value` is likely an `arguments` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an `arguments` object,
   *  else `false`.
   * @example
   *
   * _.isArguments(function() { return arguments; }());
   * // => true
   *
   * _.isArguments([1, 2, 3]);
   * // => false
   */
  var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
    return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
      !propertyIsEnumerable.call(value, 'callee');
  };

  /**
   * Checks if `value` is classified as an `Array` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an array, else `false`.
   * @example
   *
   * _.isArray([1, 2, 3]);
   * // => true
   *
   * _.isArray(document.body.children);
   * // => false
   *
   * _.isArray('abc');
   * // => false
   *
   * _.isArray(_.noop);
   * // => false
   */
  var isArray = Array.isArray;

  /**
   * Checks if `value` is array-like. A value is considered array-like if it's
   * not a function and has a `value.length` that's an integer greater than or
   * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
   * @example
   *
   * _.isArrayLike([1, 2, 3]);
   * // => true
   *
   * _.isArrayLike(document.body.children);
   * // => true
   *
   * _.isArrayLike('abc');
   * // => true
   *
   * _.isArrayLike(_.noop);
   * // => false
   */
  function isArrayLike(value) {
    return value != null && isLength(value.length) && !isFunction(value);
  }

  /**
   * This method is like `_.isArrayLike` except that it also checks if `value`
   * is an object.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an array-like object,
   *  else `false`.
   * @example
   *
   * _.isArrayLikeObject([1, 2, 3]);
   * // => true
   *
   * _.isArrayLikeObject(document.body.children);
   * // => true
   *
   * _.isArrayLikeObject('abc');
   * // => false
   *
   * _.isArrayLikeObject(_.noop);
   * // => false
   */
  function isArrayLikeObject(value) {
    return isObjectLike(value) && isArrayLike(value);
  }

  /**
   * Checks if `value` is a buffer.
   *
   * @static
   * @memberOf _
   * @since 4.3.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
   * @example
   *
   * _.isBuffer(new Buffer(2));
   * // => true
   *
   * _.isBuffer(new Uint8Array(2));
   * // => false
   */
  var isBuffer = nativeIsBuffer || stubFalse;

  /**
   * Checks if `value` is classified as a `Function` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a function, else `false`.
   * @example
   *
   * _.isFunction(_);
   * // => true
   *
   * _.isFunction(/abc/);
   * // => false
   */
  function isFunction(value) {
    if (!isObject(value)) {
      return false;
    }
    // The use of `Object#toString` avoids issues with the `typeof` operator
    // in Safari 9 which returns 'object' for typed arrays and other constructors.
    var tag = baseGetTag(value);
    return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
  }

  /**
   * Checks if `value` is a valid array-like length.
   *
   * **Note:** This method is loosely based on
   * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
   * @example
   *
   * _.isLength(3);
   * // => true
   *
   * _.isLength(Number.MIN_VALUE);
   * // => false
   *
   * _.isLength(Infinity);
   * // => false
   *
   * _.isLength('3');
   * // => false
   */
  function isLength(value) {
    return typeof value == 'number' &&
      value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
  }

  /**
   * Checks if `value` is the
   * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
   * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an object, else `false`.
   * @example
   *
   * _.isObject({});
   * // => true
   *
   * _.isObject([1, 2, 3]);
   * // => true
   *
   * _.isObject(_.noop);
   * // => true
   *
   * _.isObject(null);
   * // => false
   */
  function isObject(value) {
    var type = typeof value;
    return value != null && (type == 'object' || type == 'function');
  }

  /**
   * Checks if `value` is object-like. A value is object-like if it's not `null`
   * and has a `typeof` result of "object".
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
   * @example
   *
   * _.isObjectLike({});
   * // => true
   *
   * _.isObjectLike([1, 2, 3]);
   * // => true
   *
   * _.isObjectLike(_.noop);
   * // => false
   *
   * _.isObjectLike(null);
   * // => false
   */
  function isObjectLike(value) {
    return value != null && typeof value == 'object';
  }

  /**
   * Checks if `value` is a plain object, that is, an object created by the
   * `Object` constructor or one with a `[[Prototype]]` of `null`.
   *
   * @static
   * @memberOf _
   * @since 0.8.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   * }
   *
   * _.isPlainObject(new Foo);
   * // => false
   *
   * _.isPlainObject([1, 2, 3]);
   * // => false
   *
   * _.isPlainObject({ 'x': 0, 'y': 0 });
   * // => true
   *
   * _.isPlainObject(Object.create(null));
   * // => true
   */
  function isPlainObject(value) {
    if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
      return false;
    }
    var proto = getPrototype(value);
    if (proto === null) {
      return true;
    }
    var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
    return typeof Ctor == 'function' && Ctor instanceof Ctor &&
      funcToString.call(Ctor) == objectCtorString;
  }

  /**
   * Checks if `value` is classified as a typed array.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
   * @example
   *
   * _.isTypedArray(new Uint8Array);
   * // => true
   *
   * _.isTypedArray([]);
   * // => false
   */
  var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

  /**
   * Converts `value` to a plain object flattening inherited enumerable string
   * keyed properties of `value` to own properties of the plain object.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Lang
   * @param {*} value The value to convert.
   * @returns {Object} Returns the converted plain object.
   * @example
   *
   * function Foo() {
   *   this.b = 2;
   * }
   *
   * Foo.prototype.c = 3;
   *
   * _.assign({ 'a': 1 }, new Foo);
   * // => { 'a': 1, 'b': 2 }
   *
   * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
   * // => { 'a': 1, 'b': 2, 'c': 3 }
   */
  function toPlainObject(value) {
    return copyObject(value, keysIn(value));
  }

  /**
   * Creates an array of the own and inherited enumerable property names of `object`.
   *
   * **Note:** Non-object values are coerced to objects.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Object
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   *   this.b = 2;
   * }
   *
   * Foo.prototype.c = 3;
   *
   * _.keysIn(new Foo);
   * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
   */
  function keysIn(object) {
    return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
  }

  /**
   * This method is like `_.assign` except that it recursively merges own and
   * inherited enumerable string keyed properties of source objects into the
   * destination object. Source properties that resolve to `undefined` are
   * skipped if a destination value exists. Array and plain object properties
   * are merged recursively. Other objects and value types are overridden by
   * assignment. Source objects are applied from left to right. Subsequent
   * sources overwrite property assignments of previous sources.
   *
   * **Note:** This method mutates `object`.
   *
   * @static
   * @memberOf _
   * @since 0.5.0
   * @category Object
   * @param {Object} object The destination object.
   * @param {...Object} [sources] The source objects.
   * @returns {Object} Returns `object`.
   * @example
   *
   * var object = {
   *   'a': [{ 'b': 2 }, { 'd': 4 }]
   * };
   *
   * var other = {
   *   'a': [{ 'c': 3 }, { 'e': 5 }]
   * };
   *
   * _.merge(object, other);
   * // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
   */
  var merge = createAssigner(function(object, source, srcIndex) {
    baseMerge(object, source, srcIndex);
  });

  /**
   * Creates a function that returns `value`.
   *
   * @static
   * @memberOf _
   * @since 2.4.0
   * @category Util
   * @param {*} value The value to return from the new function.
   * @returns {Function} Returns the new constant function.
   * @example
   *
   * var objects = _.times(2, _.constant({ 'a': 1 }));
   *
   * console.log(objects);
   * // => [{ 'a': 1 }, { 'a': 1 }]
   *
   * console.log(objects[0] === objects[1]);
   * // => true
   */
  function constant(value) {
    return function() {
      return value;
    };
  }

  /**
   * This method returns the first argument it receives.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Util
   * @param {*} value Any value.
   * @returns {*} Returns `value`.
   * @example
   *
   * var object = { 'a': 1 };
   *
   * console.log(_.identity(object) === object);
   * // => true
   */
  function identity(value) {
    return value;
  }

  /**
   * This method returns `false`.
   *
   * @static
   * @memberOf _
   * @since 4.13.0
   * @category Util
   * @returns {boolean} Returns `false`.
   * @example
   *
   * _.times(2, _.stubFalse);
   * // => [false, false]
   */
  function stubFalse() {
    return false;
  }

  module.exports = merge;
  });

  /** a valid PhotoSwipe element contains at least one linked image (a>img) */

  var isValidPswp = function isValidPswp(element) {
    return Array.from(element.querySelectorAll('a')).some(function (link) {
      return link.querySelectorAll('img').length === 1;
    });
  };
  var bemSelectors = function bemSelectors(block) {
    return {
      GALLERY: ".".concat(block),
      TITLE: ".".concat(block, "__title"),
      FIGURE: ".".concat(block, "__figure"),
      LINK: ".".concat(block, "__link"),
      THUMB: ".".concat(block, "__thumbnail"),
      CAPTION: ".".concat(block, "__caption")
    };
  };
  var getUrlParam = function getUrlParam(param) {
    if (!window.location.hash) return undefined;
    var result = window.location.hash.substr(1).split('&').map(function (p) {
      return p.split('=');
    }).find(function (p) {
      return p[0] === param;
    });
    return result ? result[1] : result;
  };

  var Default = {
    onInit: function () {
      function onInit() {}

      return onInit;
    }(),
    onOpen: function () {
      function onOpen() {}

      return onOpen;
    }(),
    photoswipeUI: photoswipeUiDefault,
    selectors: {
      PSWP: '.pswp',
      GALLERY: 'figure',
      TITLE: 'figcaption',
      FIGURE: 'figure',
      LINK: 'a',
      THUMB: 'img',
      CAPTION: 'figcaption'
    }
  };
  /* CLASS DEFINITION */

  var Photoswiper =
  /*#__PURE__*/
  function () {
    function Photoswiper(galleryElement, config) {
      var _this = this;

      _classCallCheck(this, Photoswiper);

      this.galleryElement = galleryElement;

      if (config.structure && !config.selectors) {
        process.emitWarning('The "structure" option has been renamed "selectors".\n' + '"structure" will be removed in a future update.', 'DeprecationWarning');
        config.selectors = config.structure; // eslint-disable-line
      }

      this.config = lodash_merge({}, Photoswiper.Default, config);

      if (isValidPswp(this.galleryElement)) {
        // bind handlers
        this.onClick = this.clickHandler.bind(this); // create the selectors

        var bemSelectors$$1 = this.config.bemRoot ? bemSelectors(this.config.bemRoot) : {};
        this.selectors = lodash_merge({}, this.config.selectors, bemSelectors$$1); // collect figures and items

        var figures = this.galleryElement.querySelectorAll(this.selectors.FIGURE);
        this.figures = figures.length ? figures : [this.galleryElement];
        this.items = Array.from(this.figures).map(function (fig) {
          return _this.parseFigure(fig);
        }); // add listeners to open on click

        this.figures.forEach(function (figure) {
          figure.querySelector(_this.selectors.LINK).addEventListener('click', _this.onClick);
        });
        this.enabled = true;

        if (typeof this.config.onInit === 'function') {
          this.config.onInit.call(this, this.figures);
        }
      } else {
        throw new Error('Gallery elements must contain a linked image (a[href]>img[src]).\n', this.galleryElement);
      }
    } // getters


    _createClass(Photoswiper, [{
      key: "enable",
      // public
      value: function () {
        function enable() {
          this.enabled = true;
        }

        return enable;
      }()
    }, {
      key: "disable",
      value: function () {
        function disable() {
          this.enabled = false;
        }

        return disable;
      }()
    }, {
      key: "toggle",
      value: function () {
        function toggle() {
          this.enabled = !this.enabled;
        }

        return toggle;
      }()
    }, {
      key: "open",
      value: function () {
        function open(index, triggerEl) {
          var _this2 = this;

          var fromUrl = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

          var opts = _objectSpread({
            index: index
          }, this.pswpOptions);

          if (fromUrl) this.opts.showAnimationDuration = 0;
          this.pswp = new photoswipe(this.pswpEl, this.config.photoswipeUI, this.items, opts);

          if (this.enabled) {
            this.pswp.init();
            this.isOpen = true;

            if (typeof this.config.onOpen === 'function') {
              this.config.onOpen.call(this, this.pswp);
            } // trap focus in the pswp galleryElement when it's active


            new tabtrap(this.pswpEl); // eslint-disable-line
            // manage the idle state on tab press

            var idleTimer = 0;
            this.pswpEl.addEventListener('keydown', function (e) {
              if (e.key === 'Tab') {
                _this2.pswp.ui.setIdle(false);

                clearTimeout(idleTimer);
                idleTimer = setTimeout(function () {
                  _this2.pswp.ui.setIdle(true);
                }, _this2.pswp.options.timeToIdle);
              }
            }); // return focus to the correct galleryElement on close

            this.pswp.listen('close', function () {
              var current = _this2.pswp.getCurrentIndex();

              if (_this2.galleryElement.contains(triggerEl) || !triggerEl) {
                _this2.figures[current].querySelector(_this2.selectors.LINK).focus();
              } else {
                triggerEl.focus();
              }

              _this2.isOpen = false;
            });
          }

          return this.pswp;
        }

        return open;
      }()
    }, {
      key: "initListeners",
      value: function () {
        function initListeners() {
          var _this3 = this;

          this.figures.forEach(function (figure) {
            figure.querySelector(_this3.selectors.LINK).addEventListener('click', _this3.onClick);
          });
        }

        return initListeners;
      }()
    }, {
      key: "clickHandler",
      value: function () {
        function clickHandler() {
          var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.event;
          e.preventDefault();
          var clickTarget = e.target || e.srcElement;
          var clickFigure = clickTarget.closest(this.selectors.FIGURE) || this.galleryElement;
          var index = Array.from(this.figures).indexOf(clickFigure);
          this.open(index, clickTarget);
        }

        return clickHandler;
      }()
    }, {
      key: "parseFigure",
      value: function () {
        function parseFigure(figure) {
          var link = figure.querySelector(this.selectors.LINK); // required

          var thumb = figure.querySelector(this.selectors.THUMB); // required

          var cap = figure.querySelector(this.selectors.CAPTION); // optional

          var size = link.getAttribute('data-size').split('x');
          var item = {
            el: figure,
            h: parseInt(size[1], 10),
            w: parseInt(size[0], 10),
            src: link.getAttribute('href') || link.getAttribute('data-href')
          };

          if (thumb) {
            item.alt = thumb.getAttribute('alt');
            item.msrc = thumb.getAttribute('src');
          }

          if (cap && cap.innerHTML.length > 0) {
            item.title = cap.innerHTML;
          }

          return item;
        }

        return parseFigure;
      }()
    }, {
      key: "pswpEl",
      get: function () {
        function get() {
          return document.querySelector(this.selectors.PSWP) || new Error('Make sure to include the .pswp galleryElement on your page');
        }

        return get;
      }()
    }, {
      key: "pswpOptions",
      get: function () {
        function get() {
          var _this4 = this;

          var _this$config = this.config,
              bemRoot = _this$config.bemRoot,
              onInit = _this$config.onInit,
              onOpen = _this$config.onOpen,
              photoswipeUI = _this$config.photoswipeUI,
              selectors = _this$config.selectors,
              structure = _this$config.structure,
              pswpOptions = _objectWithoutProperties(_this$config, ["bemRoot", "onInit", "onOpen", "photoswipeUI", "selectors", "structure"]);

          return lodash_merge({}, pswpOptions, {
            galleryUID: this.config.galleryUID || this.galleryElement.getAttribute('data-pswp-uid'),
            getThumbBoundsFn: function () {
              function getThumbBoundsFn(index) {
                var thumb = _this4.items[index].el.querySelector(_this4.selectors.THUMB);

                var pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
                var rect = thumb.getBoundingClientRect();
                return {
                  x: rect.left,
                  y: rect.top + pageYScroll,
                  w: rect.width
                };
              }

              return getThumbBoundsFn;
            }()
          });
        }

        return get;
      }()
    }], [{
      key: "Default",
      get: function () {
        function get() {
          return Default;
        }

        return get;
      }()
    }, {
      key: "pid",
      get: function () {
        function get() {
          var pid = getUrlParam('pid');
          return pid ? parseInt(pid, 10) : undefined;
        }

        return get;
      }()
    }, {
      key: "gid",
      get: function () {
        function get() {
          var gid = getUrlParam('gid');
          return gid ? parseInt(gid, 10) : undefined;
        }

        return get;
      }()
    }]);

    return Photoswiper;
  }();

  return Photoswiper;

})));
//# sourceMappingURL=photoswiper.browser.js.map
