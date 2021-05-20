import React, { useContext, useState, useEffect } from 'react'
import {firebaseAuth} from './provider/AuthProvider'
import {authMethods} from './firebase/authmethods'
import {Route, Switch} from 'react-router-dom'
import Signup from './components/Signup'

import './App.css';
import UnauthenticatedApp from './components/UnauthenticatedApp';
import AuthenticatedApp from './components/AuthenticatedApp';
import axios from 'axios';
import "firebase/auth";
require('dotenv').config();

function App() {
  const { token } = useContext(firebaseAuth);
  //const [user, setUser] = React.useState(null);
  
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

  return (
      <>
        <Switch>
          <Route exact path='/' 
            render={() =>  
              token === null ? <UnauthenticatedApp 
                breedsList={breedsList} 
                submitHandler={submitHandler} setPage={setPage}
                mostPopularHandler={mostPopularHandler} topTen={topTen}
                hiddenGallery={hiddenGallery} hiddenPopular={hiddenPopular}
                dogs={dogs} page={page} perPage={perPage}
                handlePageChange={handlePageChange} /> : <AuthenticatedApp 
                breedsList={breedsList} 
                submitHandler={submitHandler} setPage={setPage}
                mostPopularHandler={mostPopularHandler} topTen={topTen}
                hiddenGallery={hiddenGallery} hiddenPopular={hiddenPopular}
                dogs={dogs} page={page} perPage={perPage}
                handlePageChange={handlePageChange} />}
             />
         
        </Switch>
      </>
  );
};

export default App;
