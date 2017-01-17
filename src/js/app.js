import 'babel-polyfill';
import { collectionAPI } from './lib/flickrAPI';
import { initGallery, loadPages } from './lib/gallery';

/**
 *	Call Flickr API for collections and transform result
 */
const getCollections = function getCollectionsCall() {
	return collectionAPI()
		.then((collections) => {
			return collections.collections.collection[0].collection; // lol flickr api response
		});
};

/**
 *
 */
global.app = function app() {
	let data = null;
	getCollections()
		.then((collections) => { data = collections; })
		.then(() => initGallery(data))
		.then(() => loadPages(data))
		.catch((e) => { console.log(e); });
};
