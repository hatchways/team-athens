import { createMuiTheme } from '@material-ui/core';

export const theme = createMuiTheme({
  typography: {
    fontFamily: '"Open Sans", "sans-serif", "Roboto"',
    fontSize: 12,
    button: {
      textTransform: 'none',
      fontWeight: 700,
    },
  },
  palette: {
    primary: { main: '#DF1B1B' },
  },
  shape: {
    borderRadius: 5,
  },
});

theme.props = {
  MuiTextField: {
    InputLabelProps: {
      shrink: true,
    },
  },
};

theme.overrides = {
  MuiTextField: {
    root: {
      marginBottom: '20px',
    },
  },
  MuiInput: {
    root: {
      '&:before': {
        borderBottom: `none !important`,
      },
      '&:after': {
        borderBottom: `none`,
      },
      '&:hover:not($disabled):not($focused):not($error):before': {
        borderBottom: `none`,
      },
    },
  },
  MuiInputLabel: {
    root: {
      width: '100%',
      textAlign: 'center',
      color: 'black',
    },
    formControl: {
      transform: 'none',
    },
    shrink: {
      transform: 'none',
    },
  },
  MuiButton: {
    root: {
      borderRadius: '50px',
      textTransform: 'uppercase',
    },
  },
  MuiDialog: {
    paper: {
      minWidth: '584.67px',
      minHeight: ' 584px',
    },
  },
};
