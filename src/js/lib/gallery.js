/**
 *
 *	gallery.js
 *
 */

import Handlebars from 'handlebars';
import { appendTemplate } from './helper';
import { buildItems } from './page';

// Default css transition time
let transitioning = false;
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
const jumpPage = function jumpGalleryPage(jump, newIndices) {
	return new Promise((resolve, reject) => {
		// Creating jump transition class
		const jumpDistance = (Math.abs(jump) <= 2) ? Math.abs(jump) : 'max';
		const jumpDirection = (jump < 0) ? 'left-' : 'right-';
		const jumpClass = jumpDirection + jumpDistance;

		// Start transition
		pages[currIndex].classList.add(jumpClass);
		pages[prevIndex].classList.add(jumpClass);
		pages[nextIndex].classList.add(jumpClass);

		// After transition finishes, update pages
		setTimeout(() => {
			pages[currIndex].className = 'page';
			pages[prevIndex].className = 'page';
			pages[nextIndex].className = 'page';

			pages[newIndices.curr].classList.add('curr');
			pages[newIndices.prev].classList.add('prev');
			pages[newIndices.next].classList.add('next');

			resolve();
		}, transitionTime);
	});
};

/**
 *	Jumps nav elements
 *
 *	TODO: Fix jank ass timing shit below without jquery
 */
const jumpNav = function jumpGalleryNav(jump, navElem) {
	return new Promise((resolve, reject) => {
		// Creating jump transition class
		const jumpDistance = Math.abs(jump);
		const jumpDirection = (jump < 0) ? 'left-' : 'right-';
		const jumpClass = jumpDirection + jumpDistance;

		// Start transition
		const nav = document.getElementById('nav-container');
		nav.classList.add(jumpClass);

		// Reset targets
		const targetIndex = Math.floor(size / 2);
		navs[targetIndex].classList.remove('target');
		navElem.classList.add('target');

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

			// TODO: fix this BS
			// Immediately after reordering
			// Fade nav elements back in
			setTimeout(() => {
				for (let i = 0; i < size; i++) {
					navs[i].classList.remove('hide');
				}
				resolve();
			}, 50);
		}, transitionTime);
	});
};

/**
 *	Move and update gallery
 */
const jumpTo = function jumpToGallery(index, navTarget) {
	// Checks if alid jump
	if (index > size || index < 0) throw new Error('Invalid page');
	if (transitioning || index === currIndex) return;

	// Block more jumps
	transitioning = true;

	// Calculate shortest jump
	const linear = index - currIndex;
	const wrap = (index < currIndex) ? linear + size : linear - size;
	const jump = (Math.abs(linear) < Math.abs(wrap)) ? linear : wrap;

	// New index variables
	const newIndices = {
		curr:	index,
		next:	(index + 1) % size,
		prev:	(index + size - 1) % size,
	};

	// Update page and nav
	const jumpPromises = [
		jumpPage(jump, newIndices),
		jumpNav(jump, navTarget),
	];

	// Reset after all transitions are finished
	Promise.all(jumpPromises)
	.then(() => {
		// Update indices
		currIndex = newIndices.curr;
		prevIndex = newIndices.prev;
		nextIndex = newIndices.next;

		// Unblock jumps
		transitioning = false;
	});
};

/**
 *	Initializes nav elements
 */
const initNav = function initGalleryNav() {
	// Set nav width dynamically	TODO: find better option
	const navElemTransition = 10;	// nav elem width + 2 * margin, currently manual
	const navContainer = document.getElementById('nav-container');
	navContainer.style.maxWidth = size * navElemTransition + 'rem';

	// Attaches event listeners to nav elems
	for (let i = 0; i < size; i++) {
		navs[i].addEventListener('click', (e) => {
			jumpTo(i, e.target);
		});
	}

	// Sets initial target elem
	navs[currIndex].classList.add('target');

	// Shows nav
	const navBar = document.getElementById('nav-bar');
	navBar.classList.remove('hide');
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
	const pagePromises = data.map((collection, index) => {
		return buildItems(pages[index], collection.set);
	});
	return Promise.all(pagePromises);
};

/**
 *	Builds gallery pages and nav with templates
 *
 *	TODO: precompile and organize templates
 */
const buildGallery = function buildGalleryHTML(data) {
	if (data.length <= 0) throw new Error('Empty data');

	// Template variables
	const pagesRoot = document.getElementById('gallery-pages');
	const pagesSource = document.getElementById('page-template').innerHTML;
	const pagesTemplate = Handlebars.compile(pagesSource);
	const navRoot = document.getElementById('gallery-nav');
	const navSource = document.getElementById('nav-template').innerHTML;
	const navTemplate = Handlebars.compile(navSource);

	// Build HTML using template
	pages = appendTemplate(pagesRoot, pagesTemplate, data);
	appendTemplate(navRoot, navTemplate, data);
	const navContainer = document.getElementById('nav-container');
	navs = navContainer.children;

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
	.then(() => initNav())
	.then(() => initPage());
};

export {
	initGallery,
	loadPages,
};
