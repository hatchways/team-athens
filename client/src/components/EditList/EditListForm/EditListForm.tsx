import { Formik, FormikHelpers } from 'formik';
import useStyles from './useStyles';
import * as Yup from 'yup';
import { Box, Button, CircularProgress, TextField, Typography } from '@material-ui/core';
import { List } from '../../../interface/List';

interface Props {
  handleSubmit: (
    {
      name,
    }: {
      name: string;
    },
    {
      setStatus,
      setSubmitting,
    }: FormikHelpers<{
      name: string;
    }>,
  ) => void;
  list: List;
}

const EditListForm = ({ list, handleSubmit }: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        name: list.name,
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().required('List name is required'),
      })}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit, handleChange, values, touched, errors, isSubmitting }) => (
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          <TextField
            id="name"
            label={<Typography className={classes.label}>List name:</Typography>}
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
            name="name"
            autoFocus
            helperText={touched.name ? errors.name : ''}
            error={touched.name && Boolean(errors.name)}
            value={values.name}
            onChange={handleChange}
            placeholder="Enter the list name here"
          />
          <Box textAlign="center">
            <Button type="submit" size="large" variant="contained" color="primary" className={classes.submit}>
              {isSubmitting ? <CircularProgress style={{ color: 'white' }} /> : 'Add item'}
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default EditListForm;
