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
  uploadButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: imageHeight,
    cursor: 'pointer',
  },
  imageIcon: {
    fontSize: '10rem',
    width: '100%',
    cursor: 'pointer',
  },
}));

export default useStyles;
