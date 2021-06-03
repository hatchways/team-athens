import { Box, Button, CircularProgress, TextField } from '@material-ui/core';
import { useState } from 'react';
import { useAuth } from '../../context/useAuthContext';
import { useSnackBar } from '../../context/useSnackbarContext';
import login from '../../helpers/APICalls/login';

export default function LogInWithDemoUser(): JSX.Element {
  const { updateLoginContext } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();
  const [isSubmitting, setSubmitting] = useState(false);

  const autoLogin = () => {
    const { email, password } = {
      email: 'demo.user@hatchways.io',
      password: 'demoPassword',
    };
    setSubmitting(true);

    login(email, password).then((data) => {
      if (data.error) {
        setSubmitting(false);
        updateSnackBarMessage(data.error.message);
      } else if (data.success) {
        updateLoginContext(data.success);
      } else {
        setSubmitting(false);
        // should not get here from backend but this catch is for an unknown issue
        console.error({ data });
        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
    });
  };

  return (
    <Box>
      <Button type="button" size="large" variant="contained" color="primary" onClick={autoLogin}>
        {isSubmitting ? <CircularProgress style={{ color: 'white' }} /> : 'Login For Demo'}
      </Button>
    </Box>
  );
}
