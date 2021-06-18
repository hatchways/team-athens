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
import { Icon } from '@material-ui/core';

export default function NotificationPopover(): JSX.Element {
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

  socket?.on('notification', (notification) => {
    setUnreadNotifications([notification, ...unreadNotifications]);
  });

  useEffect(() => {
    getUnreadNotification().then((data) => {
      if (data.error) {
        updateSnackBarMessage('An error occurs when getting unread notifications');
      }
      if (data.success) {
        setUnread(data.success.notifications);
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
        {unreadNotifications.length > 0 && (
          <Grid className={classes.markAllAsReadButton}>
            <Button onClick={markAllAsReadClickHandler}>Mark all as read</Button>
          </Grid>
        )}

        {unreadNotifications.length > 0 &&
          unreadNotifications.map(function (notification) {
            return (
              <NotificationTemplate
                notification={notification}
                markAsReadHandler={handleMarkAsRead}
                key={notification._id}
              />
            );
          })}

        {unreadNotifications.length <= 0 && (
          <div className={classes.noNotification}>
            <div>
              <Icon fontSize={'large'}>notifications_off</Icon>
            </div>
            No notification
          </div>
        )}
      </Popover>
    </div>
  );
}
