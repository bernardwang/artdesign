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
 *	Calculates the shortest direction and distance for page jump
 *  Returns css class for transition
 */
const jumpTransition = function getJumpTransition(index) {
	// calculating shortest jump
	const linear = index - currIndex;
	const wrap = (index < currIndex) ? linear + pagesSize : linear - pagesSize;
	const shortest = (Math.abs(linear) < Math.abs(wrap)) ? linear : wrap;

	// constructing transition class
	const distance = (Math.abs(shortest) <= 2) ? Math.abs(shortest) : 'max';	// jump distance string
	const direction = (shortest < 0) ? 'left-' : 'right-';						// jump direction string
	const transition = direction + distance;									// jump transition string

	return transition;
};

/**
 *	Jumps to given page
 */
const jumpToPage = function showGalleryPage(index) {
	if (index > pagesSize || index < 0) throw new Error('Invalid page');
	if (index === currIndex) return;

	const transition = jumpTransition(index);
	pages[currIndex].classList.add(transition);
	pages[prevIndex].classList.add(transition);
	pages[nextIndex].classList.add(transition);

	const newPrevIndex = (index + pagesSize - 1) % pagesSize;
	const newNextIndex = (index + 1) % pagesSize;
	const newCurrIndex = index;

	// TODO: FIX THIS JANK DELAY
	setTimeout(() => {
		pages[currIndex].className = 'page';
		pages[prevIndex].className = 'page';
		pages[nextIndex].className = 'page';

		pages[newCurrIndex].classList.add('curr');
		pages[newPrevIndex].classList.add('prev');
		pages[newNextIndex].classList.add('next');

		currIndex = newCurrIndex;
		prevIndex = newPrevIndex;
		nextIndex = newNextIndex;
	}, 1000);
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
			jumpToPage(i);
		});
	}
};

/**
 *	Chooses initial page
 */
const initPage = function initGalleryPage(index) {
	prevIndex = (index + pagesSize - 1) % pagesSize;
	nextIndex = (index + 1) % pagesSize;
	currIndex = index;

	pages[currIndex].classList.add('curr');
	pages[prevIndex].classList.add('prev');
	pages[nextIndex].classList.add('next');
};

/**
 *	Builds gallery pages and nav with templates
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

	// return promise that resolves when
	return loadPages(collections);
};

/**
 *	init gallery
 */
const initGallery = function initGalleryPage(collections) {
	return buildGallery(collections)
	.then(() => { initNav(); })
	.then(() => { initPage(1); }); // start with last page
};

export {
	initGallery,
};
