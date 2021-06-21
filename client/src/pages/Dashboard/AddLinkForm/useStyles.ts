import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  addLinkFormSection: {
    margin: '0 auto',
    flexDirection: 'column',
  },
  addLinkForm: {
    alignItems: 'center',
    borderRadius: '2rem',
    margin: '0',
    padding: '0.3rem 0.6rem 0.3rem 1.5rem',
    boxShadow: '0 0 20px -5px lightgrey',
  },
  selectField: {
    flexGrow: 2.4,
  },
  urlFormInput: {
    flexGrow: 5.6,
    padding: '0rem 0.5rem 0.55rem 0',
  },
  formButton: {
    flexGrow: 2,
    borderRadius: '2rem',
  },
  addLinkFormTitle: {
    margin: '2rem 0',
    fontWeight: 700,
  },
}));

export default useStyles;
