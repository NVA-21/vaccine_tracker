export const fetchApiData = async url => {
	try {
		console.log('API HIT');
		const requestUrl = url;
		const response = await fetch(requestUrl);
		const responseJSON = await response.json();

		if (responseJSON.error) {
			console.log(responseJSON.error);
			throw new Error(responseJSON.error);
		}
		// console.log(requestUrl);
		// console.log(responseJSON);
		return responseJSON;
	} catch (err) {
		// console.log(e);
		// console.log(e.message);
		return err;
	}
};

// {
//   "errorCode": "APPOIN0018",
//   "error": "Invalid Pincode"
// }

export const PUBLIC_IMAGE_PATH = '/assets/images/';
export const NUMBER_REGEX = /^[0-9]+$/;

export const getDate = () => {
	const dateTime = new Date();

	if (dateTime.getHours() >= 15) {
		dateTime.setHours(dateTime.getHours() + 7);
	}

	const date =
		dateTime.getDate() +
		'-' +
		(dateTime.getMonth() + 1) +
		'-' +
		dateTime.getFullYear();

	// console.log(date);
	// return "19-05-2021";
	return date;
};
