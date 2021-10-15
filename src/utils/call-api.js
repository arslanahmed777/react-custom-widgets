import axios from 'axios'
import { store } from '../redux/Store'
const callApi = (endpoint, method, payload) => {
  let token = store.getState().user.currentUser.token;
  const authHeaders = token
    ? {
      Authorization: `Bearer ${token}`,
    }
    : {}
  const configaxios = {
    method,
    url: `http://localhost:5000/${endpoint}`,
    data: payload,
    headers: {
      Accept: '*/*',
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'Access-Control-Max-Age': '6000',
      'Access-Control-Allow-Headers': '*',

      ...authHeaders,
    },
  }
  return new Promise((resolve, reject) => {
    axios(configaxios)
      .then((res) => {
        resolve(res.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

const callPublicApi = (endpoint, method, payload) => {
  const configaxios = {
    method,
    url: `http://localhost:5000/${endpoint}`,
    data: payload,
    headers: {
      Accept: '*/*',
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'Access-Control-Max-Age': '6000',
      'Access-Control-Allow-Headers': '*',
      // ...authHeaders,
    },
  }
  return new Promise((resolve, reject) => {
    axios(configaxios)
      .then((res) => {
        resolve(res.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export { callPublicApi, callApi }
