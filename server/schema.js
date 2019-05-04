const {buildSchema} = require("graphql")

module.exports = buildSchema(`
  type User {
    userId: ID!
    email: String!
    password: String    
  }

  input UserInput {
    email: String!
    password: String!
  }

  type AuthData {
    userId: ID!
    token: String!
    expiresHrs: Int!
  }

  type Event {
    eventId: ID!
    title: String!
    description: String!
    price: Float!
    date: String!
    creator: User!
  }

  input EventInput {
    title: String!
    date: String!
    description: String!
    price: Float!      
  }

  type Booking {
    bookingId: ID!
    event: Event!
    user: User!
    createdAt: String!
    updatedAt: String!
  }

  type RootQuery {
    events: [Event!]!
    bookings: [Booking!]!
    login(email: String!, password: String!): AuthData!
  }

  type RootMutation {      
    createEvent(eventInput: EventInput): Event!
    createUser(userInput: UserInput): User!
    bookEvent(eventId: ID!): Booking!
    cancelBooking(bookingId: ID!): Event!
  }

  schema {
    query:  RootQuery
    mutation:  RootMutation
  }
`)