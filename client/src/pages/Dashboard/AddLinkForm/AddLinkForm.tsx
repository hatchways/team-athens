import Grid from '@material-ui/core/Grid';
import useStyles from './useStyles';
import { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { List } from '../../../interface/List';
import { createProduct } from '../../../helpers/APICalls/product';
import { Product } from '../../../interface/Product';
import AddProductPreview from '../../../components/AddProduct/AddProductPreview/AddProductPreview';
import { useSnackBar } from '../../../context/useSnackbarContext';
import { ProductDetails } from '../../../interface/ProductDetails';
import { ProductApiData } from '../../../interface/ProductApiData';
import { ProductDetailApiData } from '../../../interface/ProductDetailApiData';
import productDetails from '../../../helpers/APICalls/productDetails';
import { CircularProgress } from '@material-ui/core';

interface Props {
  listData: List[];
  updateLists: () => Promise<void>;
}

export default function AddLinkForm({ listData, updateLists }: Props): JSX.Element {
  const classes = useStyles();
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [detailsOfProduct, setDetailsOfProduct] = useState<ProductDetails>();
  const [listId, setListId] = useState<string>('');
  const { updateSnackBarMessage } = useSnackBar();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [selectInput, setSelectInput] = useState(listData.length > 0 ? listData[0].name : '');
  const [urlInput, setUrlInput] = useState('');

  const handleSelectChange = (event: any) => {
    setSelectInput(event.target.value);
  };
  const handleUrlInput = (event: any) => {
    setUrlInput(event.target.value);
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
        setShowPreviewModal(false);
        updateSnackBarMessage(data.success.message);
      } else {
        console.error({ data });
        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
    });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    productDetails(urlInput).then(async (data: ProductDetailApiData) => {
      if (data.error) {
        setIsSubmitting(false);
        updateSnackBarMessage(data.error.message);
      } else if (data.success) {
        setIsSubmitting(false);
        setDetailsOfProduct(data.ScrapedProduct);
        setListId(selectInput);
        await updateLists();
        setShowPreviewModal(true);
      } else {
        setIsSubmitting(false);
        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
    });
  };

  return (
    <Grid className={classes.addLinkFormSection} container sm={10}>
      <Typography variant="h5" className={classes.addLinkFormTitle} align={'center'}>
        Add new item:
      </Typography>
      <form onSubmit={handleSubmit} className={classes.addLinkForm} noValidate autoComplete="off">
        <Grid container>
          <TextField
            id="standard-basic"
            label="Paste your link here"
            variant="standard"
            className={classes.urlFormInput}
            InputProps={{ disableUnderline: true }}
            value={urlInput}
            onChange={handleUrlInput}
          />
          <FormControl variant="standard" className={classes.selectField}>
            <InputLabel id="list-select-field">Select list</InputLabel>
            <Select
              labelId="list-select-field"
              id="demo-simple-select-filled"
              value={selectInput}
              onChange={handleSelectChange}
              disableUnderline={true}
            >
              {listData.map((list: List) => {
                return (
                  <MenuItem key={list.name} value={list._id}>
                    {list.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <Button onClick={handleSubmit} className={classes.formButton} color="secondary" variant="contained">
            {isSubmitting ? <CircularProgress size={22} style={{ color: 'white' }} /> : 'Continue'}
          </Button>
        </Grid>
      </form>
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
}
