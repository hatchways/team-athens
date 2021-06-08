import {
  Grid,
  CssBaseline,
  Dialog,
  DialogContent,
  Icon,
  Typography,
  Button,
  DialogActions,
  ListItem,
  ListItemText,
  List,
  CircularProgress,
} from '@material-ui/core';
import React, { useState } from 'react';
import { ProductDetails } from '../../../interface/ProductDetails';
import useStyles from './useStyles';

interface Props {
  showPreviewModal: boolean;
  setShowPreviewModal: React.Dispatch<React.SetStateAction<boolean>>;
  productDetails: ProductDetails | undefined;
  handleSubmit: any;
}

const AddProductPreview = ({
  showPreviewModal,
  setShowPreviewModal,
  productDetails,
  handleSubmit,
}: Props): JSX.Element => {
  const classes = useStyles();
  const handleCloseProductPreviewModal = () => {
    setShowPreviewModal(false);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitNewItem = async () => {
    // send new item to the api
    setIsSubmitting(true);
    await handleSubmit();
    setIsSubmitting(false);
  };

  if (productDetails != undefined) {
    return (
      <Grid container component="main">
        <CssBaseline />
        <Dialog
          onClose={handleCloseProductPreviewModal}
          open={showPreviewModal}
          disableBackdropClick={true}
          disableEscapeKeyDown={true}
          PaperProps={{ elevation: 0 }}
        >
          <DialogContent dividers>
            <Grid className={classes.closeModalButton}>
              <Icon onClick={handleCloseProductPreviewModal}>close</Icon>
            </Grid>
            <Grid container>
              <Grid item xs>
                <Typography className={classes.modalTitle} component="h1" variant="h5">
                  Item Preview
                </Typography>
              </Grid>
            </Grid>
            <Grid>
              <Grid className={classes.imageContainer}>
                <img src={productDetails.productImage} alt="" className={classes.image} />
              </Grid>
              <Grid>
                <Typography>{productDetails.productTitle}</Typography>
              </Grid>
            </Grid>
            <Grid>
              <Typography color="primary">Price: {productDetails.productPrice}</Typography>
            </Grid>
            <Grid>
              <Typography variant={'h5'}>Product features</Typography>
              <List>
                {productDetails.productFeatures.map((feature) => (
                  <ListItem key={feature}>
                    <ListItemText>{feature}</ListItemText>
                  </ListItem>
                ))}
              </List>
            </Grid>
          </DialogContent>

          <DialogActions>
            <Button size="large" variant="contained" color="primary" onClick={submitNewItem}>
              {isSubmitting ? <CircularProgress size={22} style={{ color: 'white' }} /> : 'Continue'}
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    );
  }
  return <div></div>;
};

export default AddProductPreview;
