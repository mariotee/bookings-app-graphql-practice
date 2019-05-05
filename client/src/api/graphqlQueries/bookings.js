import axios from 'axios'
import {GRAPHQL_ENDPOINT} from 'utils/constants'

export const bookingsQuery = (token) => axios.post(GRAPHQL_ENDPOINT, {
  query: `
  query {
    bookings {
      bookingId
      createdAt
      event {
        title
        date            
        creator {
          email
        }
      }
      user {
        email
      }
    }
  }
  `
}, 
{
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + token,
  }
})

export const bookEventMutation = (eventId, token) => axios.post(GRAPHQL_ENDPOINT,{
  query: `mutation ($id: ID!) {
    bookEvent(eventId: $id) {
      createdAt
      updatedAt
    }
  }
  `,
  variables: {
    id: eventId,
  }
},
{
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + token,
  },
})

export const cancelBookingMutation = (bookingId, token) => axios.post(GRAPHQL_ENDPOINT, {
  query: `
  mutation ($id: ID!) {
    cancelBooking(bookingId: $id) {
      bookingId
      createdAt
    }
  }
  `,
  variables: {
    id: bookingId,
  }
},
{
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + token,
  }
})