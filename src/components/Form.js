import React, {PureComponent} from 'react';
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

export default class Form extends PureComponent{
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
      locked: true,
      screenSize: window.innerWidth
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
    } 
    
    return this.props.onChange(id, value, errorMessage);
  }
  resizeLabel = () => {
    this.setState({
      screenSize: window.innerWidth
    })
  }

  componentDidMount() {
    window.addEventListener("resize", this.resizeLabel);
  }

  render(){
    const { value, locked, screenSize } = this.state;
    const { onSubmit } = this.props;
    const inputLabel = screenSize < 400 ? '# of Minutes' : 'Countdown in (Min)';
    
    return (
      <ThemeProvider theme={theme}>
        <Grid container spacing={1} justify="center" alignItems="center">
          <Grid item xs={8}>
            <TextField 
              id="outlined-basic" 
              variant="outlined" 
              label={inputLabel}
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
        </Grid>
      </ThemeProvider>
    )
  }
}; 