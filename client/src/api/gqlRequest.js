import axios from 'axios'
import {GRAPHQL_ENDPOINT} from 'utils/constants'

export const apiQuery = (options) => axios.post(GRAPHQL_ENDPOINT,{query: options},{
  headers: {
    "Content-Type": "application/json",    
  },
})

export const apiAuthQuery = (options, token) => axios.post(GRAPHQL_ENDPOINT,{query: options},{
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + token,
  },
})