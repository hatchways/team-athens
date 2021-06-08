import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  label: {
    fontSize: 15,
    paddingLeft: '5px',
    fontWeight: 'bolder',
  },
  inputs: {
    marginTop: '.8rem',
    height: '2rem',
    padding: '5px',
    border: 'none',
    minHeight: '40px',
    lineHeight: '60px',
    textAlign: 'center',
    borderRadius: '6px',
    boxShadow: '0px 0px 20px #f5f0f0',
  },
  submit: {
    margin: theme.spacing(3, 2, 2),
    padding: 10,
    height: 56,
    marginTop: 49,
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputsUnderline: {
    '&&&:before': {
      borderBottom: 'none',
    },
    '&&:after': {
      borderBottom: 'none',
    },
  },
}));

export default useStyles;
