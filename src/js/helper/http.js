/**
 *
 *	XMLHttpRequest helper function
 *
 * 	Modified from MDN Example
 * 	https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
 *
 */

const $http = function (url) {
	// AJAX request, returns promise
	const ajax = function (method, url, args) {
		let promise = new Promise(function (resolve, reject) { // Creates a promise
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
			request.onload = function () {
				if (this.status >= 200 && this.status < 300) { // status successful
					resolve(this.response);
				} else { // rejects other status
					reject(this.statusText);
				}
			};
			request.onerror = function () { // reject on error
				reject(this.statusText);
			};
		});

		// Return the promise
		return promise;
	};

	// Adapter pattern
	return {
		'get': function (args) {
			return ajax('GET', url, args);
		},
		'post': function (args) {
			return ajax('POST', url, args);
		},
		'put': function (args) {
			return ajax('PUT', url, args);
		},
		'delete': function (args) {
			return ajax('DELETE', url, args);
		}
	};
};

export {
	$http
};
