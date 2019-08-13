import React from 'react'
import AuthContext from 'utils/context/auth'

import * as BookingsGql from 'api/graphqlQueries/bookings'

import Spinner from 'components/Spinner'
import BookingsList from 'components/Bookings/BookingsList'

class BookingsView extends React.Component
{
  static contextType = AuthContext

  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      bookings: [],
    }
  }

  componentDidMount() {
    this.fetchBookings()
  }

  fetchBookings = async () => {
    this.setState({
      loading: true,
    })

    let res = await BookingsGql.bookingsQuery(this.context.token)
    .catch((err) => {      
      console.log(err.response.data)
    })
    
    let jsond = res.data

    if (jsond.errors) {      
      alert('request failed!')
    } else {
      this.setState({
        bookings: jsond.data.bookings,
        loading: false,
      })
    }
  }

  cancelBooking = async (bookingId) => {
    let res = await BookingsGql.cancelBookingMutation(bookingId, this.context.token)
    .catch((err) => {
      console.log(err.response.data)
    })
    let jsond = res.data

    if (jsond.errors) {
      alert('failed to delete')
    } else {
      this.setState((prevState) => {        
        return {
          bookings: prevState.bookings.filter(x => x.bookingId !== bookingId)
        }
      })
    }
  }

  render() {
    return <div>
      <h1>Your Bookings</h1>
      {
        this.state.loading
          ? <Spinner/>
          : <BookingsList data={this.state.bookings} onDelete={this.cancelBooking}/>
      }
    </div>
  }
}

export default BookingsView