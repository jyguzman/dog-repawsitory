/**
	These functions are used to process the list of breed names 
	retrieved from the API to neater forms, e.g. "germanshepherd"
	to "German Shepherd".
*/

let url_beginning = "https://dog.ceo/api/";

// Returns the URL for the list of images of a breed from the API
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

exports.getBreedURL = getBreedURL;
exports.toTitleCase = toTitleCase; 
exports.formatName = formatName; 
exports.process_breed_list = process_breed_list;