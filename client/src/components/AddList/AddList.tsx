import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import { Formik } from 'formik';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';
import { CircularProgress } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import { Icon, DialogActions, Grid, CssBaseline, Paper, IconButton } from '@material-ui/core';
import { addNewList } from '../../helpers/APICalls/lists';
import ImageUloader from '../ImageUploader/ImageUploader';
import { useState } from 'react';
import { uploadImage } from '../../helpers/APICalls/imageUpload';

interface Props {
  handleSubmit: () => void;
}

export default function AddList({ onClose }: any): JSX.Element {
  const classes = useStyles();
  const [currentImages, setCurrentImages] = useState<FileList>();

  const handleSubmit = async (data: any) => {
    //upload image
    const response = await uploadImage(currentImages);

    // get the url of image
    const url = response.images[0].secure_url;

    const listData = {
      name: data.name,
      url: url,
    };

    //add to object
    addNewList(listData);
    onClose();
  };

  const renderModalContent = () => {
    return (
      <Container component="main" style={{ minWidth: '670px' }} maxWidth="xs" className="bg-secondary">
        <Formik
          initialValues={{
            name: '',
          }}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit, handleChange, values, touched, errors, isSubmitting }) => (
            <form onSubmit={handleSubmit} className={classes.form} noValidate>
              <TextField
                id="name"
                label={<Typography className={classes.label}>Name</Typography>}
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  classes: { input: classes.inputs },
                }}
                name="name"
                autoComplete="name"
                autoFocus
                value={values.name}
                onChange={handleChange}
              />
              <Grid container>
                <Grid item xs>
                  <Typography className={classes.welcome} component="h1" variant="h5">
                    Add a cover
                  </Typography>
                </Grid>
              </Grid>
              <ImageUloader imageState={[currentImages, setCurrentImages]} />
              <Box textAlign="center">
                <Button type="submit" size="large" variant="contained" color="primary" className={classes.submit}>
                  {isSubmitting ? <CircularProgress style={{ color: 'white' }} /> : 'Add'}
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Container>
    );
  };

  return (
    <Grid container component="main">
      <CssBaseline />
      <Box className={classes.modalBoxContainer}>
        <Paper>
          <Grid className={classes.closeSignUpButton}>
            <IconButton onClick={onClose}>
              <Icon>close</Icon>
            </IconButton>
          </Grid>
          <Grid container>
            <Grid item xs>
              <Typography className={classes.welcome} component="h1" variant="h5">
                Add New List
              </Typography>
            </Grid>
          </Grid>
          {renderModalContent()}
        </Paper>
      </Box>
    </Grid>
  );
}
