export const loginQuery = (data) => `
query {
  login(email: "${data.email}", password: "${data.password}") {
    userId
    token
    expiresHrs
  }
}
`

export const createUserMutation = (data) => `
mutation {
  createUser(userInput: {
    email: "${data.email}"
    password: "${data.password}"
  }) {
    userId
    email
  }
}
`