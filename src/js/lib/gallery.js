/**
 *
 *	gallery.js
 *
 */

import Handlebars from 'handlebars';
import { appendTemplate } from './helper';
import { initPage } from './page';

/**
 *	Loads single page
 */
const buildPage = function buildGalleryPage(pages, collections, index) {
	return initPage(pages[index], collections[index].set);
};

/**
 *	Loads all pages async
 */
const buildPages = function buildGalleryPages(pages, collections) {
	// Loads all pages
	const pagePromises = (collections.map((collection, index) => {
		return initPage(pages[index], collection.set);
	}));
	return Promise.all(pagePromises);
};

/**
 *	Adds and loads all pages into gallery
 */
const buildGallery = function buildGalleryHTML(collections) {
	// Insert empty pages
	const pagesSource = document.getElementById('page-template').innerHTML;
	const pagesTemplate = Handlebars.compile(pagesSource);
	const pagesRoot = document.getElementById('gallery-pages');
	const pages = appendTemplate(pagesRoot, pagesTemplate, collections);

	// Loads all pages
	// buildPages(pages, collections);
	buildPage(pages, collections, 0);
	return pagesRoot;
};

/**
 *	init gallery
 */
const initGallery = function initGalleryPage(collections) {
	return buildGallery(collections);
};

export {
	initGallery,
};
