import { Box } from '@material-ui/core';
import { useState } from 'react';
import useStyles from './useStyles';
import { Grid } from '@material-ui/core';
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';
import { IconButton } from '@material-ui/core';

export default function ImageUloader(props: any): JSX.Element {
  const classes = useStyles();

  const [currentFiles, setCurrentFiles] = props.imageState;

  const [previewImage, setPreviewImage] = useState('');
  const [fileChosen, setFileChosen] = useState(false);

  const selectFile = async (event: any) => {
    const file = event.target.files[0];
    if (!file) return;
    setFileChosen(true);
    setCurrentFiles(event.target.files);
    setPreviewImage(URL.createObjectURL(file));
  };

  const uploadImageButton = () => {
    return (
      <Box className={classes.uploadButton}>
        <input id="icon-button-file" style={{ display: 'none' }} type="file" accept="image/*" onChange={selectFile} />
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
        <div className="file-name">{fileChosen === true ? currentFiles[0].name : ''}</div>
      </>
    );
  };

  return <Grid className={classes.root}>{fileChosen === false ? uploadImageButton() : displayPreview()}</Grid>;
}
