import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import TextField from '@material-ui/core/TextField';




const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

function SimpleDialog(props) {
  const classes = useStyles();
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Welcome Back!</DialogTitle>
      <form autoComplete="off" className="promptForm">
        <TextField id="standard-basic" label="Email" name="email" onChange={(e)=>{props.handleInput(e)}}/>
        <TextField id="standard-basic" label="Password" name="password" onChange={(e)=>{props.handleInput(e)}}/>
        <Button variant="contained" color="primary" id="promptFormSubmit" onClick={(e)=>{props.login(e)}}>Login</Button>
        </form>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function SimpleDialogDemo(props) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = (value) => {
    setOpen(false);
  };



  return (
    <div>
    
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Login
      </Button>
      <SimpleDialog  open={open} onClose={handleClose} handleInput={props.handleInput} login={props.login}/>
    </div>
  );
}