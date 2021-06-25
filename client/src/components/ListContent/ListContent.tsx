import { useState } from 'react';
import useStyles from './useStyles';
import { Grid } from '@material-ui/core';
import { useEffect } from 'react';
import Modal from '@material-ui/core/Modal';
import { CssBaseline } from '@material-ui/core';
import { Paper, IconButton, Box } from '@material-ui/core';
import { Icon } from '@material-ui/core';
import { ListItemIcon } from '@material-ui/core';
import { ListItem } from '@material-ui/core';
import { ListItemText } from '@material-ui/core';
import { ListItemSecondaryAction, List, ListItemAvatar, Avatar, Typography } from '@material-ui/core';
import { getAllProductsFromList, deleteProduct } from '../../helpers/APICalls/product';
import { useSnackBar } from '../../context/useSnackbarContext';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function ListContent({ list, onModalClose, updateLists }: any): JSX.Element {
  const classes = useStyles();
  const { updateSnackBarMessage } = useSnackBar();

  const [products, setProducts] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const result = await getAllProductsFromList(list._id);
    setLoading(false);
    if (result.success) {
      const products = result.success.products;
      setProducts(products);
      if (products.length === 0) {
      } else {
      }
    } else {
      updateSnackBarMessage('An error has occured');
    }
  };

  const removeProduct = async (id: string) => {
    const result = await deleteProduct(list._id, id);
    if (result.success) {
      updateSnackBarMessage(result.success.message);
      getData();
      updateLists();
    } else {
      updateSnackBarMessage('An error has occured');
    }
  };

  const renderNothingHere = () => {
    return (
      <ListItem>
        <ListItemText primary={`Nothing to see here`} />
      </ListItem>
    );
  };

  const renderlistItem = (product: any) => {
    const labelId = `list-label-${product._id}`;

    return (
      <ListItem key={product} button onClick={() => window.open(`${product.url}`, '_blank')}>
        <ListItemAvatar>
          <Avatar alt={`Avatar n°${product + 1}`} src={product.pictureUrl} />
        </ListItemAvatar>
        <ListItemText id={labelId} primary={`${product.name}`} />
        <ListItemSecondaryAction>
          <IconButton onClick={() => removeProduct(product._id)} edge="end" aria-label="comments">
            <Icon>delete</Icon>
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  };

  return (
    <Grid>
      <CssBaseline />
      <Box className={classes.modalBoxContainer}>
        <Paper>
          <Grid className={classes.closeButton}>
            <IconButton onClick={onModalClose}>
              <Icon>close</Icon>
            </IconButton>
          </Grid>
          <Grid container className={classes.content}>
            <Grid item xs>
              <Typography className={classes.welcome} component="h1" variant="h5">
                {list.name}
              </Typography>
            </Grid>
            <Grid item>
              <List className={classes.list}>
                {loading ? (
                  <CircularProgress />
                ) : products.length > 0 ? (
                  products.map((product: any) => renderlistItem(product))
                ) : (
                  renderNothingHere()
                )}
              </List>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Grid>
  );
}
