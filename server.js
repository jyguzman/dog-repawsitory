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

const uri = process.env.MONGODB_URI;

client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let insertBreed = (client, breedIn) => {
	const collection = client.db("dogbase").collection("dogs");
	collection.insertOne({
		"breed": breedIn,
		"searches": 0
	});
};
	
let url_beginning = "https://dog.ceo/api/";

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

//populateData();

let getBreedURL = breed => {
	let url = url_beginning + "breed/";
	if (breed.split(" ").length == 1) {
		url = url + breed.toLowerCase() + "/images";
		return url;
	}

	if (breed == "Australian Shepherd")
		return url + "australian/images";

	if (breed == "Finnish Lapphund")
		return url + "finnish/images";

	if (breed == "Coton De Tulear")
		return url + "cotondetulear/images";

	if (breed == "St. Bernard")
		return url + "stbernard/images";

	if (breed == "Mexican Hairless")
		return url + "mexicanhairless/images";

	if (breed == "Staffordshire Bull Terrier")
		return url + "bullterrier/images"

	if (breed == "German Shepherd")
		return url +"germanshepherd/images";

	const group = breed.split(" ")[1].toLowerCase();
	const subBreed = breed.split(" ")[0].toLowerCase();
	return url + group + "/" + subBreed + "/images";
}

let toTitleCase = breedName => {
	let words = breedName.split(" ");
	let name = "";
	for(let i = 0; i < words.length; i++) {
		name += words[i].slice(0,1).toUpperCase()  + words[i].slice(1);
		if(i != words.length - 1) name += " ";
	}
	return name;
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
	let list = [];
	for(let group in breeds) {
		if (breeds[group].length == 0) {
			list.push( {"breed": formatName(group)} );
		} else {
			for(let i = 0; i < breeds[group].length; i++) {
				if (group == "australian") {
					list.push( {"breed": "Australian Shepherd"} );
				} else if (group == "finnish") {
					list.push( {"breed": "Finnish Lapphund"} );
				} else {
					list.push( {"breed": formatName(breeds[group][i])
					+ " " + formatName(group)} );
				}
			}
		}
	}
	return list;
}

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

//insertImages();

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
	.catch(() => console.log("Breed list not available."));
});

let updateSearchCount = (breed) => {
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

app.get("/top", (req, res) => {
	let mongoClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
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