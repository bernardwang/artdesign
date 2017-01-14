/**
 *
 *	gallery.js
 *
 */

import Handlebars from 'handlebars';
import { appendTemplate } from './helper';
import { buildItems } from './page';

// Default css transition time
const transitionTime = 1000;

// Gallery HTML elements
let navs = [];
let pages = [];

// Gallery state
let size = 0;
let currIndex = 0;
let nextIndex = 0;
let prevIndex = 0;

/**
 *	Jumps to page
 */
const jumpPage = function jumpGalleryPage(index, jump) {
	// Creating jump transition class
	const jumpDistance = (Math.abs(jump) <= 2) ? Math.abs(jump) : 'max';
	const jumpDirection = (jump < 0) ? 'left-' : 'right-';
	const jumpClass = jumpDirection + jumpDistance;

	// New index variables
	const newPrevIndex = (index + size - 1) % size;
	const newNextIndex = (index + 1) % size;
	const newCurrIndex = index;

	console.log(jump);

	// Start transition
	pages[currIndex].classList.add(jumpClass);
	pages[prevIndex].classList.add(jumpClass);
	pages[nextIndex].classList.add(jumpClass);

	// After transition finishes, update pages
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
	}, transitionTime);
};

/**
 *	Jumps nav elements
 *
 *	TODO: Fix jank ass timing shit below without jquery
 */
const jumpNav = function jumpGalleryNav(index, jump) {
	// Creating jump transition class
	const jumpDistance = Math.abs(jump);
	const jumpDirection = (jump < 0) ? 'left-' : 'right-';
	const jumpClass = jumpDirection + jumpDistance;

	// Start transition
	const nav = document.getElementById('nav');
	nav.classList.add(jumpClass);
	
	// After transition
	// Hide and reorder nav elements
	setTimeout(() => {
		for (let i = 0; i < Math.abs(jump); i++) {
			if (jump < 0) {
				navs[size - 1].classList.add('hide');
				nav.insertBefore(navs[size - 1], navs[0]);
			} else {
				navs[0].classList.add('hide');
				nav.appendChild(navs[0]);
			}
		}
		nav.classList.remove(jumpClass);
	}, transitionTime);
	
	// Immediately after reordering
	// Fade nav elements back in
	setTimeout(() => {
		for (let i = 0; i < size; i++) {
			navs[i].classList.remove('hide');
		}
	}, transitionTime + 50); // TODO: fix this BS
};

/**
 *	Move and update gallery
 */
const jumpTo = function jumpToGallery(index) {
	// Valid jump
	if (index > size || index < 0) throw new Error('Invalid page');
	if (index === currIndex) return;

	// Calculate shortest jump
	const linear = index - currIndex;
	const wrap = (index < currIndex) ? linear + size : linear - size;
	const jump = (Math.abs(linear) < Math.abs(wrap)) ? linear : wrap;

	// Update page and nav
	jumpPage(index, jump);
	jumpNav(index, jump);
};

/**
 *	Initializes nav elements
 */
const initNav = function initGalleryNav() {
	// Attaches event listeners to nav
	for (let i = 0; i < size; i++) {
		navs[i].addEventListener('click', () => {
			jumpTo(i);
		});
	}
};

/**
 *	Initializes pages
 */
const initPage = function initGalleryPage() {
	// Sets initial page
	pages[currIndex].classList.add('curr');
	pages[prevIndex].classList.add('prev');
	pages[nextIndex].classList.add('next');
};

/**
 *	Loads items on a single page
 */
const loadPage = function loadGalleryPage(data, index) {
	return buildItems(pages[index], data[index].set);
};

/**
 *	Loads items on all pages
 */
const loadPages = function loadGalleryPages(data) {
	const pagePromises = (data.map((collection, index) => {
		return buildItems(pages[index], collection.set);
	}));
	return Promise.all(pagePromises);
};

/**
 *	Builds gallery pages and nav with templates
 *
 *	TODO: precompile and organize templates
 */
const buildGallery = function buildGalleryHTML(data) {
	// Template variables
	const pagesRoot = document.getElementById('gallery-pages');
	const pagesSource = document.getElementById('page-template').innerHTML;
	const pagesTemplate = Handlebars.compile(pagesSource);
	const navRoot = document.getElementById('gallery-nav');
	const navSource = document.getElementById('nav-template').innerHTML;
	const navTemplate = Handlebars.compile(navSource);

	// Build HTML using template
	pages = appendTemplate(pagesRoot, pagesTemplate, data);
	navs = appendTemplate(navRoot, navTemplate, data)[0].children;

	// Initialize state variables
	size = pages.length;
	currIndex = Math.floor(size / 2);
	nextIndex = (currIndex + 1) % size;
	prevIndex = (currIndex + size - 1) % size;

	// Load first 3 pages
	const pagePromises = [
		loadPage(data, currIndex),
		loadPage(data, nextIndex),
		loadPage(data, prevIndex),
	];
	return Promise.all(pagePromises);
};

/**
 *	Initialize gallery
 */
const initGallery = function initGalleryPage(data) {
	return buildGallery(data)
	.then(() => { initNav(); })
	.then(() => { initPage(); })
	.then(() => { return; });
};

export {
	initGallery,
	loadPages,
};
