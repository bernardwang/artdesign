import 'babel-polyfill';
import { $http } from './helper/http';
import { Person } from './model/Person';

let callback = {
	success(data) {
		console.log(1, 'success', JSON.parse(data));
	},
	error(data) {
		console.log(2, 'error', JSON.parse(data));
	},
};

global.app = function () {
	//let christoph = new Person('Christoph', 'Burgdorf');
	//console.log(christoph.fullName);

	let url = 'https://www.flickr.com/services/rest/';
	let args = {
		method: 'flickr.people.getPublicPhotos',
		api_key: '7b408cc78c673ca31f5f105d9a28c601',
		user_id: '110189904@N02',
		format: 'json',
		nojsoncallback: '1',
	};

	// Executes the method call
	$http(url)
		.get(args)
		.then(callback.success)
		.catch(callback.error);
};

/**
 *	Creates and appends elements to DOM
 *
var appendImages = function(photos, num_photos) {
	var gallery = document.getElementById('gallery');
	for(var i = 0; i < num_photos; i++) {
		var curr = photos[i];

		// creates dom elements
		var figure = document.createElement('figure');
		var img = document.createElement('img');
		var figcaption = document.createElement('figcaption');

		// insert api data
		img.className = 'photo';
		img.src = 'https://farm'+curr.farm+'.staticflickr.com/'+curr.server+'/'+curr.id+'_'+curr.secret+'_z.jpg';

		figcaption.className = 'caption';
		figcaption.innerHTML = curr.title;

		figure.appendChild(img);
		figure.appendChild(figcaption);
		figure.className = 'entry';
		// IIFE, creates scope for 'i'
		(function(index, entry){
			entry.addEventListener("click", function() {
				setSelected(index)
			});
  	 })(i, figure);

		gallery.appendChild(figure);
	}
};

/**
 *	Asynchronously gets images from flickr
 *
var loadImages = function(num) {
	// API url
	var api_key = '8e8cc9e261cc938ec19dfb3c9a977579';
	var user_id = '110189904@N02' 	// my friend's flickr id
	var base_url = 'https://www.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=';
	var user = '&user_id=' + user_id;
	var format = '&format=json&nojsoncallback=1'	// json not jsonp
	var url = base_url + api_key + user + format;

	// Flickr API call
	ajaxCall(url, function(response) {
		var data = JSON.parse(response);	// Assumes response is in json format
		if(data.stat != 'fail') {
			var photos = data.photos.photo;
			var num_photos = Math.min(photos.length, num);

			appendImages(photos, num_photos);		// Appends to gallery
			setSelected(0);		// Sets first image to be selected in lightbox
		}
		else {
			console.log('API call error');
		}
	});
};

/**
 * 	Initializes page
 *
var init = function() {
	// Currently only loading 25
	// could load more by adding a 'page' parameter to the Flickr api call
	// Automatic loading when scrolling to the bottom would be cool too :)
	loadImages(25);

	// initalizes next and back navigation
	var index = 0;
	var back = document.getElementById('lightbox-back');
	var next = document.getElementById('lightbox-next');
	back.addEventListener("click", function(){
    setSelected(--index);
	});
	next.addEventListener("click", function(){
    setSelected(++index);
	});

};

init();*/
