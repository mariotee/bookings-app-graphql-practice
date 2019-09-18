import React from 'react'

import AuthContext from 'utils/context/auth'

import Spinner from 'components/Spinner'
import EventsList from 'components/Events/EventsList'
import CreateEventModal from 'components/Events/CreateEventModal'
import EventDetailsModal from 'components/Events/DetailsModal'

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
    let res = (await EventsGql.eventsQuery()).data
    
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
    let res
    try {
      res = (await EventsGql.createEventMutation({
        title: this.eventRefs.title.current.value,
        price: this.eventRefs.price.current.value,
        date: new Date(this.eventRefs.date.current.value + " " + this.eventRefs.time.current.value).toISOString(),
        description: this.eventRefs.description.current.value,
      }, this.context.token)).data

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
    } catch (err) {
      alert('network failure')
    }                
  }

  confirmDeleteEvent = async (id) => {      
    let res
    try {
      res = (await EventsGql.deleteEventMutation({id}, this.context.token)).data

      if (!res.errors) {
        this.setState((prevState) => {
          let data = [...prevState.events].filter((element) => element._id !== id)          
          
          return {
            events: data
          }
        })
      } else {
        console.log(res.errors)
        alert ("error with this request")
      }
    } catch (err) {
      alert('network failure')
    }                
  }

  bookEventHandler = async () => {
    let res = (await BookingsGql.bookEventMutation(this.state.selectedEvent.eventId,this.context.token)).data
    
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
          onConfirmDelete={this.confirmDeleteEvent}          
        />
    }
    {
      this.state.showDetailsModal && <EventDetailsModal
        event={this.state.selectedEvent}
        onClose={this.closeModal}
        onCancel={this.context.token && this.closeModal}
        onConfirm={this.context.token && this.bookEventHandler}
      />
    }
    </main>
  }
}

export default EventsView