import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const backgroundColor = 'white';
const textColor = 'black';
const useStyles = makeStyles((theme) => ({
  customizeToolbar: {
    maxHeight: 36,
    width: '90%',
    margin: '0 auto',
  },
  navRoot: {
    backgroundColor: backgroundColor,
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
    color: textColor,
  },
  headerButtonGroup: {
    marginRight: '3rem',
  },
  userChip: {
    fontWeight: 700,
    paddingLeft: '1rem',
    fontSize: '1rem',
    height: 46,
    backgroundColor: backgroundColor,
    color: textColor,
    '&:hover, &:active, &:focus': {
      backgroundColor: backgroundColor,
    },
  },
}));

export default useStyles;
