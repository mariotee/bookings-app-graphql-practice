export const bookingsQuery = () => `
query {
  bookings {
    bookingId
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