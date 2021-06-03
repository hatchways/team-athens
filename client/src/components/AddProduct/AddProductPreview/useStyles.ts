import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {},
  closeModalButton: {
    textAlign: 'right',
  },
  modalTitle: {
    fontSize: 26,
    paddingBottom: 20,
    color: '#000000',
    fontWeight: 700,
    fontFamily: "'Open Sans'",
    textAlign: 'center',
  },
  imageContainer: {
    textAlign: 'center',
  },
  image: {
    width: '300px',
  },
}));

export default useStyles;
