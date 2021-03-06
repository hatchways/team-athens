import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';
import { CircularProgress } from '@material-ui/core';
import LogInWithDemoUser from '../../../components/LoginWithDemoUser/LogInWithDemoUser';

interface Props {
  handleSubmit: (
    {
      email,
      password,
    }: {
      email: string;
      password: string;
    },
    {
      setStatus,
      setSubmitting,
    }: FormikHelpers<{
      email: string;
      password: string;
    }>,
  ) => void;
}

export default function Login({ handleSubmit }: Props): JSX.Element {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().required('Email is required').email('Email is not valid'),
        password: Yup.string()
          .required('Password is required')
          .max(100, 'Password is too long')
          .min(6, 'Password too short'),
      })}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit, handleChange, values, touched, errors, isSubmitting }) => (
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          <TextField
            id="email"
            label={<Typography className={classes.label}>Your e-mail address</Typography>}
            fullWidth
            margin="normal"
            InputProps={{
              classes: { input: classes.inputs, underline: classes.inputsUnderline },
            }}
            InputLabelProps={{
              classes: {
                root: classes.inputLabelRoot,
                shrink: classes.inputLabelShrink,
                formControl: classes.inputLabelFormControl,
              },
            }}
            name="email"
            autoComplete="email"
            autoFocus
            helperText={touched.email ? errors.email : ''}
            error={touched.email && Boolean(errors.email)}
            value={values.email}
            onChange={handleChange}
            placeholder="E-mail"
          />
          <TextField
            id="password"
            label={<Typography className={classes.label}>Password</Typography>}
            fullWidth
            margin="normal"
            InputProps={{
              classes: { input: classes.inputs, underline: classes.inputsUnderline },
            }}
            InputLabelProps={{
              classes: {
                root: classes.inputLabelRoot,
                shrink: classes.inputLabelShrink,
                formControl: classes.inputLabelFormControl,
              },
              shrink: true,
            }}
            type="password"
            autoComplete="current-password"
            helperText={touched.password ? errors.password : ''}
            error={touched.password && Boolean(errors.password)}
            value={values.password}
            onChange={handleChange}
            placeholder="Password"
          />
          <Box textAlign="center">
            <Button type="submit" size="large" variant="contained" color="primary" className={classes.submit}>
              {isSubmitting ? <CircularProgress style={{ color: 'white' }} /> : 'Login'}
            </Button>
            <LogInWithDemoUser />
          </Box>
        </form>
      )}
    </Formik>
  );
}
