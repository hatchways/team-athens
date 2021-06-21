import { makeStyles } from '@material-ui/core/styles';

const imageHeight = '220px';

const useStyles = makeStyles((theme) => ({
  imagePreview: {
    height: imageHeight,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    maxWidth: '100%',
    maxHeight: '100%',
  },
  root: {},
  title: {
    fontSize: '1.5rem',
    fontWeight: 700,
  },
  uploadButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: imageHeight,
  },
  imageIcon: {
    fontSize: '10rem',
    width: '100%',
  },
  button: {},
}));

export default useStyles;
