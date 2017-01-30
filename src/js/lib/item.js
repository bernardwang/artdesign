/**
 *
 *	page.js
 *
 */

import { GLOBAL } from './global';
import { scrollTo } from './helper';

/**
 *	Destroys item overlay (on close)
 */
const destroyOverlay = function destroyItemOverlay() {
	if (GLOBAL.transitioning) return;
	GLOBAL.transitioning = true;

	const overlay = document.getElementById('overlay');
	const content = overlay.getElementsByClassName('item-container')[0];

	// Clean up event listeners
	overlay.removeEventListener('click', () => {});
	window.removeEventListener('keydown', () => {});

	// Scroll to top of gallery
	const stickyHeight = document.getElementById('about').clientHeight;
	scrollTo(stickyHeight, false);

	// Hide overlay and clear overlay
	overlay.classList.remove('show');
	setTimeout(() => {
		overlay.removeChild(content);
		GLOBAL.transitioning = false;
	}, 0);	// temporary no transition
};

/**
 *	Initializes and builds overlay
 */
const initOverlay = function initItemOverlay(item) {
	if (GLOBAL.transitioning) return;
	GLOBAL.transitioning = true;

	const overlay = document.getElementById('overlay');
	if (overlay.children.length > 1) throw new Error('Overlay already open');

	// Copy item content and reorder caption
	const container = item.getElementsByClassName('item-container')[0];
	const content = container.cloneNode(true);
	const child = content.children;
	content.insertBefore(child[child.length - 1], child[0]);

	// Bind close event to overlay button
	const overlayX = document.getElementById('overlay-x');
	overlayX.addEventListener('click', () => {
		destroyOverlay();
	});

	// Bind keyboard event
	window.addEventListener('keydown', (e) => {
		if (e.defaultPrevented) return; // Do nothing if the event was already processed

		switch (e.key) {
		case 'Escape':
			destroyOverlay(overlay);
			break;
		default:
			return;
		}

		e.preventDefault(); // Cancel the default action to avoid it being handled twice
	}, true);

	// Move item content to overlay, show overlay
	overlay.appendChild(content);
	overlay.classList.add('show');
	scrollTo(0, false);
	GLOBAL.transitioning = false;
};

/**
 *	Initializes page items
 */
const initItems = function initPageItems(items) {
	for (let i = 0; i < items.length; i++) {
		items[i].addEventListener('click', () => {
			initOverlay(items[i]);
		});
	}
};

export {
	initItems,
};
