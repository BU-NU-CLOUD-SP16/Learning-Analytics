(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],2:[function(require,module,exports){
'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _PanelGroup = require('./PanelGroup');

var _PanelGroup2 = _interopRequireDefault(_PanelGroup);

var Accordion = _react2['default'].createClass({
  displayName: 'Accordion',

  render: function render() {
    return _react2['default'].createElement(
      _PanelGroup2['default'],
      _extends({}, this.props, { accordion: true }),
      this.props.children
    );
  }
});

exports['default'] = Accordion;
module.exports = exports['default'];
},{"./PanelGroup":67,"babel-runtime/helpers/extends":98,"babel-runtime/helpers/interop-require-default":100,"react":712}],3:[function(require,module,exports){
'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utilsBootstrapUtils = require('./utils/bootstrapUtils');

var _utilsBootstrapUtils2 = _interopRequireDefault(_utilsBootstrapUtils);

var _styleMaps = require('./styleMaps');

var Alert = _react2['default'].createClass({
  displayName: 'Alert',

  propTypes: {
    onDismiss: _react2['default'].PropTypes.func,
    dismissAfter: _react2['default'].PropTypes.number,
    closeLabel: _react2['default'].PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      closeLabel: 'Close Alert'
    };
  },

  renderDismissButton: function renderDismissButton() {
    return _react2['default'].createElement(
      'button',
      {
        type: 'button',
        className: 'close',
        onClick: this.props.onDismiss,
        'aria-hidden': 'true',
        tabIndex: '-1' },
      _react2['default'].createElement(
        'span',
        null,
        '×'
      )
    );
  },

  renderSrOnlyDismissButton: function renderSrOnlyDismissButton() {
    return _react2['default'].createElement(
      'button',
      {
        type: 'button',
        className: 'close sr-only',
        onClick: this.props.onDismiss },
      this.props.closeLabel
    );
  },

  render: function render() {
    var classes = _utilsBootstrapUtils2['default'].getClassSet(this.props);
    var isDismissable = !!this.props.onDismiss;

    classes[_utilsBootstrapUtils2['default'].prefix(this.props, 'dismissable')] = isDismissable;

    return _react2['default'].createElement(
      'div',
      _extends({}, this.props, { role: 'alert', className: _classnames2['default'](this.props.className, classes) }),
      isDismissable ? this.renderDismissButton() : null,
      this.props.children,
      isDismissable ? this.renderSrOnlyDismissButton() : null
    );
  },

  componentDidMount: function componentDidMount() {
    if (this.props.dismissAfter && this.props.onDismiss) {
      this.dismissTimer = setTimeout(this.props.onDismiss, this.props.dismissAfter);
    }
  },

  componentWillUnmount: function componentWillUnmount() {
    clearTimeout(this.dismissTimer);
  }
});

exports['default'] = _utilsBootstrapUtils.bsStyles(_styleMaps.State.values(), _styleMaps.State.INFO, _utilsBootstrapUtils.bsClass('alert', Alert));
module.exports = exports['default'];
},{"./styleMaps":83,"./utils/bootstrapUtils":87,"babel-runtime/helpers/extends":98,"babel-runtime/helpers/interop-require-default":100,"classnames":126,"react":712}],4:[function(require,module,exports){
'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utilsValidComponentChildren = require('./utils/ValidComponentChildren');

var _utilsValidComponentChildren2 = _interopRequireDefault(_utilsValidComponentChildren);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utilsBootstrapUtils = require('./utils/bootstrapUtils');

var _utilsBootstrapUtils2 = _interopRequireDefault(_utilsBootstrapUtils);

var Badge = _react2['default'].createClass({
  displayName: 'Badge',

  propTypes: {
    pullRight: _react2['default'].PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      pullRight: false,
      bsClass: 'badge'
    };
  },

  hasContent: function hasContent() {
    return _utilsValidComponentChildren2['default'].hasValidComponent(this.props.children) || _react2['default'].Children.count(this.props.children) > 1 || typeof this.props.children === 'string' || typeof this.props.children === 'number';
  },

  render: function render() {
    var _classes;

    var classes = (_classes = {
      'pull-right': this.props.pullRight
    }, _classes[_utilsBootstrapUtils2['default'].prefix(this.props)] = this.hasContent(), _classes);
    return _react2['default'].createElement(
      'span',
      _extends({}, this.props, {
        className: _classnames2['default'](this.props.className, classes) }),
      this.props.children
    );
  }
});

exports['default'] = Badge;
module.exports = exports['default'];
},{"./utils/ValidComponentChildren":86,"./utils/bootstrapUtils":87,"babel-runtime/helpers/extends":98,"babel-runtime/helpers/interop-require-default":100,"classnames":126,"react":712}],5:[function(require,module,exports){
'use strict';

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utilsValidComponentChildren = require('./utils/ValidComponentChildren');

var _utilsValidComponentChildren2 = _interopRequireDefault(_utilsValidComponentChildren);

var _BreadcrumbItem = require('./BreadcrumbItem');

var _BreadcrumbItem2 = _interopRequireDefault(_BreadcrumbItem);

var Breadcrumb = _react2['default'].createClass({
  displayName: 'Breadcrumb',

  propTypes: {
    /**
     * bootstrap className
     * @private
     */
    bsClass: _react2['default'].PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      bsClass: 'breadcrumb'
    };
  },

  render: function render() {
    var _props = this.props;
    var className = _props.className;

    var props = _objectWithoutProperties(_props, ['className']);

    return _react2['default'].createElement(
      'ol',
      _extends({}, props, {
        role: 'navigation',
        'aria-label': 'breadcrumbs',
        className: _classnames2['default'](className, this.props.bsClass) }),
      _utilsValidComponentChildren2['default'].map(this.props.children, this.renderBreadcrumbItem)
    );
  },

  renderBreadcrumbItem: function renderBreadcrumbItem(child, index) {
    return _react.cloneElement(child, { key: child.key || index });
  }
});

Breadcrumb.Item = _BreadcrumbItem2['default'];

exports['default'] = Breadcrumb;
module.exports = exports['default'];
},{"./BreadcrumbItem":6,"./utils/ValidComponentChildren":86,"babel-runtime/helpers/extends":98,"babel-runtime/helpers/interop-require-default":100,"babel-runtime/helpers/object-without-properties":102,"classnames":126,"react":712}],6:[function(require,module,exports){
'use strict';

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SafeAnchor = require('./SafeAnchor');

var _SafeAnchor2 = _interopRequireDefault(_SafeAnchor);

var BreadcrumbItem = _react2['default'].createClass({
  displayName: 'BreadcrumbItem',

  propTypes: {
    /**
     * If set to true, renders `span` instead of `a`
     */
    active: _react2['default'].PropTypes.bool,
    /**
     * HTML id for the wrapper `li` element
     */
    id: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.number]),
    /**
     * HTML id for the inner `a` element
     */
    linkId: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.number]),
    /**
     * `href` attribute for the inner `a` element
     */
    href: _react2['default'].PropTypes.string,
    /**
     * `title` attribute for the inner `a` element
     */
    title: _react2['default'].PropTypes.node,
    /**
     * `target` attribute for the inner `a` element
     */
    target: _react2['default'].PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      active: false
    };
  },

  render: function render() {
    var _props = this.props;
    var active = _props.active;
    var className = _props.className;
    var id = _props.id;
    var linkId = _props.linkId;
    var children = _props.children;
    var href = _props.href;
    var title = _props.title;
    var target = _props.target;

    var props = _objectWithoutProperties(_props, ['active', 'className', 'id', 'linkId', 'children', 'href', 'title', 'target']);

    var linkProps = {
      href: href,
      title: title,
      target: target,
      id: linkId
    };

    return _react2['default'].createElement(
      'li',
      { id: id, className: _classnames2['default'](className, { active: active }) },
      active ? _react2['default'].createElement(
        'span',
        props,
        children
      ) : _react2['default'].createElement(
        _SafeAnchor2['default'],
        _extends({}, props, linkProps),
        children
      )
    );
  }
});

