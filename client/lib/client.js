import axios from 'axios'

// Define endpoints as namespaces with methods returning objects for each
// request that should be available on the client lib
const endpoints = {
  // Namespace
  items: {
    // Requests
    getItems: () => {
      return {
        url: '/items',
        method: 'GET'
      }
    },
    getItem: (id) => {
      return {
        url: `/items/${id}`,
        method: 'GET'
      }
    },
    createItem: (data) => {
      return {
        url: '/items',
        method: 'POST',
        data
      }
    },
    updateItem: (id, data) => {
      return {
        url: `/items/${id}`,
        method: 'PUT',
        data
      }
    },
    deleteItem: (id) => {
      return {
        url: `/items/${id}`,
        method: 'DELETE'
      }
    }
  }
}

// Dynamic class that builds methods based on namespace endpoints, calling Axios
// with the object returned from the namespace -> request
export default class Client {
  constructor (namespace) {
    if (!endpoints[namespace]) throw new Error(`Invalid client namespace: ${namespace}`)
    Object.keys(endpoints[namespace]).forEach((n) => {
      this[n] = (...args) => axios(endpoints[namespace][n](...args))
    })
  }
}