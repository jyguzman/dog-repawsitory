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

const AuthenticatedApp = (props) => {
	const {handleSignout} = useContext(firebaseAuth);
	return (
	    <Container>
	    	<div> Login Successful </div>
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
	      <Paginator pages={Math.ceil(props.dogs.length/props.perPage)} page={props.page}
	        handlePageChange={props.handlePageChange} isDisabled={props.hiddenGallery}
	      />
	    </Container>   
  );
};

export default AuthenticatedApp;