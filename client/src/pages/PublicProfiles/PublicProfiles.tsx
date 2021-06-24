import { Typography } from '@material-ui/core';
import { CssBaseline, Grid } from '@material-ui/core';
import { useEffect } from 'react';
import { useState } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import PublicListProducts from '../../components/PublicListProducts/PublicListProducts';
import { useSnackBar } from '../../context/useSnackbarContext';
import { getPubicLists } from '../../helpers/APICalls/publicProfile';
import { List } from '../../interface/List';
import PublicListTemplate from './PublicListTemplate/PublicListTemplate';
import useStyles from './useStyles';

const PublicProfiles = (): JSX.Element => {
  const classes = useStyles();
  const [publicLists, setPublicLists] = useState<List[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const { updateSnackBarMessage } = useSnackBar();
  const [selectedList, setSelectedList] = useState<List | undefined>(undefined);

  useEffect(() => {
    getPubicLists().then((data) => {
      if (data.error) {
        updateSnackBarMessage('Error occurs while getting public lists');
        return;
      }

      if (data.success) {
        setPublicLists(data.lists || []);
      }
    });
  }, []);

  const selectList = (list: List) => {
    setSelectedList(list);
    setShowModal(true);
  };

  return (
    <Grid container component="main" className={`${classes.root}`}>
      <CssBaseline />
      <NavBar />

      <Grid className={classes.pageContent} md={11} lg={10} xl={9}>
        <Grid className={classes.shoppingListsContentArea}>
          <Typography variant="h5" align={'left'} className={classes.shoppingListsTitle}>
            Public Lists
          </Typography>

          <Grid
            container
            className={classes.cardsContainer}
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            spacing={2}
          >
            {publicLists.length > 0 &&
              publicLists.map(function (list, index) {
                return <PublicListTemplate key={index} list={list} handleClick={selectList} />;
              })}

            {publicLists.length == 0 && <Typography variant="h4">Public lists unavailable at this moment</Typography>}

            {selectedList && (
              <PublicListProducts list={selectedList} showModal={showModal} setShowModal={setShowModal} />
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PublicProfiles;
