// {"sessions":[{"center_id":560772,"name":"ILBS Site 1","address":"D1 Ilbs, Vasant Kunj Marg, Delhi","state_name":"Delhi","district_name":"South Delhi","block_name":"Not Applicable","pincode":110030,"from":"09:00:00","to":"17:00:00","lat":28,"long":77,"fee_type":"Free","session_id":"1ea5e4af-5554-41d9-b78f-f8b7806dfd03","date":"11-05-2021","available_capacity":1,"fee":"0","min_age_limit":45,"vaccine":"COVISHIELD","slots":["09:00AM-11:00AM","11:00AM-01:00PM","01:00PM-03:00PM","03:00PM-05:00PM"]},{"center_id":576215,"name":"ILBS Session Site 3","address":"D1 Ilbs Vasant Kunj Marg Delhi","state_name":"Delhi","district_name":"South Delhi","block_name":"Not Applicable","pincode":110030,"from":"09:00:00","to":"17:00:00","lat":28,"long":77,"fee_type":"Free","session_id":"d9812302-30ed-423c-85f4-50e6539fc1e2","date":"11-05-2021","available_capacity":2,"fee":"0","min_age_limit":45,"vaccine":"COVISHIELD","slots":["09:00AM-11:00AM","11:00AM-01:00PM","01:00PM-03:00PM","03:00PM-05:00PM"]},{"center_id":580689,"name":"ILBS Session Site 5","address":"D1 Ilbs Vasant Kunj Marg Delhi","state_name":"Delhi","district_name":"South Delhi","block_name":"Not Applicable","pincode":110030,"from":"09:00:00","to":"17:00:00","lat":28,"long":77,"fee_type":"Free","session_id":"9780669b-759d-440d-9c29-c9db499cef84","date":"11-05-2021","available_capacity":9,"fee":"0","min_age_limit":45,"vaccine":"COVISHIELD","slots":["09:00AM-11:00AM","11:00AM-01:00PM","01:00PM-03:00PM","03:00PM-05:00PM"]}]}
export const fetchApiData = async (url) => {
  try {
    const requestUrl = url;
    const response = await fetch(requestUrl);
    const responseJSON = await response.json();
    return responseJSON;
  } catch (e) {
    console.log(e);
  }
};

export const PUBLIC_IMAGE_PATH = "/assets/images/";
