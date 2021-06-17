import { Icon } from '@material-ui/core';
import { CircularProgress, Grid, Paper } from '@material-ui/core';
import { useEffect } from 'react';
import { useState } from 'react';
import { Notification } from '../../../interface/Notification';
import useStyles from './useStyles';

interface Props {
  notification: Notification;
  markAsReadHandler: (notificationId: string) => undefined;
}

const NotificationTemplate = ({ notification, markAsReadHandler }: Props): JSX.Element => {
  const classes = useStyles();
  const [imageLoading, setImageLoading] = useState<boolean>(true);

  useEffect(() => {
    const image = document.getElementById(notification._id);
    if (image) {
      image.onload = () => {
        setImageLoading(false);
      };
    }
  });

  return (
    <div className={classes.root}>
      <div>
        <strong>{notification.title}</strong>
      </div>
      <Grid container className={classes.rootGrid}>
        <Grid item spacing={2}>
          <div>
            {imageLoading && <CircularProgress size={50} />}
            <img src={notification?.image} className={classes.image} id={notification._id} />
          </div>
        </Grid>
        <Grid item className={classes.description} xs={9}>
          <div>
            <strong>{notification.message}</strong>
          </div>
          <div>
            <a className={classes.link} href={notification?.url} target="_blank" rel="noreferrer">
              {notification?.url}
            </a>
          </div>
          {notification.old_price && notification.new_price && (
            <div>
              <strong className={classes.oldPrice}>{notification.old_price}</strong>{' '}
              <strong className={classes.newPrice}>{notification.new_price}</strong>
            </div>
          )}
        </Grid>
        <Grid className={classes.closeIconContainer}>
          <Icon onClick={() => markAsReadHandler(notification._id)}>close</Icon>
        </Grid>
      </Grid>
    </div>
  );
};

export default NotificationTemplate;
