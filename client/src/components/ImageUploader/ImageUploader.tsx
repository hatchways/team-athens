import LinearProgress from '@material-ui/core/LinearProgress';
import { Box, Typography, Button, ListItem, withStyles } from '@material-ui/core';
import { useState } from 'react';
import useStyles from './useStyles';
import { Grid } from '@material-ui/core';
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';
import { IconButton } from '@material-ui/core';

export default function ImageUloader(props: any): JSX.Element {
  const classes = useStyles();

  const [currentFile, setCurrentFile] = useState({ name: '' });

  const [previewImage, setPreviewImage] = props.imageState;

  const selectFile = async (event: any) => {
    const file = event.target.files[0];
    if (!file) return;
    setCurrentFile(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const uploadImageButton = () => {
    return (
      <Box className={classes.uploadButton}>
        <input
          id="icon-button-file"
          name="btn-upload"
          style={{ display: 'none' }}
          type="file"
          accept="image/*"
          onChange={selectFile}
        />
        <label htmlFor="icon-button-file">
          <IconButton aria-label="upload picture" component="span">
            <InsertPhotoIcon className={classes.imageIcon} />
          </IconButton>
        </label>
      </Box>
    );
  };

  const displayPreview = () => {
    return (
      <>
        <Box className={classes.imagePreview}>
          <img className={classes.image} src={previewImage} alt="preview image" />
        </Box>
        <div className="file-name">{currentFile ? currentFile.name : null}</div>
      </>
    );
  };

  return <Grid className={classes.root}>{currentFile.name === '' ? uploadImageButton() : displayPreview()}</Grid>;
}
