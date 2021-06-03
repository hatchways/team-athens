import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  addLinkFormSection: {
    margin: '0 auto',
    flexDirection: 'column',
    width: '75%',
    display: 'flex',
    [theme.breakpoints.between('xs', 'sm')]: {
      width: '100%',
    },
    [theme.breakpoints.between('md', 'lg')]: {
      width: '55%',
    },
    [theme.breakpoints.up('xl')]: {
      width: '45%',
    },
  },
  // 56% 24% 20%
  addLinkForm: {
    alignItems: 'center',
    borderRadius: '2rem',
    margin: '0',
    padding: '0.3rem 0.6rem 0.3rem 1.5rem',
    boxShadow: '0 0 20px -5px lightgrey',
  },
  //
  selectField: {
    flexGrow: 2.4,
  },
  urlFormInput: {
    flexGrow: 5.6,
    border: 'none',
    root: {
      '&.MuiInput-underline:before': {
        border: 'none',
        content: 'dasd',
        backgroundColor: 'white',
      },
    },
    '&:after': {
      border: 'none',
      content: 'dsas',
    },
  },
  formButton: {
    flexGrow: 2,
    borderRadius: '2rem',
  },
  //
  addLinkFormTitle: {
    margin: '2rem 0',
    fontWeight: 700,
  },
}));

export default useStyles;