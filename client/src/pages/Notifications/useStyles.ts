import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: 'center',
  },
  cardBox: {
    width: '550px',
    maxWidth: '100%',
    marginTop: '4rem',
    height: '450px',
  },
  followButton: {
    backgroundColor: 'white',
    borderRadius: '1rem',
    border: '1px solid lightgrey',
    '&:hover': {
      backgroundColor: 'red',
    },
  },

  tabContent: {},
  listStyles: {},
  listItem: {
    padding: theme.spacing(3),
  },
  pageTitle: {
    fontWeight: 600,
    marginBottom: '2rem',
  },
  notificationTitle: {
    fontWeight: 700,
  },
  notificationSubtitle: {
    fontWeight: 300,
  },
  priceSection: {
    display: 'flex',
    fontWeight: 700,
  },
  oldPrice: {
    textDecoration: 'line-through',
  },
  newPrice: {},
  notificationsSectionTitle: {
    fontWeight: 700,
    margin: theme.spacing(3, 0, 1, 2),
  },
  oldNotificationsTitle: {},
  markAllButton: {
    textAlign: 'right',
  },
}));

export default useStyles;
