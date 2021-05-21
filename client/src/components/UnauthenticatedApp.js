import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Header from './Header';
import Gallery from './Gallery';
import BreedList from './BreedList';
import MostSearched from './MostSearched';
import Nav from './Nav';
import Paginator from './Paginator';
import SignUp from './SignUp';
import SignIn from './SignIn';
import {firebaseAuth} from '../provider/AuthProvider';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return (<MuiAlert elevation={6} variant="filled" {...props} />);
}

const UnauthenticatedApp = (props) => {
	const [alertOpen, setAlertOpen] = React.useState(true);
	const {handleSignout, authType} = useContext(firebaseAuth);

	const handleAlertClose = (event, reason) => {
	    if (reason === 'clickaway') {
	      return;
	    }

    	setAlertOpen(false);
  	  };

	return (
	    <Container>
	        <Header />
	        <div className="search-bar">
	          <BreedList 
	          breedOptions={props.breedsList}
	          submitHandler={(event, searchTerm) => { 
	            if(searchTerm != null) 
	              props.submitHandler(event, searchTerm.breed); 
	            props.setPage(1); 
	          }}/>
	        </div>

	      <Nav auth={props.auth} mostPopularHandler={e => props.mostPopularHandler(e)} />
	      <MostSearched topTen={props.topTen} hidden={props.hiddenPopular}/>
	      <Gallery auth={props.auth} data={props.dogs} page={props.page} perPage={props.perPage}
	        hidden={props.hiddenGallery} />
	      <Paginator pages={Math.ceil(props.dogs.length/props.perPage)} page={props.page}
	        handlePageChange={props.handlePageChange} isDisabled={props.hiddenGallery}
	      />
	      {authType === "signout" ? <Snackbar open={alertOpen} autoHideDuration={3000} onClose={handleAlertClose}>
		        <Alert onClose={handleAlertClose} severity={"success"}>
		        	You have been signed out.
		        </Alert>
      	  </Snackbar> : null}
	    </Container>   
  );
};

export default UnauthenticatedApp;