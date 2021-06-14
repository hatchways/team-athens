import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import CircularProgress from '@material-ui/core/CircularProgress';
import useStyles from './useStyles';
import { useAuth } from '../../context/useAuthContext';
import { useSocket } from '../../context/useSocketContext';
import { useHistory } from 'react-router-dom';
import ChatSideBanner from '../../components/ChatSideBanner/ChatSideBanner';
import { useEffect, useState } from 'react';

import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

import NavBar from '../../components/NavBar/NavBar';
import { Typography } from '@material-ui/core';

export default function Followers(): JSX.Element {
  const classes = useStyles();

  // const { loggedInUser } = useAuth();

  const [tabValue, setTabValue] = useState(0);
  const [checked, setChecked] = useState([1]);

  const handleChange = (event: any, newValue: number) => {
    setTabValue(newValue);
  };
  const handleToggle = (tabValue: number) => () => {
    const currentIndex = checked.indexOf(tabValue);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(tabValue);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const generateListItem = (labelId: string) => {
    return (
      <List disablePadding className="listStyles">
        <ListItem divider key={tabValue} button className={classes.listItem}>
          <ListItemAvatar>
            <Avatar alt={`Avatar n°${tabValue + 1}`} src={`/static/images/avatar/${tabValue + 1}.jpg`} />
          </ListItemAvatar>
          <ListItemText id={labelId} primary={`Line item ${tabValue + 1}`} />
          <ListItemSecondaryAction>
            <Button variant="contained" color="default" className={classes.followButton} disableElevation>
              Follow
            </Button>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    );
  };

  const drawFollowing = () => {
    // get followings array

    //

    const list = [0, 1, 2, 3].map((tabValue) => {
      const labelId = `checkbox-list-secondary-label-`;
      return generateListItem(labelId);
    });

    return list;
  };

  const drawSuggested = () => {
    const list = [0, 1, 2, 3].map((tabValue) => {
      const labelId = `checkbox-list-secondary-label-`;
      return generateListItem(labelId);
    });

    return list;
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
          onChange={handleChange}
          aria-label="socials tabs"
          variant="fullWidth"
        >
          <Tab label="Following" />
          <Tab label="Suggested" />
        </Tabs>
        <Paper square className={classes.tabContent} elevation={2}>
          {tabValue === 0 ? drawFollowing() : drawSuggested()}
        </Paper>
      </Box>
    </Grid>
  );
}
