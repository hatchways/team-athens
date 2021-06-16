import React from 'react';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import { Badge, Grid } from '@material-ui/core';
import useStyles from './useStyles';
import { useState } from 'react';
import { Notification } from '../../interface/Notification';
import { useEffect } from 'react';
import { getUnreadNotification, markAllAsRead, markAsRead } from '../../helpers/APICalls/notification';
import NotificationTemplate from './NotificationTemplate/NotificationTemplate';
import { useSocket } from '../../context/useSocketContext';
import { useSnackBar } from '../../context/useSnackbarContext';

export default function NotificationPopover() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const id = open ? 'notification-popover' : undefined;
  const [unreadNotifications, setUnreadNotifications] = useState<Notification[]>([]);
  const { socket } = useSocket();
  const { updateSnackBarMessage } = useSnackBar();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const setUnread = (notifications: Notification[] | undefined | null) => {
    setUnreadNotifications(notifications || []);
  };

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
      url: "View Johnathan Lee's profile",
      image: 'https://avatars.dicebear.com/api/male/c.svg',
    } as Notification,
  ];

  socket?.on('notification', (notification) => {
    setUnreadNotifications([notification, ...unreadNotifications]);
  });

  useEffect(() => {
    getUnreadNotification().then((data) => {
      if (data.error) {
        updateSnackBarMessage('An error occurs when getting unread notifications');
      }
      if (data.success) {
        setUnread(testNotifications); // demo only
        // setUnread(data.success.notifications);
      }
    });
  });

  const markAllAsReadClickHandler = () => {
    markAllAsRead().then((data) => {
      if (data.error) {
        updateSnackBarMessage('An error occurs when getting unread notifications');
      }
      if (data.success) {
        setUnreadNotifications([]);
        setAnchorEl(null);
      }
    });
  };

  const handleMarkAsRead = (notificationId: string) => {
    markAsRead(notificationId).then((data) => {
      if (data.error) {
        console.error(data.error);
        updateSnackBarMessage('An error occurs when getting unread notifications');
      }
      if (data.success) {
        const index = unreadNotifications.findIndex((notification) => {
          return notification._id === notificationId;
        });

        if (index !== -1) {
          unreadNotifications.splice(index, 1);
          setUnreadNotifications(unreadNotifications);
          setAnchorEl(null);
        }
      }
    });

    return undefined;
  };

  return (
    <div className={classes.displayInline}>
      <Button aria-describedby={id} onClick={handleClick}>
        <Badge variant="dot" color="secondary" invisible={unreadNotifications.length <= 0}>
          Notifications
        </Badge>
      </Button>
      {unreadNotifications.length > 0 && (
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          PaperProps={{ className: classes.popover }}
        >
          <Grid className={classes.markAllAsReadButton}>
            <Button onClick={markAllAsReadClickHandler}>Mark all as read</Button>
          </Grid>

          {unreadNotifications.map(function (notification) {
            return (
              <NotificationTemplate
                notification={notification}
                markAsReadHandler={handleMarkAsRead}
                key={notification._id}
              />
            );
          })}
        </Popover>
      )}
    </div>
  );
}
