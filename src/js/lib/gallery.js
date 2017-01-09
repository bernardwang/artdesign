/**
 *
 *	gallery.js
 *
 */

import Handlebars from 'handlebars';
import { appendTemplate } from './helper';
import { buildItems } from './page';

let pages = [];
let pagesSize = 0;
let currIndex = 0;
let nextIndex = 0;
let prevIndex = 0;
let nav = [];

/**
 *	Jumps to given page
 */
const goToPage = function showGalleryPage(index) {
	if (index === currIndex) return; // fix later
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
 *	Loads items on single page
 */
const loadPage = function loadGalleryPage(collections, index) {
	return buildItems(pages[index], collections[index].set);
};

/**
 *	Loads items on all pages, async
 */
const loadPages = function loadGalleryPages(collections) {
	const pagePromises = (collections.map((collection, index) => {
		return buildItems(pages[index], collection.set);
	}));
	return Promise.all(pagePromises);
};

/**
 *	Attaches event listeners to nav
 */
const initNav = function initGalleryNav() {
	for (let i = 0; i < pagesSize; i++) {
		nav[i].addEventListener('click', () => {
			goToPage(i);
		});
	}
}

/**
 *	Builds gallery pages and nav
 */
const buildGallery = function buildGalleryHTML(collections) {
	// Template for pages
	const pagesSource = document.getElementById('page-template').innerHTML;
	const pagesTemplate = Handlebars.compile(pagesSource);
	const pagesRoot = document.getElementById('gallery-pages');

	// Add empty pages
	pages = appendTemplate(pagesRoot, pagesTemplate, collections);
	pagesSize = pages.length;

	// Template for nav
	const navSource = document.getElementById('nav-template').innerHTML;
	const navTemplate = Handlebars.compile(navSource);
	const navRoot = document.getElementById('gallery-nav');

	nav = appendTemplate(navRoot, navTemplate, collections);
	initNav();

	// return promise that resolves when
	return loadPages(collections);
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
