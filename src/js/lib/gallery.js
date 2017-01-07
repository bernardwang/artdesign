/**
 *
 *	gallery.js
 *
 */

import Handlebars from 'handlebars';
import { appendTemplate } from './helper';
import { initPage } from './page';

let pages = [];
let pagesSize = 0;
let currIndex = 0;
let nextIndex = 0;
let prevIndex = 0;

/**
 *	Loads single page
 */
const buildPage = function buildGalleryPage(collections, index) {
	return initPage(pages[index], collections[index].set);
};

/**
 *	Loads all pages async
 */
const buildPages = function buildGalleryPages(collections) {
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

	pages = appendTemplate(pagesRoot, pagesTemplate, collections);
	pagesSize = pages.length;

	// Loads all pages
	return buildPages(collections);
};

/**
 *	Jumps to given page
 */
const goToPage = function showGalleryPage(index) {
	if (index === currIndex) return;
	if (index > pagesSize || index < 0) {
		throw new Error('Invalid page');
	}

	pages[currIndex].classList.remove('curr');
	pages[prevIndex].classList.remove('prev');
	pages[nextIndex].classList.remove('next');

	prevIndex = (index + pagesSize - 1) % pagesSize;
	nextIndex = (index + 1) % pagesSize;
	currIndex = index;

	pages[currIndex].classList.add('curr');
	pages[prevIndex].classList.add('prev');
	pages[nextIndex].classList.add('next');
};

/**
 *	init gallery
 */
const initGallery = function initGalleryPage(collections) {
	return buildGallery(collections)
	.then(() => { return goToPage(pagesSize - 1); }) // start with last page
};

export {
	initGallery,
};