exports['default'] = BreadcrumbItem;
module.exports = exports['default'];
},{"./SafeAnchor":72,"babel-runtime/helpers/extends":98,"babel-runtime/helpers/interop-require-default":100,"babel-runtime/helpers/object-without-properties":102,"classnames":126,"react":712}],7:[function(require,module,exports){
'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactPropTypesLibElementType = require('react-prop-types/lib/elementType');

var _reactPropTypesLibElementType2 = _interopRequireDefault(_reactPropTypesLibElementType);

var _utilsBootstrapUtils = require('./utils/bootstrapUtils');

var _utilsBootstrapUtils2 = _interopRequireDefault(_utilsBootstrapUtils);

var _styleMaps = require('./styleMaps');

var types = ['button', 'reset', 'submit'];

var ButtonStyles = _styleMaps.State.values().concat(_styleMaps.DEFAULT, _styleMaps.PRIMARY, _styleMaps.LINK);

var Button = _react2['default'].createClass({
  displayName: 'Button',

  propTypes: {
    active: _react2['default'].PropTypes.bool,
    disabled: _react2['default'].PropTypes.bool,
    block: _react2['default'].PropTypes.bool,
    navItem: _react2['default'].PropTypes.bool,
    navDropdown: _react2['default'].PropTypes.bool,
    /**
     * You can use a custom element for this component
     */
    componentClass: _reactPropTypesLibElementType2['default'],
    href: _react2['default'].PropTypes.string,
    target: _react2['default'].PropTypes.string,
    /**
     * Defines HTML button type Attribute
     * @type {("button"|"reset"|"submit")}
     * @defaultValue 'button'
     */
    type: _react2['default'].PropTypes.oneOf(types)
  },

  getDefaultProps: function getDefaultProps() {
    return {
      active: false,
      block: false,
      disabled: false,
      navItem: false,
      navDropdown: false
    };
  },

  render: function render() {
    var _extends2;

    var classes = this.props.navDropdown ? {} : _utilsBootstrapUtils2['default'].getClassSet(this.props);
    var renderFuncName = undefined;

    var blockClass = _utilsBootstrapUtils2['default'].prefix(this.props, 'block');

    classes = _extends((_extends2 = {
      active: this.props.active
    }, _extends2[blockClass] = this.props.block, _extends2), classes);

    if (this.props.navItem) {
      return this.renderNavItem(classes);
    }

    renderFuncName = this.props.href || this.props.target || this.props.navDropdown ? 'renderAnchor' : 'renderButton';

    return this[renderFuncName](classes);
  },

  renderAnchor: function renderAnchor(classes) {
    var Component = this.props.componentClass || 'a';
    var href = this.props.href || '#';
    classes.disabled = this.props.disabled;

    return _react2['default'].createElement(
      Component,
      _extends({}, this.props, {
        href: href,
        className: _classnames2['default'](this.props.className, classes),
        role: 'button' }),
      this.props.children
    );
  },

  renderButton: function renderButton(classes) {
    var Component = this.props.componentClass || 'button';

    return _react2['default'].createElement(
      Component,
      _extends({}, this.props, {
        type: this.props.type || 'button',
        className: _classnames2['default'](this.props.className, classes) }),
      this.props.children
    );
  },

  renderNavItem: function renderNavItem(classes) {
    var liClasses = {
      active: this.props.active
    };

    return _react2['default'].createElement(
      'li',
      { className: _classnames2['default'](liClasses) },
      this.renderAnchor(classes)
    );
  }
});

Button.types = types;

exports['default'] = _utilsBootstrapUtils.bsStyles(ButtonStyles, _styleMaps.DEFAULT, _utilsBootstrapUtils.bsSizes([_styleMaps.Sizes.LARGE, _styleMaps.Sizes.SMALL, _styleMaps.Sizes.XSMALL], _utilsBootstrapUtils.bsClass('btn', Button)));
module.exports = exports['default'];
},{"./styleMaps":83,"./utils/bootstrapUtils":87,"babel-runtime/helpers/extends":98,"babel-runtime/helpers/interop-require-default":100,"classnames":126,"react":712,"react-prop-types/lib/elementType":248}],8:[function(require,module,exports){
'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utilsBootstrapUtils = require('./utils/bootstrapUtils');

var _utilsBootstrapUtils2 = _interopRequireDefault(_utilsBootstrapUtils);

var _reactPropTypesLibAll = require('react-prop-types/lib/all');

var _reactPropTypesLibAll2 = _interopRequireDefault(_reactPropTypesLibAll);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var ButtonGroup = _react2['default'].createClass({
  displayName: 'ButtonGroup',

  propTypes: {
    vertical: _react2['default'].PropTypes.bool,
    justified: _react2['default'].PropTypes.bool,
    /**
     * Display block buttons, only useful when used with the "vertical" prop.
     * @type {bool}
     */
    block: _reactPropTypesLibAll2['default'](_react2['default'].PropTypes.bool, function (props) {
      if (props.block && !props.vertical) {
        return new Error('The block property requires the vertical property to be set to have any effect');
      }
    })
  },

  getDefaultProps: function getDefaultProps() {
    return {
      block: false,
      justified: false,
      vertical: false
    };
  },

  render: function render() {
    var classes = _utilsBootstrapUtils2['default'].getClassSet(this.props);

    classes[_utilsBootstrapUtils2['default'].prefix(this.props)] = !this.props.vertical;
    classes[_utilsBootstrapUtils2['default'].prefix(this.props, 'vertical')] = this.props.vertical;
    classes[_utilsBootstrapUtils2['default'].prefix(this.props, 'justified')] = this.props.justified;

    // this is annoying, since the class is `btn-block` not `btn-group-block`
    classes[_utilsBootstrapUtils2['default'].prefix(_Button2['default'].defaultProps, 'block')] = this.props.block;

    return _react2['default'].createElement(
      'div',
      _extends({}, this.props, {
        className: _classnames2['default'](this.props.className, classes) }),
      this.props.children
    );
  }
});

exports['default'] = _utilsBootstrapUtils.bsClass('btn-group', ButtonGroup);
module.exports = exports['default'];
},{"./Button":7,"./utils/bootstrapUtils":87,"babel-runtime/helpers/extends":98,"babel-runtime/helpers/interop-require-default":100,"classnames":126,"react":712,"react-prop-types/lib/all":245}],9:[function(require,module,exports){
'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _FormGroup = require('./FormGroup');

var _FormGroup2 = _interopRequireDefault(_FormGroup);

var _InputBase2 = require('./InputBase');

var _InputBase3 = _interopRequireDefault(_InputBase2);

var _utilsChildrenValueInputValidation = require('./utils/childrenValueInputValidation');

var _utilsChildrenValueInputValidation2 = _interopRequireDefault(_utilsChildrenValueInputValidation);

var ButtonInput = (function (_InputBase) {
  _inherits(ButtonInput, _InputBase);

  function ButtonInput() {
    _classCallCheck(this, ButtonInput);

    _InputBase.apply(this, arguments);
  }

  ButtonInput.prototype.renderFormGroup = function renderFormGroup(children) {
    var _props = this.props;
    var bsStyle = _props.bsStyle;
    var value = _props.value;

    var other = _objectWithoutProperties(_props, ['bsStyle', 'value']);

    return _react2['default'].createElement(
      _FormGroup2['default'],
      other,
      children
    );
  };

  ButtonInput.prototype.renderInput = function renderInput() {
    var _props2 = this.props;
    var children = _props2.children;
    var value = _props2.value;

    var other = _objectWithoutProperties(_props2, ['children', 'value']);

    var val = children ? children : value;
    return _react2['default'].createElement(_Button2['default'], _extends({}, other, { componentClass: 'input', ref: 'input', key: 'input', value: val }));
  };

  return ButtonInput;
})(_InputBase3['default']);

ButtonInput.types = _Button2['default'].types;

ButtonInput.defaultProps = {
  type: 'button'
};

ButtonInput.propTypes = {
  type: _react2['default'].PropTypes.oneOf(ButtonInput.types),
  bsStyle: function bsStyle() {
    // defer to Button propTypes of bsStyle
    return null;
  },
  children: _utilsChildrenValueInputValidation2['default'],
  value: _utilsChildrenValueInputValidation2['default']
};

exports['default'] = ButtonInput;
module.exports = exports['default'];
},{"./Button":7,"./FormGroup":25,"./InputBase":30,"./utils/childrenValueInputValidation":89,"babel-runtime/helpers/class-call-check":97,"babel-runtime/helpers/extends":98,"babel-runtime/helpers/inherits":99,"babel-runtime/helpers/interop-require-default":100,"babel-runtime/helpers/object-without-properties":102,"react":712}],10:[function(require,module,exports){
'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utilsBootstrapUtils = require('./utils/bootstrapUtils');

var _utilsBootstrapUtils2 = _interopRequireDefault(_utilsBootstrapUtils);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var ButtonToolbar = _react2['default'].createClass({
  displayName: 'ButtonToolbar',

  propTypes: {
    bsSize: _Button2['default'].propTypes.bsSize
  },

  getDefaultProps: function getDefaultProps() {
    return {
      bsClass: 'btn-toolbar'
    };
  },

  render: function render() {
    var classes = _utilsBootstrapUtils2['default'].getClassSet(this.props);

    return _react2['default'].createElement(
      'div',
      _extends({}, this.props, {
        role: 'toolbar',
        className: _classnames2['default'](this.props.className, classes) }),
      this.props.children
    );
  }
});

exports['default'] = ButtonToolbar;
module.exports = exports['default'];
},{"./Button":7,"./utils/bootstrapUtils":87,"babel-runtime/helpers/extends":98,"babel-runtime/helpers/interop-require-default":100,"classnames":126,"react":712}],11:[function(require,module,exports){
'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utilsValidComponentChildren = require('./utils/ValidComponentChildren');

var _utilsValidComponentChildren2 = _interopRequireDefault(_utilsValidComponentChildren);

var _Glyphicon = require('./Glyphicon');

var _Glyphicon2 = _interopRequireDefault(_Glyphicon);

var _utilsBootstrapUtils = require('./utils/bootstrapUtils');

var _utilsBootstrapUtils2 = _interopRequireDefault(_utilsBootstrapUtils);

var _CarouselCaption = require('./CarouselCaption');

var _CarouselCaption2 = _interopRequireDefault(_CarouselCaption);

var _CarouselItem = require('./CarouselItem');

var _CarouselItem2 = _interopRequireDefault(_CarouselItem);

var Carousel = _react2['default'].createClass({
  displayName: 'Carousel',

  propTypes: {
    slide: _react2['default'].PropTypes.bool,
    indicators: _react2['default'].PropTypes.bool,
    interval: _react2['default'].PropTypes.number,
    controls: _react2['default'].PropTypes.bool,
    pauseOnHover: _react2['default'].PropTypes.bool,
    wrap: _react2['default'].PropTypes.bool,
    onSelect: _react2['default'].PropTypes.func,
    onSlideEnd: _react2['default'].PropTypes.func,
    activeIndex: _react2['default'].PropTypes.number,
    defaultActiveIndex: _react2['default'].PropTypes.number,
    direction: _react2['default'].PropTypes.oneOf(['prev', 'next']),
    prevIcon: _react2['default'].PropTypes.node,
    nextIcon: _react2['default'].PropTypes.node
  },

  getDefaultProps: function getDefaultProps() {
    return {
      bsClass: 'carousel',
      slide: true,
      interval: 5000,
      pauseOnHover: true,
      wrap: true,
      indicators: true,
      controls: true,
      prevIcon: _react2['default'].createElement(_Glyphicon2['default'], { glyph: 'chevron-left' }),
      nextIcon: _react2['default'].createElement(_Glyphicon2['default'], { glyph: 'chevron-right' })
    };
  },

  getInitialState: function getInitialState() {
    return {
      activeIndex: this.props.defaultActiveIndex == null ? 0 : this.props.defaultActiveIndex,
      previousActiveIndex: null,
      direction: null
    };
  },

  getDirection: function getDirection(prevIndex, index) {
    if (prevIndex === index) {
      return null;
    }

    return prevIndex > index ? 'prev' : 'next';
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    var activeIndex = this.getActiveIndex();

    if (nextProps.activeIndex != null && nextProps.activeIndex !== activeIndex) {
      clearTimeout(this.timeout);
      this.setState({
        previousActiveIndex: activeIndex,
        direction: nextProps.direction != null ? nextProps.direction : this.getDirection(activeIndex, nextProps.activeIndex)
      });
    }
  },

  componentDidMount: function componentDidMount() {
    this.waitForNext();
  },

  componentWillUnmount: function componentWillUnmount() {
    clearTimeout(this.timeout);
  },

  next: function next(e) {
    if (e) {
      e.preventDefault();
    }

    var index = this.getActiveIndex() + 1;
    var count = _utilsValidComponentChildren2['default'].numberOf(this.props.children);

    if (index > count - 1) {
      if (!this.props.wrap) {
        return;
      }
      index = 0;
    }

    this.handleSelect(index, 'next');
  },

  prev: function prev(e) {
    if (e) {
      e.preventDefault();
    }

    var index = this.getActiveIndex() - 1;

    if (index < 0) {
      if (!this.props.wrap) {
        return;
      }
      index = _utilsValidComponentChildren2['default'].numberOf(this.props.children) - 1;
    }

    this.handleSelect(index, 'prev');
  },

  pause: function pause() {
    this.isPaused = true;
    clearTimeout(this.timeout);
  },

  play: function play() {
    this.isPaused = false;
    this.waitForNext();
  },

  waitForNext: function waitForNext() {
    if (!this.isPaused && this.props.slide && this.props.interval && this.props.activeIndex == null) {
      this.timeout = setTimeout(this.next, this.props.interval);
    }
  },

  handleMouseOver: function handleMouseOver() {
    if (this.props.pauseOnHover) {
      this.pause();
    }
  },

  handleMouseOut: function handleMouseOut() {
    if (this.isPaused) {
      this.play();
    }
  },

  render: function render() {
    var _classes;

    var classes = (_classes = {}, _classes[_utilsBootstrapUtils2['default'].prefix(this.props)] = true, _classes.slide = this.props.slide, _classes);

    return _react2['default'].createElement(
      'div',
      _extends({}, this.props, {
        className: _classnames2['default'](this.props.className, classes),
        onMouseOver: this.handleMouseOver,
        onMouseOut: this.handleMouseOut }),
      this.props.indicators ? this.renderIndicators() : null,
      _react2['default'].createElement(
        'div',
        {
          ref: 'inner',
          className: _utilsBootstrapUtils2['default'].prefix(this.props, 'inner')
        },
        _utilsValidComponentChildren2['default'].map(this.props.children, this.renderItem)
      ),
      this.props.controls ? this.renderControls() : null
    );
  },

  renderPrev: function renderPrev() {
    var classes = 'left ' + _utilsBootstrapUtils2['default'].prefix(this.props, 'control');

    return _react2['default'].createElement(
      'a',
      { className: classes, href: '#prev', key: 0, onClick: this.prev },
      this.props.prevIcon
    );
  },

  renderNext: function renderNext() {
    var classes = 'right ' + _utilsBootstrapUtils2['default'].prefix(this.props, 'control');

    return _react2['default'].createElement(
      'a',
      { className: classes, href: '#next', key: 1, onClick: this.next },
      this.props.nextIcon
    );
  },

  renderControls: function renderControls() {
    if (!this.props.wrap) {
      var activeIndex = this.getActiveIndex();
      var count = _utilsValidComponentChildren2['default'].numberOf(this.props.children);

      return [activeIndex !== 0 ? this.renderPrev() : null, activeIndex !== count - 1 ? this.renderNext() : null];
    }

    return [this.renderPrev(), this.renderNext()];
  },

  renderIndicator: function renderIndicator(child, index) {
    var className = index === this.getActiveIndex() ? 'active' : null;

    return _react2['default'].createElement('li', {
      key: index,
      className: className,
      onClick: this.handleSelect.bind(this, index, null) });
  },

  renderIndicators: function renderIndicators() {
    var _this = this;

    var indicators = [];
    _utilsValidComponentChildren2['default'].forEach(this.props.children, function (child, index) {
      indicators.push(_this.renderIndicator(child, index),

      // Force whitespace between indicator elements, bootstrap
      // requires this for correct spacing of elements.
      ' ');
    }, this);

    return _react2['default'].createElement(
      'ol',
      { className: _utilsBootstrapUtils2['default'].prefix(this.props, 'indicators') },
      indicators
    );
  },

  getActiveIndex: function getActiveIndex() {
    return this.props.activeIndex != null ? this.props.activeIndex : this.state.activeIndex;
  },

  handleItemAnimateOutEnd: function handleItemAnimateOutEnd() {
    var _this2 = this;

    this.setState({
      previousActiveIndex: null,
      direction: null
    }, function () {
      _this2.waitForNext();

      if (_this2.props.onSlideEnd) {
        _this2.props.onSlideEnd();
      }
    });
  },

  renderItem: function renderItem(child, index) {
    var activeIndex = this.getActiveIndex();
    var isActive = index === activeIndex;
    var isPreviousActive = this.state.previousActiveIndex != null && this.state.previousActiveIndex === index && this.props.slide;

    return _react.cloneElement(child, {
      active: isActive,
      ref: child.ref,
      key: child.key ? child.key : index,
      index: index,
      animateOut: isPreviousActive,
      animateIn: isActive && this.state.previousActiveIndex != null && this.props.slide,
      direction: this.state.direction,
      onAnimateOutEnd: isPreviousActive ? this.handleItemAnimateOutEnd : null
    });
  },

  handleSelect: function handleSelect(index, direction) {
    clearTimeout(this.timeout);

    if (this.isMounted()) {
      var previousActiveIndex = this.getActiveIndex();
      direction = direction || this.getDirection(previousActiveIndex, index);

      if (this.props.onSelect) {
        this.props.onSelect(index, direction);
      }

      if (this.props.activeIndex == null && index !== previousActiveIndex) {
        if (this.state.previousActiveIndex != null) {
          // If currently animating don't activate the new index.
          // TODO: look into queuing this canceled call and
          // animating after the current animation has ended.
          return;
        }

        this.setState({
          activeIndex: index,
          previousActiveIndex: previousActiveIndex,
          direction: direction
        });
      }
    }
  }
});

Carousel = _Object$assign(Carousel, { Caption: _CarouselCaption2['default'], Item: _CarouselItem2['default'] });

exports['default'] = Carousel;
module.exports = exports['default'];
},{"./CarouselCaption":12,"./CarouselItem":13,"./Glyphicon":26,"./utils/ValidComponentChildren":86,"./utils/bootstrapUtils":87,"babel-runtime/core-js/object/assign":93,"babel-runtime/helpers/extends":98,"babel-runtime/helpers/interop-require-default":100,"classnames":126,"react":712}],12:[function(require,module,exports){
'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactPropTypesLibElementType = require('react-prop-types/lib/elementType');

var _reactPropTypesLibElementType2 = _interopRequireDefault(_reactPropTypesLibElementType);

var CarouselCaption = _react2['default'].createClass({
  displayName: 'Carousel.Caption',
  propTypes: {
    /**
     * You can use a custom element for this component
     */
    componentClass: _reactPropTypesLibElementType2['default']
  },

  getDefaultProps: function getDefaultProps() {
    return {
      componentClass: 'div'
    };
  },

  render: function render() {
    var ComponentClass = this.props.componentClass;

    return _react2['default'].createElement(
      ComponentClass,
      _extends({}, this.props, { className: _classnames2['default'](this.props.className, 'carousel-caption') }),
      this.props.children
    );
  }
});

exports['default'] = CarouselCaption;
module.exports = exports['default'];
},{"babel-runtime/helpers/extends":98,"babel-runtime/helpers/interop-require-default":100,"classnames":126,"react":712,"react-prop-types/lib/elementType":248}],13:[function(require,module,exports){
'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _utilsTransitionEvents = require('./utils/TransitionEvents');

var _utilsTransitionEvents2 = _interopRequireDefault(_utilsTransitionEvents);

var _utilsBootstrapUtils = require('./utils/bootstrapUtils');

var _utilsBootstrapUtils2 = _interopRequireDefault(_utilsBootstrapUtils);

var CarouselItem = _react2['default'].createClass({
  displayName: 'CarouselItem',

  propTypes: {
    direction: _react2['default'].PropTypes.oneOf(['prev', 'next']),
    onAnimateOutEnd: _react2['default'].PropTypes.func,
    active: _react2['default'].PropTypes.bool,
    animateIn: _react2['default'].PropTypes.bool,
    animateOut: _react2['default'].PropTypes.bool,
    caption: _react2['default'].PropTypes.node,
    index: _react2['default'].PropTypes.number
  },

  getInitialState: function getInitialState() {
    return {
      direction: null
    };
  },

  getDefaultProps: function getDefaultProps() {
    return {
      bsStyle: 'carousel',
      active: false,
      animateIn: false,
      animateOut: false
    };
  },

  handleAnimateOutEnd: function handleAnimateOutEnd() {
    if (this.props.onAnimateOutEnd && this.isMounted()) {
      this.props.onAnimateOutEnd(this.props.index);
    }
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (this.props.active !== nextProps.active) {
      this.setState({
        direction: null
      });
    }
  },

  componentDidUpdate: function componentDidUpdate(prevProps) {
    if (!this.props.active && prevProps.active) {
      _utilsTransitionEvents2['default'].addEndEventListener(_reactDom2['default'].findDOMNode(this), this.handleAnimateOutEnd);
    }

    if (this.props.active !== prevProps.active) {
      setTimeout(this.startAnimation, 20);
    }
  },

  startAnimation: function startAnimation() {
    if (!this.isMounted()) {
      return;
    }

    this.setState({
      direction: this.props.direction === 'prev' ? 'right' : 'left'
    });
  },

  render: function render() {
    var classes = {
      item: true,
      active: this.props.active && !this.props.animateIn || this.props.animateOut,
      next: this.props.active && this.props.animateIn && this.props.direction === 'next',
      prev: this.props.active && this.props.animateIn && this.props.direction === 'prev'
    };

    if (this.state.direction && (this.props.animateIn || this.props.animateOut)) {
      classes[this.state.direction] = true;
    }

    return _react2['default'].createElement(
      'div',
      _extends({}, this.props, { className: _classnames2['default'](this.props.className, classes) }),
      this.props.children,
      this.props.caption ? this.renderCaption() : null
    );
  },

  renderCaption: function renderCaption() {
    var classes = _utilsBootstrapUtils2['default'].prefix(this.props, 'caption');

    return _react2['default'].createElement(
      'div',
      { className: classes },
      this.props.caption
    );
  }
});

exports['default'] = CarouselItem;
module.exports = exports['default'];
},{"./utils/TransitionEvents":85,"./utils/bootstrapUtils":87,"babel-runtime/helpers/extends":98,"babel-runtime/helpers/interop-require-default":100,"classnames":126,"react":712,"react-dom":556}],14:[function(require,module,exports){
'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _styleMaps = require('./styleMaps');

var _styleMaps2 = _interopRequireDefault(_styleMaps);

var _reactPropTypesLibElementType = require('react-prop-types/lib/elementType');

var _reactPropTypesLibElementType2 = _interopRequireDefault(_reactPropTypesLibElementType);

var Clearfix = _react2['default'].createClass({
  displayName: 'Clearfix',

  propTypes: {
    /**
     * You can use a custom element for this component
     */
    componentClass: _reactPropTypesLibElementType2['default'],
    /**
     * Apply clearfix
     *
     * on Extra small devices Phones
     *
     * adds class `visible-xs-block`
     */
    visibleXsBlock: _react2['default'].PropTypes.bool,
    /**
     * Apply clearfix
     *
     * on Small devices Tablets
     *
     * adds class `visible-sm-block`
     */
    visibleSmBlock: _react2['default'].PropTypes.bool,
    /**
     * Apply clearfix
     *
     * on Medium devices Desktops
     *
     * adds class `visible-md-block`
     */
    visibleMdBlock: _react2['default'].PropTypes.bool,
    /**
     * Apply clearfix
     *
     * on Large devices Desktops
     *
     * adds class `visible-lg-block`
     */
    visibleLgBlock: _react2['default'].PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      componentClass: 'div'
    };
  },

  render: function render() {
    var _this = this;

    var ComponentClass = this.props.componentClass;

    var classes = {};

    _Object$keys(_styleMaps2['default'].SIZES).forEach(function (key) {
      var size = _styleMaps2['default'].SIZES[key];

      classes['visible-' + size + '-block'] = _this.props['visible' + size.charAt(0).toUpperCase() + size.slice(1) + 'Block'];
    }, this);

    return _react2['default'].createElement(
      ComponentClass,
      _extends({}, this.props, { className: _classnames2['default'](this.props.className, 'clearfix', classes) }),
      this.props.children
    );
  }
});

exports['default'] = Clearfix;
module.exports = exports['default'];
},{"./styleMaps":83,"babel-runtime/core-js/object/keys":95,"babel-runtime/helpers/extends":98,"babel-runtime/helpers/interop-require-default":100,"classnames":126,"react":712,"react-prop-types/lib/elementType":248}],15:[function(require,module,exports){
'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _styleMaps = require('./styleMaps');

var _styleMaps2 = _interopRequireDefault(_styleMaps);

var _reactPropTypesLibElementType = require('react-prop-types/lib/elementType');

var _reactPropTypesLibElementType2 = _interopRequireDefault(_reactPropTypesLibElementType);

var Col = _react2['default'].createClass({
  displayName: 'Col',

  propTypes: {
    /**
     * The number of columns you wish to span
     *
     * for Extra small devices Phones (<768px)
     *
     * class-prefix `col-xs-`
     */
    xs: _react2['default'].PropTypes.number,
    /**
     * The number of columns you wish to span
     *
     * for Small devices Tablets (≥768px)
     *
     * class-prefix `col-sm-`
     */
    sm: _react2['default'].PropTypes.number,
    /**
     * The number of columns you wish to span
     *
     * for Medium devices Desktops (≥992px)
     *
     * class-prefix `col-md-`
     */
    md: _react2['default'].PropTypes.number,
    /**
     * The number of columns you wish to span
     *
     * for Large devices Desktops (≥1200px)
     *
     * class-prefix `col-lg-`
     */
    lg: _react2['default'].PropTypes.number,
    /**
     * Hide column
     *
     * on Extra small devices Phones
     *
     * adds class `hidden-xs`
     */
    xsHidden: _react2['default'].PropTypes.bool,
    /**
     * Hide column
     *
     * on Small devices Tablets
     *
     * adds class `hidden-sm`
     */
    smHidden: _react2['default'].PropTypes.bool,
    /**
     * Hide column
     *
     * on Medium devices Desktops
     *
     * adds class `hidden-md`
     */
    mdHidden: _react2['default'].PropTypes.bool,
    /**
     * Hide column
     *
     * on Large devices Desktops
     *
     * adds class `hidden-lg`
     */
    lgHidden: _react2['default'].PropTypes.bool,
    /**
     * Move columns to the right
     *
     * for Extra small devices Phones
     *
     * class-prefix `col-xs-offset-`
     */
    xsOffset: _react2['default'].PropTypes.number,
    /**
     * Move columns to the right
     *
     * for Small devices Tablets
     *
     * class-prefix `col-sm-offset-`
     */
    smOffset: _react2['default'].PropTypes.number,
    /**
     * Move columns to the right
     *
     * for Medium devices Desktops
     *
     * class-prefix `col-md-offset-`
     */
    mdOffset: _react2['default'].PropTypes.number,
    /**
     * Move columns to the right
     *
     * for Large devices Desktops
     *
     * class-prefix `col-lg-offset-`
     */
    lgOffset: _react2['default'].PropTypes.number,
    /**
     * Change the order of grid columns to the right
     *
     * for Extra small devices Phones
     *
     * class-prefix `col-xs-push-`
     */
    xsPush: _react2['default'].PropTypes.number,
    /**
     * Change the order of grid columns to the right
     *
     * for Small devices Tablets
     *
     * class-prefix `col-sm-push-`
     */
    smPush: _react2['default'].PropTypes.number,
    /**
     * Change the order of grid columns to the right
     *
     * for Medium devices Desktops
     *
     * class-prefix `col-md-push-`
     */
    mdPush: _react2['default'].PropTypes.number,
    /**
     * Change the order of grid columns to the right
     *
     * for Large devices Desktops
     *
     * class-prefix `col-lg-push-`
     */
    lgPush: _react2['default'].PropTypes.number,
    /**
     * Change the order of grid columns to the left
     *
     * for Extra small devices Phones
     *
     * class-prefix `col-xs-pull-`
     */
    xsPull: _react2['default'].PropTypes.number,
    /**
     * Change the order of grid columns to the left
     *
     * for Small devices Tablets
     *
     * class-prefix `col-sm-pull-`
     */
    smPull: _react2['default'].PropTypes.number,
    /**
     * Change the order of grid columns to the left
     *
     * for Medium devices Desktops
     *
     * class-prefix `col-md-pull-`
     */
    mdPull: _react2['default'].PropTypes.number,
    /**
     * Change the order of grid columns to the left
     *
     * for Large devices Desktops
     *
     * class-prefix `col-lg-pull-`
     */
    lgPull: _react2['default'].PropTypes.number,
    /**
     * You can use a custom element for this component
     */
    componentClass: _reactPropTypesLibElementType2['default']
  },

  getDefaultProps: function getDefaultProps() {
    return {
      componentClass: 'div'
    };
  },

  render: function render() {
    var _this = this;

    var ComponentClass = this.props.componentClass;
    var classes = {};

    _Object$keys(_styleMaps2['default'].SIZES).forEach(function (key) {
      var size = _styleMaps2['default'].SIZES[key];
      var prop = size;
      var classPart = size + '-';

      if (_this.props[prop]) {
        classes['col-' + classPart + _this.props[prop]] = true;
      }

      classes['hidden-' + size] = _this.props[size + 'Hidden'];

      prop = size + 'Offset';
      classPart = size + '-offset-';
      if (_this.props[prop] >= 0) {
        classes['col-' + classPart + _this.props[prop]] = true;
      }

      prop = size + 'Push';
      classPart = size + '-push-';
      if (_this.props[prop] >= 0) {
        classes['col-' + classPart + _this.props[prop]] = true;
      }

      prop = size + 'Pull';
      classPart = size + '-pull-';
      if (_this.props[prop] >= 0) {
        classes['col-' + classPart + _this.props[prop]] = true;
      }
    }, this);

    return _react2['default'].createElement(
      ComponentClass,
      _extends({}, this.props, { className: _classnames2['default'](this.props.className, classes) }),
      this.props.children
    );
  }
});

exports['default'] = Col;
module.exports = exports['default'];
},{"./styleMaps":83,"babel-runtime/core-js/object/keys":95,"babel-runtime/helpers/extends":98,"babel-runtime/helpers/interop-require-default":100,"classnames":126,"react":712,"react-prop-types/lib/elementType":248}],16:[function(require,module,exports){
'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _domHelpersStyle = require('dom-helpers/style');

var _domHelpersStyle2 = _interopRequireDefault(_domHelpersStyle);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactOverlaysLibTransition = require('react-overlays/lib/Transition');

var _reactOverlaysLibTransition2 = _interopRequireDefault(_reactOverlaysLibTransition);

var _reactPropTypesLibDeprecated = require('react-prop-types/lib/deprecated');

var _reactPropTypesLibDeprecated2 = _interopRequireDefault(_reactPropTypesLibDeprecated);

var _utilsCreateChainedFunction = require('./utils/createChainedFunction');

var _utilsCreateChainedFunction2 = _interopRequireDefault(_utilsCreateChainedFunction);

var capitalize = function capitalize(str) {
  return str[0].toUpperCase() + str.substr(1);
};

// reading a dimension prop will cause the browser to recalculate,
// which will let our animations work
var triggerBrowserReflow = function triggerBrowserReflow(node) {
  return node.offsetHeight;
};

var MARGINS = {
  height: ['marginTop', 'marginBottom'],
  width: ['marginLeft', 'marginRight']
};

function getDimensionValue(dimension, elem) {
  var value = elem['offset' + capitalize(dimension)];
  var margins = MARGINS[dimension];

  return value + parseInt(_domHelpersStyle2['default'](elem, margins[0]), 10) + parseInt(_domHelpersStyle2['default'](elem, margins[1]), 10);
}

var Collapse = (function (_React$Component) {
  _inherits(Collapse, _React$Component);

  function Collapse(props, context) {
    _classCallCheck(this, Collapse);

    _React$Component.call(this, props, context);

    this.onEnterListener = this.handleEnter.bind(this);
    this.onEnteringListener = this.handleEntering.bind(this);
    this.onEnteredListener = this.handleEntered.bind(this);
    this.onExitListener = this.handleExit.bind(this);
    this.onExitingListener = this.handleExiting.bind(this);
  }

  // Explicitly copied from Transition for doc generation.
  // TODO: Remove duplication once #977 is resolved.

  Collapse.prototype.render = function render() {
    var enter = _utilsCreateChainedFunction2['default'](this.onEnterListener, this.props.onEnter);
    var entering = _utilsCreateChainedFunction2['default'](this.onEnteringListener, this.props.onEntering);
    var entered = _utilsCreateChainedFunction2['default'](this.onEnteredListener, this.props.onEntered);
    var exit = _utilsCreateChainedFunction2['default'](this.onExitListener, this.props.onExit);
    var exiting = _utilsCreateChainedFunction2['default'](this.onExitingListener, this.props.onExiting);

    return _react2['default'].createElement(
      _reactOverlaysLibTransition2['default'],
      _extends({
        ref: 'transition'
      }, this.props, {
        'aria-expanded': this.props.role ? this.props['in'] : null,
        className: _classnames2['default'](this.props.className, { width: this._dimension() === 'width' }),
        exitedClassName: 'collapse',
        exitingClassName: 'collapsing',
        enteredClassName: 'collapse in',
        enteringClassName: 'collapsing',
        onEnter: enter,
        onEntering: entering,
        onEntered: entered,
        onExit: exit,
        onExiting: exiting,
        onExited: this.props.onExited
      }),
      this.props.children
    );
  };

  /* -- Expanding -- */

  Collapse.prototype.handleEnter = function handleEnter(elem) {
    var dimension = this._dimension();
    elem.style[dimension] = '0';
  };

  Collapse.prototype.handleEntering = function handleEntering(elem) {
    var dimension = this._dimension();

    elem.style[dimension] = this._getScrollDimensionValue(elem, dimension);
  };

  Collapse.prototype.handleEntered = function handleEntered(elem) {
    var dimension = this._dimension();
    elem.style[dimension] = null;
  };

  /* -- Collapsing -- */

  Collapse.prototype.handleExit = function handleExit(elem) {
    var dimension = this._dimension();

    elem.style[dimension] = this.props.getDimensionValue(dimension, elem) + 'px';
  };

  Collapse.prototype.handleExiting = function handleExiting(elem) {
    var dimension = this._dimension();

    triggerBrowserReflow(elem);
    elem.style[dimension] = '0';
  };

  Collapse.prototype._dimension = function _dimension() {
    return typeof this.props.dimension === 'function' ? this.props.dimension() : this.props.dimension;
  };

  // for testing

  Collapse.prototype._getTransitionInstance = function _getTransitionInstance() {
    return this.refs.transition;
  };

  Collapse.prototype._getScrollDimensionValue = function _getScrollDimensionValue(elem, dimension) {
    return elem['scroll' + capitalize(dimension)] + 'px';
  };

  return Collapse;
})(_react2['default'].Component);

Collapse.propTypes = {
  /**
   * Show the component; triggers the expand or collapse animation
   */
  'in': _react2['default'].PropTypes.bool,

  /**
   * Unmount the component (remove it from the DOM) when it is collapsed
   */
  unmountOnExit: _react2['default'].PropTypes.bool,

  /**
   * Run the expand animation when the component mounts, if it is initially
   * shown
   */
  transitionAppear: _react2['default'].PropTypes.bool,

  /**
   * Duration of the collapse animation in milliseconds, to ensure that
   * finishing callbacks are fired even if the original browser transition end
   * events are canceled
   */
  timeout: _react2['default'].PropTypes.number,

  /**
   * duration
   * @private
   */
  duration: _reactPropTypesLibDeprecated2['default'](_react2['default'].PropTypes.number, 'Use `timeout`.'),

  /**
   * Callback fired before the component expands
   */
  onEnter: _react2['default'].PropTypes.func,
  /**
   * Callback fired after the component starts to expand
   */
  onEntering: _react2['default'].PropTypes.func,
  /**
   * Callback fired after the component has expanded
   */
  onEntered: _react2['default'].PropTypes.func,
  /**
   * Callback fired before the component collapses
   */
  onExit: _react2['default'].PropTypes.func,
  /**
   * Callback fired after the component starts to collapse
   */
  onExiting: _react2['default'].PropTypes.func,
  /**
   * Callback fired after the component has collapsed
   */
  onExited: _react2['default'].PropTypes.func,

  /**
   * The dimension used when collapsing, or a function that returns the
   * dimension
   *
   * _Note: Bootstrap only partially supports 'width'!
   * You will need to supply your own CSS animation for the `.width` CSS class._
   */
  dimension: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.oneOf(['height', 'width']), _react2['default'].PropTypes.func]),

  /**
   * Function that returns the height or width of the animating DOM node
   *
   * Allows for providing some custom logic for how much the Collapse component
   * should animate in its specified dimension. Called with the current
   * dimension prop value and the DOM node.
   */
  getDimensionValue: _react2['default'].PropTypes.func,

  /**
   * ARIA role of collapsible element
   */
  role: _react2['default'].PropTypes.string
};

