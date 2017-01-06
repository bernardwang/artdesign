import 'babel-polyfill';
import { initGallery } from './lib/gallery';

global.app = function () {
	initGallery()
		.then((data) => { console.log('Gallery Done', data); })
		.catch((e) => { console.log(e); });
};
