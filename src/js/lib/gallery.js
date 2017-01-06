/**
 *
 *	gallery.js
 *
 */

import Handlebars from 'handlebars';
import { collectionAPI } from './flickrAPI';
import { appendTemplate } from './helper';
import { buildPage } from './page';

/**
 *	Call Flickr API for collection root and transform result
 */
const getCollections = function getCollectionsCall() {
	return collectionAPI()
		.then((collections) => {
			return collections.collections.collection[0].collection; // lol flickr api response
		});
};

/**
 *	Initializes and builds gallery
 */
const buildGallery = function buildGalleryHTML(collections) {
	// TODO: precompile and organize templates
	const pagesSource = document.getElementById('page-template').innerHTML;
	const pagesTemplate = Handlebars.compile(pagesSource);
	const itemSource = document.getElementById('item-template').innerHTML;
	const itemTemplate = Handlebars.compile(itemSource);

	// Insert empty pages
	const gallery = document.getElementById('gallery-pages');
	const pages = appendTemplate(gallery, pagesTemplate, collections);

	// Builds inital page first
	buildPage(pages[0], itemTemplate, collections[0].set);
	// Build the rest of the pages async
	// .then(() => {
	// 	const pagePromises = (collections.slice(1)).map((collection, pageIndex) => {
	// 		return buildPage(pages[pageIndex + 1], itemTemplate, collection.set);
	// 	});
	// 	return Promise.all(pagePromises);
	// });
};

const initGallery = function initGalleryPage() {
	return getCollections()
		.then((collection) => { return buildGallery(collection); });
};

export {
	initGallery,
	getCollections,
};