Collapse.defaultProps = {
  'in': false,
  timeout: 300,
  unmountOnExit: false,
  transitionAppear: false,

  dimension: 'height',
  getDimensionValue: getDimensionValue
};

exports['default'] = Collapse;
module.exports = exports['default'];
},{"./utils/createChainedFunction":90,"babel-runtime/helpers/class-call-check":97,"babel-runtime/helpers/extends":98,"babel-runtime/helpers/inherits":99,"babel-runtime/helpers/interop-require-default":100,"classnames":126,"dom-helpers/style":146,"react":712,"react-overlays/lib/Transition":233,"react-prop-types/lib/deprecated":247}],17:[function(require,module,exports){
'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Collapse = require('./Collapse');

var _Collapse2 = _interopRequireDefault(_Collapse);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utilsDeprecationWarning = require('./utils/deprecationWarning');

var _utilsDeprecationWarning2 = _interopRequireDefault(_utilsDeprecationWarning);

var _utilsValidComponentChildren = require('./utils/ValidComponentChildren');

var _utilsValidComponentChildren2 = _interopRequireDefault(_utilsValidComponentChildren);

var _utilsCreateChainedFunction = require('./utils/createChainedFunction');

var _utilsCreateChainedFunction2 = _interopRequireDefault(_utilsCreateChainedFunction);

var CollapsibleNav = _react2['default'].createClass({
  displayName: 'CollapsibleNav',

  propTypes: {
    onSelect: _react2['default'].PropTypes.func,
    activeHref: _react2['default'].PropTypes.string,
    activeKey: _react2['default'].PropTypes.any,
    collapsible: _react2['default'].PropTypes.bool,
    expanded: _react2['default'].PropTypes.bool,
    eventKey: _react2['default'].PropTypes.any
  },

  getDefaultProps: function getDefaultProps() {
    return {
      collapsible: false,
      expanded: false
    };
  },

  render: function render() {
    /*
     * this.props.collapsible is set in NavBar when an eventKey is supplied.
     */
    var classes = this.props.collapsible ? 'navbar-collapse' : null;
    var renderChildren = this.props.collapsible ? this.renderCollapsibleNavChildren : this.renderChildren;

    var nav = _react2['default'].createElement(
      'div',
      { eventKey: this.props.eventKey, className: _classnames2['default'](this.props.className, classes) },
      _utilsValidComponentChildren2['default'].map(this.props.children, renderChildren)
    );

    if (this.props.collapsible) {
      return _react2['default'].createElement(
        _Collapse2['default'],
        { 'in': this.props.expanded },
        nav
      );
    }
    return nav;
  },

  getChildActiveProp: function getChildActiveProp(child) {
    if (child.props.active) {
      return true;
    }
    if (this.props.activeKey != null) {
      if (child.props.eventKey === this.props.activeKey) {
        return true;
      }
    }
    if (this.props.activeHref != null) {
      if (child.props.href === this.props.activeHref) {
        return true;
      }
    }

    return child.props.active;
  },

  renderChildren: function renderChildren(child, index) {
    var key = child.key ? child.key : index;
    return _react.cloneElement(child, {
      activeKey: this.props.activeKey,
      activeHref: this.props.activeHref,
      ref: 'nocollapse_' + key,
      key: key,
      navItem: true
    });
  },

  renderCollapsibleNavChildren: function renderCollapsibleNavChildren(child, index) {
    var key = child.key ? child.key : index;
    return _react.cloneElement(child, {
      active: this.getChildActiveProp(child),
      activeKey: this.props.activeKey,
      activeHref: this.props.activeHref,
      onSelect: _utilsCreateChainedFunction2['default'](child.props.onSelect, this.props.onSelect),
      ref: 'collapsible_' + key,
      key: key,
      navItem: true
    });
  }
});

exports['default'] = _utilsDeprecationWarning2['default'].wrapper(CollapsibleNav, 'CollapsibleNav', 'Navbar.Collapse', 'http://react-bootstrap.github.io/components.html#navbars');
module.exports = exports['default'];
},{"./Collapse":16,"./utils/ValidComponentChildren":86,"./utils/createChainedFunction":90,"./utils/deprecationWarning":92,"babel-runtime/helpers/interop-require-default":100,"classnames":126,"react":712}],18:[function(require,module,exports){
'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _domHelpersActiveElement = require('dom-helpers/activeElement');

var _domHelpersActiveElement2 = _interopRequireDefault(_domHelpersActiveElement);

var _domHelpersQueryContains = require('dom-helpers/query/contains');

var _domHelpersQueryContains2 = _interopRequireDefault(_domHelpersQueryContains);

var _keycode = require('keycode');

var _keycode2 = _interopRequireDefault(_keycode);

var _lodashCompatCollectionFind = require('lodash-compat/collection/find');

var _lodashCompatCollectionFind2 = _interopRequireDefault(_lodashCompatCollectionFind);

var _lodashCompatObjectOmit = require('lodash-compat/object/omit');

var _lodashCompatObjectOmit2 = _interopRequireDefault(_lodashCompatObjectOmit);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactPropTypesLibAll = require('react-prop-types/lib/all');

var _reactPropTypesLibAll2 = _interopRequireDefault(_reactPropTypesLibAll);

var _reactPropTypesLibElementType = require('react-prop-types/lib/elementType');

var _reactPropTypesLibElementType2 = _interopRequireDefault(_reactPropTypesLibElementType);

var _reactPropTypesLibIsRequiredForA11y = require('react-prop-types/lib/isRequiredForA11y');

var _reactPropTypesLibIsRequiredForA11y2 = _interopRequireDefault(_reactPropTypesLibIsRequiredForA11y);

var _uncontrollable = require('uncontrollable');

var _uncontrollable2 = _interopRequireDefault(_uncontrollable);

var _utilsBootstrapUtils = require('./utils/bootstrapUtils');

var _utilsBootstrapUtils2 = _interopRequireDefault(_utilsBootstrapUtils);

var _ButtonGroup = require('./ButtonGroup');

var _ButtonGroup2 = _interopRequireDefault(_ButtonGroup);

var _DropdownMenu = require('./DropdownMenu');

var _DropdownMenu2 = _interopRequireDefault(_DropdownMenu);

var _DropdownToggle = require('./DropdownToggle');

var _DropdownToggle2 = _interopRequireDefault(_DropdownToggle);

var _utilsCreateChainedFunction = require('./utils/createChainedFunction');

var _utilsCreateChainedFunction2 = _interopRequireDefault(_utilsCreateChainedFunction);

var _utilsCustomPropTypes = require('./utils/CustomPropTypes');

var _utilsCustomPropTypes2 = _interopRequireDefault(_utilsCustomPropTypes);

var _utilsValidComponentChildren = require('./utils/ValidComponentChildren');

var _utilsValidComponentChildren2 = _interopRequireDefault(_utilsValidComponentChildren);

var TOGGLE_REF = 'toggle-btn';
var TOGGLE_ROLE = _DropdownToggle2['default'].defaultProps.bsRole;
var MENU_ROLE = _DropdownMenu2['default'].defaultProps.bsRole;

var Dropdown = (function (_React$Component) {
  _inherits(Dropdown, _React$Component);

  function Dropdown(props) {
    _classCallCheck(this, Dropdown);

    _React$Component.call(this, props);

    this.Toggle = _DropdownToggle2['default'];

    this.toggleOpen = this.toggleOpen.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.extractChildren = this.extractChildren.bind(this);

    this.refineMenu = this.refineMenu.bind(this);
    this.refineToggle = this.refineToggle.bind(this);

    this.childExtractors = [{
      key: 'toggle',
      matches: function matches(child) {
        return child.props.bsRole === TOGGLE_ROLE;
      },
      refine: this.refineToggle
    }, {
      key: 'menu',
      exclusive: true,
      matches: function matches(child) {
        return child.props.bsRole === MENU_ROLE;
      },
      refine: this.refineMenu
    }];

    this.state = {};

    this.lastOpenEventType = null;
  }

  Dropdown.prototype.componentDidMount = function componentDidMount() {
    this.focusNextOnOpen();
  };

  Dropdown.prototype.componentWillUpdate = function componentWillUpdate(nextProps) {
    if (!nextProps.open && this.props.open) {
      this._focusInDropdown = _domHelpersQueryContains2['default'](_reactDom2['default'].findDOMNode(this.refs.menu), _domHelpersActiveElement2['default'](document));
    }
  };

  Dropdown.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (this.props.open && !prevProps.open) {
      this.focusNextOnOpen();
    }

    if (!this.props.open && prevProps.open) {
      // if focus hasn't already moved from the menu lets return it
      // to the toggle
      if (this._focusInDropdown) {
        this._focusInDropdown = false;
        this.focus();
      }
    }
  };

  Dropdown.prototype.render = function render() {
    var _rootClasses;

    var children = this.extractChildren();
    var Component = this.props.componentClass;

    var props = _lodashCompatObjectOmit2['default'](this.props, ['id', 'bsClass', 'role']);
    var className = _utilsBootstrapUtils2['default'].prefix(this.props);

    var rootClasses = (_rootClasses = {
      open: this.props.open,
      disabled: this.props.disabled
    }, _rootClasses[className] = !this.props.dropup, _rootClasses.dropup = this.props.dropup, _rootClasses);

    return _react2['default'].createElement(
      Component,
      _extends({}, props, {
        className: _classnames2['default'](this.props.className, rootClasses)
      }),
      children
    );
  };

  Dropdown.prototype.toggleOpen = function toggleOpen() {
    var eventType = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

    var open = !this.props.open;

    if (open) {
      this.lastOpenEventType = eventType;
    }

    if (this.props.onToggle) {
      this.props.onToggle(open);
    }
  };

  Dropdown.prototype.handleClick = function handleClick() {
    if (this.props.disabled) {
      return;
    }

    this.toggleOpen('click');
  };

  Dropdown.prototype.handleKeyDown = function handleKeyDown(event) {
    if (this.props.disabled) {
      return;
    }

    switch (event.keyCode) {
      case _keycode2['default'].codes.down:
        if (!this.props.open) {
          this.toggleOpen('keydown');
        } else if (this.refs.menu.focusNext) {
          this.refs.menu.focusNext();
        }
        event.preventDefault();
        break;
      case _keycode2['default'].codes.esc:
      case _keycode2['default'].codes.tab:
        this.handleClose(event);
        break;
      default:
    }
  };

  Dropdown.prototype.handleClose = function handleClose() {
    if (!this.props.open) {
      return;
    }

    this.toggleOpen();
  };

  Dropdown.prototype.focusNextOnOpen = function focusNextOnOpen() {
    var menu = this.refs.menu;

    if (!menu.focusNext) {
      return;
    }

    if (this.lastOpenEventType === 'keydown' || this.props.role === 'menuitem') {
      menu.focusNext();
    }
  };

  Dropdown.prototype.focus = function focus() {
    var toggle = _reactDom2['default'].findDOMNode(this.refs[TOGGLE_REF]);

    if (toggle && toggle.focus) {
      toggle.focus();
    }
  };

  Dropdown.prototype.extractChildren = function extractChildren() {
    var _this = this;

    var open = !!this.props.open;
    var seen = {};

    return _utilsValidComponentChildren2['default'].map(this.props.children, function (child) {
      var extractor = _lodashCompatCollectionFind2['default'](_this.childExtractors, function (x) {
        return x.matches(child);
      });

      if (extractor) {
        if (seen[extractor.key]) {
          return false;
        }

        seen[extractor.key] = extractor.exclusive;
        child = extractor.refine(child, open);
      }

      return child;
    });
  };

  Dropdown.prototype.refineMenu = function refineMenu(menu, open) {
    var menuProps = {
      ref: 'menu',
      open: open,
      labelledBy: this.props.id,
      pullRight: this.props.pullRight,
      bsClass: this.props.bsClass
    };

    menuProps.onClose = _utilsCreateChainedFunction2['default'](menu.props.onClose, this.props.onClose, this.handleClose);

    menuProps.onSelect = _utilsCreateChainedFunction2['default'](menu.props.onSelect, this.props.onSelect, this.handleClose);

    return _react.cloneElement(menu, menuProps, menu.props.children);
  };

  Dropdown.prototype.refineToggle = function refineToggle(toggle, open) {
    var toggleProps = {
      open: open,
      id: this.props.id,
      ref: TOGGLE_REF,
      role: this.props.role
    };

    toggleProps.onClick = _utilsCreateChainedFunction2['default'](toggle.props.onClick, this.handleClick);

    toggleProps.onKeyDown = _utilsCreateChainedFunction2['default'](toggle.props.onKeyDown, this.handleKeyDown);

    return _react.cloneElement(toggle, toggleProps, toggle.props.children);
  };

  return Dropdown;
})(_react2['default'].Component);

Dropdown.Toggle = _DropdownToggle2['default'];

Dropdown.TOGGLE_REF = TOGGLE_REF;
Dropdown.TOGGLE_ROLE = TOGGLE_ROLE;
Dropdown.MENU_ROLE = MENU_ROLE;

Dropdown.defaultProps = {
  componentClass: _ButtonGroup2['default'],
  bsClass: 'dropdown'
};

Dropdown.propTypes = {

  bsClass: _react2['default'].PropTypes.string,

  /**
   * The menu will open above the dropdown button, instead of below it.
   */
  dropup: _react2['default'].PropTypes.bool,

  /**
   * An html id attribute, necessary for assistive technologies, such as screen readers.
   * @type {string|number}
   * @required
   */
  id: _reactPropTypesLibIsRequiredForA11y2['default'](_react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.number])),

  componentClass: _reactPropTypesLibElementType2['default'],

  /**
   * The children of a Dropdown may be a `<Dropdown.Toggle/>` or a `<Dropdown.Menu/>`.
   * @type {node}
   */
  children: _reactPropTypesLibAll2['default'](_utilsCustomPropTypes2['default'].requiredRoles(TOGGLE_ROLE, MENU_ROLE), _utilsCustomPropTypes2['default'].exclusiveRoles(MENU_ROLE)),

  /**
   * Whether or not component is disabled.
   */
  disabled: _react2['default'].PropTypes.bool,

  /**
   * Align the menu to the right side of the Dropdown toggle
   */
  pullRight: _react2['default'].PropTypes.bool,

  /**
   * Whether or not the Dropdown is visible.
   *
   * @controllable onToggle
   */
  open: _react2['default'].PropTypes.bool,

  /**
   * A callback fired when the Dropdown closes.
   */
  onClose: _react2['default'].PropTypes.func,

  /**
   * A callback fired when the Dropdown wishes to change visibility. Called with the requested
   * `open` value.
   *
   * ```js
   * function(Boolean isOpen) {}
   * ```
   * @controllable open
   */
  onToggle: _react2['default'].PropTypes.func,

  /**
   * A callback fired when a menu item is selected.
   *
   * ```js
   * function(Object event, Any eventKey)
   * ```
   */
  onSelect: _react2['default'].PropTypes.func,

  /**
   * If `'menuitem'`, causes the dropdown to behave like a menu item rather than
   * a menu button.
   */
  role: _react2['default'].PropTypes.string
};

