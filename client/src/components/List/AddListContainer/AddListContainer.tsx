import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { FormikHelpers } from 'formik';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';
import AddListComponent from '../AddListComponent/AddListComponent';
import React, { useState } from 'react';
import { Dialog, DialogContent, Icon, DialogActions } from '@material-ui/core';

export default function Register(props: AddListProps): JSX.Element {
  const classes = useStyles();

  const [open, setOpen] = React.useState(true);

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    props.onClose();
  };

  const handleSubmit = () => {
    console.log('');
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Dialog
        onClose={handleCloseModal}
        open={open}
        // disableBackdropClick={true}
        disableEscapeKeyDown={true}
        // PaperProps={{ elevation: 0 }}
        maxWidth={'lg'}
        classes={{ paper: classes.dialogPaper }}
      >
        <DialogContent dividers>
          <Grid className={classes.closeSignUpButton}>
            <Icon onClick={handleCloseModal}>close</Icon>
          </Grid>
          <Grid container>
            <Grid item xs>
              <Typography className={classes.welcome} component="h1" variant="h5">
                Add New List
              </Typography>
            </Grid>
          </Grid>
          <AddListComponent handleSubmit={handleSubmit} />
        </DialogContent>
        <DialogActions style={{ display: 'block' }}></DialogActions>
      </Dialog>
    </Grid>
  );
}

interface AddListProps {
  onClose: () => void;
}
