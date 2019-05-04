import React from 'react'
import AuthContext from 'utils/context/auth'
import Spinner from 'components/Spinner'

import {GRAPHQL_ENDPOINT} from 'utils/constants'
import { apiAuthQuery } from 'api/gqlRequest';
import * as BookingsApi from 'api/bookings'

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

    let res = await fetch(GRAPHQL_ENDPOINT, 
      apiAuthQuery(BookingsApi.bookingsQuery(),this.context.token)
    )
    .catch((err) => {
      console.log(err)
    })

    let jsond = await res.json()

    if (jsond.errors) {      
      alert('request failed!')
    } else {
      this.setState({
        bookings: jsond.data.bookings,
        loading: false,
      })
    }
  }

  render() {
    return <div>
      <h1>The Bookings Page</h1>
      {
        this.state.loading
          ? <Spinner/>
          : <ul>
          {
            this.state.bookings.map((element) => <li key={element.bookingId}>
              <div>
                <p>Event: "{element.event.title}" on {new Date(element.event.date).toLocaleDateString()}</p>
                <p>Created By: {element.event.creator.email}</p>
                <p>Booked By: {element.user.email}</p>
              </div>
            </li>)
          }
          </ul>
      }
    </div>
  }
}

export default BookingsView