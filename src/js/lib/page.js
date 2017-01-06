/**
 *
 *	page.js
 *
 */

import Handlebars from 'handlebars';
import { photosetAPI } from './flickrAPI';
import { appendTemplate } from './helper';

/**
 *	Get photosets from Flickr, and insert into page
 */
const buildItem = function buildPageItem(root, template, item) {
	return photosetAPI(item.id)
		.then((photoset) => {	// Transform result
			return photoset.photoset.photo;
		})
		.then((photos) => {
			const photo_urls = (photos).map((photo) => {
				return `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_z.jpg`;
			});
			const context = {	// Create context with image source
				title: item.title,
				description: item.description,
				photos: photo_urls,
			};

			// Append item
			appendTemplate(root, template, context);
		});
};

/**
 *	Async builds and adds all page items
 */
const buildPage = function buildGalleryPage(pageRoot, template, items) {
	const itemRoot = pageRoot.getElementsByClassName('page-items')[0]; // Page item location
	const itemPromises = items.map((item) => {
		return buildItem(itemRoot, template, item);
	});
	return Promise.all(itemPromises);
};

export {
	buildPage,
};