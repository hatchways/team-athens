import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    // minHeight: '100vh',
    '& .MuiInput-underline:before': {
      borderBottom: '1.2px solid rgba(0, 0, 0, 0.2)',
    },
    flexGrow: 1,
  },
  dashboard: { backgroundColor: '#FFFFFF' },
  pageContent: {
    width: '95%',
    margin: '4rem auto',
    [theme.breakpoints.up('md')]: {
      width: '100%',
    },
  },
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
  ///////////////
  media: {
    height: '80%',
  },
  shoppingListCard: {
    width: '270px',
    height: '380px',
    borderRadius: '0.8rem',
  },
  shoppingListsContentArea: {
    margin: '4rem',
    gap: '1.5rem',
  },
  shoppingListsTitle: {
    fontWeight: 700,
  },
  shoppingListButton: {
    height: '100%',
    textAlign: 'center',
  },
  addNewListIcon: {
    fontSize: '4rem',
  },
  cardsContainer: {
    gap: '2.5rem',
    justifyContent: 'space-around',
    margin: '2rem auto',
  },
}));

export default useStyles;