Dropdown = _uncontrollable2['default'](Dropdown, { open: 'onToggle' });

Dropdown.Toggle = _DropdownToggle2['default'];
Dropdown.Menu = _DropdownMenu2['default'];

exports['default'] = Dropdown;
module.exports = exports['default'];
},{"./ButtonGroup":8,"./DropdownMenu":20,"./DropdownToggle":21,"./utils/CustomPropTypes":84,"./utils/ValidComponentChildren":86,"./utils/bootstrapUtils":87,"./utils/createChainedFunction":90,"babel-runtime/helpers/class-call-check":97,"babel-runtime/helpers/extends":98,"babel-runtime/helpers/inherits":99,"babel-runtime/helpers/interop-require-default":100,"classnames":126,"dom-helpers/activeElement":127,"dom-helpers/query/contains":137,"keycode":157,"lodash-compat/collection/find":159,"lodash-compat/object/omit":221,"react":712,"react-dom":556,"react-prop-types/lib/all":245,"react-prop-types/lib/elementType":248,"react-prop-types/lib/isRequiredForA11y":249,"uncontrollable":252}],19:[function(require,module,exports){
'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Dropdown = require('./Dropdown');

var _Dropdown2 = _interopRequireDefault(_Dropdown);

var _lodashCompatObjectOmit = require('lodash-compat/object/omit');

var _lodashCompatObjectOmit2 = _interopRequireDefault(_lodashCompatObjectOmit);

var _lodashCompatObjectPick = require('lodash-compat/object/pick');

var _lodashCompatObjectPick2 = _interopRequireDefault(_lodashCompatObjectPick);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var DropdownButton = (function (_React$Component) {
  _inherits(DropdownButton, _React$Component);

  function DropdownButton() {
    _classCallCheck(this, DropdownButton);

    _React$Component.apply(this, arguments);
  }

  DropdownButton.prototype.render = function render() {
    var _props = this.props;
    var bsStyle = _props.bsStyle;
    var bsSize = _props.bsSize;
    var disabled = _props.disabled;
    var _props2 = this.props;
    var title = _props2.title;
    var children = _props2.children;

    var props = _objectWithoutProperties(_props2, ['title', 'children']);

    var dropdownProps = _lodashCompatObjectPick2['default'](props, _Object$keys(_Dropdown2['default'].ControlledComponent.propTypes));
    var toggleProps = _lodashCompatObjectOmit2['default'](props, _Object$keys(_Dropdown2['default'].ControlledComponent.propTypes));

    return _react2['default'].createElement(
      _Dropdown2['default'],
      _extends({}, dropdownProps, {
        bsSize: bsSize,
        bsStyle: bsStyle
      }),
      _react2['default'].createElement(
        _Dropdown2['default'].Toggle,
        _extends({}, toggleProps, {
          disabled: disabled
        }),
        title
      ),
      _react2['default'].createElement(
        _Dropdown2['default'].Menu,
        null,
        children
      )
    );
  };

  return DropdownButton;
})(_react2['default'].Component);

DropdownButton.propTypes = _extends({
  disabled: _react2['default'].PropTypes.bool,
  bsStyle: _Button2['default'].propTypes.bsStyle,
  bsSize: _Button2['default'].propTypes.bsSize,

  /**
   * When used with the `title` prop, the noCaret option will not render a caret icon, in the toggle element.
   */
  noCaret: _react2['default'].PropTypes.bool,
  title: _react2['default'].PropTypes.node.isRequired

}, _Dropdown2['default'].propTypes);

DropdownButton.defaultProps = {
  disabled: false,
  pullRight: false,
  dropup: false,
  navItem: false,
  noCaret: false
};

exports['default'] = DropdownButton;
module.exports = exports['default'];
},{"./Button":7,"./Dropdown":18,"babel-runtime/core-js/object/keys":95,"babel-runtime/helpers/class-call-check":97,"babel-runtime/helpers/extends":98,"babel-runtime/helpers/inherits":99,"babel-runtime/helpers/interop-require-default":100,"babel-runtime/helpers/object-without-properties":102,"lodash-compat/object/omit":221,"lodash-compat/object/pick":223,"react":712}],20:[function(require,module,exports){
'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _keycode = require('keycode');

var _keycode2 = _interopRequireDefault(_keycode);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utilsBootstrapUtils = require('./utils/bootstrapUtils');

var _utilsBootstrapUtils2 = _interopRequireDefault(_utilsBootstrapUtils);

var _reactOverlaysLibRootCloseWrapper = require('react-overlays/lib/RootCloseWrapper');

var _reactOverlaysLibRootCloseWrapper2 = _interopRequireDefault(_reactOverlaysLibRootCloseWrapper);

var _utilsValidComponentChildren = require('./utils/ValidComponentChildren');

var _utilsValidComponentChildren2 = _interopRequireDefault(_utilsValidComponentChildren);

var _utilsCreateChainedFunction = require('./utils/createChainedFunction');

var _utilsCreateChainedFunction2 = _interopRequireDefault(_utilsCreateChainedFunction);

var DropdownMenu = (function (_React$Component) {
  _inherits(DropdownMenu, _React$Component);

  function DropdownMenu(props) {
    _classCallCheck(this, DropdownMenu);

    _React$Component.call(this, props);

    this.focusNext = this.focusNext.bind(this);
    this.focusPrevious = this.focusPrevious.bind(this);
    this.getFocusableMenuItems = this.getFocusableMenuItems.bind(this);
    this.getItemsAndActiveIndex = this.getItemsAndActiveIndex.bind(this);

    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  DropdownMenu.prototype.handleKeyDown = function handleKeyDown(event) {
    switch (event.keyCode) {
      case _keycode2['default'].codes.down:
        this.focusNext();
        event.preventDefault();
        break;
      case _keycode2['default'].codes.up:
        this.focusPrevious();
        event.preventDefault();
        break;
      case _keycode2['default'].codes.esc:
      case _keycode2['default'].codes.tab:
        this.props.onClose(event);
        break;
      default:
    }
  };

  DropdownMenu.prototype.focusNext = function focusNext() {
    var _getItemsAndActiveIndex = this.getItemsAndActiveIndex();

    var items = _getItemsAndActiveIndex.items;
    var activeItemIndex = _getItemsAndActiveIndex.activeItemIndex;

    if (items.length === 0) {
      return;
    }

    if (activeItemIndex === items.length - 1) {
      items[0].focus();
      return;
    }

    items[activeItemIndex + 1].focus();
  };

  DropdownMenu.prototype.focusPrevious = function focusPrevious() {
    var _getItemsAndActiveIndex2 = this.getItemsAndActiveIndex();

    var items = _getItemsAndActiveIndex2.items;
    var activeItemIndex = _getItemsAndActiveIndex2.activeItemIndex;

    if (activeItemIndex === 0) {
      items[items.length - 1].focus();
      return;
    }

    items[activeItemIndex - 1].focus();
  };

  DropdownMenu.prototype.getItemsAndActiveIndex = function getItemsAndActiveIndex() {
    var items = this.getFocusableMenuItems();
    var activeElement = document.activeElement;
    var activeItemIndex = items.indexOf(activeElement);

    return { items: items, activeItemIndex: activeItemIndex };
  };

  DropdownMenu.prototype.getFocusableMenuItems = function getFocusableMenuItems() {
    var menuNode = _reactDom2['default'].findDOMNode(this);

    if (menuNode === undefined) {
      return [];
    }

    return [].slice.call(menuNode.querySelectorAll('[tabIndex="-1"]'), 0);
  };

  DropdownMenu.prototype.render = function render() {
    var _classes,
        _this = this;

    var _props = this.props;
    var children = _props.children;
    var onSelect = _props.onSelect;
    var pullRight = _props.pullRight;
    var className = _props.className;
    var labelledBy = _props.labelledBy;
    var open = _props.open;
    var onClose = _props.onClose;

    var props = _objectWithoutProperties(_props, ['children', 'onSelect', 'pullRight', 'className', 'labelledBy', 'open', 'onClose']);

    var items = _utilsValidComponentChildren2['default'].map(children, function (child) {
      var childProps = child.props || {};

      return _react2['default'].cloneElement(child, {
        onKeyDown: _utilsCreateChainedFunction2['default'](childProps.onKeyDown, _this.handleKeyDown),
        onSelect: _utilsCreateChainedFunction2['default'](childProps.onSelect, onSelect)
      }, childProps.children);
    });

    var classes = (_classes = {}, _classes[_utilsBootstrapUtils2['default'].prefix(this.props, 'menu')] = true, _classes[_utilsBootstrapUtils2['default'].prefix(this.props, 'menu-right')] = pullRight, _classes);

    var list = _react2['default'].createElement(
      'ul',
      _extends({
        className: _classnames2['default'](className, classes),
        role: 'menu',
        'aria-labelledby': labelledBy
      }, props),
      items
    );

    if (open) {
      list = _react2['default'].createElement(
        _reactOverlaysLibRootCloseWrapper2['default'],
        { noWrap: true, onRootClose: onClose },
        list
      );
    }

    return list;
  };

  return DropdownMenu;
})(_react2['default'].Component);

DropdownMenu.defaultProps = {
  bsRole: 'menu',
  bsClass: 'dropdown',
  pullRight: false
};

DropdownMenu.propTypes = {
  open: _react2['default'].PropTypes.bool,
  pullRight: _react2['default'].PropTypes.bool,
  onClose: _react2['default'].PropTypes.func,
  labelledBy: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.number]),
  onSelect: _react2['default'].PropTypes.func
};

exports['default'] = DropdownMenu;
module.exports = exports['default'];
},{"./utils/ValidComponentChildren":86,"./utils/bootstrapUtils":87,"./utils/createChainedFunction":90,"babel-runtime/helpers/class-call-check":97,"babel-runtime/helpers/extends":98,"babel-runtime/helpers/inherits":99,"babel-runtime/helpers/interop-require-default":100,"babel-runtime/helpers/object-without-properties":102,"classnames":126,"keycode":157,"react":712,"react-dom":556,"react-overlays/lib/RootCloseWrapper":232}],21:[function(require,module,exports){
'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _SafeAnchor = require('./SafeAnchor');

var _SafeAnchor2 = _interopRequireDefault(_SafeAnchor);

var CARET = _react2['default'].createElement(
  'span',
  null,
  ' ',
  _react2['default'].createElement('span', { className: 'caret' })
);

var DropdownToggle = (function (_React$Component) {
  _inherits(DropdownToggle, _React$Component);

  function DropdownToggle() {
    _classCallCheck(this, DropdownToggle);

    _React$Component.apply(this, arguments);
  }

  DropdownToggle.prototype.render = function render() {
    var caret = this.props.noCaret ? null : CARET;

    var classes = {
      'dropdown-toggle': true
    };

    var Component = this.props.useAnchor ? _SafeAnchor2['default'] : _Button2['default'];

    return _react2['default'].createElement(
      Component,
      _extends({}, this.props, {
        className: _classnames2['default'](classes, this.props.className),
        type: 'button',
        'aria-haspopup': true,
        'aria-expanded': this.props.open }),
      this.props.children || this.props.title,
      caret
    );
  };

  return DropdownToggle;
})(_react2['default'].Component);

exports['default'] = DropdownToggle;

DropdownToggle.defaultProps = {
  open: false,
  useAnchor: false,
  bsRole: 'toggle'
};

DropdownToggle.propTypes = {
  bsRole: _react2['default'].PropTypes.string,
  noCaret: _react2['default'].PropTypes.bool,
  open: _react2['default'].PropTypes.bool,
  title: _react2['default'].PropTypes.string,
  useAnchor: _react2['default'].PropTypes.bool
};

DropdownToggle.isToggle = true;
DropdownToggle.titleProp = 'title';
DropdownToggle.onClickProp = 'onClick';
module.exports = exports['default'];
},{"./Button":7,"./SafeAnchor":72,"babel-runtime/helpers/class-call-check":97,"babel-runtime/helpers/extends":98,"babel-runtime/helpers/inherits":99,"babel-runtime/helpers/interop-require-default":100,"classnames":126,"react":712}],22:[function(require,module,exports){
'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactOverlaysLibTransition = require('react-overlays/lib/Transition');

var _reactOverlaysLibTransition2 = _interopRequireDefault(_reactOverlaysLibTransition);

var _reactPropTypesLibDeprecated = require('react-prop-types/lib/deprecated');

var _reactPropTypesLibDeprecated2 = _interopRequireDefault(_reactPropTypesLibDeprecated);

var Fade = (function (_React$Component) {
  _inherits(Fade, _React$Component);

  function Fade() {
    _classCallCheck(this, Fade);

    _React$Component.apply(this, arguments);
  }

  // Explicitly copied from Transition for doc generation.
  // TODO: Remove duplication once #977 is resolved.

  Fade.prototype.render = function render() {
    var timeout = this.props.timeout || this.props.duration;

    return _react2['default'].createElement(
      _reactOverlaysLibTransition2['default'],
      _extends({}, this.props, {
        timeout: timeout,
        className: _classnames2['default'](this.props.className, 'fade'),
        enteredClassName: 'in',
        enteringClassName: 'in'
      }),
      this.props.children
    );
  };

  return Fade;
})(_react2['default'].Component);

Fade.propTypes = {
  /**
   * Show the component; triggers the fade in or fade out animation
   */
  'in': _react2['default'].PropTypes.bool,

  /**
   * Unmount the component (remove it from the DOM) when it is faded out
   */
  unmountOnExit: _react2['default'].PropTypes.bool,

  /**
   * Run the fade in animation when the component mounts, if it is initially
   * shown
   */
  transitionAppear: _react2['default'].PropTypes.bool,

  /**
   * Duration of the fade animation in milliseconds, to ensure that finishing
   * callbacks are fired even if the original browser transition end events are
   * canceled
   */
  timeout: _react2['default'].PropTypes.number,

  /**
   * duration
   * @private
   */
  duration: _reactPropTypesLibDeprecated2['default'](_react2['default'].PropTypes.number, 'Use `timeout`.'),

  /**
   * Callback fired before the component fades in
   */
  onEnter: _react2['default'].PropTypes.func,
  /**
   * Callback fired after the component starts to fade in
   */
  onEntering: _react2['default'].PropTypes.func,
  /**
   * Callback fired after the has component faded in
   */
  onEntered: _react2['default'].PropTypes.func,
  /**
   * Callback fired before the component fades out
   */
  onExit: _react2['default'].PropTypes.func,
  /**
   * Callback fired after the component starts to fade out
   */
  onExiting: _react2['default'].PropTypes.func,
  /**
   * Callback fired after the component has faded out
   */
  onExited: _react2['default'].PropTypes.func
};

Fade.defaultProps = {
  'in': false,
  timeout: 300,
  unmountOnExit: false,
  transitionAppear: false
};

exports['default'] = Fade;
module.exports = exports['default'];
},{"babel-runtime/helpers/class-call-check":97,"babel-runtime/helpers/extends":98,"babel-runtime/helpers/inherits":99,"babel-runtime/helpers/interop-require-default":100,"classnames":126,"react":712,"react-overlays/lib/Transition":233,"react-prop-types/lib/deprecated":247}],23:[function(require,module,exports){
'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _InputBase2 = require('../InputBase');

var _InputBase3 = _interopRequireDefault(_InputBase2);

var _utilsChildrenValueInputValidation = require('../utils/childrenValueInputValidation');

var _utilsChildrenValueInputValidation2 = _interopRequireDefault(_utilsChildrenValueInputValidation);

var _reactPropTypesLibElementType = require('react-prop-types/lib/elementType');

var _reactPropTypesLibElementType2 = _interopRequireDefault(_reactPropTypesLibElementType);

var Static = (function (_InputBase) {
  _inherits(Static, _InputBase);

  function Static() {
    _classCallCheck(this, Static);

    _InputBase.apply(this, arguments);
  }

  Static.prototype.getValue = function getValue() {
    var _props = this.props;
    var children = _props.children;
    var value = _props.value;

    return children ? children : value;
  };

  Static.prototype.renderInput = function renderInput() {
    var _props2 = this.props;
    var ComponentClass = _props2.componentClass;

    var props = _objectWithoutProperties(_props2, ['componentClass']);

    return _react2['default'].createElement(
      ComponentClass,
      _extends({}, props, { className: _classnames2['default'](props.className, 'form-control-static'), ref: 'input', key: 'input' }),
      this.getValue()
    );
  };

  return Static;
})(_InputBase3['default']);

Static.propTypes = {
  value: _utilsChildrenValueInputValidation2['default'],
  /**
   * You can override the default 'p' with a custom element
   */
  componentClass: _reactPropTypesLibElementType2['default'],
  children: _utilsChildrenValueInputValidation2['default']
};

Static.defaultProps = {
  componentClass: 'p'
};

exports['default'] = Static;
module.exports = exports['default'];
},{"../InputBase":30,"../utils/childrenValueInputValidation":89,"babel-runtime/helpers/class-call-check":97,"babel-runtime/helpers/extends":98,"babel-runtime/helpers/inherits":99,"babel-runtime/helpers/interop-require-default":100,"babel-runtime/helpers/object-without-properties":102,"classnames":126,"react":712,"react-prop-types/lib/elementType":248}],24:[function(require,module,exports){
'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _Static2 = require('./Static');

var _Static3 = _interopRequireDefault(_Static2);

exports.Static = _Static3['default'];
},{"./Static":23,"babel-runtime/helpers/interop-require-default":100}],25:[function(require,module,exports){
'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var FormGroup = (function (_React$Component) {
  _inherits(FormGroup, _React$Component);

  function FormGroup() {
    _classCallCheck(this, FormGroup);

    _React$Component.apply(this, arguments);
  }

  FormGroup.prototype.render = function render() {
    var classes = {
      'form-group': !this.props.standalone,
      'form-group-lg': !this.props.standalone && this.props.bsSize === 'large',
      'form-group-sm': !this.props.standalone && this.props.bsSize === 'small',
      'has-feedback': this.props.hasFeedback,
      'has-success': this.props.bsStyle === 'success',
      'has-warning': this.props.bsStyle === 'warning',
      'has-error': this.props.bsStyle === 'error'
    };

    return _react2['default'].createElement(
      'div',
      { className: _classnames2['default'](classes, this.props.groupClassName) },
      this.props.children
    );
  };

  return FormGroup;
})(_react2['default'].Component);

FormGroup.defaultProps = {
  hasFeedback: false,
  standalone: false
};

FormGroup.propTypes = {
  standalone: _react2['default'].PropTypes.bool,
  hasFeedback: _react2['default'].PropTypes.bool,
  bsSize: function bsSize(props) {
    if (props.standalone && props.bsSize !== undefined) {
      return new Error('bsSize will not be used when `standalone` is set.');
    }

    return _react2['default'].PropTypes.oneOf(['small', 'medium', 'large']).apply(null, arguments);
  },
  bsStyle: _react2['default'].PropTypes.oneOf(['success', 'warning', 'error']),
  groupClassName: _react2['default'].PropTypes.string
};

exports['default'] = FormGroup;
module.exports = exports['default'];
},{"babel-runtime/helpers/class-call-check":97,"babel-runtime/helpers/inherits":99,"babel-runtime/helpers/interop-require-default":100,"classnames":126,"react":712}],26:[function(require,module,exports){
'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var Glyphicon = _react2['default'].createClass({
  displayName: 'Glyphicon',

  propTypes: {
    /**
     * bootstrap className
     * @private
     */
    bsClass: _react2['default'].PropTypes.string,
    /**
     * An icon name. See e.g. http://getbootstrap.com/components/#glyphicons
     */
    glyph: _react2['default'].PropTypes.string.isRequired,
    /**
     * Adds 'form-control-feedback' class
     * @private
     */
    formControlFeedback: _react2['default'].PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      bsClass: 'glyphicon',
      formControlFeedback: false
    };
  },

  render: function render() {
    var _classNames;

    var className = _classnames2['default'](this.props.className, (_classNames = {}, _classNames[this.props.bsClass] = true, _classNames['glyphicon-' + this.props.glyph] = true, _classNames['form-control-feedback'] = this.props.formControlFeedback, _classNames));

    return _react2['default'].createElement(
      'span',
      _extends({}, this.props, { className: className }),
      this.props.children
    );
  }
});

