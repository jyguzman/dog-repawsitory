const { getBreedURL, process_breed_list } = require('./server_utils');
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;
const PORT = process.env.PORT || 3001;
const path = require('path');
require('dotenv').config();
const app = express();

app.use(
	express.urlencoded({
		extended: true
	})
);

app.use(cors());

app.use(express.json());

const uri = process.env.MONGODB_URI;

const url_beginning = "https://dog.ceo/api/";

let updateSearchCount = breed => {
	let mongoClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
	mongoClient.connect()
	.then(mongoClient => {
		dogs = mongoClient.db("dogbase").collection("dogs");
		dogs.updateOne(
			{ "breed" : breed },
			{ $inc : { "searches" : 1 } }
		);
	})
	.catch(console.err);
	mongoClient.close();
}

app.post("/images", (req, res) => {
	const breed = req.body.breed;
	axios.get(getBreedURL(breed))
	.then(response => {
		updateSearchCount(breed);
		res.json(response.data);
	})
	.catch(() => console.log("Images not found."));
});

app.get("/breeds", (req, res) => {
	axios.get(url_beginning + "breeds/list/all")
	.then(response => {
		res.json(process_breed_list(response.data.message));
	})
	.catch(console.err);
});

app.get("/top", (req, res) => {
	let mongoClient = new MongoClient(uri, 
		{ useNewUrlParser: true, useUnifiedTopology: true });
	mongoClient.connect()
	.then(mongoClient => {
		let topTen = [];
		dogs = mongoClient.db("dogbase").collection("dogs");
		dogs.find().sort( {"searches":-1} ).limit(10)
			.forEach(breed => {
				topTen.push(breed);
				if(topTen.length == 10)
					res.json(topTen);
			});
	})
	.catch(console.err);
	mongoClient.close();
});

app.use(express.static(path.resolve(__dirname, 'client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'));
});

app.listen(PORT, () => {
	console.log("Server listening on " + PORT);
});