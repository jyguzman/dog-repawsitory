const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;
const PORT = process.env.PORT || 3001;
const path = require('path');

const app = express();

app.use(
	express.urlencoded({
		extended: true
	})
);

app.use(cors());

app.use(express.json());

let url_beginning = "https://dog.ceo/api/";

let getBreedURL = breed => {
	let url = url_beginning + "breed/";
	if (breed.split(" ").length == 1)
		return url + breed.toLowerCase() + "/images";

	if (breed == "Australian Shepherd")
		return url + "australian/images";

	if (breed == "Finnish Lapphund")
		return url + "finnish/images";

	if (breed == "Coton De Tulear")
		return url + "cotondetulear/images";

	const group = breed.split(" ")[1].toLowerCase();
	const subBreed = breed.split(" ")[0].toLowerCase();
	console.log(url + group + "/" + subBreed + "/images");
	return url + group + "/" + subBreed + "/images";
}

let toTitleCase = breedName => {
	//if(breedName == "cotondetulear") return;
	let words = breedName.split(" ");
	let name = "";
	for(let i = 0; i < words.length; i++) {
		name += words[i].slice(0,1).toUpperCase()  + words[i].slice(1);
		if(i != words.length - 1) name += " ";
	}
	console.log(name);
	return name;
	/*if (words.length == 1) {
		return (breedName.slice(0,1).toUpperCase() + 
		breedName.slice(1));
	}
	return (words[0].slice(0,1).toUpperCase()  + words[0].slice(1) 
			+ " " + words[1].slice(0,1).toUpperCase() + words[1].slice(1));*/

};

let formatName = breed => {
	switch (breed) {
		case "germanshepherd":
			return toTitleCase("german shepherd");
		case "mexicanhairless":
			return toTitleCase("mexican hairless");
		case "cotondetulear":
			return toTitleCase("coton de tulear");
		case "stbernard":
			return toTitleCase("st. bernard");
		case "bullterrier":
			return toTitleCase("bull terrier");
		case "gernmanlonghair":
			return toTitleCase("german longhair");
		default:
			return toTitleCase(breed);
	}
}

let process_breed_list = breeds => {
	breedsList = [];
	for(let group in breeds) {
		if (breeds[group].length == 0) {
			breedsList.push( {"breed": formatName(group)} );
		} else {
			for(let i = 0; i < breeds[group].length; i++) {
				if (group == "australian") {
					breedsList.push( {"breed": "Australian Shepherd"} );
				} else if (group == "finnish") {
					breedsList.push( {"breed": "Finnish Lapphund"} );
				} else {
					breedsList.push( {"breed": formatName(breeds[group][i])
					+ " " + formatName(group)} );
				}
			}
		}
	}
	return breedsList;
}

app.post("/images", (req, res) => {
	axios.get(getBreedURL(req.body.breed))
	.then(response => {
		res.json(response.data);
	})
	.catch(() => console.log("Images not found."));
});

app.get("/breeds", (req, res) => {
	axios.get(url_beginning + "breeds/list/all")
	.then(response => {
		res.json(process_breed_list(response.data.message));
	})
	.catch(() => console.log("Breed list not available."));
});

app.use(express.static(path.resolve(__dirname, 'client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'));
});


app.listen(PORT, () => {
	console.log("Server listening on " + PORT);
});