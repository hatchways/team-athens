import { makeStyles } from '@material-ui/core/styles';
import LogoImage from './../../../Images/logo.png';

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
  title: {
    flexGrow: 1,
  },
  logo: {
    flexGrow: 1,
  },
  imageContainer: {
    width: 250,
    height: 32,
    backgroundImage: `url(${LogoImage})`,
    backgroundSize: 'cover',
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
  popOverBody: {
    display: 'flex',
    flexDirection: 'column',
    '& Button': {
      padding: ' 0.5rem 1rem',
    },
  },
}));

export default useStyles;
