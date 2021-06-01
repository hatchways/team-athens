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
    primary: {
      main: '#df1b1b',
      // main: '#3A8DFF'
    },
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
      textAlign: 'center',
      border: 'none',
      boxShadow: '0px 0px 40px #dadce0',
      top: '20px',
      borderRadius: '4px',
      '&:before': {
        borderBottom: `none !important`,
      },
      '&:after': {
        borderBottom: `0px solid ${theme.palette.secondary.main}`,
      },
      '&:hover:not($disabled):not($focused):not($error):before': {
        borderBottom: `0px solid ${theme.palette.secondary.main}`,
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
};
