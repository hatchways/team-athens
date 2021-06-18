import React from 'react';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import CircularProgress from '@material-ui/core/CircularProgress';
import useStyles from './useStyles';
import { useAuth } from '../../context/useAuthContext';
import { useSocket } from '../../context/useSocketContext';
import { useHistory } from 'react-router-dom';

import ChatSideBanner from '../../components/ChatSideBanner/ChatSideBanner';
import { useEffect, useState } from 'react';
import Modal from '@material-ui/core/Modal';
import AddProduct from '../../components/AddProduct/AddProduct';
import { Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import AddIcon from '@material-ui/icons/Add';

import ClothesImage from '../../Images/clothes.png';
import FurnitureImage from '../../Images/furniture.png';
import LuxuryImage from '../../Images/luxury.png';

import NavBar from './NavBar/NavBar';
import AddLinkForm from './AddLinkForm/AddLinkForm';
import ShoppingListCard from './ShoppingListCard/ShoppingListCard';
import AddListComponent from '../../components/List/AddListComponent/AddListComponent';

export default function Dashboard(): JSX.Element {
  const classes = useStyles();

  const { loggedInUser } = useAuth();
  const { initSocket } = useSocket();

  const history = useHistory();

  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [addListModalOpen, setAddListModalOpen] = React.useState(false);

  const openAddProductModal = () => {
    setShowAddProductModal(true);
  };

  useEffect(() => {
    initSocket();
  }, [initSocket]);

  const handleModalClose = () => {
    setAddListModalOpen(false);
  };
  const handleModalOpen = () => {
    setAddListModalOpen(true);
  };

  if (loggedInUser === undefined) return <CircularProgress />;
  if (!loggedInUser) {
    history.push('/login');
    // loading for a split seconds until history.push works
    return <CircularProgress />;
  }

  return (
    <Grid container component="main" className={`${classes.root} ${classes.dashboard}`}>
      <CssBaseline />
      <NavBar loggedInUser={loggedInUser} />

      <Grid className={classes.pageContent} md={11} lg={10} xl={9}>
        <AddLinkForm />

        <Grid className={classes.shoppingListsContentArea}>
          <Typography variant="h5" align={'left'} className={classes.shoppingListsTitle}>
            My Shopping Lists:
          </Typography>

          <Grid
            container
            className={classes.cardsContainer}
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            spacing={2}
          >
            <ShoppingListCard title="Clothes" itemCount={34} image={ClothesImage} />
            <ShoppingListCard title="Furniture" itemCount={12} image={FurnitureImage} />
            <ShoppingListCard title="Luxury" itemCount={8} image={LuxuryImage} />
            <Grid item>
              <Card className={classes.shoppingListCard}>
                <CardActionArea className={classes.shoppingListButton} onClick={() => handleModalOpen()}>
                  <Grid>
                    <AddIcon color="secondary" className={classes.addNewListIcon} />
                  </Grid>
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="h2" align={'center'}>
                      ADD NEW LIST
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid>
        <Button onClick={openAddProductModal}>Add Product</Button>
        <AddProduct showAddProductModal={showAddProductModal} setShowAddProductModal={setShowAddProductModal} />
      </Grid>

      <Modal open={addListModalOpen} onClose={handleModalClose}>
        <AddListComponent onClose={handleModalClose} />
      </Modal>
    </Grid>
  );
}
