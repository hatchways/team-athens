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

export default function Followers(): JSX.Element {
  const classes = useStyles();
  const { loggedInUser } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();

  const [tabValue, setTabValue] = useState(0);
  const [followingsData, setFollowingsData] = useState([]);
  const [followSugestionsData, setFollowSugestionsData] = useState([]);
  const [dataChanged, setDataChanged] = useState(false);
  const handleTabChange = (event: any, newValue: number) => {
    setTabValue(newValue);
  };
  //fetch data
  useEffect(() => {
    getFollowingsData().then((data: any) => {
      setFollowingsList(data);
    });
    getFollowSugestionsData().then((data: any) => {
      setFollowSugestionsList(data);
    });
    setDataChanged(false); //reset flag
  }, [dataChanged]);

  // followings data
  const setFollowingsList = (list: any) => {
    setFollowingsData(list);
  };
  const getFollowingsData = async () => {
    return await getFollowings(loggedInUser?.username);
  };
  // follow suggetions data
  const getFollowSugestionsData = async () => {
    return await getSuggestions(loggedInUser?.username);
  };
  const setFollowSugestionsList = (list: any) => {
    setFollowSugestionsData(list);
  };

  //follow button
  const handelFollowBtn = (username: string) => {
    followUserFunc(username);
  };
  const followUserFunc = async (username: string) => {
    const res = await followUser(loggedInUser?.username, username);
    if (res.success) {
      updateSnackBarMessage(`You are now Following ${username}`);
      setDataChanged(true);
    }
  };
  //unfollow button
  const handelUnfollowBtn = (username: string) => {
    unfollowUserFunc(username);
  };
  const unfollowUserFunc = async (username: string) => {
    const res = await unfollowUser(loggedInUser?.username, username);
    if (res.success) {
      updateSnackBarMessage(`You have Unfollowed ${username}`);
      setDataChanged(true);
    }
  };

  const drawList = (data: any) => {
    const buttonText = tabValue === 0 ? 'Unfollow' : 'Follow';

    return (
      <List disablePadding className="listStyles">
        {data.map((value: any) => {
          const labelId = `checkbox-list-label-${value}`;
          const buttonFunction =
            tabValue === 0 ? () => handelUnfollowBtn(value.username) : () => handelFollowBtn(value.username);

          return (
            <ListItem key={value._id} role={undefined} dense button onClick={() => console.log('list item pressed')}>
              <ListItemAvatar>
                <Avatar alt={`Avatar n°${tabValue + 1}`} src={`/static/images/avatar/${tabValue + 1}.jpg`} />
              </ListItemAvatar>
              <ListItemText id={labelId} primary={`${value.username}`} />
              <ListItemSecondaryAction>
                <Button
                  variant="contained"
                  color="default"
                  className={classes.followButton}
                  disableElevation
                  onClick={buttonFunction}
                >
                  {buttonText}
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
          Friends
        </Typography>
        <Tabs
          value={tabValue}
          indicatorColor="secondary"
          onChange={handleTabChange}
          aria-label="socials tabs"
          variant="fullWidth"
        >
          <Tab label="Following" />
          <Tab label="Suggested" />
        </Tabs>
        <Paper square className={classes.tabContent} elevation={2}>
          {tabValue === 0 ? drawList(followingsData) : drawList(followSugestionsData)}
        </Paper>
      </Box>
    </Grid>
  );
}
