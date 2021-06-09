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
  productDetails: ProductDetails;
  handleSubmit: any;
  listId: string;
}

const AddProductPreview = ({
  showPreviewModal,
  setShowPreviewModal,
  productDetails,
  handleSubmit,
  listId,
}: Props): JSX.Element => {
  const classes = useStyles();
  const handleCloseProductPreviewModal = () => {
    setShowPreviewModal(false);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitNewItem = async () => {
    setIsSubmitting(true);
    await handleSubmit(productDetails, listId);
    setIsSubmitting(false);
  };

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
};

export default AddProductPreview;
