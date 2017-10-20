import axios from 'axios'

// Define endpoints as namespaces with methods returning objects for each
// request that should be available on the client lib
const endpoints = {
  // Namespace
  foo: {
    // Requests
    getFoos: () => {
      return {
        url: '/foos',
        method: 'GET'
      }
    },
    getFoo: (id) => {
      return {
        url: `/foos/${id}`,
        method: 'GET'
      }
    },
    createFoo: (data) => {
      return {
        url: '/foos',
        method: 'POST',
        data
      }
    },
    updateFoo: (id, data) => {
      return {
        url: `/foos/${id}`,
        method: 'PUT',
        data
      }
    },
    deleteFoo: (id) => {
      return {
        url: `/foos/${id}`,
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