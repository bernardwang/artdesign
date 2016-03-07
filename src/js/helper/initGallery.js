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
const appendTemplate = function appendHandlebarTemplate(rootNode, template, context) {
	// TODO: USE HTMLBARS
	rootNode.innerHTML += template(context);
	return rootNode.children;
}

/**
 *	Call Flickr API for collection root and transform result
 */
const getCollections = function getCollectionsCall() {
	return collectionAPI()
		.then((collections) => {
			return collections.collections.collection[0].collection; // lol flickr api response
		})
}

/**
 *	Get item photos from Flickr API, and insert item into given page node
 */
const buildItem = function buildPageItem(rootNode, template, item) {
	return photosetAPI(item.id)
		.then((photoset) => {	// Transform result
			return photoset.photoset.photo
		})
		.then((photos) => {
			var context = {	// Create context with image source
				title: item.title,
				description: item.description,
				photos: (photos).map((photo) => {
					return `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_z.jpg`;
				}),
			};

			// Append item
			appendTemplate(rootNode, template, context);
		});
}

/**
 *	Async builds and adds all page items
 */
const buildPage = function buildGalleryPage(rootNode, template, items) {
	var itemPromise = items.map((item) => {
		return buildItem(rootNode, template, item);
	});
	return Promise.all(itemPromises);
};

/**
 *	Initializes and builds gallery
 */
const buildGallery = function buildGalleryHTML(pages) {
	// TODO: precompile and organize templates
	var pagesSource = document.getElementById('page-template').innerHTML;
	var pagesTemplate = Handlebars.compile(pagesSource);
	var itemSource = document.getElementById('item-template').innerHTML;
	var itemTemplate = Handlebars.compile(itemSource);

	// Insert empty gallery pages
	var galleryNode = document.getElementById('gallery');
	var pageNode = appendTemplate(galleryNode, pagesTemplate, pages);

	// Populate pages with items
	//for(var pageIndex = 0; pageIndex < pages.length; pageIndex++) {
	for(var pageIndex = 1; pageIndex < 2; pageIndex++) {
		buildPage(pageNode[pageIndex], itemTemplate, pages[pageIndex].set)
	}
}

const initGallery = function initGalleryPage() {
	return getCollections()
		.then((collection) => buildGallery(collection));
};

export {
	initGallery,
};
