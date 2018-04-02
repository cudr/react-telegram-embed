module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = {
  width: '100%',
  frameBorder: '0',
  scrolling: 'no',
  border: 'none',
  overflow: 'hidden'

  /**
   * Simple Component for Telegram embedding
   * @extends Component
   */

};
var TelegramEmbed = function (_Component) {
  _inherits(TelegramEmbed, _Component);

  function TelegramEmbed(props) {
    _classCallCheck(this, TelegramEmbed);

    var _this = _possibleConstructorReturn(this, (TelegramEmbed.__proto__ || Object.getPrototypeOf(TelegramEmbed)).call(this, props));

    _this.state = {
      src: _this.props.src,
      id: '',
      height: '80px'
    };
    _this.messageHandler = _this.messageHandler.bind(_this);
    _this.urlObj = document.createElement('a');

    return _this;
  }

  _createClass(TelegramEmbed, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      window.addEventListener('message', this.messageHandler);

      this.iFrame.addEventListener('load', function () {

        _this2.checkFrame(_this2.state.id);
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('message', this.messageHandler);
    }
  }, {
    key: 'messageHandler',
    value: function messageHandler(_ref) {
      var data = _ref.data,
          source = _ref.source;

      if (!data || typeof data !== 'string' || source !== this.iFrame.contentWindow) {
        return;
      }

      var action = JSON.parse(data);

      if (action.event === 'resize' && action.height) {
        this.setState({
          height: action.height + 'px'
        });
      }
    }
  }, {
    key: 'checkFrame',
    value: function checkFrame(id) {
      this.iFrame.contentWindow.postMessage(JSON.stringify({ event: 'visible', frame: id }), '*');
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(_ref2) {
      var _this3 = this;

      var src = _ref2.src;

      if (this.state.src !== src) {
        this.urlObj.href = src;
        var id = 'telegram-post' + this.urlObj.pathname.replace(/[^a-z0-9_]/ig, '-');

        this.setState({ src: src, id: id }, function () {
          return _this3.checkFrame(id);
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var _state = this.state,
          src = _state.src,
          height = _state.height;
      var container = this.props.container;


      return _react2.default.createElement(
        'div',
        { 'data-sharing-id': container },
        _react2.default.createElement('iframe', {
          ref: function ref(node) {
            return _this4.iFrame = node;
          },
          src: src + '?embed=1',
          height: height,
          id: 'telegram-post' + this.urlObj.pathname.replace(/[^a-z0-9_]/ig, '-'),
          style: styles
        })
      );
    }
  }]);

  return TelegramEmbed;
}(_react.Component);

exports.default = TelegramEmbed;

/***/ })
/******/ ]);