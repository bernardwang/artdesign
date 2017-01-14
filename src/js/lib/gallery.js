/**
 *
 *	gallery.js
 *
 */

import Handlebars from 'handlebars';
import { appendTemplate } from './helper';
import { buildItems } from './page';

let navs = [];
let pages = [];
let size = 0;

let currIndex = 0;
let nextIndex = 0;
let prevIndex = 0;

/**
 *	Jumps to given page
 */
const jumpPage = function jumpGalleryPage(index, jump) {
	const distance = (Math.abs(jump) <= 2) ? Math.abs(jump) : 'max';	// jump distance string
	const direction = (jump < 0) ? 'left-' : 'right-';					// jump direction string
	const jumpClass = direction + distance;								// jump jump string

	pages[currIndex].classList.add(jumpClass);
	pages[prevIndex].classList.add(jumpClass);
	pages[nextIndex].classList.add(jumpClass);

	const newPrevIndex = (index + size - 1) % size;
	const newNextIndex = (index + 1) % size;
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
 *	Jumps nav to correct element
 */
const jumpNav = function jumpGalleryNav(index, jump) {
	const distance = Math.abs(jump);						// jump distance string
	const direction = (jump < 0) ? 'left-' : 'right-';		// jump direction string
	const jumpClass = direction + distance;					// jump jump string
	const nav = document.getElementById('nav');

	nav.classList.add(jumpClass);

	setTimeout(() => {
		for (let i = 0; i < Math.abs(jump); i++) {
			if (jump < 0) {
				//navs[size - 1].style.opacity = 0;
				nav.insertBefore(navs[size - 1], navs[0]);
			} else {
				//navs[0].style.opacity = 0;
				nav.appendChild(navs[0]);
			}
		}

		nav.classList.remove(jumpClass);
	}, 1000);
}

/**
 *	Jumps nav to correct
 */
const jumpTo = function jumpToGallery(index) {
	if (index > size || index < 0) throw new Error('Invalid page');
	if (index === currIndex) return;

	// calculating shortest jump
	const linear = index - currIndex;
	const wrap = (index < currIndex) ? linear + size : linear - size;
	const jump = (Math.abs(linear) < Math.abs(wrap)) ? linear : wrap;

	jumpPage(index, jump);
	jumpNav(index, jump);
}


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
	for (let i = 0; i < size; i++) {
		navs[i].addEventListener('click', () => {
			jumpTo(i);
		});
	}
};

/**
 *	Chooses initial page
 */
const initPage = function initGalleryPage(index) {
	size = pages.length;
	prevIndex = (index + size - 1) % size;
	nextIndex = (index + 1) % size;
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

	// Template for nav
	const navSource = document.getElementById('nav-template').innerHTML;
	const navTemplate = Handlebars.compile(navSource);
	const navRoot = document.getElementById('gallery-nav');

	pages = appendTemplate(pagesRoot, pagesTemplate, collections);
	navs = appendTemplate(navRoot, navTemplate, collections)[0].children;
	size = pages.length;

	return loadPages(collections);
};

/**
 *	init gallery
 */
const initGallery = function initGalleryPage(collections) {
	return buildGallery(collections)
	.then(() => { initNav(); })
	.then(() => { initPage(2); }); // start with last page
};

export {
	initGallery,
};
