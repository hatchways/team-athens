import useStyles from './useStyles';

import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

interface CardProps {
  image: any;
  title: string;
  itemCount: number;
}

export default function shoppingListCard({ image, title, itemCount }: CardProps): JSX.Element {
  const classes = useStyles();

  return (
    <Card className={classes.shoppingListCard}>
      <CardActionArea className={classes.shoppingListButton}>
        <CardMedia className={classes.media} image={image} title="Card image" />
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2" align={'center'}>
            {title}
          </Typography>
          <Typography variant="caption" color="textSecondary" component="p" align={'center'}>
            {itemCount} items
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
