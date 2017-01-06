/**
 *
 *	helper.js
 *
 */

/**
 *	Helper function for inserting handlebar templates
 */
const appendTemplate = function appendHandlebarTemplate(root, template, context) {
	// TODO: USE HTMLBARS
	const element = root;
	element.innerHTML += template(context);
	return element.children;
};

export {
	appendTemplate,
};