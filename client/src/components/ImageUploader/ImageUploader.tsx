import { Box } from '@material-ui/core';
import { useState } from 'react';
import useStyles from './useStyles';
import { Grid } from '@material-ui/core';
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';
import { useDropzone } from 'react-dropzone';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';
interface Props {
  setCurrentFiles: any;
  defaultImage: string | undefined;
}

export default function ImageUloader({ setCurrentFiles, defaultImage }: Props): JSX.Element {
  const classes = useStyles();

  const [previewImage, setPreviewImage] = useState(defaultImage);

  const onDrop = (acceptedFiles: any) => {
    setFile(acceptedFiles);
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const setFile = (files: any[]) => {
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
          ) : !previewImage ? (
            <InsertPhotoIcon className={classes.imageIcon} />
          ) : (
            <img className={classes.defaultImage} src={previewImage} alt="preview image" />
          )}
        </label>
      </Box>
    );
  };

  return <Grid>{uploadImageButton()}</Grid>;
}
