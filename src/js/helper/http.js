/**
 *
 *	XMLHttpRequest helper function
 *
 * 	Modified from MDN Example
 * 	https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
 *
 */

const $http = function httpRequest(url) {
	// AJAX request, returns promise
	const ajax = function ajaxCall(method, url, args) {
		let promise = new Promise((resolve, reject) => { // Creates a promise
			let request = new XMLHttpRequest();
			let uri = url;

			// Constructs uri with arguments
			//if (args && (method === 'POST' || method === 'PUT')) {
			if (args) {
				uri += '?';
				let argcount = 0;
				for (let key in args) {
					if (args.hasOwnProperty(key)) {
						if (argcount++) {
							uri += '&';
						}
						uri += `${encodeURIComponent(key)}=${encodeURIComponent(args[key])}`;
					}
				}
			}

			request.open(method, uri);
			request.send();
			request.onload = function requestLoad() {
				if (this.status >= 200 && this.status < 300) { // status successful
					resolve(this.response);
				} else { // rejects other status
					reject(this.statusText);
				}
			};
			request.onerror = function requestError() { // reject on error
				reject(this.statusText);
			};
		});

		// Return the promise
		return promise;
	};

	// Adapter pattern
	return {
		get(args) {
			return ajax('GET', url, args);
		},
		post(args) {
			return ajax('POST', url, args);
		},
		put(args) {
			return ajax('PUT', url, args);
		},
		delete(args) {
			return ajax('DELETE', url, args);
		},
	};
};

export {
	$http,
};
