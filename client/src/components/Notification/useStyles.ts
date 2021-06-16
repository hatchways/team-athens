import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  displayInline: {
    display: 'inline',
  },
  typography: {
    padding: theme.spacing(2),
  },
  popover: {
    marginTop: '20px',
    minWidth: '400px',
    height: 'auto',
  },
  markAllAsReadButton: {
    textAlign: 'right',
  },
}));

export default useStyles;
