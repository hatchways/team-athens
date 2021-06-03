import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { FormikHelpers } from 'formik';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';
import register from '../../helpers/APICalls/register';
import SignUpForm from './SignUpForm/SignUpForm';
import AuthFooter from '../../components/AuthFooter/AuthFooter';
import { useAuth } from '../../context/useAuthContext';
import { useSnackBar } from '../../context/useSnackbarContext';
import React, { useState } from 'react';
import { Dialog, DialogContent, Icon, DialogActions } from '@material-ui/core';

export default function Register(): JSX.Element {
  const classes = useStyles();
  const { updateLoginContext } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();

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
    register(username, email, password).then((data) => {
      if (data.error) {
        console.error({ error: data.error.message });
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
          <Grid className={classes.closeSignUpButton}>
            <Icon onClick={handleCloseLoginModal}>close</Icon>
          </Grid>
          <Grid container>
            <Grid item xs>
              <Typography className={classes.welcome} component="h1" variant="h5">
                Sign up
              </Typography>
            </Grid>
          </Grid>
          <SignUpForm handleSubmit={handleSubmit} />
        </DialogContent>
        <DialogActions style={{ display: 'block' }}>
          <AuthFooter linkTo="/login" asideText="Already a memeber?" linkText="Sign in" />
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
