import axios from 'axios'
import {GRAPHQL_ENDPOINT} from 'utils/constants'

  export const loginQuery = (data) => {
    console.log(GRAPHQL_ENDPOINT)
    return axios.post(GRAPHQL_ENDPOINT,{
      query: `query ($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          userId
          token
          expiresHrs
        }
      }`,
      variables: {
        email: data.email,
        password: data.password
      }
    },
    {
      headers: {
        "Content-Type": "application/json",    
      },
    })
  }

export const createUserMutation = (data) => axios.post(GRAPHQL_ENDPOINT,{
  query: `mutation ($email: String!, $password: String!) {
    createUser(userInput: {
      email: $email
      password: $password
    }) {
      userId
      email
    }
  }
  `,
  variables: {
    email: data.email,
    password: data.password,
  }
},
{
  headers: {
    "Content-Type": "application/json",    
  },
})