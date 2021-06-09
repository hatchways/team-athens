import { Formik, FormikHelpers } from 'formik';
import useStyles from './useStyles';
import * as Yup from 'yup';
import { Box, Button, CircularProgress, MenuItem, TextField, Typography } from '@material-ui/core';

interface Props {
  handleSubmit: (
    {
      productUrl,
      listId,
    }: {
      productUrl: string;
      listId: string;
    },
    {
      setStatus,
      setSubmitting,
    }: FormikHelpers<{
      productUrl: string;
      listId: string;
    }>,
  ) => void;
  productLists: any[] | undefined;
  setListId: React.Dispatch<React.SetStateAction<string>>;
}

const AddProductForm = ({ handleSubmit, productLists, setListId }: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        productUrl: '',
        listId: '',
      }}
      validationSchema={Yup.object().shape({
        productUrl: Yup.string().required('Product url is required'),
        listId: Yup.string().required('Please select a list for the product'),
      })}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit, handleChange, values, touched, errors, isSubmitting }) => (
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          <TextField
            id="email"
            label={<Typography className={classes.label}>Past link to item:</Typography>}
            fullWidth
            margin="normal"
            InputProps={{
              classes: { input: classes.inputs, underline: classes.inputsUnderline },
            }}
            name="productUrl"
            autoFocus
            helperText={touched.productUrl ? errors.productUrl : ''}
            error={touched.productUrl && Boolean(errors.productUrl)}
            value={values.productUrl}
            onChange={handleChange}
            placeholder="Past your link here"
          />
          <TextField
            id="email"
            label={<Typography className={classes.label}>Past link to item:</Typography>}
            fullWidth
            margin="normal"
            InputProps={{
              classes: { input: classes.inputs, underline: classes.inputsUnderline },
            }}
            name="listId"
            autoFocus
            helperText={touched.listId ? errors.listId : ''}
            error={touched.listId && Boolean(errors.listId)}
            value={values.listId}
            onChange={handleChange}
            placeholder="Past your link here"
            select
          >
            {productLists?.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
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

export default AddProductForm;
