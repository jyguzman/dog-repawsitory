import React, { useContext } from 'react';
import {firebaseAuth} from '../provider/AuthProvider';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Header from './Header';
import Gallery from './Gallery';
import FavoritesGallery from './FavoritesGallery';
import BreedList from './BreedList';
import MostSearched from './MostSearched';
import Nav from './Nav';
import Paginator from './Paginator';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import AuthAlert from './AuthAlert';

function Alert(props) {
  return (<MuiAlert elevation={6} variant="filled" {...props} />);
}

const AuthenticatedApp = (props) => {
	const [alertOpen, setAlertOpen] = React.useState(true);
	const { authType } = React.useContext(firebaseAuth);

	  const handleAlertClose = (event, reason) => {
	    if (reason === 'clickaway') {
	      return;
	    }

    	setAlertOpen(false);
  	  };

	const {handleSignout} = useContext(firebaseAuth);
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

	      <Nav auth={props.auth} 
	      mostPopularHandler={e => props.mostPopularHandler(e)} 
	      showFavorites={props.showFavorites} />
	      <MostSearched topTen={props.topTen} hidden={props.hiddenPopular}/>
	      <Gallery auth={props.auth} data={props.dogs} page={props.page} perPage={props.perPage}
	        hidden={props.hiddenGallery} />
	      <FavoritesGallery auth={props.auth} data={props.favorites} page={props.page} perPage={props.perPage}
	        hidden={props.hiddenFavorites} />
	      <Paginator 
	      	pages={props.hiddenFavorites ? Math.ceil(props.dogs.length/props.perPage) : Math.ceil(props.favorites.length/props.perPage)} 
	      	page={props.page}
	        handlePageChange={props.handlePageChange} 
	        isDisabled={props.hiddenGallery && props.hiddenFavorites}
	      />
	      <Snackbar open={alertOpen} autoHideDuration={3000} onClose={handleAlertClose}>
		        <Alert onClose={handleAlertClose} severity={"success"}>
		          {authType === "signup" ? "Successfully signed up!" : "Successfully logged in!"}
		        </Alert>
      	  </Snackbar>
	    </Container>   
  );
};

export default AuthenticatedApp;