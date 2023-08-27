import axios from 'axios'

const client = axios.create({ baseURL: 'http://localhost:4000' })

// options take like URLs 
export const request = ({ ...options }) => {
  client.defaults.headers.common.Authorization = `Bearer token`

  // when successfully fetched 
  const onSuccess = response => response

  // error case 
  const onError = error => {
    // optionaly catch errors and add additional logging here
    return error
  }

  return client(options).then(onSuccess).catch(onError)
}
