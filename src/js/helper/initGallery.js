/**
 *
 *	initGallery.js
 *
 *	Retrieves photos from Flickr & builds gallery
 *
 *	Collections -> gallery categories
 *	Photosets -> category items
 *	Photos -> item photos
 *
 */

import { getCollections, getPhotoset} from './flickrAPI';
import Handlebars from 'handlebars';

/**
 *	Call Flickr API for collection root and transform result
 */
const getPages = function getFlickrPhotos() {
	return getCollections()
		.then((collections) => {
			var pages = collections.collections.collection[0].collection;

			//console.log(pages);

			return pages // lol flickr api response
		})
}

/**
 *	Get item photos from Flickr API, and insert item into given page node
 *
 *	Return: HTML nodes of inserted item
 */
const insertItem = function insertPageItem(insertNode, template, item) {
	return getPhotoset(item.id)
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

			// Append templated html to page node
			var itemHTML = template(context);
			insertNode.innerHTML += itemHTML;
			return insertNode.children;
		});
}

/**
 *	Inserts empty pages into gallery
 *
 *	Return: HTML nodes of inserted pages
 */
const insertPages = function insertGalleryPages(insertNode, template, pages) {
	var pagesHTML = template(pages);
	insertNode.innerHTML = pagesHTML;
	return insertNode.children;
}

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
	var pageNode = insertPages(galleryNode, pagesTemplate, pages);


	// Populate pages with items
	//for(var pageIndex = 0; pageIndex < pages.length; pageIndex++) {
	for(var pageIndex = 1; pageIndex < 2; pageIndex++) {
		var items = pages[pageIndex].set;
		var insertPromises = items.map((item) => {
			return insertItem(pageNode[pageIndex], itemTemplate, item);
		});
		return Promise.all(insertPromises);
	}
}

const initGallery = function initGalleryPage() {
	return getPages()
	//	.then((collections) => getPages(collections))
		.then((pages) => buildGallery(pages));
};

export {
	initGallery,
};
