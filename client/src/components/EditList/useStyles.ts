import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
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
  addButton: {
    position: 'absolute',
    bottom: '0px',
    right: '0px',
    margin: theme.spacing(3, 2, 2),
    padding: '20px',
    width: '30px',
    height: '30px',
    marginTop: 49,
    zIndex: 14,
  },
}));

export default useStyles;
