import { CssBaseline, Dialog, DialogContent, Grid, Icon, Typography, LinearProgress } from '@material-ui/core';
import React, { useState } from 'react';
import useStyles from './useStyles';
import { useSnackBar } from '../../context/useSnackbarContext';
import { Product } from '../../interface/Product';
import { List } from '../../interface/List';
import { getListProducts } from '../../helpers/APICalls/publicProfile';
import ProductTemplate from './ProductTemplate/ProductTemplate';

interface Props {
  list: List;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const PublicListProducts = ({ list, showModal, setShowModal }: Props): JSX.Element => {
  const classes = useStyles();

  const [listProducts, setlistProducts] = useState<Product[] | undefined>(undefined);

  const { updateSnackBarMessage } = useSnackBar();

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const flushDate = () => {
    setlistProducts(undefined);
  };

  const getProducts = () => {
    getListProducts(list._id).then((data) => {
      if (data.error) {
        updateSnackBarMessage(data.error.message);
        return;
      }

      if (data.success) {
        setlistProducts(data.success?.products || []);
      }
    });
  };

  return (
    <Grid>
      <CssBaseline />
      <Dialog
        onClose={handleCloseModal}
        open={showModal}
        PaperProps={{ elevation: 0 }}
        onEnter={getProducts}
        onExited={flushDate}
        scroll="paper"
      >
        <Grid item className={classes.modalHeader}>
          <Grid className={classes.closeModalButton}>
            <Icon onClick={handleCloseModal}>close</Icon>
          </Grid>
          <Typography className={classes.modalTitle} component="h1" variant="h5">
            {list.name}
            <Typography>{list.products?.length} item(s)</Typography>
          </Typography>
        </Grid>
        <DialogContent dividers>
          <Grid container>
            <Grid item xs>
              <Grid>
                {listProducts &&
                  listProducts.map((product, index) => {
                    return <ProductTemplate product={product} key={index} />;
                  })}
              </Grid>

              {!listProducts && <LinearProgress />}
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Grid>
  );
};

export default PublicListProducts;
