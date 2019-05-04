export const apiQuery = (options) => ({
  method: "POST",
  body: JSON.stringify({
    query: options
  }),
  headers: {
    "Content-Type": "application/json",    
  },
})

export const apiAuthQuery = (options, token) => ({
  method: "POST",
  body: JSON.stringify({
    query: options
  }),
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + token,
  },
})