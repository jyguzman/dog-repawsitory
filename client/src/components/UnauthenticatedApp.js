import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Header from './Header';
import Gallery from './Gallery';
import BreedList from './BreedList';
import MostSearched from './MostSearched';
import Nav from './Nav';
import Paginator from './Paginator';
import SignupForm from './SignupForm';
import SignIn from './SignIn'

const UnauthenticatedApp = (props) => {
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
	    </Container>   
  );
};

export default UnauthenticatedApp;