import { makeStyles } from '@material-ui/core/styles';
import { findByLabelText } from '@testing-library/dom';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    // minHeight: '100vh',
    '& .MuiInput-underline:before': {
      borderBottom: '1.2px solid rgba(0, 0, 0, 0.2)',
    },
    flexGrow: 1,
  },
  customizeToolbar: {
    maxHeight: 36,
    width: '90%',
    margin: '0 auto',
  },
  dashboard: { backgroundColor: '#FFFFFF' },
  drawerWrapper: {
    width: drawerWidth,
    // [theme.breakpoints.up('md')]: {
    //   width: '300px',
    // },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  logo: {
    flexGrow: 1,
  },
  userPanel: {
    display: 'flex',
    alignItems: 'center',
  },
  headerButtonGroup: {
    marginRight: '4rem',
  },
  userText: {
    fontWeight: 700,
    paddingLeft: '1rem',
    fontSize: 16,
  },
  pageContent: {
    width: '85%',
    margin: '4rem auto',
  },
  addLinkFormSection: {
    margin: '0 auto',
    flexDirection: 'column',
    width: '75%',
    display: 'flex',
  },
  addLinkForm: {
    backgroundColor: 'pink',
    alignItems: 'center',
    borderRadius: '1rem',
  },
  addLinkFormTitle: {
    margin: '0 auto',
  },
}));

export default useStyles;
