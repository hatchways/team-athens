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
  addNewListIcon: {
    fontSize: '4rem',
  },
  cardsContainer: {
    gap: '2.5rem',
    justifyContent: 'space-around',
    margin: '2rem auto',
  },
  // duplicate styling here
  shoppingListButton: {
    height: '100%',
    textAlign: 'center',
  },
  shoppingListsTitle: {
    fontWeight: 700,
  },
  shoppingListsContentArea: {
    margin: '4rem',
    gap: '1.5rem',
  },
  shoppingListCard: {
    width: '270px',
    height: '380px',
    borderRadius: '0.8rem',
  },
}));

export default useStyles;
