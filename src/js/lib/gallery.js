/**
 *
 *	gallery.js
 *
 */

import Handlebars from 'handlebars';
import { appendTemplate, scrollTo } from './helper';
import { initPage, buildPage } from './page';
import { initNav } from './nav';
import { GLOBAL } from './global';


// Gallery HTML elements
let navs = [];
let pages = [];

// Gallery state
const state = {
	size: 0,
	currIndex: 0,
	nextIndex: 0,
	prevIndex: 0,
	sticky: false,
	stickyHeight: 0,
};

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
		pages[state.currIndex].classList.add(jumpClass);
		pages[state.prevIndex].classList.add(jumpClass);
		pages[state.nextIndex].classList.add(jumpClass);

		// After transition finishes, update pages
		setTimeout(() => {
			pages[state.currIndex].className = 'page';
			pages[state.prevIndex].className = 'page';
			pages[state.nextIndex].className = 'page';

			pages[newIndices.curr].classList.add('curr');
			pages[newIndices.prev].classList.add('prev');
			pages[newIndices.next].classList.add('next');

			resolve();
		}, GLOBAL.transitionTime);
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
		const targetIndex = Math.floor(state.size / 2);
		navs[targetIndex].classList.remove('target');
		navElem.classList.add('target');

		// After transition
		// Hide and reorder nav elements
		setTimeout(() => {
			for (let i = 0; i < Math.abs(jump); i++) {
				if (jump < 0) {
					navs[state.size - 1].classList.add('hide');
					nav.insertBefore(navs[state.size - 1], navs[0]);
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
				for (let i = 0; i < state.size; i++) {
					navs[i].classList.remove('hide');
				}
				resolve();
			}, 50);
		}, GLOBAL.transitionTime);
	});
};

/**
 *	Move and update gallery
 */
const jumpTo = function jumpToNav(index, navTarget) {
	// Checks if alid jump
	if (index > state.size || index < 0) throw new Error('Invalid page');
	if (GLOBAL.transitioning || index === state.currIndex) return;

	// Block more jumps
	GLOBAL.transitioning = true;

	// Scroll to top of nav first
	if (state.sticky) scrollTo(state.stickyHeight, false);

	// Calculate shortest jump
	const linear = index - state.currIndex;
	const wrap = (index < state.currIndex) ? linear + state.size : linear - state.size;
	const jump = (Math.abs(linear) < Math.abs(wrap)) ? linear : wrap;

	// New index variables
	const newIndices = {
		curr:	index,
		next:	(index + 1) % state.size,
		prev:	(index + state.size - 1) % state.size,
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
		state.currIndex = newIndices.curr;
		state.prevIndex = newIndices.prev;
		state.nextIndex = newIndices.next;

		// Unblock jumps
		GLOBAL.transitioning = false;
	});
};

/**
 *	Move to next page
 */
const jumpToNext = function jumpToNextNav() {
	const next = (state.currIndex + 1) % state.size;
	const nextNavIndex = Math.floor(state.size / 2) + 1;
	const nextNavTarget = navs[nextNavIndex];
	jumpTo(next, nextNavTarget);
};

/**
 *	Move to prev page
 */
const jumpToPrev = function jumpToPrevNav() {
	const prev = (state.currIndex + state.size - 1) % state.size;
	const prevNavIndex = Math.floor(state.size / 2) - 1;
	const prevNavTarget = navs[prevNavIndex];
	jumpTo(prev, prevNavTarget);
};

/**
 *	Loads items on a single page
 */
const loadPage = function loadGalleryPage(data, index) {
	return buildPage(pages[index], data[index].set);
};

/**
 *	Loads items on all pages
 */
const loadPages = function loadGalleryPages(data) {
	const pagePromises = data.map((collection, index) => {
		return buildPage(pages[index], collection.set);
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
	state.size = pages.length;
	state.currIndex = Math.floor(state.size / 2);
	state.nextIndex = (state.currIndex + 1) % state.size;
	state.prevIndex = (state.currIndex + state.size - 1) % state.size;
	state.sticky = false;
	state.stickyHeight = document.getElementById('about').clientHeight;

	// Add gallery scroll listener
	window.addEventListener('scroll', (e) => {
		const scroll = document.body.scrollTop || document.documentElement.scrollTop;
		if ((scroll >= state.stickyHeight && state.sticky) ||
			(scroll < state.stickyHeight && !state.sticky)) {
			return;
		}

		const gallery = document.getElementById('gallery');
		if (scroll >= state.stickyHeight) {
			gallery.classList.add('sticky');
			state.sticky = true;
		} else {
			gallery.classList.remove('sticky');
			state.sticky = false;
		}
	});

	// Load first 3 pages
	const pagePromises = [
		loadPage(data, state.currIndex),
		loadPage(data, state.nextIndex),
		loadPage(data, state.prevIndex),
	];
	return Promise.all(pagePromises);
};

/**
 *	Initialize gallery
 */
const initGallery = function initGalleryPage(data) {
	return buildGallery(data)
	.then(() => initNav(navs, state))
	.then(() => initPage(pages, state));
};

export {
	initGallery,
	loadPages,
	jumpTo,
	jumpToPrev,
	jumpToNext,
};
