/**
	These functions were used to populate the database with the names 
	of each breed, a starting search count of 0, and the first image of
	each breed returned when calling the Dog CEO API for the list of 
	images of that breed.
*/

const { getBreedURL, process_breed_list } = require('./server_utils');
const MongoClient = require("mongodb").MongoClient;
const axios = require("axios");
const express = require("express");

let url_beginning = "https://dog.ceo/api/";

let insertBreed = (client, breedIn) => {
	const collection = client.db("dogbase").collection("dogs");
	collection.insertOne({
		"breed": breedIn,
		"searches": 0
	});
};

let populateData = () => {
	client.connect()
	.then(client => {
		axios.get(url_beginning + "breeds/list/all")
		.then(response => {
			let list = process_breed_list(response.data.message);
			for(let i = 0; i < list.length; i++) {
				insertBreed(client, list[i].breed);
			}
		})
		.catch(console.err);
	})
	.catch(console.err);
	client.close();
};

let insertImage = (mongoClient, breed) => {
	axios.get(getBreedURL(breed))
	.then(res => {
		const imageURL = res.data.message[0];
		dogs = mongoClient.db("dogbase").collection("dogs");
		dogs.updateOne(
				{ "breed" : breed },
				{ $set : { "image" : imageURL } },
				{ upsert : true }
			);
		})
	.catch(console.err);
};

let insertImages = () => {
	let mongoClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
	mongoClient.connect()
	.then(mongoClient => {
		axios.get(url_beginning + "breeds/list/all")
		.then(response => {
			let list = process_breed_list(response.data.message);
			for(let i = 0; i < list.length; i++) {
				insertImage(mongoClient, list[i].breed);
			}
		})
		.catch(console.err);
	})
	.catch(console.err);
	mongoClient.close();
};