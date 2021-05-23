import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Image from './Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { Container, Box } from "@material-ui/core";
import {firebaseAuth} from '../provider/AuthProvider';
import firebase from 'firebase';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
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
  },
  button: {
    position: "absolute",
    right: "0%",
    bottom: "25%",
  },
  img: {
    borderRadius: "10px"
  },
  imgContainer: {
    position: "relative"
  },
  typography: {
    padding: theme.spacing(2),
  }
}));

export default function ModalImage(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [alreadySaved, setAlreadySaved] = React.useState(false);
  const [ref, setRef] = React.useState(null);
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        setUser(user);
        setRef(db.collection("users").doc(user.email));
      }
    })
  }, []);

 const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopClose = () => {
    setAnchorEl(null);
  };

  const openPop = Boolean(anchorEl);
  const id = openPop ? 'simple-popover' : undefined;
  
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const saveImage = async (event, url) => {
    event.preventDefault();
    let isSaved = false; 
    await ref.get()
    .then( doc => {
      const favs = doc.data().favorites;
      for(let i = 0; i < favs.length; i++) {
        if (favs[i] === url)
          isSaved = true;
      }
    })
    .then((doc) => {
        if(!isSaved) {
          setAlreadySaved(false);
          const res = ref.update({
              favorites: firebase.firestore.FieldValue.arrayUnion(url)
          });
        } else {
          setAlreadySaved(true);
        }
      })
    .catch(err => console.log(err))
    };

  return (
    <Container >
      <Image  url={props.url} title={props.title} handleOpen={handleOpen}/>
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
              <img className={classes.img} height="400" width="400" src={props.url} alt={props.title} />
                
                <Container className={classes.imgContainer}>
                  <Box display={props.auth ? "initial" : "none"}>
                    <IconButton className={classes.button} 
                      disabled={props.auth ? false : false} 
                      onClick={(event, url) => {saveImage(event, props.url); handleClick(event); }}>
                      <FontAwesomeIcon icon={faHeart} size="2x" color="red"/>
                    </IconButton>
                    <Popover
                        id={id}
                        open={openPop}
                        anchorEl={anchorEl}
                        onClose={handlePopClose}
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'center',
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'center',
                        }}
                      >
                        <Typography className={classes.typography}>
                          {alreadySaved ? "This is already in your favorites." :
                            "Saved to your favorites!"}
                        </Typography>
                      </Popover>
                  </Box>
                </Container>
            </div>
        </Fade>
      </Modal>
    </Container>
  );
}