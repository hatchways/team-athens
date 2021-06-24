import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  closeModalButton: {
    textAlign: 'right',
    position: 'absolute',
    top: '20px',
    right: '20px',
  },
  modalTitle: {
    fontSize: 26,
    paddingBottom: 20,
    color: '#000000',
    fontWeight: 700,
    fontFamily: "'Open Sans'",
    textAlign: 'center',
  },
  modalHeader: {
    marginTop: '20px',
  },
  addButton: {
    margin: theme.spacing(3, 2, 2),
    padding: 10,
    width: 160,
    height: 56,
    marginTop: 49,
    fontSize: 16,
    fontWeight: 'bold',
    borderRadius: '50px',
    textTransform: 'uppercase',
  },
}));

export default useStyles;
