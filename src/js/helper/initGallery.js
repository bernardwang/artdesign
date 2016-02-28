/**
 *
 *	XMLHttpRequest helper function
 *
 * 	Modified from MDN Example
 * 	https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
 *
 */

import { $http } from './http';

/**
 *	HTTPRequest to Flickr API
 */
const callAPI = function callFlickrAPI() {
	// Flickr API
	const url = 'https://www.flickr.com/services/rest/';
	const args = {
		method: 'flickr.collections.getTree',
		api_key:'7b408cc78c673ca31f5f105d9a28c601',
		collection_id: '72157665082008986',
		user_id: '139316082@N06',
		format: 'json',
		nojsoncallback: '1',
	};

	return $http(url).get(args); // Returns HTTPRequest Promise
};

/**
 *	Validates Flickr API Response
 */
const checkResponse = function checkAPIResponse(data) {
	data = JSON.parse(data);
	if( data.stat === 'fail' ) { // Flickr api stat
		throw new Error('APIResponseError');
	}
	return data;
};

const initGallery = function initializeGallery() {
	return callAPI()
		.then((data) => checkResponse(data));
		.then((data) => { console.log(data); return data; });
};

export {
	initGallery,
};
