import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import CircularProgress from '@material-ui/core/CircularProgress';
import useStyles from './useStyles';
import { useAuth } from '../../context/useAuthContext';
import { useSocket } from '../../context/useSocketContext';
import { useHistory } from 'react-router-dom';
import ChatSideBanner from '../../components/ChatSideBanner/ChatSideBanner';
import { useEffect } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Paper } from '@material-ui/core';
import Image from 'material-ui-image';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import LogoImage from './../../Images/logo.png';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
export default function Dashboard(): JSX.Element {
  const classes = useStyles();

  const { loggedInUser } = useAuth();
  const { initSocket } = useSocket();

  const history = useHistory();

  useEffect(() => {
    initSocket();
  }, [initSocket]);

  if (loggedInUser === undefined) return <CircularProgress />;
  if (!loggedInUser) {
    history.push('/login');
    // loading for a split seconds until history.push works
    return <CircularProgress />;
  }

  return (
    <Grid container component="main" className={`${classes.root} ${classes.dashboard}`}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar className={classes.customizeToolbar}>
          <Typography className={classes.logo}>Deals Mate</Typography>
          <Box className={classes.headerButtonGroup}>
            <Button color="inherit">Shopping List</Button>
            <Button color="inherit">Friends</Button>
            <Button color="inherit">
              <Badge variant="dot" color="secondary" invisible={false}>
                Notifications
              </Badge>
            </Button>
          </Box>
          <Box className={classes.userPanel}>
            <Avatar alt="Profile Image" />
            <Typography variant="h5" className={classes.userText}>
              {loggedInUser.username}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      {/* <Paper>
        <Image src={LogoImage} />
      </Paper> */}
      {/* <Grid item className={classes.drawerWrapper}> */}
      {/* <ChatSideBanner loggedInUser={loggedInUser} /> */}
      {/* </Grid> */}

      {/* <Paper variant="outlined">
        <Image src={LogoImage} className={classes.logo} />
      </Paper> */}
    </Grid>
  );
}
