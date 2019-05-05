import React from 'react'

import AuthContext from 'utils/context/auth'

import Spinner from 'components/Spinner'
import EventsList from 'components/Events/EventsList'
import CreateEventModal from 'components/Events/CreateEventModal'
import EventDetailsModal from 'components/Events/DetailsModal'

import {apiQuery,apiAuthQuery} from 'api/gqlRequest'
import * as EventsGql from 'api/graphqlQueries/events'
import * as BookingsGql from 'api/graphqlQueries/bookings'

class EventsView extends React.Component
{
  static contextType = AuthContext
  isActive = true
  
  constructor(props) {
    super(props)
    this.state = {
      showCreateEventModal: false,
      showDetailsModal: false,
      events: [],
      selectedEvent: null,
      loading: false,
    }

    this.eventRefs = {
      title: React.createRef(),
      price: React.createRef(),
      date: React.createRef(),
      time: React.createRef(),
      description: React.createRef(),
    }
  }

  componentDidMount() {
    this.fetchAllEvents()
  }

  componentWillUnmount() {
    this.isActive = false
  }

  fetchAllEvents = async () => {
    this.setState({loading: true,})
    let res = (await apiQuery(EventsGql.eventsQuery())).data
    
    if (this.isActive) {
      this.setState({
        events: res.data.events,
        loading: false,
      })
    }
  }

  closeModal = () => {
    this.setState({
      showCreateEventModal: false,
      showDetailsModal: false,
      selectedEvent: null,
    })
  }

  openCreateModal = (event) => {
    this.setState({
      showCreateEventModal: true,
    })
  }

  openDetailsModal = (event) => {
    this.setState({
      selectedEvent: event,
      showDetailsModal: true,
    })
  }

  confirmCreateEvent = async () => {
    this.setState({
      showCreateEventModal: false,
    })
    
    const toCreate = {
      title: this.eventRefs.title.current.value,
      price: this.eventRefs.price.current.value,
      date: new Date(this.eventRefs.date.current.value + " " + this.eventRefs.time.current.value).toISOString(),
      description: this.eventRefs.description.current.value,
    }
    
    let res = (await apiAuthQuery(EventsGql.createEventMutation(toCreate),this.context.token)).data    
    
    if (!res.errors) {
      this.setState((prevState) => {
        let data = [...prevState.events]
        data.push(res.data.createEvent)
        
        return {
          events: data
        }
      })
    } else {
      console.log(res.errors)
      alert ("error with this request")
    }
  }

  bookEventHandler = async () => {
    let res = (await apiAuthQuery(BookingsGql.bookEventMutation(this.state.selectedEvent.eventId),this.context.token)).data
    
    if (!res.errors) {
      alert("successfully booked!")
    } else {
      alert("failed to book this event")
    }
    this.closeModal()
  }
  
  render() {    
    return <main>
    {
      this.context.token && <CreateEventModal
        show={this.state.showCreateEventModal}
        eventRefs={this.eventRefs}
        onOpen={this.openCreateModal}
        onClose={this.closeModal}
        onCancel={this.closeModal}
        onConfirm={this.confirmCreateEvent}
      />
    }
    {
      this.state.loading
        ? <Spinner/>
        : <EventsList 
          data={this.state.events} 
          currentUserId={this.context.userId}
          onDetails={this.openDetailsModal}
        />
    }
    {
      this.state.showDetailsModal && <EventDetailsModal
        event={this.state.selectedEvent}
        onClose={this.closeModal}
        onCancel={this.closeModal}
        onConfirm={this.bookEventHandler}
      />
    }
    </main>
  }
}

export default EventsView