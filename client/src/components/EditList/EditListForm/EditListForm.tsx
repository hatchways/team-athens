import { Formik, FormikHelpers } from 'formik';
import useStyles from './useStyles';
import * as Yup from 'yup';
import { Box, Button, CircularProgress, Grid, TextField, Typography } from '@material-ui/core';
import { List } from '../../../interface/List';
import ImageUloader from '../../ImageUploader/ImageUploader';
import { useState } from 'react';
import ToggleListAccess from '../../ToggleListAccess/ToggleListAccess';

interface Props {
  handleSubmit: ({
    name,
    image,
    access,
    setSubmitting,
  }: {
    name: string;
    image: any;
    access: boolean;
    setSubmitting: (status: boolean) => void;
  }) => void;
  list: List;
}

const EditListForm = ({ list, handleSubmit }: Props): JSX.Element => {
  const classes = useStyles();
  const [currentImages, setCurrentImages] = useState<File[]>();
  const [listAccess, setListAccess] = useState<boolean>(list.private || false);

  const submitForm = ({ name }: { name: string }, { setSubmitting }: FormikHelpers<{ name: string }>) => {
    handleSubmit({ name, image: currentImages, access: listAccess, setSubmitting });
  };

  return (
    <Formik
      initialValues={{
        name: list.name,
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().required('List name is required'),
      })}
      onSubmit={submitForm}
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

          <Box className={classes.uploadBox}>
            <Typography className={classes.label}>
              Add a cover (click image to change it or drag new image over it)
            </Typography>
            <ImageUloader setCurrentFiles={setCurrentImages} defaultImage={list.imageUrl} />
          </Box>

          <ToggleListAccess listAccess={listAccess} setListAccess={setListAccess} />

          <Box textAlign="center">
            <Button type="submit" size="large" variant="contained" color="primary" className={classes.submit}>
              {isSubmitting ? <CircularProgress style={{ color: 'white' }} /> : 'Save'}
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default EditListForm;
