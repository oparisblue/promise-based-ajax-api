/**
* Implements a system to handle AJAX requests
*
* Takes two values, page (which is the PHP page to run) and params (which is a dictionary of POST data to send)
*
* Returns a promise, which will give back PHP's result upon success
*
* Intended usage:

AjaxRequest("test.php",{"username":"orlando"...}).then((message) => {
	...
});

*/

//The following code provides an implementation for the task

function AjaxRequest(page, params) {

	var parameters = ""; //Will store the paraeters containing the data that we are going to send

	var keys = Object.keys(params); //Get the keys from the dictionary
	for (var i=0;i<keys.length;i++) { //Loop through the keys
		var data = encodeURIComponent(params[keys[i]]); //Get the data value from the dictionary and URL-encode it
		parameters += keys[i]+"="+data+"&"; //Add the key and its value to the parameters string
	}

	parameters = parameters.slice(0,-1); //Remove the last character from the URL (either a trailing & or ?)

	let promise = new Promise((resolve, reject) => { //Create a new promise containing code to request using http

		var http = new XMLHttpRequest(); //Make a new XMLHttpRequest request object to send HTTP requests with
		http.open("POST", page, true); //Set up data to be sent using POST, and specify the PHP script to use
		http.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); //Send the proper header information with the request

		http.onreadystatechange = function() { //Event fires whenever the http state changes
			if (http.readyState==4 && http.status==200) { //Once our request has reached a successful status
				resolve(http.responseText); //Resolve the promise as successful, returning the result which PHP returned
			}
			else if (parseInt((http.status+"").slice(0,1))>=4) { //If the HTTP response code is in the 400s or above (there has been an error with the request)
				reject(http.status) //Reject the promise as unsuccessful, returning the error code
			}
		}

		http.send(parameters); //Send the request and the data to the correct PHP script

	});

	return promise; //Give back the promise
}