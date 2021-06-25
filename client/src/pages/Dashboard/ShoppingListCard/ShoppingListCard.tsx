import useStyles from './useStyles';

import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import { useState } from 'react';
import { List } from '../../../interface/List';
import ListContent from '../../../components/ListContent/ListContent';

interface CardProps {
  list: List;
  updateLists: any;
}

export default function shoppingListCard({ list, updateLists }: CardProps): JSX.Element {
  const classes = useStyles();

  const [modalOpen, setModalOpen] = useState(false);

  const handleClick = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <Grid item>
      <Card className={classes.shoppingListCard}>
        <CardActionArea className={classes.shoppingListButton} onClick={handleClick}>
          <CardMedia className={classes.media} image={list.imageUrl} title="Card image" />
          <CardContent>
            <Typography gutterBottom variant="h6" component="h2" align={'center'}>
              {list.name}
            </Typography>
            <Typography variant="caption" color="textSecondary" component="p" align={'center'}>
              {list.products.length} items
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Modal open={modalOpen} onClose={handleModalClose}>
        <ListContent updateLists={updateLists} onModalClose={handleModalClose} list={list}></ListContent>
      </Modal>
    </Grid>
  );
}
