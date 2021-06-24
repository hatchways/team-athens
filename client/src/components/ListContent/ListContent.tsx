import { Box } from '@material-ui/core';
import { useState } from 'react';
import useStyles from './useStyles';
import { Grid } from '@material-ui/core';
import { useEffect } from 'react';
import Modal from '@material-ui/core/Modal';

export default function ListContent(props: any): JSX.Element {
  const classes = useStyles();

  const [productList, setProductList] = useState<any>([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    console.log('useEffect run');
  }, []);

  return (
    <Modal open={modalOpen}>
      <Grid>Nothing here</Grid>
    </Modal>
  );
}
