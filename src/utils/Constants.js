export const fetchApiData = async (url) => {
  try {
    console.log("API HIT");
    const requestUrl = url;
    const response = await fetch(requestUrl);
    const responseJSON = await response.json();

    if (responseJSON.error) {
      console.log(responseJSON.error);
      throw new Error(responseJSON.error);
    }
    // console.log(responseJSON);
    return responseJSON;
  } catch (e) {
    console.log(e.error);
    return e;
  }
};

// {
//   "errorCode": "APPOIN0018",
//   "error": "Invalid Pincode"
// }

export const PUBLIC_IMAGE_PATH = "/assets/images/";
export const NUMBER_REGEX = /^[0-9]+$/;

export const getDate = () => {
  // let m = moment().format("DD-MM-YYYY");
  // console.log(m);
  // return m;
  return "17-05-2021";
};
