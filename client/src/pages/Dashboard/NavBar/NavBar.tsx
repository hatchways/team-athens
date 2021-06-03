import useStyles from './useStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';

export default function NavBar({ loggedInUser }: any): JSX.Element {
  const classes = useStyles();

  return (
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
  );
}
