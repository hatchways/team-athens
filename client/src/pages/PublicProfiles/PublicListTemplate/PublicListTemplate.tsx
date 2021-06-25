import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@material-ui/core';
import { List } from '../../../interface/List';
import useStyles from './useStyles';
import EditList from '../../../components/EditList/EditList';
import { useAuth } from '../../../context/useAuthContext';

interface Props {
  list: List;
  handleClick: (list: List) => void;
}

const PublicListTemplate = ({ list, handleClick }: Props): JSX.Element => {
  const classes = useStyles();
  const { loggedInUser } = useAuth();

  return (
    <Grid item>
      <Card className={classes.shoppingListCard}>
        {loggedInUser && <EditList list={list} />}
        <CardActionArea className={classes.shoppingListButton} onClick={() => handleClick(list)}>
          <CardMedia className={classes.media} image={list.imageUrl} title="Card image" />
          <CardContent>
            <Typography gutterBottom variant="h6" component="h2" align={'center'}>
              {list.name}
            </Typography>
            <Typography variant="caption" color="textSecondary" component="p" align={'center'}>
              {list.products?.length} items
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default PublicListTemplate;
