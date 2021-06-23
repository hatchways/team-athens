import { makeStyles } from '@material-ui/core';

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
    width: 160,
    height: 56,
    marginTop: 49,
    fontSize: 16,
    fontWeight: 'bold',
    borderRadius: '50px',
    textTransform: 'uppercase',
  },
  inputsUnderline: {
    '&&&:before': {
      borderBottom: 'none',
    },
    '&&:after': {
      borderBottom: 'none',
    },
  },
  inputLabelRoot: {
    width: '100%',
    textAlign: 'center',
    color: 'black',
  },
  inputLabelFormControl: {
    transform: 'none',
  },
  inputLabelShrink: {
    transform: 'none',
  },
  uploadBox: {
    textAlign: 'center',
    marginTop: '10px',
  },
}));

export default useStyles;
