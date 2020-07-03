import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Grid, TextField, Button } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import './styles/Form.css';

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

export default class Form extends Component{
  static propTypes = {
    id: PropTypes.string.isRequired,
    locked: PropTypes.bool,
    focused: PropTypes.bool,
    value: PropTypes.string,
    error: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
 };

  static defaultProps = {
    locked: false,
    focused: false,
    value: '',
    error: '',
    label: '',
    onChange: () => '',
    onSubmit: () => '',
  };

  constructor(props){
    super(props);

    this.state = {
      focused: (props.locked && props.focused) || false,
      value: props.value || '',
      error: props.error || '',
      label: props.label || '',
      locked: true
    }
  }

  onChange = e => {
    const { id } = this.props;
    const value = isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value.slice(0,2));
    const re = /^[0-9\b]+$/;
    let errorMessage;
    if (re.test(value) && value > 0) {
      this.setState({
        value: e.target.value.slice(0,2),
        locked: false
      })
    } else if (e.target.value === '') {
      this.setState({
        value: '',
        locked: true
      });
      // errorMessage = 'Input is not a number!';
    } 
    // else {
    //   this.setState({
    //     value: '',
    //     locked: true
    //   });
    //   // errorMessage = 'A maximum of 1 hr (60 mins) is allowed.';
    // }
    
    return this.props.onChange(id, value, errorMessage);
  }

  render(){
    const { focused, value, error, label, locked } = this.state;
    const { id, type, onSubmit } = this.props;
    
    return (
      <ThemeProvider theme={theme}>
        <Grid container spacing={1} justify="center" alignItems="center">
          <Grid item xs={8}>
            <TextField 
              id="outlined-basic" 
              variant="outlined" 
              label="Countdown in (Min)" 
              size="small"
              value={value}
              maxLength={2}
              onChange={this.onChange}
            />
          </Grid>
          <Grid item xs={4}>
            <Button 
              variant="contained" 
              color="primary" 
              size="medium" 
              fullWidth
              onClick={() => {
                onSubmit();
                return this.setState({
                  value: '',
                  locked: true
                })
              }}
              disabled={locked}
            >
              Start
            </Button>
          </Grid>
          {/* <h3>Countdown:</h3>
          <input
            id={id}
            type="text" 
            name="mins"
            placeholder="(Min)"
            maxLength="2"
            onChange={this.onChange}
          />
          <Button className="formButton" title="Start" onClick={this.onSubmit} disabled={locked} /> */}
        </Grid>
      </ThemeProvider>
    )
  }
}; 