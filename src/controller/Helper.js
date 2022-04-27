import { AES, enc} from 'crypto-js';
let config = require('../config.json');
let baseUri = config.server;

export const setCurrentUser = (user) => {

  if(user) {
    let usr = {
      user: user.user,
      type: user.type
    }

    let value = AES.encrypt(JSON.stringify(usr), "art_aide").toString();
    window.sessionStorage.setItem("aausr", value);
  }
}

export const getCurrentUser = () => {
  let value = window.sessionStorage.getItem("aausr");
  if(value) {

    let bytes = AES.decrypt(value, "art_aide");
    let user = bytes.toString(enc.Utf8);

    return JSON.parse(user);
  }
  else {
    return "";
  }
}

export const logout = () => {
  window.sessionStorage.clear("aausr");
}

export const getImageUri = (location) => {
  if(location) {
    let folders = location.split("/");
    folders.shift();
    let uri = `${baseUri}/storage/${folders.join("/")}`;
    return uri;
  }
  else {
    return "";
  }
}


//ADDRESS
const countries = require('../assets/json/country.json');
const states = require('../assets/json/state.json');
const cities = require('../assets/json/city.json');

export const getAllCountries = () => {
  return countries;
}

export const getStatesOfCountry = (country) => {
  let result = states.filter((item) => item.countryCode === country);
  return result;
}

export const getCitiesOfStates = (country, state) => {
  let result = cities.filter((item) => item.countryCode === country && item.stateCode === state);
  return result;
}

export const getCountry = (name) => {
  for(let item of countries) {
    if(item.name === name) {
      return item;
    }
  }
  return null;
}

export const getState = (name, countryCode) => {
  for(let item of states) {
    if(item.name === name && countryCode === item.countryCode) {
      return item;
    }
  }
  return null;
}

export const getCity = (name, stateCode, countryCode) => {
  for(let item of cities) {
    if(item.name === name && countryCode === item.countryCode && stateCode === item.stateCode) {
      return item;
    }
  }
  return null;
}