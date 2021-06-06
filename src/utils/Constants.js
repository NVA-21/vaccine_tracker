export const COUNT_NAMESPACE = 'nva-vaccine-tracker.netlify.app';
export const COUNT_KEY = '957487c9-9554-40ed-b6db-ba69cb660154';

export const PUBLIC_IMAGE_PATH = '/assets/images/';

export const NUMBER_REGEX = /^[0-9]+$/;

export const fetchApiData = async url => {
	try {
		const requestUrl = url;
		const response = await fetch(requestUrl);
		const responseJSON = await response.json();

		if (responseJSON.error) {
			throw new Error(responseJSON.error);
		}
		return responseJSON;
	} catch (err) {
		return err;
	}
};

// Returns Today's date and next days date after 3pm
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

	return date;
};
