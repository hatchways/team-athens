import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { FormikHelpers } from 'formik';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';
// import register from '../../helpers/APICalls/register';
import AddListComponent from '../AddListComponent/AddListComponent';
// import AuthFooter from '../../components/AuthFooter/AuthFooter';
// import { useAuth } from '../../context/useAuthContext';
// import { useSnackBar } from '../../context/useSnackbarContext';
import React, { useState } from 'react';
import { Dialog, DialogContent, Icon, DialogActions } from '@material-ui/core';

export default function Register(): JSX.Element {
  const classes = useStyles();

  const [open, setOpen] = React.useState(true);

  const handleOpenLoginModal = () => {
    setOpen(true);
  };

  const handleCloseLoginModal = () => {
    setOpen(false);
  };

  const handleSubmit = (
    { username, email, password }: { email: string; password: string; username: string },
    { setSubmitting }: FormikHelpers<{ email: string; password: string; username: string }>,
  ) => {
    console.log('');
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Dialog
        onClose={handleCloseLoginModal}
        open={open}
        disableBackdropClick={true}
        disableEscapeKeyDown={true}
        PaperProps={{ elevation: 0 }}
        maxWidth={'lg'}
        classes={{ paper: classes.dialogPaper }}
        // style={{ minHeight: '300px' }}
      >
        <DialogContent dividers className="lmapo">
          <Grid className={classes.closeSignUpButton}>
            <Icon onClick={handleCloseLoginModal}>close</Icon>
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
