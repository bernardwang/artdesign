/**
 *
 *	page.js
 *
 */

import { photosetAPI } from './flickrAPI';
import { appendTemplate } from './helper';
import { jumpToPrev, jumpToNext } from './gallery';
import { initItems } from './item';
import { default as itemTemplate } from '../templates/item';

/**
 *	Adds a single item into a page with all photos
 */
const buildAllItems = function buildAllItemsPhoto(root, template, item) {
	return photosetAPI(item.id)
		.then((photoset) => {	// Transform result
			return photoset.photoset.photo;
		})
		.then((photos) => {
			const photoList = (photos).map((photo) => {
				return {
					src: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_z.jpg`,
					title: photo.title,
				};
			});

			const moreCount = photos.length;
			const isMore = (moreCount > 0);
			const context = {	// Create context with image source
				title: item.title,
				description: item.description,
				photos: photoList,
				count: moreCount,
				more: isMore,
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
const buildPage = function buildPageItems(page, items) {
	// Check if items already loaded
	const itemRoot = page.getElementsByClassName('page-items')[0];
	if (itemRoot.children.length > 0) return Promise.resolve();

	const itemPromises = items.map((item) => {
		return buildAllItems(itemRoot, itemTemplate, item);
	});

	return Promise.all(itemPromises)
	.then(() => {
		initItems(itemRoot.children);
	});
};

/**
 *	Initializes pages
 */
const initPage = function initGalleryPage(pages, state) {
	// Sets initial page
	pages[state.currIndex].classList.add('curr');
	pages[state.prevIndex].classList.add('prev');
	pages[state.nextIndex].classList.add('next');

	const addPageListener = (page) => {
		page.addEventListener('click', () => {
			if (page.classList.contains('prev')) {
				jumpToPrev();
			} else if (page.classList.contains('next')) {
				jumpToNext();
			}
		});
	};

	// Add next and prev page event listeners
	for (let i = 0; i < state.size; i++) {
		addPageListener(pages[i]);
	}
};

export {
	initPage,
	buildPage,
};
