import axios from 'axios'

const config = require('../config.json');
const baseUri = config.server + '/api/';

export const signWithGoogle = async ({
  google_id
}) => {
  try {
    let result = false;

    await axios.post(baseUri + "google/sign", {
      google_id: google_id
    }).then((res)=> {
      result = res.data;
    })

    return result;
  }
  catch(e) {
    return e;
  }
}

export const registerWithGoogle = async ({
  google_id,
  email, 
  lname, 
  fname, 
  birthday,
  gender,
  mobile_no,
  government_id,
  id_no,
  country,
  state,
  city,
  street,
  postal_code,
  image
}) => {
  
  try {
    let result = false;

    let data = new FormData();
    
    data.append('google_id', google_id);
    data.append('email', email);
    data.append('lname', lname);
    data.append('fname', fname);
    data.append('birthday', birthday);
    data.append('gender', gender);
    data.append('mobile_no', mobile_no);
    data.append('government_id', government_id);
    data.append('id_no', id_no);
    data.append('country', country);
    data.append('state', state);
    data.append('city', city);
    data.append('street', street);
    data.append('postal_code', postal_code);
    data.append('image', image);

    await axios.post(baseUri + "google/register", data, {
      onUploadProgress: progress => {

      }
    }).then((res)=> {
      result = res.data;
    })

    return result;
  }
  catch(e) {
    return e;
  }
}

export const signWithFacebook = async ({
  facebook_id
}) => {
  try {
    let result = false;

    await axios.post(baseUri + "facebook/sign", {
      facebook_id: facebook_id
    }).then((res)=> {
      result = res.data;
    })

    return result;
  }
  catch(e) {
    return e;
  }
}

export const registerWithFacebook = async ({
  facebook_id,
  email, 
  lname, 
  fname, 
  birthday,
  gender,
  mobile_no,
  government_id,
  id_no,
  country,
  state,
  city,
  street,
  postal_code,
  image
}) => {
  
  try {
    let result = false;

    let data = new FormData();
    
    data.append('facebook_id', facebook_id);
    data.append('email', email);
    data.append('lname', lname);
    data.append('fname', fname);
    data.append('birthday', birthday);
    data.append('gender', gender);
    data.append('mobile_no', mobile_no);
    data.append('government_id', government_id);
    data.append('id_no', id_no);
    data.append('country', country);
    data.append('state', state);
    data.append('city', city);
    data.append('street', street);
    data.append('postal_code', postal_code);
    data.append('image', image);

    await axios.post(baseUri + "facebook/register", data, {
      onUploadProgress: progress => {

      }
    }).then((res)=> {
      result = res.data;
    })

    return result;
  }
  catch(e) {
    return e;
  }
}