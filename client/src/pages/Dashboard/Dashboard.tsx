import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import CircularProgress from '@material-ui/core/CircularProgress';
import useStyles from './useStyles';
import { useAuth } from '../../context/useAuthContext';
import { useSocket } from '../../context/useSocketContext';
import { useHistory } from 'react-router-dom';
import ChatSideBanner from '../../components/ChatSideBanner/ChatSideBanner';
import { useEffect, useState } from 'react';

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
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

export default function Dashboard(): JSX.Element {
  const classes = useStyles();
  const [age, setAge] = useState('');

  const { loggedInUser } = useAuth();
  const { initSocket } = useSocket();

  const history = useHistory();

  useEffect(() => {
    initSocket();
  }, [initSocket]);

  const handleChange = (event: any) => {
    setAge(event.target.value);
  };

  if (loggedInUser === undefined) return <CircularProgress />;
  if (!loggedInUser) {
    history.push('/login');
    // loading for a split seconds until history.push works
    return <CircularProgress />;
  }
  // 550 775 950
  // 550 225 175
  // 56% 24% 20%
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

      <Grid className={classes.pageContent}>
        <Grid className={classes.addLinkFormSection}>
          <Typography variant="h3" className={classes.addLinkFormTitle}>
            Add new item:
          </Typography>
          <Grid>
            <form className={classes.addLinkForm} noValidate autoComplete="off">
              <TextField id="standard-basic" label="Paste your link here" variant="standard" />
              <FormControl variant="standard">
                <InputLabel id="demo-simple-select-filled-label">Age</InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={age}
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
              <Button color="inherit">Add</Button>
            </form>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
