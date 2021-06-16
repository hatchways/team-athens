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
                <Avatar alt={`Avatar n°1`} src={`/static/images/avatar/1.jpg`} />
              </ListItemAvatar>
              <ListItemText id={labelId} primary={`${value.username}`} />
              <ListItemSecondaryAction>
                <Button
                  variant="contained"
                  color="default"
                  className={classes.followButton}
                  disableElevation
                  onClick={() => console.log('botton click')}
                >
                  Read
                </Button>
              </ListItemSecondaryAction>
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
        <Paper square className={classes.tabContent} elevation={2}>
          {drawList([])}
        </Paper>
      </Box>
    </Grid>
  );
}
