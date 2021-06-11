import { CssBaseline, Dialog, DialogContent, Grid, Icon, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import useStyles from './useStyles';
import { FormikHelpers } from 'formik';
import AddProductForm from './AddProductForm/AddProductForm';
import AddProductPreview from './AddProductPreview/AddProductPreview';
import { ProductDetails } from '../../interface/ProductDetails';
import { useSnackBar } from '../../context/useSnackbarContext';
import { getAllLists } from '../../helpers/APICalls/lists';
import productDetails from '../../helpers/APICalls/productDetails';
import { createProduct } from '../../helpers/APICalls/product';
import { Product } from '../../interface/Product';

interface Props {
  showAddProductModal: boolean;
  setShowAddProductModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const getProductLists = async () => {
  let lists: any[] = [];
  await getAllLists().then((data: any) => {
    if (data.error) {
      console.log(data.error.message);
    } else if (data.success) {
      lists = data.success;
    } else {
      console.error({ data });
      console.error('An unexpected error occurred');
    }
  });
  return lists;
};

const AddProduct = ({ showAddProductModal, setShowAddProductModal }: Props): JSX.Element => {
  const classes = useStyles();
  const handleCloseAddProductModal = () => {
    setShowAddProductModal(false);
  };

  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [detailsOfProduct, setDetailsOfProduct] = useState<ProductDetails>();
  const [productLists, setProductLists] = useState<any[]>([]);
  const [listId, setListId] = useState<string>('');

  const { updateSnackBarMessage } = useSnackBar();

  const submitItem = (productDetails: ProductDetails, listID: string) => {
    // send productData to the api
    const newProduct = {
      name: productDetails.productTitle,
      description: productDetails.productFeatures,
      url: productDetails.url,
      price: productDetails.productPrice,
      pictureUrl: productDetails.productImage,
    } as unknown as Product;

    createProduct(newProduct, listID).then((data: any) => {
      if (data.error) {
        updateSnackBarMessage(data.error.message);
      } else if (data.success) {
        setShowAddProductModal(false);
        setShowPreviewModal(false);
        updateSnackBarMessage('Submit OK');
      } else {
        console.error({ data });
        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
    });
  };

  const handleSubmit = (
    { productUrl, listId }: { productUrl: string; listId: string },
    { setSubmitting }: FormikHelpers<{ productUrl: string; listId: string }>,
  ) => {
    // Get detail of the product from the api
    productDetails(productUrl).then((data: any) => {
      if (data.error) {
        setSubmitting(false);
        updateSnackBarMessage(data.error.message);
      } else if (data.success) {
        setDetailsOfProduct(data.success);
        setListId(listId);
        setShowPreviewModal(true);
      } else {
        console.error({ data });
        setSubmitting(false);
        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
    });
  };

  getProductLists().then((data) => {
    setProductLists(data as any[]);
  });

  return (
    <Grid container component="main">
      <CssBaseline />
      <Dialog
        onClose={handleCloseAddProductModal}
        open={showAddProductModal}
        disableBackdropClick={true}
        disableEscapeKeyDown={true}
        PaperProps={{ elevation: 0 }}
      >
        <DialogContent dividers>
          <Grid className={classes.closeModalButton}>
            <Icon onClick={handleCloseAddProductModal}>close</Icon>
          </Grid>
          <Grid container>
            <Grid item xs>
              <Typography className={classes.modalTitle} component="h1" variant="h5">
                Add new item:
              </Typography>
            </Grid>
            <AddProductForm handleSubmit={handleSubmit} productLists={productLists} setListId={setListId} />
          </Grid>
        </DialogContent>
      </Dialog>

      {detailsOfProduct && (
        <AddProductPreview
          showPreviewModal={showPreviewModal}
          setShowPreviewModal={setShowPreviewModal}
          productDetails={detailsOfProduct}
          handleSubmit={submitItem}
          listId={listId}
        />
      )}
    </Grid>
  );
};

export default AddProduct;
