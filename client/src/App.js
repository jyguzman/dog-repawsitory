import React, { useContext, useState, useEffect } from 'react';
import {firebaseAuth} from './provider/AuthProvider';
import {authMethods} from './firebase/authmethods';
import {Route, Switch} from 'react-router-dom';

import './App.css';
import Container from '@material-ui/core/Container';
import UnauthenticatedApp from './components/UnauthenticatedApp';
import AuthenticatedApp from './components/AuthenticatedApp';
import axios from 'axios';
import "firebase/auth";
import firebase from 'firebase';
const db = firebase.firestore();
require('dotenv').config();

function App() {
  let [dogs, setDogs] = useState([]);
  let [user, setUser] = useState(null);
  let [favorites, setFavorites] = useState([]);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    })
  });

  let [breedsList, setBreedsList] = useState([]);

  let [topTen, setTopTen] = useState([]);

  let [hiddenPopular, hidePopular] = useState(true);
  let [hiddenGallery, hideGallery] = useState(true);
  let [hiddenFavorites, hideFavorites] = useState(true);

  const perPage = 9;
  let [page, setPage] = useState(1);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const submitHandler = (event, searchTerm) => {
    event.preventDefault();
    axios.post("/images", {"breed":searchTerm})
    .then(response => {
      if (response.data.message.length > 0) {
        setDogs(response.data.message);
        hideGallery(false);
        hidePopular(true);
        hideFavorites(true);
      } else {
        setDogs([]);
      }
    })
    .catch(() => setDogs([]));
  };

  const getBreedList = () => {
    axios.get("/breeds")
    .then(response => {
      setBreedsList(response.data);
    })
    .catch(() => setBreedsList([]));
  };

  const getTopTen = () => {
    axios.get("/top")
    .then(response => {
      setTopTen(response.data);
    })
    .catch(console.err);
  }

  const mostPopularHandler = e => {
    e.preventDefault();
    getTopTen();
    hidePopular(false);
    hideGallery(true);
    hideFavorites(true);
  };

  const getFavoriteDogs = () => {
    const ref = db.collection("users").doc(user.email);
    ref.get().then((doc) => {
      if (doc.exists) {
        setFavorites(doc.data().favorites);
      } 
    })
  };

  const showFavorites = e => {
    e.preventDefault();
    if (user != null) {
      getFavoriteDogs();
      hideFavorites(false);
      hidePopular(true);
      hideGallery(true);
      setPage(1);
    }
  };

  useEffect(() => {
    getBreedList();
  }, []);

  return (
    user == null ? <UnauthenticatedApp 
                  auth={false}
                  breedsList={breedsList} 
                  submitHandler={submitHandler} setPage={setPage}
                  mostPopularHandler={mostPopularHandler} topTen={topTen}
                  hiddenGallery={hiddenGallery} hiddenPopular={hiddenPopular}
                  dogs={dogs} page={page} perPage={perPage}
                  handlePageChange={handlePageChange} /> :
      <AuthenticatedApp 
                  auth={true}
                  breedsList={breedsList} 
                  submitHandler={submitHandler} 
                  showFavorites={showFavorites}
                  setPage={setPage}
                  mostPopularHandler={mostPopularHandler} topTen={topTen}
                  hiddenGallery={hiddenGallery} hiddenPopular={hiddenPopular}
                  hiddenFavorites={hiddenFavorites}
                  dogs={dogs} favorites={favorites} page={page} perPage={perPage}
                  handlePageChange={handlePageChange} /> 
  );
};

export default App;