exports['default'] = Glyphicon;
module.exports = exports['default'];
},{"babel-runtime/helpers/extends":98,"babel-runtime/helpers/interop-require-default":100,"classnames":126,"react":712}],27:[function(require,module,exports){
'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactPropTypesLibElementType = require('react-prop-types/lib/elementType');

var _reactPropTypesLibElementType2 = _interopRequireDefault(_reactPropTypesLibElementType);

var Grid = _react2['default'].createClass({
  displayName: 'Grid',

  propTypes: {
    /**
     * Turn any fixed-width grid layout into a full-width layout by this property.
     *
     * Adds `container-fluid` class.
     */
    fluid: _react2['default'].PropTypes.bool,
    /**
     * You can use a custom element for this component
     */
    componentClass: _reactPropTypesLibElementType2['default']
  },

  getDefaultProps: function getDefaultProps() {
    return {
      componentClass: 'div',
      fluid: false
    };
  },

  render: function render() {
    var ComponentClass = this.props.componentClass;
    var className = this.props.fluid ? 'container-fluid' : 'container';

    return _react2['default'].createElement(
      ComponentClass,
      _extends({}, this.props, {
        className: _classnames2['default'](this.props.className, className) }),
      this.props.children
    );
  }
});

exports['default'] = Grid;
module.exports = exports['default'];
},{"babel-runtime/helpers/extends":98,"babel-runtime/helpers/interop-require-default":100,"classnames":126,"react":712,"react-prop-types/lib/elementType":248}],28:[function(require,module,exports){
'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var Image = _react2['default'].createClass({
  displayName: 'Image',

  propTypes: {

    /**
     * Sets image as responsive image
     */
    responsive: _react2['default'].PropTypes.bool,

    /**
     * Sets image shape as rounded
     */
    rounded: _react2['default'].PropTypes.bool,

    /**
     * Sets image shape as circle
     */
    circle: _react2['default'].PropTypes.bool,

    /**
     * Sets image shape as thumbnail
     */
    thumbnail: _react2['default'].PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      responsive: false,
      rounded: false,
      circle: false,
      thumbnail: false
    };
  },

  render: function render() {
    var classes = {
      'img-responsive': this.props.responsive,
      'img-rounded': this.props.rounded,
      'img-circle': this.props.circle,
      'img-thumbnail': this.props.thumbnail
    };

    return _react2['default'].createElement('img', _extends({}, this.props, { className: _classnames2['default'](this.props.className, classes) }));
  }
});

exports['default'] = Image;
module.exports = exports['default'];
},{"babel-runtime/helpers/extends":98,"babel-runtime/helpers/interop-require-default":100,"classnames":126,"react":712}],29:[function(require,module,exports){
'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _InputBase2 = require('./InputBase');

var _InputBase3 = _interopRequireDefault(_InputBase2);

var _FormControls = require('./FormControls');

var FormControls = _interopRequireWildcard(_FormControls);

var _utilsDeprecationWarning = require('./utils/deprecationWarning');

var _utilsDeprecationWarning2 = _interopRequireDefault(_utilsDeprecationWarning);

var Input = (function (_InputBase) {
  _inherits(Input, _InputBase);

  function Input() {
    _classCallCheck(this, Input);

    _InputBase.apply(this, arguments);
  }

  Input.prototype.render = function render() {
    if (this.props.type === 'static') {
      _utilsDeprecationWarning2['default']('Input type=static', 'FormControls.Static');
      return _react2['default'].createElement(FormControls.Static, this.props);
    }

    return _InputBase.prototype.render.call(this);
  };

  return Input;
})(_InputBase3['default']);

Input.propTypes = {
  type: _react2['default'].PropTypes.string
};

exports['default'] = Input;
module.exports = exports['default'];
},{"./FormControls":24,"./InputBase":30,"./utils/deprecationWarning":92,"babel-runtime/helpers/class-call-check":97,"babel-runtime/helpers/inherits":99,"babel-runtime/helpers/interop-require-default":100,"babel-runtime/helpers/interop-require-wildcard":101,"react":712}],30:[function(require,module,exports){
'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FormGroup = require('./FormGroup');

var _FormGroup2 = _interopRequireDefault(_FormGroup);

var _Glyphicon = require('./Glyphicon');

var _Glyphicon2 = _interopRequireDefault(_Glyphicon);

var InputBase = (function (_React$Component) {
  _inherits(InputBase, _React$Component);

  function InputBase() {
    _classCallCheck(this, InputBase);

    _React$Component.apply(this, arguments);
  }

  InputBase.prototype.getInputDOMNode = function getInputDOMNode() {
    return this.refs.input;
  };

  InputBase.prototype.getValue = function getValue() {
    if (this.props.type === 'static') {
      return this.props.value;
    } else if (this.props.type) {
      if (this.props.type === 'select' && this.props.multiple) {
        return this.getSelectedOptions();
      }
      return this.getInputDOMNode().value;
    }
    throw new Error('Cannot use getValue without specifying input type.');
  };

  InputBase.prototype.getChecked = function getChecked() {
    return this.getInputDOMNode().checked;
  };

  InputBase.prototype.getSelectedOptions = function getSelectedOptions() {
    var values = [];

    Array.prototype.forEach.call(this.getInputDOMNode().getElementsByTagName('option'), function (option) {
      if (option.selected) {
        var value = option.getAttribute('value') || option.innerHtml;
        values.push(value);
      }
    });

    return values;
  };

  InputBase.prototype.isCheckboxOrRadio = function isCheckboxOrRadio() {
    return this.props.type === 'checkbox' || this.props.type === 'radio';
  };

  InputBase.prototype.isFile = function isFile() {
    return this.props.type === 'file';
  };

  InputBase.prototype.renderInputGroup = function renderInputGroup(children) {
    var addonBefore = this.props.addonBefore ? _react2['default'].createElement(
      'span',
      { className: 'input-group-addon', key: 'addonBefore' },
      this.props.addonBefore
    ) : null;

    var addonAfter = this.props.addonAfter ? _react2['default'].createElement(
      'span',
      { className: 'input-group-addon', key: 'addonAfter' },
      this.props.addonAfter
    ) : null;

    var buttonBefore = this.props.buttonBefore ? _react2['default'].createElement(
      'span',
      { className: 'input-group-btn' },
      this.props.buttonBefore
    ) : null;

    var buttonAfter = this.props.buttonAfter ? _react2['default'].createElement(
      'span',
      { className: 'input-group-btn' },
      this.props.buttonAfter
    ) : null;

    var inputGroupClassName = undefined;
    switch (this.props.bsSize) {
      case 'small':
        inputGroupClassName = 'input-group-sm';break;
      case 'large':
        inputGroupClassName = 'input-group-lg';break;
      default:
    }

    return addonBefore || addonAfter || buttonBefore || buttonAfter ? _react2['default'].createElement(
      'div',
      { className: _classnames2['default'](inputGroupClassName, 'input-group'), key: 'input-group' },
      addonBefore,
      buttonBefore,
      children,
      addonAfter,
      buttonAfter
    ) : children;
  };

  InputBase.prototype.renderIcon = function renderIcon() {
    if (this.props.hasFeedback) {
      if (this.props.feedbackIcon) {
        return _react2['default'].cloneElement(this.props.feedbackIcon, { formControlFeedback: true });
      }

      switch (this.props.bsStyle) {
        case 'success':
          return _react2['default'].createElement(_Glyphicon2['default'], { formControlFeedback: true, glyph: 'ok', key: 'icon' });
        case 'warning':
          return _react2['default'].createElement(_Glyphicon2['default'], { formControlFeedback: true, glyph: 'warning-sign', key: 'icon' });
        case 'error':
          return _react2['default'].createElement(_Glyphicon2['default'], { formControlFeedback: true, glyph: 'remove', key: 'icon' });
        default:
          return _react2['default'].createElement('span', { className: 'form-control-feedback', key: 'icon' });
      }
    } else {
      return null;
    }
  };

  InputBase.prototype.renderHelp = function renderHelp() {
    return this.props.help ? _react2['default'].createElement(
      'span',
      { className: 'help-block', key: 'help' },
      this.props.help
    ) : null;
  };

  InputBase.prototype.renderCheckboxAndRadioWrapper = function renderCheckboxAndRadioWrapper(children) {
    var classes = {
      'checkbox': this.props.type === 'checkbox',
      'radio': this.props.type === 'radio'
    };

    return _react2['default'].createElement(
      'div',
      { className: _classnames2['default'](classes), key: 'checkboxRadioWrapper' },
      children
    );
  };

  InputBase.prototype.renderWrapper = function renderWrapper(children) {
    return this.props.wrapperClassName ? _react2['default'].createElement(
      'div',
      { className: this.props.wrapperClassName, key: 'wrapper' },
      children
    ) : children;
  };

  InputBase.prototype.renderLabel = function renderLabel(children) {
    var classes = {
      'control-label': !this.isCheckboxOrRadio()
    };
    classes[this.props.labelClassName] = this.props.labelClassName;

    return this.props.label ? _react2['default'].createElement(
      'label',
      { htmlFor: this.props.id, className: _classnames2['default'](classes), key: 'label' },
      children,
      this.props.label
    ) : children;
  };

  InputBase.prototype.renderInput = function renderInput() {
    if (!this.props.type) {
      return this.props.children;
    }

    switch (this.props.type) {
      case 'select':
        return _react2['default'].createElement(
          'select',
          _extends({}, this.props, { className: _classnames2['default'](this.props.className, 'form-control'), ref: 'input', key: 'input' }),
          this.props.children
        );
      case 'textarea':
        return _react2['default'].createElement('textarea', _extends({}, this.props, { className: _classnames2['default'](this.props.className, 'form-control'), ref: 'input', key: 'input' }));
      case 'static':
        return _react2['default'].createElement(
          'p',
          _extends({}, this.props, { className: _classnames2['default'](this.props.className, 'form-control-static'), ref: 'input', key: 'input' }),
          this.props.value
        );
      default:
        var className = this.isCheckboxOrRadio() || this.isFile() ? '' : 'form-control';
        return _react2['default'].createElement('input', _extends({}, this.props, { className: _classnames2['default'](this.props.className, className), ref: 'input', key: 'input' }));
    }
  };

  InputBase.prototype.renderFormGroup = function renderFormGroup(children) {
    return _react2['default'].createElement(
      _FormGroup2['default'],
      this.props,
      children
    );
  };

  InputBase.prototype.renderChildren = function renderChildren() {
    return !this.isCheckboxOrRadio() ? [this.renderLabel(), this.renderWrapper([this.renderInputGroup(this.renderInput()), this.renderIcon(), this.renderHelp()])] : this.renderWrapper([this.renderCheckboxAndRadioWrapper(this.renderLabel(this.renderInput())), this.renderHelp()]);
  };

  InputBase.prototype.render = function render() {
    var children = this.renderChildren();
    return this.renderFormGroup(children);
  };

  return InputBase;
})(_react2['default'].Component);

InputBase.propTypes = {
  type: _react2['default'].PropTypes.string,
  label: _react2['default'].PropTypes.node,
  help: _react2['default'].PropTypes.node,
  addonBefore: _react2['default'].PropTypes.node,
  addonAfter: _react2['default'].PropTypes.node,
  buttonBefore: _react2['default'].PropTypes.node,
  buttonAfter: _react2['default'].PropTypes.node,
  bsSize: _react2['default'].PropTypes.oneOf(['small', 'medium', 'large']),
  bsStyle: _react2['default'].PropTypes.oneOf(['success', 'warning', 'error']),
  hasFeedback: _react2['default'].PropTypes.bool,
  feedbackIcon: _react2['default'].PropTypes.node,
  id: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.number]),
  groupClassName: _react2['default'].PropTypes.string,
  wrapperClassName: _react2['default'].PropTypes.string,
  labelClassName: _react2['default'].PropTypes.string,
  multiple: _react2['default'].PropTypes.bool,
  disabled: _react2['default'].PropTypes.bool,
  value: _react2['default'].PropTypes.any
};

InputBase.defaultProps = {
  disabled: false,
  hasFeedback: false,
  multiple: false
};

exports['default'] = InputBase;
module.exports = exports['default'];
},{"./FormGroup":25,"./Glyphicon":26,"babel-runtime/helpers/class-call-check":97,"babel-runtime/helpers/extends":98,"babel-runtime/helpers/inherits":99,"babel-runtime/helpers/interop-require-default":100,"classnames":126,"react":712}],31:[function(require,module,exports){
// https://www.npmjs.org/package/react-interpolate-component
// TODO: Drop this in favor of es6 string interpolation

'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utilsValidComponentChildren = require('./utils/ValidComponentChildren');

var _utilsValidComponentChildren2 = _interopRequireDefault(_utilsValidComponentChildren);

var REGEXP = /\%\((.+?)\)s/;

var Interpolate = _react2['default'].createClass({
  displayName: 'Interpolate',

  propTypes: {
    component: _react2['default'].PropTypes.node,
    format: _react2['default'].PropTypes.string,
    unsafe: _react2['default'].PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      component: 'span',
      unsafe: false
    };
  },

  render: function render() {
    var format = _utilsValidComponentChildren2['default'].hasValidComponent(this.props.children) || typeof this.props.children === 'string' ? this.props.children : this.props.format;
    var parent = this.props.component;
    var unsafe = this.props.unsafe === true;
    var props = _extends({}, this.props);

    delete props.children;
    delete props.format;
    delete props.component;
    delete props.unsafe;

    if (unsafe) {
      var content = format.split(REGEXP).reduce(function (memo, match, index) {
        var html = undefined;

        if (index % 2 === 0) {
          html = match;
        } else {
          html = props[match];
          delete props[match];
        }

        if (_react2['default'].isValidElement(html)) {
          throw new Error('cannot interpolate a React component into unsafe text');
        }

        memo += html;

        return memo;
      }, '');

      props.dangerouslySetInnerHTML = { __html: content };

      return _react2['default'].createElement(parent, props);
    }
    var kids = format.split(REGEXP).reduce(function (memo, match, index) {
      var child = undefined;

      if (index % 2 === 0) {
        if (match.length === 0) {
          return memo;
        }

        child = match;
      } else {
        child = props[match];
        delete props[match];
      }

      memo.push(child);

      return memo;
    }, []);

    return _react2['default'].createElement(parent, props, kids);
  }
});

exports['default'] = Interpolate;
module.exports = exports['default'];
},{"./utils/ValidComponentChildren":86,"babel-runtime/helpers/extends":98,"babel-runtime/helpers/interop-require-default":100,"react":712}],32:[function(require,module,exports){
'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactPropTypesLibElementType = require('react-prop-types/lib/elementType');

var _reactPropTypesLibElementType2 = _interopRequireDefault(_reactPropTypesLibElementType);

var Jumbotron = _react2['default'].createClass({
  displayName: 'Jumbotron',

  propTypes: {
    /**
     * You can use a custom element for this component
     */
    componentClass: _reactPropTypesLibElementType2['default']
  },

  getDefaultProps: function getDefaultProps() {
    return { componentClass: 'div' };
  },

  render: function render() {
    var ComponentClass = this.props.componentClass;

    return _react2['default'].createElement(
      ComponentClass,
      _extends({}, this.props, { className: _classnames2['default'](this.props.className, 'jumbotron') }),
      this.props.children
    );
  }
});

exports['default'] = Jumbotron;
module.exports = exports['default'];
},{"babel-runtime/helpers/extends":98,"babel-runtime/helpers/interop-require-default":100,"classnames":126,"react":712,"react-prop-types/lib/elementType":248}],33:[function(require,module,exports){
'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utilsBootstrapUtils = require('./utils/bootstrapUtils');

var _utilsBootstrapUtils2 = _interopRequireDefault(_utilsBootstrapUtils);

var _styleMaps = require('./styleMaps');

var Label = (function (_React$Component) {
  _inherits(Label, _React$Component);

  function Label() {
    _classCallCheck(this, _Label);

    _React$Component.apply(this, arguments);
  }

  Label.prototype.render = function render() {
    var classes = _utilsBootstrapUtils2['default'].getClassSet(this.props);

    return _react2['default'].createElement(
      'span',
      _extends({}, this.props, { className: _classnames2['default'](this.props.className, classes) }),
      this.props.children
    );
  };

  var _Label = Label;
  Label = _utilsBootstrapUtils.bsStyles(_styleMaps.State.values().concat(_styleMaps.DEFAULT, _styleMaps.PRIMARY), _styleMaps.DEFAULT)(Label) || Label;
  Label = _utilsBootstrapUtils.bsClass('label')(Label) || Label;
  return Label;
})(_react2['default'].Component);

exports['default'] = Label;
module.exports = exports['default'];
},{"./styleMaps":83,"./utils/bootstrapUtils":87,"babel-runtime/helpers/class-call-check":97,"babel-runtime/helpers/extends":98,"babel-runtime/helpers/inherits":99,"babel-runtime/helpers/interop-require-default":100,"classnames":126,"react":712}],34:[function(require,module,exports){
'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ListGroupItem = require('./ListGroupItem');

var _ListGroupItem2 = _interopRequireDefault(_ListGroupItem);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utilsValidComponentChildren = require('./utils/ValidComponentChildren');

var _utilsValidComponentChildren2 = _interopRequireDefault(_utilsValidComponentChildren);

var ListGroup = (function (_React$Component) {
  _inherits(ListGroup, _React$Component);

  function ListGroup() {
    _classCallCheck(this, ListGroup);

    _React$Component.apply(this, arguments);
  }

  ListGroup.prototype.render = function render() {
    var _this = this;

    var items = _utilsValidComponentChildren2['default'].map(this.props.children, function (item, index) {
      return _react.cloneElement(item, { key: item.key ? item.key : index });
    });

    if (this.areCustomChildren(items)) {
      var Component = this.props.componentClass;
      return _react2['default'].createElement(
        Component,
        _extends({}, this.props, {
          className: _classnames2['default'](this.props.className, 'list-group') }),
        items
      );
    }

    var shouldRenderDiv = false;

    if (!this.props.children) {
      shouldRenderDiv = true;
    } else {
      _utilsValidComponentChildren2['default'].forEach(this.props.children, function (child) {
        if (_this.isAnchorOrButton(child.props)) {
          shouldRenderDiv = true;
        }
      });
    }

    return shouldRenderDiv ? this.renderDiv(items) : this.renderUL(items);
  };

  ListGroup.prototype.isAnchorOrButton = function isAnchorOrButton(props) {
    return props.href || props.onClick;
  };

  ListGroup.prototype.areCustomChildren = function areCustomChildren(children) {
    var customChildren = false;

    _utilsValidComponentChildren2['default'].forEach(children, function (child) {
      if (child.type !== _ListGroupItem2['default']) {
        customChildren = true;
      }
    }, this);

    return customChildren;
  };

  ListGroup.prototype.renderUL = function renderUL(items) {
    var listItems = _utilsValidComponentChildren2['default'].map(items, function (item) {
      return _react.cloneElement(item, { listItem: true });
    });

    return _react2['default'].createElement(
      'ul',
      _extends({}, this.props, {
        className: _classnames2['default'](this.props.className, 'list-group') }),
      listItems
    );
  };

  ListGroup.prototype.renderDiv = function renderDiv(items) {
    return _react2['default'].createElement(
      'div',
      _extends({}, this.props, {
        className: _classnames2['default'](this.props.className, 'list-group') }),
      items
    );
  };

  return ListGroup;
})(_react2['default'].Component);

ListGroup.defaultProps = {
  componentClass: 'div'
};

ListGroup.propTypes = {
  className: _react2['default'].PropTypes.string,
  /**
   * The element for ListGroup if children are
   * user-defined custom components.
   * @type {("ul"|"div")}
   */
  componentClass: _react2['default'].PropTypes.oneOf(['ul', 'div']),
  id: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.number])
};

