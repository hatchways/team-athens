import { makeStyles } from '@material-ui/core/styles';
import { url } from 'inspector';
import ClothesImage from '../../../Images/clothes.png';

const useStyles = makeStyles((theme) => ({
  media: {
    height: '80%',
    backgroundImage: `url(${ClothesImage})`, // default image
  },
  shoppingListCard: {
    width: '270px',
    height: '380px',
    borderRadius: '0.8rem',
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
