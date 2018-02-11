/**
* Implements a system to handle AJAX requests
*
* Takes two values, page (which is the file to load over AJAX) and params (which is a dictionary of data to send)
*
* Returns a promise, which will give back the contents of the file upon success
*
* Intended usage:

AjaxRequest("test.php", {"username":"orlando"...}).then((message) => {
	...
});

*/
function AjaxRequest(page, params) {
	return new Promise((resolve, reject) => {
		
		let data = new FormData(); //Create an object to store the data we are submitting
		for (let field in params) { //Loop through the array, and add each field to the form data object
			data.append(field, params[field]);
		}

		let request = new XMLHttpRequest();
		request.open("POST", page); //Ensure that the data is sent over POST not GET
		request.onreadystatechange = ()=>{ //Event fires whenever the state of the request changes
			if (request.readyState==4 && request.status==200) { //Once our request has reached a successful status, we can return the result
				resolve(request.responseText);
			}
			else if (parseInt((request.status+"").slice(0,1))>=4) { //If the HTTP response code is in the 400s or above there has been an error with the request
				reject(request.status);
			}
		}
		request.send(data);
	});
}
