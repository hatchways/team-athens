import { CssBaseline, Dialog, DialogContent, Grid, Icon, Typography, Fab } from '@material-ui/core';
import { useState } from 'react';
import useStyles from './useStyles';
import EditListForm from './EditListForm/EditListForm';
import { useSnackBar } from '../../context/useSnackbarContext';
import { List } from '../../interface/List';
import { uploadImage } from '../../helpers/APICalls/imageUpload';
import { updateList } from '../../helpers/APICalls/lists';

interface Props {
  list: List;
}

const EditList = ({ list }: Props): JSX.Element => {
  const classes = useStyles();
  const handleCloseEditListModal = () => {
    setShowEditListModal(false);
  };

  const { updateSnackBarMessage } = useSnackBar();

  const handleSubmit = async ({
    name,
    image,
    access,
    setSubmitting,
  }: {
    name: string;
    image: any;
    access: boolean;
    setSubmitting: (status: boolean) => void;
  }) => {
    //upload image
    if (image) {
      const response = await uploadImage(image);
      // get the url of image
      const url = response.images[0].secure_url;
      list.imageUrl = url;
    }

    list.name = name;
    list.isPrivate = access;

    console.log(list);

    updateList(list).then((data: { success: boolean; msg: string }) => {
      if (data.success) {
        setSubmitting(false);
        setShowEditListModal(false);
        updateSnackBarMessage(data.msg);
      } else {
        setSubmitting(false);
        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
    });
  };

  const [showEditListModal, setShowEditListModal] = useState(false);

  const openEditListModal = () => {
    setShowEditListModal(true);
  };

  return (
    <Grid>
      <Fab color="primary" component="span" onClick={openEditListModal} className={classes.addButton}>
        <Icon>edit</Icon>
      </Fab>

      <CssBaseline />
      <Dialog
        onClose={handleCloseEditListModal}
        open={showEditListModal}
        disableBackdropClick={true}
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
            <EditListForm handleSubmit={handleSubmit} list={list} />
          </Grid>
        </DialogContent>
      </Dialog>
    </Grid>
  );
};

export default EditList;
