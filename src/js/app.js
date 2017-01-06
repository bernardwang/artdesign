import 'babel-polyfill';
import { collectionAPI } from './lib/flickrAPI';
import { initGallery } from './lib/gallery';

/**
 *	Call Flickr API for collections and transform result
 */
const getCollections = function getCollectionsCall() {
	return collectionAPI()
		.then((collections) => {
			return collections.collections.collection[0].collection; // lol flickr api response
		});
};

global.app = function () {
	getCollections()
		.then((collections) => { return initGallery(collections); })
		.then((data) => { console.log('Gallery Done', data); })
		.catch((e) => { console.log(e); });
};
