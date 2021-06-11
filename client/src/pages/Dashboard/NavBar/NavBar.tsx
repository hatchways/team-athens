import useStyles from './useStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Popover from '@material-ui/core/Popover';
import { useState } from 'react';

export default function NavBar({ loggedInUser }: any): JSX.Element {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleProfileClick = (event: { currentTarget: any }) => {
    console.log('click');
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'user-chip-popover' : undefined;

  return (
    <AppBar position="static" className={classes.navRoot} elevation={2}>
      <Toolbar className={classes.customizeToolbar}>
        <Box className={classes.logo}>
          <Box className={classes.imageContainer}></Box>
        </Box>
        <Box className={classes.headerButtonGroup}>
          <Button>Shopping List</Button>
          <Button>Friends</Button>
          <Button>
            <Badge variant="dot" color="secondary" invisible={false}>
              Notifications
            </Badge>
          </Button>
        </Box>

        <Chip
          label={loggedInUser.username}
          className={classes.userChip}
          color="primary"
          clickable
          onClick={handleProfileClick}
          avatar={<Avatar style={{ height: '38px', width: '38px' }} src="/static/images/avatar/1.jpg" />}
        />
        <Popover
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={open}
          id={id}
          anchorEl={anchorEl}
          onClose={handleClose}
          className={classes.popOverBody}
        >
          <Grid container direction="column" justify="center" alignItems="center">
            <Button>Profile</Button>
            <Button>Logout</Button>
          </Grid>
        </Popover>
      </Toolbar>
    </AppBar>
  );
}
