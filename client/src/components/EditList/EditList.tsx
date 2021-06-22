import { CssBaseline, Dialog, DialogContent, Grid, Icon, Typography, Button } from '@material-ui/core';
import { useState } from 'react';
import useStyles from './useStyles';
import { FormikHelpers } from 'formik';
import AddProductForm from './EditListForm/EditListForm';
import { useSnackBar } from '../../context/useSnackbarContext';
import { ListApiData } from '../../interface/ListApiData';
import { List } from '../../interface/List';

interface Props {
  list: List;
}

const EditList = ({ list }: Props): JSX.Element => {
  const classes = useStyles();
  const handleCloseEditListModal = () => {
    setShowEditListModal(false);
  };

  const { updateSnackBarMessage } = useSnackBar();

  const handleSubmit = ({ name }: { name: string }, { setSubmitting }: FormikHelpers<{ name: string }>) => {
    // Get detail of the product from the api
    // productDetails(productUrl).then((data: ProductDetailApiData) => {
    //   if (data.error) {
    //     setSubmitting(false);
    //     updateSnackBarMessage(data.error.message);
    //   } else if (data.success) {
    //     setSubmitting(false);
    //   } else {
    //     setSubmitting(false);
    //     updateSnackBarMessage('An unexpected error occurred. Please try again');
    //   }
    // });
  };

  const [showEditListModal, setShowEditListModal] = useState(false);

  const openEditListModal = () => {
    setShowEditListModal(true);
  };

  return (
    <Grid>
      <Button onClick={openEditListModal} className={classes.addButton} variant="contained" color="primary">
        Edit List
      </Button>
      <CssBaseline />
      <Dialog
        onClose={handleCloseEditListModal}
        open={showEditListModal}
        disableBackdropClick={true}
        disableEscapeKeyDown={true}
        PaperProps={{ elevation: 0 }}
      >
        <DialogContent dividers>
          <Grid className={classes.closeModalButton}>
            <Icon onClick={handleCloseEditListModal}>close</Icon>
          </Grid>
          <Grid container>
            <Grid item xs>
              <Typography className={classes.modalTitle} component="h1" variant="h5">
                Edit List
              </Typography>
            </Grid>
            <AddProductForm handleSubmit={handleSubmit} list={list} />
          </Grid>
        </DialogContent>
      </Dialog>
    </Grid>
  );
};

export default EditList;
