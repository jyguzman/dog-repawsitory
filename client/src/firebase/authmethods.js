import firebaseconfig from './firebaseIndex';
import firebase from 'firebase';
const db = firebase.firestore();

export const authMethods = {
	signup: (email, password, setErrors) => {
		firebase.auth().createUserWithEmailAndPassword(email,password) 
	      .then(async userCredential => {
	      	var user = userCredential.user;
	        await db.collection("users").doc(user.email).set({
	        	"email": user.email,
	        	favorites: []
	        });

	      })
	      .catch(err => {
	        setErrors(prev => ([...prev, err.message]));
	      })
    },
  	signin: (email, password, setErrors) => {
  		firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  		.then(() => {
	  		firebase.auth().signInWithEmailAndPassword(email,password) 
		      .then(async userCredential  => {
		          var user = userCredential.user;
		      })
		      .catch(err => {
		        setErrors(prev => ([...prev, err.message]));
		      })
	  	})
  		.catch(err => {
	        setErrors(prev => ([...prev, err.message]));
	     })

    },
  	signout: (setErrors) => {
	    firebase.auth().signOut().then(() => {
	    })
	    .catch(err => {
	      setErrors(prev => ([...prev, err.message]));
	    })
    },

}