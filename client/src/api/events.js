export const eventsQuery = () => `
query {
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
}
`

export const createEventMutation = (event) => `
mutation {
  createEvent(eventInput: {
    title: "${event.title}",
    price: ${event.price},
    date: "${event.date}",
    description: "${event.description}",
  }) {
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
`