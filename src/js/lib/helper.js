/**
 *
 *	helper.js
 *
 */


import { polyfill } from '../vendor/smoothscroll';

polyfill();

/**
 *	Helper function for inserting handlebar templates
 */
const appendTemplate = function appendHandlebarTemplate(root, template, context) {
	// TODO: USE HTMLBARS
	const element = root;
	element.innerHTML += template(context);
	return element.children;
};

/**
 *	Scrolls page to given height
 */
const scrollTo = function scrollWindowTo(height, smooth) {
	if (smooth) {
		window.scroll({
			top: height,
			left: 0,
			behavior: 'smooth',
		});
	} else {
		window.scroll(0, height);
	}
};

export {
	appendTemplate,
	scrollTo,
};
