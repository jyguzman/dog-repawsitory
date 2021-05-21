import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Image from './Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { Box } from "@material-ui/core";
import {firebaseAuth} from '../provider/AuthProvider';
import firebase from 'firebase';
const db = firebase.firestore();

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    borderRadius: '10px',
    padding: theme.spacing(2, 4, 3),
    justifyContent: 'center'
  }
}));

export default function ModalImage(props) {
  const classes = useStyles();
  var user  = firebase.auth().currentUser;
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const saveImage = (e, url) => {
    e.preventDefault();
    const ref = db.collection("users").doc(user.email);
    console.log(url);
    const res = ref.update({
        favorites: firebase.firestore.FieldValue.arrayUnion(url)
    });
    console.log(res);
  };

  return (
    <div>
      <Image url={props.url} title={props.title} handleOpen={handleOpen}/>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
            <div className={classes.paper}>
              <img height="400" width="400" src={props.url} alt={props.title} />
                
                <Box display={props.auth ? "initial" : "none"}>
                  <button onClick={(e, url) => saveImage(e, props.url)}>
                    <FontAwesomeIcon icon={faHeart} />
                  </button>
                </Box>
            </div>
        </Fade>
      </Modal>
    </div>
  );
}