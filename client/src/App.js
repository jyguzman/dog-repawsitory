import React, { useState, useEffect } from 'react'

import './App.css';
import Header from './components/Header';
import GalleryList from './components/GalleryList';
import BreedList from './components/BreedList';
import MostSearched from './components/MostSearched';
import Nav from './components/Nav';
import axios from 'axios';

function App() {
  let [dogs, setDogs] = useState([]);
  let [breedsList, setBreedsList] = useState([]);
  let [topTen, setTopTen] = useState([]);
  const [imgs, setImgs] = useState([]);
  let [hiddenPopular, hidePopular] = useState(true);
  let [hiddenGallery, hideGallery] = useState(true);

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
    <div className="app">
      <div className="head">
        <Header />
        <div className="search-bar">
          <BreedList 
          breedOptions={breedsList}
          submitHandler={(event, searchTerm) => 
          { if(searchTerm != null) 
              submitHandler(event, searchTerm.breed)}}/>
        </div>
        <Nav mostPopularHandler={e => mostPopularHandler(e)} />
      </div>
      
      <MostSearched topTen={topTen} imgs={imgs} 
        hidden={hiddenPopular}/>
      <GalleryList data={dogs} hidden={hiddenGallery} />
    </div>
      
  );
};

export default App;
