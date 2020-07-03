import React from 'react';
import Fab from '@material-ui/core/Fab';
import { Grid } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#6fbf73',
      main: '#4caf50',
      dark: '#357a38',
      contrastText: '#fff',
    },
    secondary: {
      light: '#33eb91',
      main: '#00e676',
      dark: '#00a152',
      contrastText: '#fff',
    },
  },
});

export default function Display(props) {
  const { min, sec, iconStatus, onClick, nextAction } = props;

  return (
    <ThemeProvider theme={theme}>
      <Grid className="display-block" container spacing={0} justify="center" alignItems="center">
        <Grid item xs={10}>
          <h1 className="display-time">{`${min}:${sec}`}</h1>
        </Grid>
        {
          nextAction === 'start' ?
            <Grid item xs={2}>
              <Fab 
                className="icon-position" 
                size="small" 
                color="secondary" 
                aria-label="resume"
                onClick={onClick}
                disabled={iconStatus}
              >
                <PlayCircleOutlineIcon />
              </Fab>
            </Grid> :
            <Grid item xs={2}>
              <Fab 
                className="icon-position" 
                size="small" 
                color="secondary" 
                aria-label="pause"
                onClick={onClick}
              >
                <PauseCircleOutlineIcon />
              </Fab>
            </Grid>
        }
      </Grid>
    </ThemeProvider>
  );
}