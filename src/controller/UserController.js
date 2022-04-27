import axios from 'axios'

const config = require('../config.json');
const baseUri = config.server + '/api/user/';

//Get
export const getUser = async ({
  id
}) => {
  try {
    let result = false;

    await axios.post(baseUri + "get", {
      id: id
    }).then((res)=> {
      result = res.data;
    })

    return result;
  }
  catch(e) {
    return e;
  }
}

export const getUsersCount = async () => {
  try {
    let result = 0;

    await axios.get(baseUri + "count").then((res)=> {
      result = res.data;
    })

    return result;
  }
  catch(e) {
    return e;
  }
}


export const getNewUsersCount = async () => {
  try {
    let result = 0;

    await axios.get(baseUri + "new").then((res)=> {
      result = res.data;
    })

    return result;
  }
  catch(e) {
    return e;
  }
}

//Login
export const login = async ({
  email,
  password
}) => {
  try {
    let result = false;

    await axios.post(baseUri + "login", {
      email: email,
      password: password
    }).then((res)=> {
      result = res.data;
    })

    return result;
  }
  catch(e) {
    return e;
  }
}

export const signWithGoogle = async ({
  email,
  password
}) => {
  try {
    let result = false;

    await axios.post(baseUri + "login", {
      email: email,
      password: password
    }).then((res)=> {
      result = res.data;
    })

    return result;
  }
  catch(e) {
    return e;
  }
}


//Register
export const register = async ({
  email, 
  password,
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
    data.append('email', email);
    data.append('password', password);
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

    await axios.post(baseUri + "register", data, {
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

export const updateDetails = async ({
  id,
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
  postal_code
}) => {
  
  try {
    let result = false;

    let data = new FormData();
    data.append('id', id);
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

    await axios.post(baseUri + "update_details", data).then((res)=> {
      result = res.data;
    })

    return result;
  }
  catch(e) {
    return e;
  }
}

export const updatePassword = async ({
  id,
  current,
  updated
}) => {
  
  try {
    let result = false;

    await axios.post(baseUri + "update_password",{
      id: id,
      current: current,
      updated: updated
    }).then((res)=> {
      result = res.data;
    })

    return result;
  }
  catch(e) {
    return e;
  }
}

export const updateImage = async ({
  id,
  image
}) => {
  
  try {
    let result = false;

    let data = new FormData();
    data.append('id', id);
    data.append('image', image);

    await axios.post(baseUri + "update_image", data, {
      onUploadProgress: () => {

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

export const verifyAccount = async ({
  id
}) => {
  
  try {
    let result = false;

    await axios.post(baseUri + "verify", {
      id: id
    }).then((res)=> {
      result = res.data;
    })

    return result;
  }
  catch(e) {
    return e;
  }
}