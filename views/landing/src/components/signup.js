import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import TextField from '@material-ui/core/TextField';
import Select from "./select";
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
      <DialogTitle id="simple-dialog-title">We'd love to have you!</DialogTitle>
      <form autoComplete="off" className="promptForm">
        <TextField id="standard-basic" label="Account Name" name="newEmail" onChange={(e)=>{props.handleInput(e)}}/>
        <TextField id="standard-basic" label="Password" name="newPassword" onChange={(e)=>{props.handleInput(e)}}/>
        <TextField id="standard-basic" label="Repeat Password" name="newPasswordRepeat" onChange={(e)=>{props.handleInput(e)}}/>
        <Select handleInput={props.handleInput}></Select>

        <Button variant="contained" color="primary" id="promptFormSubmit" onClick={(e)=>{props.signUp(e)}}>Sign Up!</Button>
        </form>
        <p className="postScript">Before signing up, make sure you have converted your instagram to a Business or Creator account AND you have connected your facebook to your instagram.
        When the facebook prompt launches, accept all the terms.
        </p>
        <p className="postScript">*I make all of our users verify their account with facebook to prevent fraud because it's easier to use someone else's verified database than to
        manually confirm all of my users are who they say they are.</p>
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
        Sign Up
      </Button>
      <SimpleDialog  open={open} onClose={handleClose} handleInput={props.handleInput} signUp={props.signUp}/>
    </div>
  );
}