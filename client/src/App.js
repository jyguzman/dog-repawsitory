import React, { useContext, useState, useEffect } from 'react'
import {firebaseAuth} from './provider/AuthProvider'
import {authMethods} from './firebase/authmethods'
import {Route, Switch} from 'react-router-dom'
import Signup from './components/Signup'

import './App.css';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Header from './components/Header';
import Gallery from './components/Gallery';
import BreedList from './components/BreedList';
import MostSearched from './components/MostSearched';
import Nav from './components/Nav';
import Paginator from './components/Paginator';
import SignupForm from './components/SignupForm';
import ModalSignup from './components/ModalSignup';
import UnauthenticatedApp from './components/UnauthenticatedApp';
import axios from 'axios';
import "firebase/auth";
require('dotenv').config();

function App() {
  const {handleSignup} = useContext(firebaseAuth)
    console.log(handleSignup)
  const [user, setUser] = React.useState(null);
  
  let [dogs, setDogs] = useState([]);
  let [breedsList, setBreedsList] = useState([]);
  let [topTen, setTopTen] = useState([]);
  let [hiddenPopular, hidePopular] = useState(true);
  let [hiddenGallery, hideGallery] = useState(true);

  const perPage = 9;
  let [page, setPage] = useState(1);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  let submitHandler = (event, searchTerm) => {
    event.preventDefault();
    axios.post("/images", {"breed":searchTerm})
    .then(response => {
      if (response.data.message.length > 0) {
        setDogs(response.data.message);
        hideGallery(false);
        hidePopular(true);
      } else {
        setDogs([]);
      }
    })
    .catch(() => setDogs([]));
  };

  let getBreedList = () => {
    axios.get("/breeds")
    .then(response => {
      setBreedsList(response.data);
    })
    .catch(() => setBreedsList([]));
  };

  let getTopTen = () => {
    axios.get("/top")
    .then(response => {
      setTopTen(response.data);
    })
    .catch(console.err);
  }

  let mostPopularHandler = e => {
    e.preventDefault();
    getTopTen();
    hidePopular(false);
    hideGallery(true);
  };

  useEffect(() => {
    getBreedList();
  }, []);

/**<Container>
        <Header />
        <div className="search-bar">
          <BreedList 
          breedOptions={breedsList}
          submitHandler={(event, searchTerm) => { 
            if(searchTerm != null) 
              submitHandler(event, searchTerm.breed); 
            setPage(1); 
          }}/>
        </div>

        <Nav mostPopularHandler={e => mostPopularHandler(e)} />
      <MostSearched topTen={topTen} hidden={hiddenPopular}/>
      <Gallery data={dogs} page={page} perPage={perPage}
        hidden={hiddenGallery} />
      <Paginator pages={Math.ceil(dogs.length/perPage)} page={page}
        handlePageChange={handlePageChange} isDisabled={hiddenGallery}
      />
    </Container>*/
  return (
       <UnauthenticatedApp 
          breedsList={breedsList} 
          submitHandler={submitHandler} setPage={setPage}
          mostPopularHandler={mostPopularHandler} topTen={topTen}
          hiddenGallery={hiddenGallery} hiddenPopular={hiddenPopular}
          dogs={dogs} page={page} perPage={perPage}
          handlePageChange={handlePageChange} />
  );
};

export default App;