exports['default'] = ListGroup;
module.exports = exports['default'];
},{"./ListGroupItem":35,"./utils/ValidComponentChildren":86,"babel-runtime/helpers/class-call-check":97,"babel-runtime/helpers/extends":98,"babel-runtime/helpers/inherits":99,"babel-runtime/helpers/interop-require-default":100,"classnames":126,"react":712}],35:[function(require,module,exports){
'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utilsBootstrapUtils = require('./utils/bootstrapUtils');

var _utilsBootstrapUtils2 = _interopRequireDefault(_utilsBootstrapUtils);

var _styleMaps = require('./styleMaps');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var ListGroupItem = (function (_React$Component) {
  _inherits(ListGroupItem, _React$Component);

  function ListGroupItem() {
    _classCallCheck(this, ListGroupItem);

    _React$Component.apply(this, arguments);
  }

  ListGroupItem.prototype.render = function render() {
    var classes = _utilsBootstrapUtils2['default'].getClassSet(this.props);

    classes.active = this.props.active;
    classes.disabled = this.props.disabled;

    if (this.props.href) {
      return this.renderAnchor(classes);
    } else if (this.props.onClick) {
      return this.renderButton(classes);
    } else if (this.props.listItem) {
      return this.renderLi(classes);
    }

    return this.renderSpan(classes);
  };

  ListGroupItem.prototype.renderLi = function renderLi(classes) {
    return _react2['default'].createElement(
      'li',
      _extends({}, this.props, { className: _classnames2['default'](this.props.className, classes) }),
      this.props.header ? this.renderStructuredContent() : this.props.children
    );
  };

  ListGroupItem.prototype.renderAnchor = function renderAnchor(classes) {
    return _react2['default'].createElement(
      'a',
      _extends({}, this.props, {
        className: _classnames2['default'](this.props.className, classes)
      }),
      this.props.header ? this.renderStructuredContent() : this.props.children
    );
  };

  ListGroupItem.prototype.renderButton = function renderButton(classes) {
    return _react2['default'].createElement(
      'button',
      _extends({
        type: 'button'
      }, this.props, {
        className: _classnames2['default'](this.props.className, classes) }),
      this.props.header ? this.renderStructuredContent() : this.props.children
    );
  };

  ListGroupItem.prototype.renderSpan = function renderSpan(classes) {
    return _react2['default'].createElement(
      'span',
      _extends({}, this.props, { className: _classnames2['default'](this.props.className, classes) }),
      this.props.header ? this.renderStructuredContent() : this.props.children
    );
  };

  ListGroupItem.prototype.renderStructuredContent = function renderStructuredContent() {
    var header = undefined;
    var headingClass = _utilsBootstrapUtils2['default'].prefix(this.props, 'heading');

    if (_react2['default'].isValidElement(this.props.header)) {
      header = _react.cloneElement(this.props.header, {
        key: 'header',
        className: _classnames2['default'](this.props.header.props.className, headingClass)
      });
    } else {
      header = _react2['default'].createElement(
        'h4',
        { key: 'header', className: headingClass },
        this.props.header
      );
    }

    var content = _react2['default'].createElement(
      'p',
      { key: 'content', className: _utilsBootstrapUtils2['default'].prefix(this.props, 'text') },
      this.props.children
    );

    return [header, content];
  };

  return ListGroupItem;
})(_react2['default'].Component);

ListGroupItem.propTypes = {
  className: _react2['default'].PropTypes.string,
  active: _react2['default'].PropTypes.any,
  disabled: _react2['default'].PropTypes.any,
  header: _react2['default'].PropTypes.node,
  listItem: _react2['default'].PropTypes.bool,
  onClick: _react2['default'].PropTypes.func,
  eventKey: _react2['default'].PropTypes.any,
  href: _react2['default'].PropTypes.string,
  target: _react2['default'].PropTypes.string
};

ListGroupItem.defaultTypes = {
  listItem: false
};

exports['default'] = _utilsBootstrapUtils.bsStyles(_styleMaps.State.values(), _utilsBootstrapUtils.bsClass('list-group-item', ListGroupItem));
module.exports = exports['default'];
},{"./styleMaps":83,"./utils/bootstrapUtils":87,"babel-runtime/helpers/class-call-check":97,"babel-runtime/helpers/extends":98,"babel-runtime/helpers/inherits":99,"babel-runtime/helpers/interop-require-default":100,"classnames":126,"react":712}],36:[function(require,module,exports){
'use strict';

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactPropTypesLibElementType = require('react-prop-types/lib/elementType');

var _reactPropTypesLibElementType2 = _interopRequireDefault(_reactPropTypesLibElementType);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _MediaHeading = require('./MediaHeading');

var _MediaHeading2 = _interopRequireDefault(_MediaHeading);

var _MediaBody = require('./MediaBody');

var _MediaBody2 = _interopRequireDefault(_MediaBody);

var _MediaLeft = require('./MediaLeft');

var _MediaLeft2 = _interopRequireDefault(_MediaLeft);

var _MediaRight = require('./MediaRight');

var _MediaRight2 = _interopRequireDefault(_MediaRight);

var _MediaList = require('./MediaList');

var _MediaList2 = _interopRequireDefault(_MediaList);

var _MediaListItem = require('./MediaListItem');

var _MediaListItem2 = _interopRequireDefault(_MediaListItem);

var Media = _react2['default'].createClass({
  displayName: 'Media',
  propTypes: {
    /**
     * You can use a custom element for the media container
     */
    componentClass: _reactPropTypesLibElementType2['default']
  },

  getDefaultProps: function getDefaultProps() {
    return {
      componentClass: 'div'
    };
  },

  render: function render() {
    var _props = this.props;
    var ComponentClass = _props.componentClass;
    var className = _props.className;

    var props = _objectWithoutProperties(_props, ['componentClass', 'className']);

    return _react2['default'].createElement(ComponentClass, _extends({}, props, { className: _classnames2['default'](className, 'media') }));
  }
});

Media = _Object$assign(Media, { Heading: _MediaHeading2['default'], Body: _MediaBody2['default'], Left: _MediaLeft2['default'], Right: _MediaRight2['default'], List: _MediaList2['default'], ListItem: _MediaListItem2['default'] });

exports['default'] = Media;
module.exports = exports['default'];
},{"./MediaBody":37,"./MediaHeading":38,"./MediaLeft":39,"./MediaList":40,"./MediaListItem":41,"./MediaRight":42,"babel-runtime/core-js/object/assign":93,"babel-runtime/helpers/extends":98,"babel-runtime/helpers/interop-require-default":100,"babel-runtime/helpers/object-without-properties":102,"classnames":126,"react":712,"react-prop-types/lib/elementType":248}],37:[function(require,module,exports){
'use strict';

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactPropTypesLibElementType = require('react-prop-types/lib/elementType');

var _reactPropTypesLibElementType2 = _interopRequireDefault(_reactPropTypesLibElementType);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var MediaBody = _react2['default'].createClass({
  displayName: 'Media.Body',
  propTypes: {
    /**
     * You can use a custom element for the media body
     */
    componentClass: _reactPropTypesLibElementType2['default']
  },

  getDefaultProps: function getDefaultProps() {
    return {
      componentClass: 'div'
    };
  },

  render: function render() {
    var _props = this.props;
    var ComponentClass = _props.componentClass;
    var className = _props.className;

    var props = _objectWithoutProperties(_props, ['componentClass', 'className']);

    return _react2['default'].createElement(ComponentClass, _extends({}, props, { className: _classnames2['default'](className, 'media-body') }));
  }
});

exports['default'] = MediaBody;
module.exports = exports['default'];
},{"babel-runtime/helpers/extends":98,"babel-runtime/helpers/interop-require-default":100,"babel-runtime/helpers/object-without-properties":102,"classnames":126,"react":712,"react-prop-types/lib/elementType":248}],38:[function(require,module,exports){
'use strict';

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactPropTypesLibElementType = require('react-prop-types/lib/elementType');

var _reactPropTypesLibElementType2 = _interopRequireDefault(_reactPropTypesLibElementType);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var MediaHeading = _react2['default'].createClass({
  displayName: 'Media.Heading',
  propTypes: {
    /**
     * You can use a custom element for the media heading
     */
    componentClass: _reactPropTypesLibElementType2['default']
  },

  getDefaultProps: function getDefaultProps() {
    return {
      componentClass: 'h4'
    };
  },

  render: function render() {
    var _props = this.props;
    var ComponentClass = _props.componentClass;
    var className = _props.className;

    var props = _objectWithoutProperties(_props, ['componentClass', 'className']);

    return _react2['default'].createElement(ComponentClass, _extends({}, props, { className: _classnames2['default'](className, 'media-heading') }));
  }
});

exports['default'] = MediaHeading;
module.exports = exports['default'];
},{"babel-runtime/helpers/extends":98,"babel-runtime/helpers/interop-require-default":100,"babel-runtime/helpers/object-without-properties":102,"classnames":126,"react":712,"react-prop-types/lib/elementType":248}],39:[function(require,module,exports){
'use strict';

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var MediaLeft = _react2['default'].createClass({
  displayName: 'Media.Left',
  propTypes: {
    /**
     * Align the media to the top, middle or bottom
     * of the media object
     */
    align: _react2['default'].PropTypes.oneOf(['top', 'middle', 'bottom'])
  },

  render: function render() {
    var _classNames;

    var _props = this.props;
    var align = _props.align;
    var className = _props.className;

    var props = _objectWithoutProperties(_props, ['align', 'className']);

    var classes = _classnames2['default'](className, 'media-left', (_classNames = {}, _classNames['media-' + align] = Boolean(align), _classNames));

    // Only add the media-alignment class if align is passed in props
    return _react2['default'].createElement('div', _extends({}, props, { className: classes }));
  }
});

exports['default'] = MediaLeft;
module.exports = exports['default'];
},{"babel-runtime/helpers/extends":98,"babel-runtime/helpers/interop-require-default":100,"babel-runtime/helpers/object-without-properties":102,"classnames":126,"react":712}],40:[function(require,module,exports){
'use strict';

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var MediaList = _react2['default'].createClass({
  displayName: 'Media.List',
  render: function render() {
    var _props = this.props;
    var className = _props.className;

    var props = _objectWithoutProperties(_props, ['className']);

    return _react2['default'].createElement('ul', _extends({}, props, { className: _classnames2['default'](className, 'media-list') }));
  }
});

exports['default'] = MediaList;
module.exports = exports['default'];
},{"babel-runtime/helpers/extends":98,"babel-runtime/helpers/interop-require-default":100,"babel-runtime/helpers/object-without-properties":102,"classnames":126,"react":712}],41:[function(require,module,exports){
'use strict';

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var MediaListItem = _react2['default'].createClass({
  displayName: 'Media.ListItem',
  render: function render() {
    var _props = this.props;
    var className = _props.className;

    var props = _objectWithoutProperties(_props, ['className']);

    return _react2['default'].createElement('li', _extends({}, props, { className: _classnames2['default'](className, 'media') }));
  }
});

exports['default'] = MediaListItem;
module.exports = exports['default'];
},{"babel-runtime/helpers/extends":98,"babel-runtime/helpers/interop-require-default":100,"babel-runtime/helpers/object-without-properties":102,"classnames":126,"react":712}],42:[function(require,module,exports){
'use strict';

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var MediaRight = _react2['default'].createClass({
  displayName: 'Media.Right',
  propTypes: {
    /**
     * Align the media to the top, middle or bottom
     * of the media object
     */
    align: _react2['default'].PropTypes.oneOf(['top', 'middle', 'bottom'])
  },

  render: function render() {
    var _classNames;

    var _props = this.props;
    var align = _props.align;
    var className = _props.className;

    var props = _objectWithoutProperties(_props, ['align', 'className']);

    var classes = _classnames2['default'](className, 'media-right', (_classNames = {}, _classNames['media-' + align] = Boolean(align), _classNames));

    // Only add the media-alignment class if align is passed in props
    return _react2['default'].createElement('div', _extends({}, props, { className: classes }));
  }
});

exports['default'] = MediaRight;
module.exports = exports['default'];
},{"babel-runtime/helpers/extends":98,"babel-runtime/helpers/interop-require-default":100,"babel-runtime/helpers/object-without-properties":102,"classnames":126,"react":712}],43:[function(require,module,exports){
'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utilsBootstrapUtils = require('./utils/bootstrapUtils');

var _utilsBootstrapUtils2 = _interopRequireDefault(_utilsBootstrapUtils);

var _reactPropTypesLibAll = require('react-prop-types/lib/all');

var _reactPropTypesLibAll2 = _interopRequireDefault(_reactPropTypesLibAll);

var _SafeAnchor = require('./SafeAnchor');

var _SafeAnchor2 = _interopRequireDefault(_SafeAnchor);

var _utilsCreateChainedFunction = require('./utils/createChainedFunction');

var _utilsCreateChainedFunction2 = _interopRequireDefault(_utilsCreateChainedFunction);

var MenuItem = (function (_React$Component) {
  _inherits(MenuItem, _React$Component);

  function MenuItem(props) {
    _classCallCheck(this, MenuItem);

    _React$Component.call(this, props);

    this.handleClick = this.handleClick.bind(this);
  }

  MenuItem.prototype.handleClick = function handleClick(event) {
    if (!this.props.href || this.props.disabled) {
      event.preventDefault();
    }

    if (this.props.disabled) {
      return;
    }

    if (this.props.onSelect) {
      this.props.onSelect(event, this.props.eventKey);
    }
  };

  MenuItem.prototype.render = function render() {
    if (this.props.divider) {
      return _react2['default'].createElement('li', {
        role: 'separator',
        className: _classnames2['default']('divider', this.props.className),
        style: this.props.style
      });
    }

    if (this.props.header) {
      var headerClass = _utilsBootstrapUtils2['default'].prefix(this.props, 'header');

      return _react2['default'].createElement(
        'li',
        {
          role: 'heading',
          className: _classnames2['default'](headerClass, this.props.className),
          style: this.props.style
        },
        this.props.children
      );
    }

    var _props = this.props;
    var className = _props.className;
    var style = _props.style;
    var onClick = _props.onClick;

    var props = _objectWithoutProperties(_props, ['className', 'style', 'onClick']);

    var classes = {
      disabled: this.props.disabled,
      active: this.props.active
    };

    return _react2['default'].createElement(
      'li',
      { role: 'presentation',
        className: _classnames2['default'](className, classes),
        style: style
      },
      _react2['default'].createElement(_SafeAnchor2['default'], _extends({}, props, {
        role: 'menuitem',
        tabIndex: '-1',
        onClick: _utilsCreateChainedFunction2['default'](onClick, this.handleClick)
      }))
    );
  };

  return MenuItem;
})(_react2['default'].Component);

MenuItem.propTypes = {

  /**
   * Highlight the menu item as active.
   */
  active: _react2['default'].PropTypes.bool,

  /**
   * Disable the menu item, making it unselectable.
   */
  disabled: _react2['default'].PropTypes.bool,

  /**
   * Styles the menu item as a horizontal rule, providing visual separation between
   * groups of menu items.
   */
  divider: _reactPropTypesLibAll2['default'](_react2['default'].PropTypes.bool, function (props) {
    if (props.divider && props.children) {
      return new Error('Children will not be rendered for dividers');
    }
  }),

  /**
   * Value passed to the `onSelect` handler, useful for identifying the selected menu item.
   */
  eventKey: _react2['default'].PropTypes.any,

  /**
   * Styles the menu item as a header label, useful for describing a group of menu items.
   */
  header: _react2['default'].PropTypes.bool,

  /**
   * HTML `href` attribute corresponding to `a.href`.
   */
  href: _react2['default'].PropTypes.string,

  /**
   * HTML `target` attribute corresponding to `a.target`.
   */
  target: _react2['default'].PropTypes.string,

  /**
   * HTML `title` attribute corresponding to `a.title`.
   */
  title: _react2['default'].PropTypes.string,

  /**
   * Callback fired when the menu item is clicked.
   */
  onClick: _react2['default'].PropTypes.func,

  onKeyDown: _react2['default'].PropTypes.func,

  /**
   * Callback fired when the menu item is selected.
   *
   * ```js
   * function(Object event, Any eventKey)
   * ```
   */
  onSelect: _react2['default'].PropTypes.func,

  /**
   * HTML `id` attribute.
   */
  id: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.number])
};

MenuItem.defaultProps = {
  divider: false,
  disabled: false,
  header: false
};

