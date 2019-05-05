export const bookingsQuery = () => `
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

export const bookEventMutation = (eventId) => `
mutation {
  bookEvent(eventId: "${eventId}") {
    createdAt
    updatedAt
  }
}
`

export const cancelBookingMutation = (bookingId) => `
mutation {
  cancelBooking(bookingId: "${bookingId}") {
    bookingId
    createdAt
  }
}
`