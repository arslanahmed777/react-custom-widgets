import axios from 'axios'
// import Store from '../store'
// const callApi = (endpoint, method, payload, externalEmailObj) => {
//   let token = Store.getState().Login && Store.getState().Login.token
//   const authHeaders = token
//     ? {
//       Authorization: `Bearer ${token}`,
//     }
//     : {}
//   const configaxios = {
//     method,
//     url: externalEmailObj?.externalEmail ? 'http://192.168.100.209:8035/api/PatientDocument/PatientEmail' : `${process.env.REACT_APP_URL}${endpoint}`,
//     data: payload,
//     headers: {
//       Accept: '*/*',
//       'Access-Control-Allow-Origin': '*',
//       'Content-Type': 'application/json',
//       'Access-Control-Max-Age': '6000',
//       'Access-Control-Allow-Headers': '*',

//       ...authHeaders,
//     },
//   }
//   return new Promise((resolve, reject) => {
//     axios(configaxios)
//       .then((res) => {
//         resolve(res.data)
//       })
//       .catch((error) => {
//         reject(error)
//       })
//   })
// }

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

export { callPublicApi }
