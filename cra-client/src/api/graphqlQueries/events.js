import axios from 'axios'
import {GRAPHQL_ENDPOINT} from 'utils/constants'

export const eventsQuery = () => axios.post(GRAPHQL_ENDPOINT,{
  query: `query {
    events {
      eventId
      title
      description
      date
      price
      creator {
        userId
        email
      }
    }
  }`
},
{
  headers: {
    "Content-Type": "application/json",    
  },
})

export const createEventMutation = (event,token) => axios.post(GRAPHQL_ENDPOINT, {
  query: `mutation ($eventIn: EventInput!) {
    createEvent(eventInput: $eventIn) {
      eventId
      title
      description
      date
      price
      creator {
        userId
        email      
      }
    }
  }
  `,
  variables: {
    eventIn: {
      title: event.title,
      price: +event.price,
      date: event.date,
      description: event.description,
    }
  }
},
{
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + token,
  }
})