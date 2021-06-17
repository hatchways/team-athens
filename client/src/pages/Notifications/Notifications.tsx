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
  Box,
  Typography,
  IconButton,
  Button,
} from '@material-ui/core';

import NavBar from '../../components/NavBar/NavBar';
import {
  getUnreadNotification,
  markAllAsRead,
  markAsRead,
  getAllNotifications,
} from '../../helpers/APICalls/notification';
import { Fragment } from 'react';
import { Notification } from '../../interface/Notification';
import { NotificationApiData } from '../../interface/NotificationApiData';
import DeleteIcon from '@material-ui/icons/Delete';
import { ContactSupportOutlined } from '@material-ui/icons';

export default function Notifications(): JSX.Element {
  const classes = useStyles();
  const { loggedInUser } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();

  const [allNotifications, setAllNotifications] = useState<Notification[]>([]);
  const [readNotifications, setReadNotifications] = useState<Notification[]>([]);
  const [dataChanged, setDataChanged] = useState(false);

  // demo only
  const testNotifications = [
    {
      _id: 'dfdfdgt354544343',
      title: 'New Price!',
      message: 'Nike Air Max 270 AH8050-002',
      old_price: '$200',
      new_price: '$175',
      url: 'https://distance.eu/nike-air-max-270-ah8050-002',
      image:
        'https://cdn-distance.pl/media/catalog/product/cache/07f4dbefc5ed4df4ee2ce08604f55f57/b/u/buty-air-max-270-ah8050002-7_1.jpg',
    } as Notification,
    {
      _id: 'dfdfdgtghju6673',
      title: 'New follower!',
      message: 'Johnathan Lee started following you',
      url: '',
      image: 'https://avatars.dicebear.com/api/male/c.svg',
    } as Notification,
  ];

  useEffect(() => {
    getAllNotifications().then((data: NotificationApiData) => {
      if (data.error) {
        updateSnackBarMessage('An error occurs when getting all notifications');
      }
      if (data.success) {
        setAllNotifications(testNotifications); // demo only
        // setUnreadNotifications(data.success.notifications);
      }
      setDataChanged(false);
    });
  }, [dataChanged]);

  const handleMarkAsRead = (notificationId: string) => {
    markAsRead(notificationId).then((data) => {
      if (data.error) {
        console.error(data.error);
        updateSnackBarMessage('An error occurs when getting unread notifications');
      }
      if (data.success) {
        setDataChanged(true);
      }
    });

    return undefined;
  };

  const drawList = (data: Notification[]) => {
    if (data.length === 0) {
      return (
        <Box p={2}>
          <Typography>Nothing to see here</Typography>
        </Box>
      );
    }

    return (
      <List disablePadding className="listStyles">
        {data.map((notification: Notification) => {
          const labelId = `checkbox-list-label-${notification}`;

          return (
            <ListItem
              key={notification._id}
              role={undefined}
              dense
              button
              onClick={() => (notification.url ? window.open(notification.url) : console.log('clicked, no url'))}
            >
              <ListItemAvatar>
                <Avatar variant="square" alt={`Avatar n°1`} src={notification.image} />
              </ListItemAvatar>
              <ListItemText
                id={labelId}
                primary={<Typography className={classes.notificationTitle}>{notification.title}</Typography>}
                secondary={
                  <Fragment>
                    <Typography className={classes.notificationSubtitle}>{notification.message}</Typography>
                    <Box className={classes.priceSection}>
                      <Typography className={classes.oldPrice}>{notification.old_price}</Typography>
                      <Typography color="secondary" className={classes.newPrice}>
                        {notification.new_price}
                      </Typography>
                    </Box>
                  </Fragment>
                }
              />
              <ListItemSecondaryAction>
                <Button aria-label="delete" onClick={() => console.log('click')}>
                  <DeleteIcon />
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

        {/* <Typography className={classes.notificationsSectionTitle}>Unread Notifications</Typography> */}
        <Paper square className={classes.tabContent} elevation={2}>
          {drawList(allNotifications)}
        </Paper>
      </Box>
    </Grid>
  );
}
