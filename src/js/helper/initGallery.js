/**
 *
 *	initGallery.js
 *
 *	Retrieves photos from Flickr & builds gallery
 *
 */

import { collectionAPI, photosetAPI } from './flickrAPI';
import Handlebars from 'handlebars';

/**
 *	Helper function for inserting handlebar templates
 */
const appendTemplate = function appendHandlebarTemplate(root, template, context) {
	// TODO: USE HTMLBARS
	root.innerHTML += template(context);
	return root.children;
};

/**
 *	Call Flickr API for collection root and transform result
 */
const getCollections = function getCollectionsCall() {
	return collectionAPI()
		.then((collections) => {
			return collections.collections.collection[0].collection; // lol flickr api response
		});
}

/**
 *	Get item photos from Flickr API, and insert item into given page node
 */
const buildItem = function buildPageItem(root, template, item) {
	return photosetAPI(item.id)
		.then((photoset) => {	// Transform result
			return photoset.photoset.photo;
		})
		.then((photos) => {
			let context = {	// Create context with image source
				title: item.title,
				description: item.description,
				photos: (photos).map((photo) => {
					return `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_z.jpg`;
				}),
			};

			// Append item
			appendTemplate(root, template, context);
		});
};

/**
 *	Async builds and adds all page items
 */
const buildPage = function buildGalleryPage(pageRoot, template, items) {
	let itemRoot = pageRoot.getElementsByClassName('page-items')[0]; // Page item location
	let itemPromises = items.map((item) => {
		return buildItem(itemRoot, template, item);
	});
	return Promise.all(itemPromises);
};

/**
 *	Initializes and builds gallery
 */
const buildGallery = function buildGalleryHTML(collections) {
	// TODO: precompile and organize templates
	let pagesSource = document.getElementById('page-template').innerHTML;
	let pagesTemplate = Handlebars.compile(pagesSource);
	let itemSource = document.getElementById('item-template').innerHTML;
	let itemTemplate = Handlebars.compile(itemSource);

	// Insert empty pages
	let gallery = document.getElementById('gallery-pages');
	let pages = appendTemplate(gallery, pagesTemplate, collections);

	// Builds inital page first
	buildPage(pages[0], itemTemplate, collections[0].set)
	// Build the rest of the pages async
	.then(() => {
		let pagePromises = (collections.slice(1)).map((collection, pageIndex) => {
			return buildPage(pages[pageIndex+1], itemTemplate, collection.set);
		});
		return Promise.all(pagePromises);
	});
};

const initGallery = function initGalleryPage() {
	return getCollections()
		.then((collection) => buildGallery(collection));
};

export {
	initGallery,
};