exports['default'] = _utilsBootstrapUtils.bsClass('dropdown', MenuItem);
module.exports = exports['default'];
},{"./SafeAnchor":72,"./utils/bootstrapUtils":87,"./utils/createChainedFunction":90,"babel-runtime/helpers/class-call-check":97,"babel-runtime/helpers/extends":98,"babel-runtime/helpers/inherits":99,"babel-runtime/helpers/interop-require-default":100,"babel-runtime/helpers/object-without-properties":102,"classnames":126,"react":712,"react-prop-types/lib/all":245}],44:[function(require,module,exports){

/* eslint-disable react/prop-types */
'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _utilsBootstrapUtils = require('./utils/bootstrapUtils');

var _utilsBootstrapUtils2 = _interopRequireDefault(_utilsBootstrapUtils);

var _styleMaps = require('./styleMaps');

var _domHelpersUtilScrollbarSize = require('dom-helpers/util/scrollbarSize');

var _domHelpersUtilScrollbarSize2 = _interopRequireDefault(_domHelpersUtilScrollbarSize);

var _domHelpersUtilInDOM = require('dom-helpers/util/inDOM');

var _domHelpersUtilInDOM2 = _interopRequireDefault(_domHelpersUtilInDOM);

var _domHelpersOwnerDocument = require('dom-helpers/ownerDocument');

var _domHelpersOwnerDocument2 = _interopRequireDefault(_domHelpersOwnerDocument);

var _domHelpersEvents = require('dom-helpers/events');

var _domHelpersEvents2 = _interopRequireDefault(_domHelpersEvents);

var _reactPropTypesLibElementType = require('react-prop-types/lib/elementType');

var _reactPropTypesLibElementType2 = _interopRequireDefault(_reactPropTypesLibElementType);

var _Fade = require('./Fade');

var _Fade2 = _interopRequireDefault(_Fade);

var _ModalDialog = require('./ModalDialog');

var _ModalDialog2 = _interopRequireDefault(_ModalDialog);

var _ModalBody = require('./ModalBody');

var _ModalBody2 = _interopRequireDefault(_ModalBody);

var _ModalHeader = require('./ModalHeader');

var _ModalHeader2 = _interopRequireDefault(_ModalHeader);

var _ModalTitle = require('./ModalTitle');

var _ModalTitle2 = _interopRequireDefault(_ModalTitle);

var _ModalFooter = require('./ModalFooter');

var _ModalFooter2 = _interopRequireDefault(_ModalFooter);

var _reactOverlaysLibModal = require('react-overlays/lib/Modal');

var _reactOverlaysLibModal2 = _interopRequireDefault(_reactOverlaysLibModal);

var _reactOverlaysLibUtilsIsOverflowing = require('react-overlays/lib/utils/isOverflowing');

var _reactOverlaysLibUtilsIsOverflowing2 = _interopRequireDefault(_reactOverlaysLibUtilsIsOverflowing);

var _lodashCompatObjectPick = require('lodash-compat/object/pick');

var _lodashCompatObjectPick2 = _interopRequireDefault(_lodashCompatObjectPick);

var Modal = _react2['default'].createClass({
  displayName: 'Modal',

  propTypes: _extends({}, _reactOverlaysLibModal2['default'].propTypes, _ModalDialog2['default'].propTypes, {

    /**
     * Include a backdrop component. Specify 'static' for a backdrop that doesn't trigger an "onHide" when clicked.
     */
    backdrop: _react2['default'].PropTypes.oneOf(['static', true, false]),

    /**
     * Close the modal when escape key is pressed
     */
    keyboard: _react2['default'].PropTypes.bool,

    /**
     * Open and close the Modal with a slide and fade animation.
     */
    animation: _react2['default'].PropTypes.bool,

    /**
     * A Component type that provides the modal content Markup. This is a useful prop when you want to use your own
     * styles and markup to create a custom modal component.
     */
    dialogComponent: _reactPropTypesLibElementType2['default'],

    /**
     * When `true` The modal will automatically shift focus to itself when it opens, and replace it to the last focused element when it closes.
     * Generally this should never be set to false as it makes the Modal less accessible to assistive technologies, like screen-readers.
     */
    autoFocus: _react2['default'].PropTypes.bool,

    /**
     * When `true` The modal will prevent focus from leaving the Modal while open.
     * Consider leaving the default value here, as it is necessary to make the Modal work well with assistive technologies,
     * such as screen readers.
     */
    enforceFocus: _react2['default'].PropTypes.bool,

    /**
     * Hide this from automatic props documentation generation.
     * @private
     */
    bsStyle: _react2['default'].PropTypes.string,

    /**
     * When `true` The modal will show itself.
     */
    show: _react2['default'].PropTypes.bool,

    /**
     * A callback fired when the header closeButton or non-static backdrop is
     * clicked. Required if either are specified.
     */
    onHide: _react2['default'].PropTypes.func,

    /**
     * Callback fired before the Modal transitions in
     */
    onEnter: _react2['default'].PropTypes.func,

    /**
     * Callback fired as the Modal begins to transition in
     */
    onEntering: _react2['default'].PropTypes.func,

    /**
     * Callback fired after the Modal finishes transitioning in
     */
    onEntered: _react2['default'].PropTypes.func,

    /**
     * Callback fired right before the Modal transitions out
     */
    onExit: _react2['default'].PropTypes.func,

    /**
     * Callback fired as the Modal begins to transition out
     */
    onExiting: _react2['default'].PropTypes.func,

    /**
     * Callback fired after the Modal finishes transitioning out
     */
    onExited: _react2['default'].PropTypes.func
  }),

  childContextTypes: {
    '$bs_onModalHide': _react2['default'].PropTypes.func
  },

  getDefaultProps: function getDefaultProps() {
    return _extends({}, _reactOverlaysLibModal2['default'].defaultProps, {
      bsClass: 'modal',
      animation: true,
      dialogComponent: _ModalDialog2['default']
    });
  },

  getInitialState: function getInitialState() {
    return {
      modalStyles: {}
    };
  },

  getChildContext: function getChildContext() {
    return {
      $bs_onModalHide: this.props.onHide
    };
  },

  componentWillUnmount: function componentWillUnmount() {
    _domHelpersEvents2['default'].off(window, 'resize', this.handleWindowResize);
  },

  render: function render() {
    var _this = this;

    var _props = this.props;
    var className = _props.className;
    var children = _props.children;
    var dialogClassName = _props.dialogClassName;
    var animation = _props.animation;

    var props = _objectWithoutProperties(_props, ['className', 'children', 'dialogClassName', 'animation']);

    var modalStyles = this.state.modalStyles;

    var inClass = { 'in': props.show && !animation };
    var Dialog = props.dialogComponent;

    var parentProps = _lodashCompatObjectPick2['default'](props, _Object$keys(_reactOverlaysLibModal2['default'].propTypes).concat(['onExit', 'onExiting', 'onEnter', 'onEntered']) // the rest are fired in _onHide() and _onShow()
    );

    var modal = _react2['default'].createElement(
      Dialog,
      _extends({
        key: 'modal',
        ref: function (ref) {
          return _this._modal = ref;
        }
      }, props, {
        style: modalStyles,
        className: _classnames2['default'](className, inClass),
        dialogClassName: dialogClassName,
        onClick: props.backdrop === true ? this.handleDialogClick : null
      }),
      this.props.children
    );

    return _react2['default'].createElement(
      _reactOverlaysLibModal2['default'],
      _extends({}, parentProps, {
        show: props.show,
        ref: function (ref) {
          _this._wrapper = ref && ref.refs.modal;
          _this._backdrop = ref && ref.refs.backdrop;
        },
        onEntering: this._onShow,
        onExited: this._onHide,
        backdropClassName: _classnames2['default'](_utilsBootstrapUtils2['default'].prefix(props, 'backdrop'), inClass),
        containerClassName: _utilsBootstrapUtils2['default'].prefix(props, 'open'),
        transition: animation ? _Fade2['default'] : undefined,
        dialogTransitionTimeout: Modal.TRANSITION_DURATION,
        backdropTransitionTimeout: Modal.BACKDROP_TRANSITION_DURATION
      }),
      modal
    );
  },

  _onShow: function _onShow() {
    _domHelpersEvents2['default'].on(window, 'resize', this.handleWindowResize);

    this.setState(this._getStyles());

    if (this.props.onEntering) {
      var _props2;

      (_props2 = this.props).onEntering.apply(_props2, arguments);
    }
  },

  _onHide: function _onHide() {
    _domHelpersEvents2['default'].off(window, 'resize', this.handleWindowResize);

    if (this.props.onExited) {
      var _props3;

      (_props3 = this.props).onExited.apply(_props3, arguments);
    }
  },

  handleDialogClick: function handleDialogClick(e) {
    if (e.target !== e.currentTarget) {
      return;
    }

    this.props.onHide();
  },

  handleWindowResize: function handleWindowResize() {
    this.setState(this._getStyles());
  },

  _getStyles: function _getStyles() {
    if (!_domHelpersUtilInDOM2['default']) {
      return {};
    }

    var node = _reactDom2['default'].findDOMNode(this._modal);
    var doc = _domHelpersOwnerDocument2['default'](node);

    var scrollHt = node.scrollHeight;
    var bodyIsOverflowing = _reactOverlaysLibUtilsIsOverflowing2['default'](_reactDom2['default'].findDOMNode(this.props.container || doc.body));
    var modalIsOverflowing = scrollHt > doc.documentElement.clientHeight;

    return {
      modalStyles: {
        paddingRight: bodyIsOverflowing && !modalIsOverflowing ? _domHelpersUtilScrollbarSize2['default']() : void 0,
        paddingLeft: !bodyIsOverflowing && modalIsOverflowing ? _domHelpersUtilScrollbarSize2['default']() : void 0
      }
    };
  }
});

Modal.Body = _ModalBody2['default'];
Modal.Header = _ModalHeader2['default'];
Modal.Title = _ModalTitle2['default'];
Modal.Footer = _ModalFooter2['default'];

Modal.Dialog = _ModalDialog2['default'];

Modal.TRANSITION_DURATION = 300;
Modal.BACKDROP_TRANSITION_DURATION = 150;

exports['default'] = _utilsBootstrapUtils.bsSizes([_styleMaps.Sizes.LARGE, _styleMaps.Sizes.SMALL], _utilsBootstrapUtils.bsClass('modal', Modal));
module.exports = exports['default'];
},{"./Fade":22,"./ModalBody":45,"./ModalDialog":46,"./ModalFooter":47,"./ModalHeader":48,"./ModalTitle":49,"./styleMaps":83,"./utils/bootstrapUtils":87,"babel-runtime/core-js/object/keys":95,"babel-runtime/helpers/extends":98,"babel-runtime/helpers/interop-require-default":100,"babel-runtime/helpers/object-without-properties":102,"classnames":126,"dom-helpers/events":133,"dom-helpers/ownerDocument":136,"dom-helpers/util/inDOM":154,"dom-helpers/util/scrollbarSize":155,"lodash-compat/object/pick":223,"react":712,"react-dom":556,"react-overlays/lib/Modal":227,"react-overlays/lib/utils/isOverflowing":238,"react-prop-types/lib/elementType":248}],45:[function(require,module,exports){
'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utilsBootstrapUtils = require('./utils/bootstrapUtils');

var _utilsBootstrapUtils2 = _interopRequireDefault(_utilsBootstrapUtils);

var ModalBody = (function (_React$Component) {
  _inherits(ModalBody, _React$Component);

  function ModalBody() {
    _classCallCheck(this, ModalBody);

    _React$Component.apply(this, arguments);
  }

  ModalBody.prototype.render = function render() {
    return _react2['default'].createElement(
      'div',
      _extends({}, this.props, {
        className: _classnames2['default'](this.props.className, _utilsBootstrapUtils2['default'].prefix(this.props, 'body')) }),
      this.props.children
    );
  };

  return ModalBody;
})(_react2['default'].Component);

exports['default'] = _utilsBootstrapUtils.bsClass('modal', ModalBody);
module.exports = exports['default'];
},{"./utils/bootstrapUtils":87,"babel-runtime/helpers/class-call-check":97,"babel-runtime/helpers/extends":98,"babel-runtime/helpers/inherits":99,"babel-runtime/helpers/interop-require-default":100,"classnames":126,"react":712}],46:[function(require,module,exports){
/* eslint-disable react/prop-types */
'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utilsBootstrapUtils = require('./utils/bootstrapUtils');

var _utilsBootstrapUtils2 = _interopRequireDefault(_utilsBootstrapUtils);

var _styleMaps = require('./styleMaps');

var ModalDialog = _react2['default'].createClass({
  displayName: 'ModalDialog',

  propTypes: {
    /**
     * A css class to apply to the Modal dialog DOM node.
     */
    dialogClassName: _react2['default'].PropTypes.string
  },

  render: function render() {
    var modalStyle = _extends({
      display: 'block'
    }, this.props.style);
    var prefix = _utilsBootstrapUtils2['default'].prefix(this.props);
    var dialogClasses = _utilsBootstrapUtils2['default'].getClassSet(this.props);

    delete dialogClasses[prefix];
    dialogClasses[_utilsBootstrapUtils2['default'].prefix(this.props, 'dialog')] = true;

    return _react2['default'].createElement(
      'div',
      _extends({}, this.props, {
        title: null,
        tabIndex: '-1',
        role: 'dialog',
        style: modalStyle,
        className: _classnames2['default'](this.props.className, prefix)
      }),
      _react2['default'].createElement(
        'div',
        { className: _classnames2['default'](this.props.dialogClassName, dialogClasses) },
        _react2['default'].createElement(
          'div',
          { className: _utilsBootstrapUtils2['default'].prefix(this.props, 'content'), role: 'document' },
          this.props.children
        )
      )
    );
  }
});

exports['default'] = _utilsBootstrapUtils.bsSizes([_styleMaps.Sizes.LARGE, _styleMaps.Sizes.SMALL], _utilsBootstrapUtils.bsClass('modal', ModalDialog));
module.exports = exports['default'];
},{"./styleMaps":83,"./utils/bootstrapUtils":87,"babel-runtime/helpers/extends":98,"babel-runtime/helpers/interop-require-default":100,"classnames":126,"react":712}],47:[function(require,module,exports){
'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utilsBootstrapUtils = require('./utils/bootstrapUtils');

var _utilsBootstrapUtils2 = _interopRequireDefault(_utilsBootstrapUtils);

var ModalFooter = (function (_React$Component) {
  _inherits(ModalFooter, _React$Component);

  function ModalFooter() {
    _classCallCheck(this, ModalFooter);

    _React$Component.apply(this, arguments);
  }

  ModalFooter.prototype.render = function render() {
    return _react2['default'].createElement(
      'div',
      _extends({}, this.props, {
        className: _classnames2['default'](this.props.className, _utilsBootstrapUtils2['default'].prefix(this.props, 'footer')) }),
      this.props.children
    );
  };

  return ModalFooter;
})(_react2['default'].Component);

ModalFooter.propTypes = {
  /**
   * A css class applied to the Component
   */
  bsClass: _react2['default'].PropTypes.string
};

ModalFooter.defaultProps = {
  bsClass: 'modal'
};

exports['default'] = _utilsBootstrapUtils.bsClass('modal', ModalFooter);
module.exports = exports['default'];
},{"./utils/bootstrapUtils":87,"babel-runtime/helpers/class-call-check":97,"babel-runtime/helpers/extends":98,"babel-runtime/helpers/inherits":99,"babel-runtime/helpers/interop-require-default":100,"classnames":126,"react":712}],48:[function(require,module,exports){
'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utilsBootstrapUtils = require('./utils/bootstrapUtils');

var _utilsBootstrapUtils2 = _interopRequireDefault(_utilsBootstrapUtils);

var _utilsCreateChainedFunction = require('./utils/createChainedFunction');

var _utilsCreateChainedFunction2 = _interopRequireDefault(_utilsCreateChainedFunction);

var ModalHeader = (function (_React$Component) {
  _inherits(ModalHeader, _React$Component);

  function ModalHeader() {
    _classCallCheck(this, ModalHeader);

    _React$Component.apply(this, arguments);
  }

  ModalHeader.prototype.render = function render() {
    var _props = this.props;
    var label = _props['aria-label'];

    var props = _objectWithoutProperties(_props, ['aria-label']);

    var onHide = _utilsCreateChainedFunction2['default'](this.context.$bs_onModalHide, this.props.onHide);

    return _react2['default'].createElement(
      'div',
      _extends({}, props, {
        className: _classnames2['default'](this.props.className, _utilsBootstrapUtils2['default'].prefix(this.props, 'header'))
      }),
      this.props.closeButton && _react2['default'].createElement(
        'button',
        {
          type: 'button',
          className: 'close',
          'aria-label': label,
          onClick: onHide },
        _react2['default'].createElement(
          'span',
          { 'aria-hidden': 'true' },
          '×'
        )
      ),
      this.props.children
    );
  };

  return ModalHeader;
})(_react2['default'].Component);

ModalHeader.propTypes = {
  /**
   * The 'aria-label' attribute provides an accessible label for the close button.
   * It is used for Assistive Technology when the label text is not readable.
   */
  'aria-label': _react2['default'].PropTypes.string,

  bsClass: _react2['default'].PropTypes.string,

  /**
   * Specify whether the Component should contain a close button
   */
  closeButton: _react2['default'].PropTypes.bool,

  /**
   * A Callback fired when the close button is clicked. If used directly inside a Modal component, the onHide will automatically
   * be propagated up to the parent Modal `onHide`.
   */
  onHide: _react2['default'].PropTypes.func
};

ModalHeader.contextTypes = {
  '$bs_onModalHide': _react2['default'].PropTypes.func
};

ModalHeader.defaultProps = {
  'aria-label': 'Close',
  closeButton: false
};

exports['default'] = _utilsBootstrapUtils.bsClass('modal', ModalHeader);
module.exports = exports['default'];
},{"./utils/bootstrapUtils":87,"./utils/createChainedFunction":90,"babel-runtime/helpers/class-call-check":97,"babel-runtime/helpers/extends":98,"babel-runtime/helpers/inherits":99,"babel-runtime/helpers/interop-require-default":100,"babel-runtime/helpers/object-without-properties":102,"classnames":126,"react":712}],49:[function(require,module,exports){
'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utilsBootstrapUtils = require('./utils/bootstrapUtils');

var _utilsBootstrapUtils2 = _interopRequireDefault(_utilsBootstrapUtils);

var ModalTitle = (function (_React$Component) {
  _inherits(ModalTitle, _React$Component);

  function ModalTitle() {
    _classCallCheck(this, ModalTitle);

    _React$Component.apply(this, arguments);
  }

  ModalTitle.prototype.render = function render() {
    return _react2['default'].createElement(
      'h4',
      _extends({}, this.props, {
        className: _classnames2['default'](this.props.className, _utilsBootstrapUtils2['default'].prefix(this.props, 'title')) }),
      this.props.children
    );
  };

  return ModalTitle;
})(_react2['default'].Component);

exports['default'] = _utilsBootstrapUtils.bsClass('modal', ModalTitle);
module.exports = exports['default'];
},{"./utils/bootstrapUtils":87,"babel-runtime/helpers/class-call-check":97,"babel-runtime/helpers/extends":98,"babel-runtime/helpers/inherits":99,"babel-runtime/helpers/interop-require-default":100,"classnames":126,"react":712}],50:[function(require,module,exports){
'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactPropTypesLibAll = require('react-prop-types/lib/all');

var _reactPropTypesLibAll2 = _interopRequireDefault(_reactPropTypesLibAll);

var _reactPropTypesLibDeprecated = require('react-prop-types/lib/deprecated');

var _reactPropTypesLibDeprecated2 = _interopRequireDefault(_reactPropTypesLibDeprecated);

var _utilsBootstrapUtils = require('./utils/bootstrapUtils');

var _utilsBootstrapUtils2 = _interopRequireDefault(_utilsBootstrapUtils);

var _utilsValidComponentChildren = require('./utils/ValidComponentChildren');

var _utilsValidComponentChildren2 = _interopRequireDefault(_utilsValidComponentChildren);

var _utilsCreateChainedFunction = require('./utils/createChainedFunction');

var _utilsCreateChainedFunction2 = _interopRequireDefault(_utilsCreateChainedFunction);

var _Collapse = require('./Collapse');

var _Collapse2 = _interopRequireDefault(_Collapse);

var Nav = (function (_React$Component) {
  _inherits(Nav, _React$Component);

  function Nav() {
    _classCallCheck(this, Nav);

    _React$Component.apply(this, arguments);
  }

  Nav.prototype.render = function render() {
    var _props = this.props;
    var className = _props.className;
    var ulClassName = _props.ulClassName;
    var id = _props.id;
    var ulId = _props.ulId;

    var isNavbar = this.props.navbar != null ? this.props.navbar : this.context.$bs_navbar;
    var classes = _utilsBootstrapUtils2['default'].getClassSet(this.props);

    classes[_utilsBootstrapUtils2['default'].prefix(this.props, 'stacked')] = this.props.stacked;
    classes[_utilsBootstrapUtils2['default'].prefix(this.props, 'justified')] = this.props.justified;

    if (isNavbar) {
      var bsClass = this.context.$bs_navbar_bsClass || 'navbar';
      var navbarRight = this.props.right != null ? this.props.right : this.props.pullRight;

      classes[_utilsBootstrapUtils2['default'].prefix({ bsClass: bsClass }, 'nav')] = true;
      classes[_utilsBootstrapUtils2['default'].prefix({ bsClass: bsClass }, 'right')] = navbarRight;
      classes[_utilsBootstrapUtils2['default'].prefix({ bsClass: bsClass }, 'left')] = this.props.pullLeft;
    } else {
      classes['pull-right'] = this.props.pullRight;
      classes['pull-left'] = this.props.pullLeft;
    }

    var list = _react2['default'].createElement(
      'ul',
      _extends({ ref: 'ul'
      }, this.props, {
        id: ulId || id,
        role: this.props.bsStyle === 'tabs' ? 'tablist' : null,
        className: _classnames2['default'](className, ulClassName, classes)
      }),
      _utilsValidComponentChildren2['default'].map(this.props.children, this.renderNavItem, this)
    );

    // TODO remove in 0.29
    if (this.context.$bs_deprecated_navbar && this.props.collapsible) {
      list = _react2['default'].createElement(
        _Collapse2['default'],
        {
          'in': this.props.expanded,
          className: isNavbar ? 'navbar-collapse' : void 0
        },
        _react2['default'].createElement(
          'div',
          null,
          list
        )
      );
    }

    return list;
  };

  Nav.prototype.getChildActiveProp = function getChildActiveProp(child) {
    if (child.props.active) {
      return true;
    }
    if (this.props.activeKey != null) {
      if (child.props.eventKey === this.props.activeKey) {
        return true;
      }
    }
    if (this.props.activeHref != null) {
      if (child.props.href === this.props.activeHref) {
        return true;
      }
    }

    return child.props.active;
  };

  Nav.prototype.renderNavItem = function renderNavItem(child, index) {
    return _react.cloneElement(child, {
      role: this.props.bsStyle === 'tabs' ? 'tab' : null,
      active: this.getChildActiveProp(child),
      activeKey: this.props.activeKey,
      activeHref: this.props.activeHref,
      onSelect: _utilsCreateChainedFunction2['default'](child.props.onSelect, this.props.onSelect),
      key: child.key ? child.key : index,
      navItem: true
    });
  };

  return Nav;
})(_react2['default'].Component);

Nav.propTypes = {
  activeHref: _react2['default'].PropTypes.string,
  activeKey: _react2['default'].PropTypes.any,

  stacked: _react2['default'].PropTypes.bool,
  justified: _reactPropTypesLibAll2['default'](_react2['default'].PropTypes.bool, function (_ref) {
    var justified = _ref.justified;
    var navbar = _ref.navbar;
    return justified && navbar ? Error('justified navbar `Nav`s are not supported') : null;
  }),
  onSelect: _react2['default'].PropTypes.func,

  /**
   * CSS classes for the wrapper `nav` element
   */
  className: _react2['default'].PropTypes.string,
  /**
   * HTML id for the wrapper `nav` element
   */
  id: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.number]),
  /**
   * CSS classes for the inner `ul` element
   *
   * @deprecated
   */
  ulClassName: _reactPropTypesLibDeprecated2['default'](_react2['default'].PropTypes.string, 'The wrapping `<nav>` has been removed you can use `className` now'),
  /**
   * HTML id for the inner `ul` element
   *
   * @deprecated
   */

  ulId: _reactPropTypesLibDeprecated2['default'](_react2['default'].PropTypes.string, 'The wrapping `<nav>` has been removed you can use `id` now'),

  /**
   * Apply styling an alignment for use in a Navbar. This prop will be set
   * automatically when the Nav is used inside a Navbar.
   */
  navbar: _react2['default'].PropTypes.bool,
  eventKey: _react2['default'].PropTypes.any,
  pullRight: _react2['default'].PropTypes.bool,
  pullLeft: _react2['default'].PropTypes.bool,

  right: _reactPropTypesLibDeprecated2['default'](_react2['default'].PropTypes.bool, 'Use the `pullRight` prop instead'),

  /**
   * @private
   */
  expanded: _react2['default'].PropTypes.bool,

  /**
   * @private
   */
  collapsible: _reactPropTypesLibDeprecated2['default'](_react2['default'].PropTypes.bool, 'Use `Navbar.Collapse` instead, to create collapsible Navbars')
};

