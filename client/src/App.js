import React, { useState, useEffect } from 'react'

import './App.css';
import Header from './components/Header';
import GalleryList from './components/GalleryList';
import BreedList from './components/BreedList';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDog } from '@fortawesome/free-solid-svg-icons'

function App() {
  let [dogs, setDogs] = useState([]);
  let [breedsList, setBreedsList] = useState([]);
  let [page, setPage] = useState(1);

  let submitHandler = (event, searchTerm) => {
    event.preventDefault();

    axios.post("/images", {"breed":searchTerm})
    .then(response => {
      if (response.data.message.length > 0) {
        setDogs(response.data.message);
      } else {
        setDogs([]);
      }
      setPage(1);
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

  useEffect(() => {
    getBreedList();
  }, []);
  //console.log(breedsList);
  /*let submitHandlerWioutNode = (e, searchTerm) => {
    e.preventDefault();
    if(!hasSearched) setHasSearched(true);

    let url =  
      "https://dog.ceo/api/breed/" + searchTerm.toLowerCase() 
      + "/images";

    axios.get(url)
    .then(response => {
      setDogs(response.data.message);
    })
    .catch(() => setDogs([]));
  };*/

  return (
    <div className="app">
      <div className="head">
        <Header />
        <div className="search-bar">
          <BreedList 
          breedOptions={breedsList}
          submitHandler={(event, searchTerm) => 
          { if(searchTerm != null) submitHandler(event, searchTerm.breed)}}/>
        </div>
      </div>
      
      <GalleryList data={dogs}/>
    </div>
      
  );
};

export default App;
