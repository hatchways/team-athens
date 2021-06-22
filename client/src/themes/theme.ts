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
  MuiDialog: {
    paper: {
      minWidth: '584.67px',
      minHeight: ' 584px',
    },
  },
};
