import axios from 'axios'

const config = require('../config.json');
const baseUri = config.server + '/api/result/';

export const getAllTestResults = async () => {
  try {
    let result = [];

    await axios.get(baseUri + "all").then((res)=> {
      result = Object.keys(res.data).map( e => {return res.data[e]});
    })

    return result;
  }
  catch(e) {
    return e;
  }
}

export const getUserTestResults = async ({
  user
}) => {
  try {
    let result = [];

    await axios.post(baseUri + "user", {
      user: user
    }).then((res)=> {
      result = res.data;
    })

    return result;
  }
  catch(e) {
    return e;
  }
}

export const getTestCountToday = async () => {
  try {
    let result = 0;

    await axios.get(baseUri + "today").then((res)=> {
      result = res.data;
    })

    return result;
  }
  catch(e) {
    return e;
  }
}

export const getAllTestCount = async () => {
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

export const getPositiveCountToday = async () => {
  try {
    let result = 0;

    await axios.get(baseUri + "positive").then((res)=> {
      result = res.data;
    })

    return result;
  }
  catch(e) {
    return e;
  }
}