Nav.contextTypes = {
  $bs_navbar: _react2['default'].PropTypes.bool,
  $bs_navbar_bsClass: _react2['default'].PropTypes.string,

  $bs_deprecated_navbar: _react2['default'].PropTypes.bool
};

Nav.defaultProps = {
  justified: false,
  pullRight: false,
  pullLeft: false,
  stacked: false
};

exports['default'] = _utilsBootstrapUtils.bsClass('nav', _utilsBootstrapUtils.bsStyles(['tabs', 'pills'], Nav));
module.exports = exports['default'];
},{"./Collapse":16,"./utils/ValidComponentChildren":86,"./utils/bootstrapUtils":87,"./utils/createChainedFunction":90,"babel-runtime/helpers/class-call-check":97,"babel-runtime/helpers/extends":98,"babel-runtime/helpers/inherits":99,"babel-runtime/helpers/interop-require-default":100,"classnames":126,"react":712,"react-prop-types/lib/all":245,"react-prop-types/lib/deprecated":247}],51:[function(require,module,exports){
'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _NavbarBrand = require('./NavbarBrand');

var _NavbarBrand2 = _interopRequireDefault(_NavbarBrand);

var _utilsDeprecationWarning = require('./utils/deprecationWarning');

var _utilsDeprecationWarning2 = _interopRequireDefault(_utilsDeprecationWarning);

exports['default'] = _utilsDeprecationWarning2['default'].wrapper(_NavbarBrand2['default'], {
  message: 'The `NavBrand` component has been renamed to: `NavbarBrand`. ' + 'Please use that component instead; this alias will be removed in an upcoming release'
});
module.exports = exports['default'];
},{"./NavbarBrand":55,"./utils/deprecationWarning":92,"babel-runtime/helpers/interop-require-default":100}],52:[function(require,module,exports){
'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Dropdown = require('./Dropdown');

var _Dropdown2 = _interopRequireDefault(_Dropdown);

var NavDropdown = (function (_React$Component) {
  _inherits(NavDropdown, _React$Component);

  function NavDropdown() {
    _classCallCheck(this, NavDropdown);

    _React$Component.apply(this, arguments);
  }

  NavDropdown.prototype.render = function render() {
    var _props = this.props;
    var children = _props.children;
    var title = _props.title;
    var noCaret = _props.noCaret;

    var props = _objectWithoutProperties(_props, ['children', 'title', 'noCaret']);

    return _react2['default'].createElement(
      _Dropdown2['default'],
      _extends({}, props, { componentClass: 'li' }),
      _react2['default'].createElement(
        _Dropdown2['default'].Toggle,
        {
          useAnchor: true,
          disabled: props.disabled,
          noCaret: noCaret
        },
        title
      ),
      _react2['default'].createElement(
        _Dropdown2['default'].Menu,
        null,
        children
      )
    );
  };

  return NavDropdown;
})(_react2['default'].Component);

NavDropdown.propTypes = _extends({
  noCaret: _react2['default'].PropTypes.bool,
  title: _react2['default'].PropTypes.node.isRequired
}, _Dropdown2['default'].propTypes);

exports['default'] = NavDropdown;
module.exports = exports['default'];
},{"./Dropdown":18,"babel-runtime/helpers/class-call-check":97,"babel-runtime/helpers/extends":98,"babel-runtime/helpers/inherits":99,"babel-runtime/helpers/interop-require-default":100,"babel-runtime/helpers/object-without-properties":102,"react":712}],53:[function(require,module,exports){
'use strict';

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _SafeAnchor = require('./SafeAnchor');

var _SafeAnchor2 = _interopRequireDefault(_SafeAnchor);

var _utilsCreateChainedFunction = require('./utils/createChainedFunction');

var _utilsCreateChainedFunction2 = _interopRequireDefault(_utilsCreateChainedFunction);

var NavItem = _react2['default'].createClass({
  displayName: 'NavItem',

  propTypes: {
    linkId: _react2['default'].PropTypes.string,
    onSelect: _react2['default'].PropTypes.func,
    active: _react2['default'].PropTypes.bool,
    disabled: _react2['default'].PropTypes.bool,
    href: _react2['default'].PropTypes.string,
    onClick: _react2['default'].PropTypes.func,
    role: _react2['default'].PropTypes.string,
    title: _react2['default'].PropTypes.node,
    eventKey: _react2['default'].PropTypes.any,
    target: _react2['default'].PropTypes.string,
    'aria-controls': _react2['default'].PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      active: false,
      disabled: false
    };
  },

  render: function render() {
    var _props = this.props;
    var role = _props.role;
    var linkId = _props.linkId;
    var disabled = _props.disabled;
    var active = _props.active;
    var href = _props.href;
    var onClick = _props.onClick;
    var title = _props.title;
    var target = _props.target;
    var children = _props.children;
    var tabIndex = _props.tabIndex;
    var ariaControls = _props['aria-controls'];

    var props = _objectWithoutProperties(_props, ['role', 'linkId', 'disabled', 'active', 'href', 'onClick', 'title', 'target', 'children', 'tabIndex', 'aria-controls']);

    var classes = {
      active: active,
      disabled: disabled
    };
    var linkProps = {
      role: role,
      href: href,
      onClick: _utilsCreateChainedFunction2['default'](onClick, this.handleClick),
      title: title,
      target: target,
      tabIndex: tabIndex,
      id: linkId
    };

    if (!role && href === '#') {
      linkProps.role = 'button';
    } else if (role === 'tab') {
      linkProps['aria-selected'] = active;
    }

    return _react2['default'].createElement(
      'li',
      _extends({}, props, { role: 'presentation', className: _classnames2['default'](props.className, classes) }),
      _react2['default'].createElement(
        _SafeAnchor2['default'],
        _extends({}, linkProps, { 'aria-controls': ariaControls }),
        children
      )
    );
  },

  handleClick: function handleClick(e) {
    if (this.props.onSelect) {
      e.preventDefault();

      if (!this.props.disabled) {
        this.props.onSelect(this.props.eventKey, this.props.href, this.props.target);
      }
    }
  }
});

exports['default'] = NavItem;
module.exports = exports['default'];
//eslint-disable-line
},{"./SafeAnchor":72,"./utils/createChainedFunction":90,"babel-runtime/helpers/extends":98,"babel-runtime/helpers/interop-require-default":100,"babel-runtime/helpers/object-without-properties":102,"classnames":126,"react":712}],54:[function(require,module,exports){
/* eslint react/no-multi-comp: 0 */
'use strict';

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _uncontrollable = require('uncontrollable');

var _uncontrollable2 = _interopRequireDefault(_uncontrollable);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactPropTypesLibElementType = require('react-prop-types/lib/elementType');

var _reactPropTypesLibElementType2 = _interopRequireDefault(_reactPropTypesLibElementType);

var _reactPropTypesLibDeprecated = require('react-prop-types/lib/deprecated');

var _reactPropTypesLibDeprecated2 = _interopRequireDefault(_reactPropTypesLibDeprecated);

var _utilsDeprecationWarning = require('./utils/deprecationWarning');

var _utilsDeprecationWarning2 = _interopRequireDefault(_utilsDeprecationWarning);

var _utilsValidComponentChildren = require('./utils/ValidComponentChildren');

var _utilsValidComponentChildren2 = _interopRequireDefault(_utilsValidComponentChildren);

var _Grid = require('./Grid');

var _Grid2 = _interopRequireDefault(_Grid);

var _deprecatedNavbar = require('./deprecated/Navbar');

var _deprecatedNavbar2 = _interopRequireDefault(_deprecatedNavbar);

var _NavbarBrand = require('./NavbarBrand');

var _NavbarBrand2 = _interopRequireDefault(_NavbarBrand);

var _NavbarHeader = require('./NavbarHeader');

var _NavbarHeader2 = _interopRequireDefault(_NavbarHeader);

var _NavbarToggle = require('./NavbarToggle');

var _NavbarToggle2 = _interopRequireDefault(_NavbarToggle);

var _NavbarCollapse = require('./NavbarCollapse');

var _NavbarCollapse2 = _interopRequireDefault(_NavbarCollapse);

var _utilsBootstrapUtils = require('./utils/bootstrapUtils');

var _utilsBootstrapUtils2 = _interopRequireDefault(_utilsBootstrapUtils);

var _styleMaps = require('./styleMaps');

var has = function has(obj, key) {
  return obj && ({}).hasOwnProperty.call(obj, key);
};

function shouldRenderOldNavbar(component) {
  var props = component.props;
  return has(props, 'brand') || has(props, 'toggleButton') || has(props, 'toggleNavKey') || has(props, 'navExpanded') || has(props, 'defaultNavExpanded') ||
  // this should be safe b/c the new version requires wrapping in a Header
  _utilsValidComponentChildren2['default'].findValidComponents(props.children, function (child) {
    return child.props.bsRole === 'brand';
  }).length > 0;
}

var Navbar = _react2['default'].createClass({
  displayName: 'Navbar',

  propTypes: {
    /**
     * Create a fixed navbar along the top of the screen, that scrolls with the page
     */
    fixedTop: _react2['default'].PropTypes.bool,
    /**
     * Create a fixed navbar along the bottom of the screen, that scrolls with the page
     */
    fixedBottom: _react2['default'].PropTypes.bool,
    /**
     * Create a full-width navbar that scrolls away with the page
     */
    staticTop: _react2['default'].PropTypes.bool,
    /**
     * An alternative dark visual style for the Navbar
     */
    inverse: _react2['default'].PropTypes.bool,
    /**
     * Allow the Navbar to fluidly adjust to the page or container width, instead of at the
     * predefined screen breakpoints
     */
    fluid: _react2['default'].PropTypes.bool,

    /**
     * Set a custom element for this component.
     */
    componentClass: _reactPropTypesLibElementType2['default'],
    /**
     * A callback fired when the `<Navbar>` body collapses or expands.
     * Fired when a `<Navbar.Toggle>` is clicked and called with the new `navExpanded` boolean value.
     *
     * @controllable navExpanded
     */
    onToggle: _react2['default'].PropTypes.func,

    /**
     * Explicitly set the visiblity of the navbar body
     *
     * @controllable onToggle
     */
    expanded: _react2['default'].PropTypes.bool,

    /**
     * @deprecated
     */
    navExpanded: _reactPropTypesLibDeprecated2['default'](_react2['default'].PropTypes.bool, 'Use `expanded` and `defaultExpanded` instead.')
  },

  childContextTypes: {
    $bs_navbar: _react.PropTypes.bool,
    $bs_navbar_bsClass: _react.PropTypes.string,
    $bs_navbar_onToggle: _react.PropTypes.func,
    $bs_navbar_expanded: _react.PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      componentClass: 'nav',
      fixedTop: false,
      fixedBottom: false,
      staticTop: false,
      inverse: false,
      fluid: false
    };
  },

  getChildContext: function getChildContext() {
    return {
      $bs_navbar: true,
      $bs_navbar_bsClass: this.props.bsClass,
      $bs_navbar_onToggle: this.handleToggle,
      $bs_navbar_expanded: this.props.expanded
    };
  },

  handleToggle: function handleToggle() {
    this.props.onToggle(!this.props.expanded);
  },

  isNavExpanded: function isNavExpanded() {
    return !!this.props.expanded;
  },

  render: function render() {
    if (shouldRenderOldNavbar(this)) {
      _utilsDeprecationWarning2['default']({ message: 'Rendering a deprecated version of the Navbar due to the use of deprecated ' + 'props. Please use the new Navbar api, and remove `toggleButton`, ' + '`toggleNavKey`, `brand`, `navExpanded`, `defaultNavExpanded` props or the ' + 'use of the `<NavBrand>` component outside of a `<Navbar.Header>`. \n\n' + 'for more details see: http://react-bootstrap.github.io/components.html#navbars'
      });

      return _react2['default'].createElement(_deprecatedNavbar2['default'], this.props);
    }

    var _props = this.props;
    var fixedTop = _props.fixedTop;
    var fixedBottom = _props.fixedBottom;
    var staticTop = _props.staticTop;
    var inverse = _props.inverse;
    var ComponentClass = _props.componentClass;
    var fluid = _props.fluid;
    var className = _props.className;
    var children = _props.children;

    var props = _objectWithoutProperties(_props, ['fixedTop', 'fixedBottom', 'staticTop', 'inverse', 'componentClass', 'fluid', 'className', 'children']);

    // will result in some false positives but that seems better
    // than false negatives. strict `undefined` check allows explicit
    // "nulling" of the role if the user really doesn't want one
    if (props.role === undefined && ComponentClass !== 'nav') {
      props.role = 'navigation';
    }

    if (inverse) {
      props.bsStyle = _styleMaps.INVERSE;
    }

    var classes = _utilsBootstrapUtils2['default'].getClassSet(props);

    classes[_utilsBootstrapUtils2['default'].prefix(this.props, 'fixed-top')] = fixedTop;
    classes[_utilsBootstrapUtils2['default'].prefix(this.props, 'fixed-bottom')] = fixedBottom;
    classes[_utilsBootstrapUtils2['default'].prefix(this.props, 'static-top')] = staticTop;

    return _react2['default'].createElement(
      ComponentClass,
      _extends({}, props, { className: _classnames2['default'](className, classes) }),
      _react2['default'].createElement(
        _Grid2['default'],
        { fluid: fluid },
        children
      )
    );
  }
});

var NAVBAR_STATES = [_styleMaps.DEFAULT, _styleMaps.INVERSE];

Navbar = _utilsBootstrapUtils.bsStyles(NAVBAR_STATES, _styleMaps.DEFAULT, _utilsBootstrapUtils.bsClass('navbar', _uncontrollable2['default'](Navbar, { expanded: 'onToggle' })));

function createSimpleWrapper(tag, suffix, displayName) {
  var wrapper = function wrapper(_ref, _ref2) {
    var Tag = _ref.componentClass;
    var className = _ref.className;

    var props = _objectWithoutProperties(_ref, ['componentClass', 'className']);

    var _classNames;

    var _ref2$$bs_navbar_bsClass = _ref2.$bs_navbar_bsClass;
    var bsClass = _ref2$$bs_navbar_bsClass === undefined ? 'navbar' : _ref2$$bs_navbar_bsClass;
    return _react2['default'].createElement(Tag, _extends({}, props, {
      className: _classnames2['default'](className, _utilsBootstrapUtils2['default'].prefix({ bsClass: bsClass }, suffix), (_classNames = {}, _classNames[_utilsBootstrapUtils2['default'].prefix({ bsClass: bsClass }, 'right')] = props.pullRight, _classNames[_utilsBootstrapUtils2['default'].prefix({ bsClass: bsClass }, 'left')] = props.pullLeft, _classNames))
    }));
  };

  wrapper.displayName = displayName;

  wrapper.propTypes = {
    componentClass: _reactPropTypesLibElementType2['default'],
    pullRight: _react2['default'].PropTypes.bool,
    pullLeft: _react2['default'].PropTypes.bool
  };
  wrapper.defaultProps = {
    componentClass: tag,
    pullRight: false,
    pullLeft: false
  };

  wrapper.contextTypes = {
    $bs_navbar_bsClass: _react.PropTypes.string
  };

  return wrapper;
}

Navbar.Brand = _NavbarBrand2['default'];
Navbar.Header = _NavbarHeader2['default'];
Navbar.Toggle = _NavbarToggle2['default'];
Navbar.Collapse = _NavbarCollapse2['default'];

Navbar.Form = createSimpleWrapper('div', 'form', 'NavbarForm');
Navbar.Text = createSimpleWrapper('p', 'text', 'NavbarText');
Navbar.Link = createSimpleWrapper('a', 'link', 'NavbarLink');

exports['default'] = Navbar;
module.exports = exports['default'];
},{"./Grid":27,"./NavbarBrand":55,"./NavbarCollapse":56,"./NavbarHeader":57,"./NavbarToggle":58,"./deprecated/Navbar":81,"./styleMaps":83,"./utils/ValidComponentChildren":86,"./utils/bootstrapUtils":87,"./utils/deprecationWarning":92,"babel-runtime/helpers/extends":98,"babel-runtime/helpers/interop-require-default":100,"babel-runtime/helpers/object-without-properties":102,"classnames":126,"react":712,"react-prop-types/lib/deprecated":247,"react-prop-types/lib/elementType":248,"uncontrollable":252}],55:[function(require,module,exports){
'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utilsBootstrapUtils = require('./utils/bootstrapUtils');

var _utilsBootstrapUtils2 = _interopRequireDefault(_utilsBootstrapUtils);

var NavbarBrand = (function (_React$Component) {
  _inherits(NavbarBrand, _React$Component);

  function NavbarBrand() {
    _classCallCheck(this, NavbarBrand);

    _React$Component.apply(this, arguments);
  }

  NavbarBrand.prototype.render = function render() {
    var _props = this.props;
    var className = _props.className;
    var children = _props.children;

    var props = _objectWithoutProperties(_props, ['className', 'children']);

    var _context$$bs_navbar_bsClass = this.context.$bs_navbar_bsClass;
    var bsClass = _context$$bs_navbar_bsClass === undefined ? 'navbar' : _context$$bs_navbar_bsClass;

    var brandClasses = _utilsBootstrapUtils2['default'].prefix({ bsClass: bsClass }, 'brand');

    if (_react2['default'].isValidElement(children)) {
      return _react2['default'].cloneElement(children, {
        className: _classnames2['default'](children.props.className, className, brandClasses)
      });
    }

    return _react2['default'].createElement(
      'span',
      _extends({}, props, { className: _classnames2['default'](className, brandClasses) }),
      children
    );
  };

  return NavbarBrand;
})(_react2['default'].Component);

NavbarBrand.contextTypes = {
  $bs_navbar_bsClass: _react2['default'].PropTypes.string
};

exports['default'] = NavbarBrand;
module.exports = exports['default'];
},{"./utils/bootstrapUtils":87,"babel-runtime/helpers/class-call-check":97,"babel-runtime/helpers/extends":98,"babel-runtime/helpers/inherits":99,"babel-runtime/helpers/interop-require-default":100,"babel-runtime/helpers/object-without-properties":102,"classnames":126,"react":712}]