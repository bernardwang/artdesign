/**
 *
 *	page.js
 *
 */

import Handlebars from 'handlebars';
import { photosetAPI } from './flickrAPI';
import { appendTemplate } from './helper';

/**
 *	Adds a single item into a page
 */
const buildItem = function buildPageItem(root, template, item) {
	return photosetAPI(item.id)
		.then((photoset) => {	// Transform result
			return photoset.photoset.photo;
		})
		.then((photos) => {
			const photoURLs = (photos).map((photo) => {
				return `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_z.jpg`;
			});
			const context = {	// Create context with image source
				title: item.title,
				description: item.description,
				photos: photoURLs,
			};

			// Append item
			appendTemplate(root, template, context);
		});
};

/**
 *	Adds all items into a page
 *
 *	TODO: precompile and organize templates
 */
const buildItems = function buildPageItems(page, items) {
	// Check if items already loaded
	const itemRoot = page.getElementsByClassName('page-items')[0];
	if (itemRoot.children.length > 0) return Promise.resolve();

	const itemSource = document.getElementById('item-template').innerHTML;
	const itemTemplate = Handlebars.compile(itemSource);
	const itemPromises = items.map((item) => {
		return buildItem(itemRoot, itemTemplate, item);
	});
	return Promise.all(itemPromises);
};

export {
	buildItems,
};
