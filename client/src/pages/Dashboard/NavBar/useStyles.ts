import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  customizeToolbar: {
    maxHeight: 36,
    width: '90%',
    margin: '0 auto',
  },
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
}));

export default useStyles;
