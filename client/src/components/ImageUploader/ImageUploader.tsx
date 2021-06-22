import { Box } from '@material-ui/core';
import { useState } from 'react';
import useStyles from './useStyles';
import { Grid } from '@material-ui/core';
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';
import { useDropzone } from 'react-dropzone';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';

export default function ImageUloader(props: any): JSX.Element {
  const classes = useStyles();

  const [currentFiles, setCurrentFiles] = props.imageState;

  const [previewImage, setPreviewImage] = useState('');
  const [fileChosen, setFileChosen] = useState(false);

  const onDrop = (acceptedFiles: any) => {
    setFile(acceptedFiles);
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const setFile = (files: any[]) => {
    setFileChosen(true);
    setCurrentFiles(files);
    setPreviewImage(URL.createObjectURL(files[0]));
  };

  const uploadImageButton = () => {
    return (
      <Box className={classes.uploadButton}>
        <input {...getInputProps()} style={{ display: 'none' }} type="file" accept="image/*" />
        <label {...getRootProps()}>
          {isDragActive ? (
            <SystemUpdateAltIcon className={classes.imageIcon} />
          ) : (
            <InsertPhotoIcon className={classes.imageIcon} />
          )}
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
      </>
    );
  };

  return <Grid>{fileChosen === false ? uploadImageButton() : displayPreview()}</Grid>;
}
