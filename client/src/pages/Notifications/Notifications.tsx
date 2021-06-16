import useStyles from './useStyles';
import { useAuth } from '../../context/useAuthContext';
import { useSnackBar } from '../../context/useSnackbarContext';
import { useEffect, useState } from 'react';
import {
  CssBaseline,
  Grid,
  Paper,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Button,
  Box,
  Typography,
} from '@material-ui/core';
import NavBar from '../../components/NavBar/NavBar';
import { getFollowings, followUser, unfollowUser, getSuggestions } from '../../helpers/APICalls/followers';
import { Fragment } from 'react';

export default function Notifications(): JSX.Element {
  const classes = useStyles();
  const { loggedInUser } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();

  const [notificationsData, setNotificationsData] = useState([]);
  //fetch data
  useEffect(() => {
    getFollowingsData().then((data: any) => {
      setFollowingsList(data);
    });
  }, []);

  // followings data
  const setFollowingsList = (list: any) => {
    // setFollowingsData(list);
  };
  const getFollowingsData = async () => {
    return await getFollowings();
  };

  //follow button
  const handelFollowBtn = (username: string) => {
    followUserFunc(username);
  };
  const followUserFunc = async (username: string) => {
    const res = await followUser(username);
    if (res.success) {
      updateSnackBarMessage(`You are now Following ${username}`);
      // setDataChanged(true);
    }
  };

  const drawList = (data: any) => {
    if (data.length === 0) {
      return (
        <Box p={2}>
          <Typography>Nothing to see here</Typography>
        </Box>
      );
    }

    return (
      <List disablePadding className="listStyles">
        {data.map((value: any) => {
          const labelId = `checkbox-list-label-${value}`;

          return (
            <ListItem key={value._id} role={undefined} dense button onClick={() => console.log('list item pressed')}>
              <ListItemAvatar>
                <Avatar variant="square" alt={`Avatar n°1`} src={`/static/images/avatar/1.jpg`} />
              </ListItemAvatar>
              <ListItemText
                id={labelId}
                primary={<Typography className={classes.notificationTitle}>Item title {value.title}</Typography>}
                secondary={
                  <Fragment>
                    <Typography className={classes.notificationSubtitle}>subtitle {value.message}</Typography>
                    <Box className={classes.priceSection}>
                      <Typography className={classes.oldPrice}>$33{value.oldPrice}</Typography>
                      <Typography color="secondary" className={classes.newPrice}>
                        $43{value.newPrice}
                      </Typography>
                    </Box>
                  </Fragment>
                }
              />
            </ListItem>
          );
        })}
      </List>
    );
  };

  return (
    <Grid container component="main" className={`${classes.root}`}>
      <NavBar />
      <CssBaseline />
      <Box className={classes.cardBox}>
        <Typography align="center" variant="h5" className={classes.pageTitle}>
          Notifications
        </Typography>

        <Typography className={classes.notificationsSectionTitle}>New Prices!</Typography>
        <Paper square className={classes.tabContent} elevation={2}>
          {drawList([0, 1, 2])}
        </Paper>

        <Typography className={classes.notificationsSectionTitle}>Old Notifications</Typography>
        <Paper square className={classes.tabContent} elevation={2}>
          {drawList([0, 1, 2])}
        </Paper>
      </Box>
    </Grid>
  );
}
