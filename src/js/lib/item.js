/**
 *
 *	page.js
 *
 */

import { GLOBAL } from './global';

/**
 *	Destroys item overlay (on close)
 */
const destroyOverlay = function destroyItemOverlay() {
	if (GLOBAL.transitioning) return;
	GLOBAL.transitioning = true;

	const overlay = document.getElementById('overlay');
	const content = overlay.getElementsByClassName('item-container')[0];

	overlay.removeEventListener('click', () => {});
	window.removeEventListener('keydown', () => {});

	overlay.classList.remove('show');
	setTimeout(() => {
		overlay.removeChild(content);
		GLOBAL.transitioning = false;
	}, GLOBAL.transitionTime); // TODO: fix hardcoded transition time
};

/**
 *	Initializes and builds overlay
 */
const initOverlay = function initItemOverlay(item) {
	if (GLOBAL.transitioning) return;
	GLOBAL.transitioning = true;

	// Copy item content and reorder caption
	const container = item.getElementsByClassName('item-container')[0];
	const content = container.cloneNode(true);
	const child = content.children;
	content.insertBefore(child[child.length - 1], child[0]);

	// Move item content to overlay
	const overlay = document.getElementById('overlay');
	overlay.appendChild(content);
	overlay.classList.add('show');

	// Bind close event to overlay button
	const overlayX = document.getElementById('overlay-x');
	overlayX.addEventListener('click', () => {
		destroyOverlay(overlay);
	});

	// Bind keyboard event
	window.addEventListener('keydown', (e) => {
		if (e.defaultPrevented) {
			return; // Do nothing if the event was already processed
		}

		switch (e.key) {
		case 'Escape':
			destroyOverlay(overlay);
			break;
		default:
			return; // Quit when this doesn't handle the key event.
		}

		// Cancel the default action to avoid it being handled twice
		e.preventDefault();
	}, true);

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
