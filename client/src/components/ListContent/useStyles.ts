import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  modalBoxContainer: {
    margin: theme.spacing(10, 'auto'),
    maxWidth: '650px',
  },
  closeButton: {
    textAlign: 'right',
  },
  welcome: {
    fontSize: 26,
    paddingBottom: 20,
    color: '#000000',
    fontWeight: 700,
    fontFamily: "'Open Sans'",
    textAlign: 'center',
  },
  list: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  content: {
    flexDirection: 'column',
  },
}));

export default useStyles;
