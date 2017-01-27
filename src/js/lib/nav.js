/**
 *
 *	nav.js
 *
 */

import { jumpTo, jumpToPrev, jumpToNext } from './gallery';

/**
 *	Initializes nav elements
 */
const initNav = function initGalleryNav(navs, state) {
	// Set nav width dynamically
	// TODO: find better option
	const navElemTransition = 10;	// nav elem width + 2 * margin, currently manual
	const navContainer = document.getElementById('nav-container');
	navContainer.style.maxWidth = state.size * navElemTransition + 'rem';

	// Attach event listeners to nav elems
	for (let i = 0; i < state.size; i++) {
		navs[i].addEventListener('click', (e) => {
			jumpTo(i, e.target);
		});
	}

	// Attach event listeners to nav arrows
	const navLeft = document.getElementById('nav-left');
	const navRight = document.getElementById('nav-right');
	const galleryUp = document.getElementById('gallery-up');
	navLeft.addEventListener('click', () => {
		jumpToPrev();
	});
	navRight.addEventListener('click', () => {
		jumpToNext();
	});
	galleryUp.addEventListener('click', () => {
		window.scroll({
			top: state.stickyHeight,
			left: 0,
			behavior: 'smooth',
		});
	});

	// Sets initial target elem
	navs[state.currIndex].classList.add('target');

	// Shows nav
	const navBar = document.getElementById('nav-bar');
	navBar.classList.remove('hide');
};

export {
	initNav,
};
