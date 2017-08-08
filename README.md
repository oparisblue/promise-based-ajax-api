# promise-based-ajax-api
A small promise-based JavaScript AJAX API

This is a small JavaScript API that I have written. It sends AJAX requests to a given page, with a given set of parameters. It then returns a promise, which will reject with an HTTP error, or resolve with the text returned from the request.

Usage
-

To send a request to a page (for example, logging a user in and getting the message returned) you simply call the function `AjaxRequest(page, params)` - this then returns a promise, if you need it.

The parameters (`params` value) are taken in as a dictionary, where the key is name, and the value is the value.

For example, to send a username and password (stored in variables) to a page called `login.php` and get the message given back, you would do the following:

	AjaxRequest("login.php", {"username":username, "password":password}).then((message) => {
		alert(message);
	)};
	
Files and License
-

There are two files which you can use:

 * ajax.js, which has comments explaining how things work
 * ajax-min.js, which is the minimised version of the code which you should use on your site

Licensed under [cc-by-sa](https://creativecommons.org/licenses/by-sa/4.0/)
