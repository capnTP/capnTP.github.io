var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { Form } from './components/Form.js';
import { Button } from './components/Button.js';
import { Message } from './components/Message.js';

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, App);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = App.__proto__ || Object.getPrototypeOf(App)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      secondsElapsed: 10,
      halfWay: 5,
      nextAction: 'start',
      displayMessage: ''
    }, _this.getMinutes = function () {
      return ('0' + Math.floor(_this.state.secondsElapsed / 60).toString()).slice(-2);
    }, _this.getSeconds = function () {
      return ('0' + _this.state.secondsElapsed % 60).slice(-2);
    }, _this.handleClick = function () {
      if (_this.state.nextAction === 'start') {
        if (_this.state.secondsElapsed === 0) {
          clearInterval(_this.timer);
          _this.setState({
            displayMessage: 'Please enter minutes to countdown.'
          });
          return;
        } else {
          _this.timer = setInterval(function () {
            if (_this.state.secondsElapsed === 0) {
              _this.setState({
                nextAction: 'start',
                displayMessage: 'Time\'s up!'
              });
              return clearInterval(_this.timer);
            }
            _this.state.secondsElapsed === _this.state.halfWay && _this.setState({
              displayMessage: 'More than halfway there!'
            });
            _this.setState({
              secondsElapsed: _this.state.secondsElapsed > 0 && _this.state.secondsElapsed - 1
            });
          }, 1000);
        }
      } else {
        clearInterval(_this.timer);
      }
      _this.setState(function (prevState) {

        return prevState.nextAction === 'start' ? Object.assign({}, prevState, { nextAction: 'stop' }) : Object.assign({}, prevState, { nextAction: 'start' });
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(App, [{
    key: 'render',
    value: function render() {
      var _state = this.state,
          nextAction = _state.nextAction,
          displayMessage = _state.displayMessage;


      return React.createElement(
        'div',
        null,
        React.createElement(Form, null),
        React.createElement(Message, { text: displayMessage }),
        React.createElement(
          'h1',
          null,
          this.getMinutes() + ':' + this.getSeconds()
        ),
        React.createElement(Button, { title: nextAction, action: this.handleClick })
      );
    }
  }]);

  return App;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById('main'));