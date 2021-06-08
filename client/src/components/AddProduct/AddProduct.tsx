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

interface Props {
  showAddProductModal: boolean;
  setShowAddProductModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const getProductLists = async () => {
  // FIXME uncomment to fetch from api
  // let lists: any[] = [];
  // await getAllLists().then((data: any) => {
  //   if (data.error) {
  //     console.log(data.error.message);
  //   } else if (data.success) {
  //     lists = data.success;
  //   } else {
  //     console.error({ data });
  //     console.error('An unexpected error occurred');
  //   }
  // });
  // return lists;

  // BEGIN FOR DEMO ONLY
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([
        {
          value: 'list-1',
          label: 'Beauty',
        },
        {
          value: 'list-2',
          label: 'Clothes',
        },
        {
          value: 'list-3',
          label: 'Electronics',
        },
      ]);
    }, 2000);
  });
  // END FOR DEMO ONLY
};

const AddProduct = ({ showAddProductModal, setShowAddProductModal }: Props): JSX.Element => {
  const classes = useStyles();
  const handleCloseAddProductModal = () => {
    setShowAddProductModal(false);
  };

  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [detailsOfProduct, setDetailsOfProduct] = useState<ProductDetails>();
  const [productLists, setProductLists] = useState<any[]>([]);

  const { updateSnackBarMessage } = useSnackBar();

  const submitItem = () => {
    // FIXME send itemData to api
    // BEGIN FOR DEMO ONLY
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('Submited');
        setShowAddProductModal(false);
        setShowPreviewModal(false);
        updateSnackBarMessage('Submit OK');
        resolve(1);
      }, 5000);
    });
    // ENF FOR DEMO ONLY
  };

  const handleSubmit = (
    { productUrl, productListId }: { productUrl: string; productListId: string },
    { setSubmitting }: FormikHelpers<{ productUrl: string; productListId: string }>,
  ) => {
    // FIXME Get detail of the product from the api
    // productDetails(productUrl).then((data: any) => {
    //   if (data.error) {
    //     setSubmitting(false);
    //     updateSnackBarMessage(data.error.message);
    //   } else if (data.success) {
    //     setDetailsOfProduct(data.success);
    //     setShowPreviewModal(true);
    //   } else {
    //     console.error({ data });
    //     setSubmitting(false);
    //     updateSnackBarMessage('An unexpected error occurred. Please try again');
    //   }
    // });

    // BEGIN FOR DEMO PURPOSE ONLY
    const demoProductDetail: ProductDetails = {
      productFeatures: ['feature 1', 'feature 2'],
      productPrice: '$128.58',
      productImage: 'https://images-na.ssl-images-amazon.com/images/I/91K9SyGiyzL._AC_SX679_.jpg',
      productTitle: 'Acer R240HY bidx 23.8-Inch IPS HDMI DVI VGA (1920 x 1080) Widescreen Monitor, Black',
      url: 'https://www.amazon.com/Acer-R240HY-bidx-23-8-Inch-Widescreen/dp/B0148NNKTC/ref=lp_16225007011_1_9',
    };
    setDetailsOfProduct(demoProductDetail);
    setShowPreviewModal(true);
    //END FOR DEMO PURPOSE ONLY
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
            <AddProductForm handleSubmit={handleSubmit} productLists={productLists}></AddProductForm>
          </Grid>
        </DialogContent>
      </Dialog>

      <AddProductPreview
        showPreviewModal={showPreviewModal}
        setShowPreviewModal={setShowPreviewModal}
        productDetails={detailsOfProduct}
        handleSubmit={submitItem}
       />
    </Grid>
  );
};

export default AddProduct;
