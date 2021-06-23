import { CssBaseline, Dialog, DialogContent, Grid, Icon, Typography, Button } from '@material-ui/core';
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
import { useEffect } from 'react';
import { ListApiData } from '../../interface/ListApiData';
import { List } from '../../interface/List';
import { ProductDetailApiData } from '../../interface/ProductDetailApiData';
import { ProductApiData } from '../../interface/ProductApiData';

const getProductLists = async () => {
  let lists: List[] = [];
  await getAllLists().then((data: ListApiData) => {
    if (data.error) {
      console.log(data.error.message);
    } else if (data.success) {
      lists = data.lists || [];
    } else {
      console.error({ data });
      console.error('An unexpected error occurred');
    }
  });
  return lists;
};

const AddProduct = (): JSX.Element => {
  const classes = useStyles();
  const handleCloseAddProductModal = () => {
    setShowAddProductModal(false);
  };

  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [detailsOfProduct, setDetailsOfProduct] = useState<ProductDetails>();
  const [productLists, setProductLists] = useState<List[]>([]);
  const [listId, setListId] = useState<string>('');

  const { updateSnackBarMessage } = useSnackBar();

  const saveList = (list: List[]) => {
    setProductLists(list);
  };

  const submitItem = (productDetails: ProductDetails, listID: string) => {
    // send productData to the api
    const newProduct = {
      name: productDetails.productTitle,
      description: productDetails.productFeatures,
      url: productDetails.url,
      price: productDetails.productPrice,
      pictureUrl: productDetails.productImage,
    } as unknown as Product;

    createProduct(newProduct, listID).then((data: ProductApiData) => {
      if (data.error) {
        updateSnackBarMessage(data.error.message);
      } else if (data.success) {
        setShowAddProductModal(false);
        setShowPreviewModal(false);
        updateSnackBarMessage(data.success.message);
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
    productDetails(productUrl).then((data: ProductDetailApiData) => {
      if (data.error) {
        setSubmitting(false);
        updateSnackBarMessage(data.error.message);
      } else if (data.success) {
        setDetailsOfProduct(data.ScrapedProduct);
        setListId(listId);
        setShowPreviewModal(true);
        setSubmitting(false);
      } else {
        setSubmitting(false);
        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
    });
  };

  useEffect(() => {
    getProductLists().then((data) => {
      saveList(data);
    });
  }, []);

  const [showAddProductModal, setShowAddProductModal] = useState(false);

  const openAddProductModal = () => {
    setShowAddProductModal(true);
  };

  return (
    <Grid>
      <Button onClick={openAddProductModal} className={classes.addButton} variant="contained" color="primary">
        Add new item
      </Button>
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
