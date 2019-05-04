const UsersResolver = require("./users.resolver.js")
const EventsResolver = require("./events.resolver.js")
const BookingsResolver = require("./bookings.resolver.js")

module.exports = {
  ...UsersResolver,
  ...EventsResolver,
  ...BookingsResolver,
}