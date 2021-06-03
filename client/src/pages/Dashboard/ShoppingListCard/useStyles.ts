import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
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
}));

export default useStyles;
