import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import Form from './components/Form';
import SpeedFunction from './components/SpeedFunction';
import Display from './components/Display';
import './components/styles/App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      secondsElapsed: 0,
      halfway: 0,
      timerSpeed: 1000,
      nextAction: 'start',
      displayMessage: '',
      displayMessageStyle: 'black',
      displayMessageAnimation: 1,
      iconResumePause: true,
      userInput: 0
    }
  }

  getMinutes = () => {
    return ('0' + Math.floor(this.state.secondsElapsed / 60).toString()).slice(-2);
  }

  getSeconds = () => {
    return ('0' + this.state.secondsElapsed % 60).slice(-2);
  }

  handleSpeed = speed => {
    this.setState({
      timerSpeed: speed
    });
  }

  // handle pause and resume func
  handleResumePause = () => {
    const { nextAction } = this.state
    if (nextAction === 'stop') {
      clearInterval(this.timer)
    } else {
      this.handleTimer()
    }
    return this.setState({
      nextAction: nextAction === 'start' ? 'stop' : 'start'
    });
  }

  handleTimer = () => {
    this.timer = setInterval(() => {
      this.setState(prevState => ({
        secondsElapsed: prevState.secondsElapsed > 0 && prevState.secondsElapsed -1
      }));
    }, this.state.timerSpeed)
  }

  handleFormChange = (...args) => {
    const [id, value, errorMessage] = args;
    // console.log(args);
    
    if (!errorMessage || errorMessage === '') {
      this.setState({
        userInput: value * 60
      });
    } 
  }

  handleFormSubmit = () => {
    const { userInput } = this.state;

    this.setState(prevState => {
      return {
        secondsElapsed: prevState.userInput,
        halfway: prevState.userInput / 2,
        userInput: 0
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if ((this.state.secondsElapsed !== prevState.secondsElapsed)) {
      if (prevState.secondsElapsed === 0) {
        this.setState({
          nextAction: 'stop',
          iconResumePause: false,
          displayMessage: '',
          displayMessageStyle: 'black',
          displayMessageAnimation: 1
        });
        return this.handleTimer();
      }
      if (prevState.secondsElapsed === this.state.halfway) {
        return this.setState({
          // nextAction: 'start',
          displayMessage: 'More than halfway there!'
        });
      }
      if (this.state.secondsElapsed === 20) {
        return this.setState({
          displayMessageStyle: 'red'
        });
      }
      if (this.state.secondsElapsed <= 10 && this.state.secondsElapsed !== 0) {
        return this.setState({
          displayMessageAnimation: prevState.displayMessageAnimation === 1 ? 0 : 1
        });
      }
      if (this.state.secondsElapsed === 0) {
        this.setState({
          nextAction: 'start',
          iconResumePause: true,
          displayMessage: 'Time\'s up!'
        });
        return clearInterval(this.timer);
      }
    }
    if (this.state.timerSpeed !== prevState.timerSpeed) {
      if (this.state.secondsElapsed === 0) {
        return this.setState({
          timerSpeed: this.state.timerSpeed
        });
      }
      clearInterval(this.timer);
      return this.handleTimer();
    }
  }

  render() {
    const {
      nextAction,
      iconResumePause,
      displayMessage, 
      displayMessageStyle, 
      displayMessageAnimation
    } = this.state;
    
    let placeHolder = window.innerWidth < 400 ? 'Min' : 'Countdown in (Min)';

    return (
      <div className="container">
        <Form 
          id="1" 
          label={placeHolder}
          onChange={this.handleFormChange}
          onSubmit={this.handleFormSubmit}
        />
        <div className="message">
          <h3 
            style={{ 
              color: displayMessageStyle,
              opacity: displayMessageAnimation
            }}
          >
            {displayMessage}
          </h3>
        </div>
          <Display 
            min={this.getMinutes()}
            sec={this.getSeconds()}
            nextAction={nextAction}
            iconStatus={iconResumePause}
            onClick={this.handleResumePause}
          />
        <div className="function">
          <SpeedFunction 
            onSpeedChange={this.handleSpeed}
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('main'));