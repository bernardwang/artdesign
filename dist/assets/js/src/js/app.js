(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
//import 'babel-polyfill';
//import { $http } from './helper/http';
//import { Person } from './model/Person';

let callback = {
	success: function (data) {
		console.log(1, 'success', JSON.parse(data));
	},
	error: function (data) {
		console.log(2, 'error', JSON.parse(data));
	}
};

global.app = function () {
	let christoph = new Person('Christoph', 'Burgdorf');
	console.log(christoph.fullName);

	let url = 'https://www.flickr.com/services/rest/';
	let args = {
		'method': 'flickr.people.getPublicPhotos',
		'api_key': '7b408cc78c673ca31f5f105d9a28c601',
		'user_id': '110189904@N02',
		'format': 'json',
		'nojsoncallback': '1'
	};

	// Executes the method call
	$http(url).get(args).then(callback.success).catch(callback.error);
};

/**
 *	Creates and appends elements to DOM
 *
var appendImages = function(photos, num_photos) {
	var gallery = document.getElementById('gallery');
	for(var i = 0; i < num_photos; i++) {
		var curr = photos[i];

		// creates dom elements
		var figure = document.createElement('figure');
		var img = document.createElement('img');
		var figcaption = document.createElement('figcaption');

		// insert api data
		img.className = 'photo';
		img.src = 'https://farm'+curr.farm+'.staticflickr.com/'+curr.server+'/'+curr.id+'_'+curr.secret+'_z.jpg';

		figcaption.className = 'caption';
		figcaption.innerHTML = curr.title;

		figure.appendChild(img);
		figure.appendChild(figcaption);
		figure.className = 'entry';
		// IIFE, creates scope for 'i'
		(function(index, entry){
			entry.addEventListener("click", function() {
				setSelected(index)
			});
  	 })(i, figure);

		gallery.appendChild(figure);
	}
};

/**
 *	Asynchronously gets images from flickr
 *
var loadImages = function(num) {
	// API url
	var api_key = '8e8cc9e261cc938ec19dfb3c9a977579';
	var user_id = '110189904@N02' 	// my friend's flickr id
	var base_url = 'https://www.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=';
	var user = '&user_id=' + user_id;
	var format = '&format=json&nojsoncallback=1'	// json not jsonp
	var url = base_url + api_key + user + format;

	// Flickr API call
	ajaxCall(url, function(response) {
		var data = JSON.parse(response);	// Assumes response is in json format
		if(data.stat != 'fail') {
			var photos = data.photos.photo;
			var num_photos = Math.min(photos.length, num);

			appendImages(photos, num_photos);		// Appends to gallery
			setSelected(0);		// Sets first image to be selected in lightbox
		}
		else {
			console.log('API call error');
		}
	});
};

/**
 * 	Initializes page
 *
var init = function() {
	// Currently only loading 25
	// could load more by adding a 'page' parameter to the Flickr api call
	// Automatic loading when scrolling to the bottom would be cool too :)
	loadImages(25);

	// initalizes next and back navigation
	var index = 0;
	var back = document.getElementById('lightbox-back');
	var next = document.getElementById('lightbox-next');
	back.addEventListener("click", function(){
    setSelected(--index);
	});
	next.addEventListener("click", function(){
    setSelected(++index);
	});

};

init();*/

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7QUNJQSxJQUFJLFdBQVc7QUFDYixVQUFVLFVBQVUsSUFBVixFQUFnQjtBQUMxQixVQUFRLEdBQVIsQ0FBWSxDQUFaLEVBQWUsU0FBZixFQUEwQixLQUFLLEtBQUwsQ0FBVyxJQUFYLENBQTFCLEVBRDBCO0VBQWhCO0FBR1YsUUFBUSxVQUFVLElBQVYsRUFBZ0I7QUFDeEIsVUFBUSxHQUFSLENBQVksQ0FBWixFQUFlLE9BQWYsRUFBd0IsS0FBSyxLQUFMLENBQVcsSUFBWCxDQUF4QixFQUR3QjtFQUFoQjtDQUpOOztBQVNKLE9BQU8sR0FBUCxHQUFhLFlBQVk7QUFDdkIsS0FBSSxZQUFZLElBQUksTUFBSixDQUFXLFdBQVgsRUFBd0IsVUFBeEIsQ0FBWixDQURtQjtBQUV2QixTQUFRLEdBQVIsQ0FBWSxVQUFVLFFBQVYsQ0FBWixDQUZ1Qjs7QUFJeEIsS0FBSSxNQUFNLHVDQUFOLENBSm9CO0FBS3hCLEtBQUksT0FBTztBQUNWLFlBQVcsK0JBQVg7QUFDQSxhQUFZLGtDQUFaO0FBQ0EsYUFBWSxlQUFaO0FBQ0EsWUFBVyxNQUFYO0FBQ0Esb0JBQW1CLEdBQW5CO0VBTEc7OztBQUxvQixNQWN4QixDQUFNLEdBQU4sRUFDRSxHQURGLENBQ00sSUFETixFQUVFLElBRkYsQ0FFTyxTQUFTLE9BQVQsQ0FGUCxDQUdFLEtBSEYsQ0FHUSxTQUFTLEtBQVQsQ0FIUixDQWR3QjtDQUFaIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8vaW1wb3J0ICdiYWJlbC1wb2x5ZmlsbCc7XG4vL2ltcG9ydCB7ICRodHRwIH0gZnJvbSAnLi9oZWxwZXIvaHR0cCc7XG4vL2ltcG9ydCB7IFBlcnNvbiB9IGZyb20gJy4vbW9kZWwvUGVyc29uJztcblxubGV0IGNhbGxiYWNrID0ge1xuICBzdWNjZXNzIDogZnVuY3Rpb24gKGRhdGEpIHtcblx0XHRjb25zb2xlLmxvZygxLCAnc3VjY2VzcycsIEpTT04ucGFyc2UoZGF0YSkpO1xuICB9LFxuICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhKSB7XG5cdFx0Y29uc29sZS5sb2coMiwgJ2Vycm9yJywgSlNPTi5wYXJzZShkYXRhKSk7XG4gIH1cbn07XG5cbmdsb2JhbC5hcHAgPSBmdW5jdGlvbiAoKSB7XG4gIGxldCBjaHJpc3RvcGggPSBuZXcgUGVyc29uKCdDaHJpc3RvcGgnLCAnQnVyZ2RvcmYnKTtcbiAgY29uc29sZS5sb2coY2hyaXN0b3BoLmZ1bGxOYW1lKTtcblxuXHRsZXQgdXJsID0gJ2h0dHBzOi8vd3d3LmZsaWNrci5jb20vc2VydmljZXMvcmVzdC8nO1xuXHRsZXQgYXJncyA9IHtcblx0XHQnbWV0aG9kJyA6ICdmbGlja3IucGVvcGxlLmdldFB1YmxpY1Bob3RvcycsXG5cdFx0J2FwaV9rZXknIDogJzdiNDA4Y2M3OGM2NzNjYTMxZjVmMTA1ZDlhMjhjNjAxJyxcblx0XHQndXNlcl9pZCcgOiAnMTEwMTg5OTA0QE4wMicsXG5cdFx0J2Zvcm1hdCcgOiAnanNvbicsXG5cdFx0J25vanNvbmNhbGxiYWNrJyA6ICcxJ1xuXHR9O1xuXG5cdC8vIEV4ZWN1dGVzIHRoZSBtZXRob2QgY2FsbFxuXHQkaHR0cCh1cmwpXG5cdFx0LmdldChhcmdzKVxuXHRcdC50aGVuKGNhbGxiYWNrLnN1Y2Nlc3MpXG5cdFx0LmNhdGNoKGNhbGxiYWNrLmVycm9yKTtcbn07XG5cblxuXG4vKipcbiAqXHRDcmVhdGVzIGFuZCBhcHBlbmRzIGVsZW1lbnRzIHRvIERPTVxuICpcbnZhciBhcHBlbmRJbWFnZXMgPSBmdW5jdGlvbihwaG90b3MsIG51bV9waG90b3MpIHtcblx0dmFyIGdhbGxlcnkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FsbGVyeScpO1xuXHRmb3IodmFyIGkgPSAwOyBpIDwgbnVtX3Bob3RvczsgaSsrKSB7XG5cdFx0dmFyIGN1cnIgPSBwaG90b3NbaV07XG5cblx0XHQvLyBjcmVhdGVzIGRvbSBlbGVtZW50c1xuXHRcdHZhciBmaWd1cmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmaWd1cmUnKTtcblx0XHR2YXIgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG5cdFx0dmFyIGZpZ2NhcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmaWdjYXB0aW9uJyk7XG5cblx0XHQvLyBpbnNlcnQgYXBpIGRhdGFcblx0XHRpbWcuY2xhc3NOYW1lID0gJ3Bob3RvJztcblx0XHRpbWcuc3JjID0gJ2h0dHBzOi8vZmFybScrY3Vyci5mYXJtKycuc3RhdGljZmxpY2tyLmNvbS8nK2N1cnIuc2VydmVyKycvJytjdXJyLmlkKydfJytjdXJyLnNlY3JldCsnX3ouanBnJztcblxuXHRcdGZpZ2NhcHRpb24uY2xhc3NOYW1lID0gJ2NhcHRpb24nO1xuXHRcdGZpZ2NhcHRpb24uaW5uZXJIVE1MID0gY3Vyci50aXRsZTtcblxuXHRcdGZpZ3VyZS5hcHBlbmRDaGlsZChpbWcpO1xuXHRcdGZpZ3VyZS5hcHBlbmRDaGlsZChmaWdjYXB0aW9uKTtcblx0XHRmaWd1cmUuY2xhc3NOYW1lID0gJ2VudHJ5Jztcblx0XHQvLyBJSUZFLCBjcmVhdGVzIHNjb3BlIGZvciAnaSdcblx0XHQoZnVuY3Rpb24oaW5kZXgsIGVudHJ5KXtcblx0XHRcdGVudHJ5LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0c2V0U2VsZWN0ZWQoaW5kZXgpXG5cdFx0XHR9KTtcbiAgXHQgfSkoaSwgZmlndXJlKTtcblxuXHRcdGdhbGxlcnkuYXBwZW5kQ2hpbGQoZmlndXJlKTtcblx0fVxufTtcblxuLyoqXG4gKlx0QXN5bmNocm9ub3VzbHkgZ2V0cyBpbWFnZXMgZnJvbSBmbGlja3JcbiAqXG52YXIgbG9hZEltYWdlcyA9IGZ1bmN0aW9uKG51bSkge1xuXHQvLyBBUEkgdXJsXG5cdHZhciBhcGlfa2V5ID0gJzhlOGNjOWUyNjFjYzkzOGVjMTlkZmIzYzlhOTc3NTc5Jztcblx0dmFyIHVzZXJfaWQgPSAnMTEwMTg5OTA0QE4wMicgXHQvLyBteSBmcmllbmQncyBmbGlja3IgaWRcblx0dmFyIGJhc2VfdXJsID0gJ2h0dHBzOi8vd3d3LmZsaWNrci5jb20vc2VydmljZXMvcmVzdC8/bWV0aG9kPWZsaWNrci5wZW9wbGUuZ2V0UHVibGljUGhvdG9zJmFwaV9rZXk9Jztcblx0dmFyIHVzZXIgPSAnJnVzZXJfaWQ9JyArIHVzZXJfaWQ7XG5cdHZhciBmb3JtYXQgPSAnJmZvcm1hdD1qc29uJm5vanNvbmNhbGxiYWNrPTEnXHQvLyBqc29uIG5vdCBqc29ucFxuXHR2YXIgdXJsID0gYmFzZV91cmwgKyBhcGlfa2V5ICsgdXNlciArIGZvcm1hdDtcblxuXHQvLyBGbGlja3IgQVBJIGNhbGxcblx0YWpheENhbGwodXJsLCBmdW5jdGlvbihyZXNwb25zZSkge1xuXHRcdHZhciBkYXRhID0gSlNPTi5wYXJzZShyZXNwb25zZSk7XHQvLyBBc3N1bWVzIHJlc3BvbnNlIGlzIGluIGpzb24gZm9ybWF0XG5cdFx0aWYoZGF0YS5zdGF0ICE9ICdmYWlsJykge1xuXHRcdFx0dmFyIHBob3RvcyA9IGRhdGEucGhvdG9zLnBob3RvO1xuXHRcdFx0dmFyIG51bV9waG90b3MgPSBNYXRoLm1pbihwaG90b3MubGVuZ3RoLCBudW0pO1xuXG5cdFx0XHRhcHBlbmRJbWFnZXMocGhvdG9zLCBudW1fcGhvdG9zKTtcdFx0Ly8gQXBwZW5kcyB0byBnYWxsZXJ5XG5cdFx0XHRzZXRTZWxlY3RlZCgwKTtcdFx0Ly8gU2V0cyBmaXJzdCBpbWFnZSB0byBiZSBzZWxlY3RlZCBpbiBsaWdodGJveFxuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdGNvbnNvbGUubG9nKCdBUEkgY2FsbCBlcnJvcicpO1xuXHRcdH1cblx0fSk7XG59O1xuXG4vKipcbiAqIFx0SW5pdGlhbGl6ZXMgcGFnZVxuICpcbnZhciBpbml0ID0gZnVuY3Rpb24oKSB7XG5cdC8vIEN1cnJlbnRseSBvbmx5IGxvYWRpbmcgMjVcblx0Ly8gY291bGQgbG9hZCBtb3JlIGJ5IGFkZGluZyBhICdwYWdlJyBwYXJhbWV0ZXIgdG8gdGhlIEZsaWNrciBhcGkgY2FsbFxuXHQvLyBBdXRvbWF0aWMgbG9hZGluZyB3aGVuIHNjcm9sbGluZyB0byB0aGUgYm90dG9tIHdvdWxkIGJlIGNvb2wgdG9vIDopXG5cdGxvYWRJbWFnZXMoMjUpO1xuXG5cdC8vIGluaXRhbGl6ZXMgbmV4dCBhbmQgYmFjayBuYXZpZ2F0aW9uXG5cdHZhciBpbmRleCA9IDA7XG5cdHZhciBiYWNrID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpZ2h0Ym94LWJhY2snKTtcblx0dmFyIG5leHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGlnaHRib3gtbmV4dCcpO1xuXHRiYWNrLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpe1xuICAgIHNldFNlbGVjdGVkKC0taW5kZXgpO1xuXHR9KTtcblx0bmV4dC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKXtcbiAgICBzZXRTZWxlY3RlZCgrK2luZGV4KTtcblx0fSk7XG5cbn07XG5cbmluaXQoKTsqL1xuIl19
