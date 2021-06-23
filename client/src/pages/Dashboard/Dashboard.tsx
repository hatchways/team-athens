import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import CircularProgress from '@material-ui/core/CircularProgress';
import useStyles from './useStyles';
import { useAuth } from '../../context/useAuthContext';
import { useSocket } from '../../context/useSocketContext';
import { useHistory } from 'react-router-dom';

import ChatSideBanner from '../../components/ChatSideBanner/ChatSideBanner';
import { useEffect, useState } from 'react';
import AddProduct from '../../components/AddProduct/AddProduct';
import { Button, Modal } from '@material-ui/core';

import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import AddIcon from '@material-ui/icons/Add';

import ClothesImage from '../../Images/clothes.png';
import FurnitureImage from '../../Images/furniture.png';
import LuxuryImage from '../../Images/luxury.png';

import NavBar from '../../components/NavBar/NavBar';
import AddLinkForm from './AddLinkForm/AddLinkForm';
import ShoppingListCard from './ShoppingListCard/ShoppingListCard';

import AddList from '../../components/AddList/AddList';

import { List } from '../../interface/List';
import { getAllLists } from '../../helpers/APICalls/lists';
import { useSnackBar } from '../../context/useSnackbarContext';

export default function Dashboard(): JSX.Element {
  const classes = useStyles();
  const { updateSnackBarMessage } = useSnackBar();

  const { loggedInUser } = useAuth();
  const { initSocket } = useSocket();

  const history = useHistory();

  const [showAddProductModal, setShowAddProductModal] = useState(false);

  const [addListModalOpen, setAddListModalOpen] = useState(false);
  const [lists, setLists] = useState<List[]>([]);

  const openAddProductModal = () => {
    setShowAddProductModal(true);
  };

  useEffect(() => {
    initSocket();
    getListsData();
  }, [initSocket]);

  if (loggedInUser === undefined) return <CircularProgress />;
  if (!loggedInUser) {
    history.push('/login');
    // loading for a split seconds until history.push works
    return <CircularProgress />;
  }

  const getListsData = async () => {
    const result = await getAllLists();
    if (result.success) {
      setLists(result.lists);
    } else {
      updateSnackBarMessage('Failed to update lists');
    }
  };

  const handleModalClose = () => {
    setAddListModalOpen(false);
    getListsData(); // update lists
  };
  const handleModalOpen = () => {
    setAddListModalOpen(true);
  };

  return (
    <Grid container component="main" className={`${classes.root} ${classes.dashboard}`}>
      <CssBaseline />
      <NavBar />

      <Grid className={classes.pageContent} md={11} lg={10} xl={9}>
        <AddLinkForm listData={lists} updateLists={getListsData} />

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
            {lists.map((list: List) => {
              return (
                <ShoppingListCard
                  key={list._id}
                  title={list.name}
                  itemCount={list.products.length}
                  image={ClothesImage}
                />
              );
            })}

            {/* Add new list button */}
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
        <AddList onClose={handleModalClose} />
      </Modal>
    </Grid>
  );
}
