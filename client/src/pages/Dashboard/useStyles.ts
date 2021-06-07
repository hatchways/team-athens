import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  dashboard: { backgroundColor: '#FFFFFF' },
  pageContent: {
    margin: '4rem auto',
  },
  addNewListIcon: {
    fontSize: '4rem',
  },
  cardsContainer: {
    margin: '2rem auto',
  },
  shoppingListsContentArea: {
    margin: '4rem 0',
    [theme.breakpoints.down('sm')]: {
      margin: '4rem 1rem',
    },
  },
  // duplicate styling here
  shoppingListButton: {
    height: '100%',
    textAlign: 'center',
  },
  shoppingListsTitle: {
    fontWeight: 700,
  },
  shoppingListCard: {
    width: '270px',
    height: '380px',
    borderRadius: '0.8rem',
  },
}));

export default useStyles;
