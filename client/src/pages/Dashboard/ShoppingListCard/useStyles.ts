import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  media: {
    height: '80%',
  },
  shoppingListCard: {
    width: '270px',
    height: '380px',
    borderRadius: '0.8rem',
    position: 'relative',
  },
  shoppingListsTitle: {
    fontWeight: 700,
  },
  shoppingListButton: {
    height: '100%',
    textAlign: 'center',
    zIndex: 1,
  },
}));

export default useStyles;
