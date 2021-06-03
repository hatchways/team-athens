import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { FormikHelpers } from 'formik';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';
import login from '../../helpers/APICalls/login';
import LoginForm from './LoginForm/LoginForm';
import AuthFooter from '../../components/AuthFooter/AuthFooter';
import { useAuth } from '../../context/useAuthContext';
import { useSnackBar } from '../../context/useSnackbarContext';
import { Dialog, DialogActions, DialogContent, Icon } from '@material-ui/core';
import React, { useState } from 'react';

export default function Login(): JSX.Element {
  const classes = useStyles();
  const { updateLoginContext } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();

  const handleSubmit = (
    { email, password }: { email: string; password: string },
    { setSubmitting }: FormikHelpers<{ email: string; password: string }>,
  ) => {
    login(email, password).then((data) => {
      if (data.error) {
        setSubmitting(false);
        updateSnackBarMessage(data.error.message);
      } else if (data.success) {
        updateLoginContext(data.success);
      } else {
        // should not get here from backend but this catch is for an unknown issue
        console.error({ data });

        setSubmitting(false);
        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
    });
  };

  const [open, setOpen] = React.useState(true);

  const handleOpenLoginModal = () => {
    setOpen(true);
  };

  const handleCloseLoginModal = () => {
    setOpen(false);
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
      >
        <DialogContent dividers>
          <Grid className={classes.closeLoginButton}>
            <Icon onClick={handleCloseLoginModal}>close</Icon>
          </Grid>
          <Grid container>
            <Grid item xs>
              <Typography className={classes.welcome} component="h1" variant="h5">
                Sign in
              </Typography>
            </Grid>
          </Grid>
          <LoginForm handleSubmit={handleSubmit} />
        </DialogContent>
        <DialogActions style={{ display: 'block' }}>
          <AuthFooter linkTo="/signup" asideText="Don't have an account?" linkText="Create account" />
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
