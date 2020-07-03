import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { createMuiTheme } from '@material-ui/core/styles';

import './styles/SpeedFunction.css'

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#6fbf73',
      main: '#4caf50',
      dark: '#357a38',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

export default class SpeedFunction extends PureComponent{
  static propTypes = {
    onSpeedChange: PropTypes.func,
 };

  static defaultProps = {
    onSpeedChange: () => '',
  };

  constructor(props){
    super(props);

    this.state = {}
  }

  onSpeedChange = e => {
    this.props.onSpeedChange(e.target.value);
  }

  render() {

    return (
      <div className="radio-container" onChange={this.onSpeedChange}>
        <input
          type="radio"
          name="speed"
          value={1000}
          id="1x"
          defaultChecked 
        />
        <label htmlFor="1x" className="label1">
          <span className="radio">1X</span>
        </label>
        <input
          type="radio"
          name="speed"
          value={600}
          id="1.5x"
        />
        <label htmlFor="1.5x"className="label2">
          <span className="radio">1.5X</span>
        </label>
        <input
          type="radio"
          name="speed"
          value={200}
          id="2x"
        />
        <label htmlFor="2x"className="label3">
          <span className="radio">2X</span>
        </label>
      </div>
    );
  }
}; 