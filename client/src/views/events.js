import React from 'react'

import Modal from 'components/Modal'
import AuthContext from 'utils/context/auth'
import CreateEventForm from 'components/Events/CreateEventForm'
import EventsList from 'components/Events/EventsList'
import Spinner from 'components/Spinner'

import {apiQuery,apiAuthQuery} from 'api/gqlRequest'
import * as EventsApi from 'api/events'
import {GRAPHQL_ENDPOINT} from 'utils/constants'

class EventsView extends React.Component
{
  static contextType = AuthContext
  isActive = true
  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
      showDetailsModal: false,
      data: [],
      details: null,
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
    let res = await fetch(GRAPHQL_ENDPOINT, apiQuery(EventsApi.eventsQuery()))
    let jsond = await res.json()
    
    if (this.isActive) {
      this.setState({
        data: jsond.data.events,
        loading: false,
      })
    }
  }

  closeModal = () => {
    this.setState({
      showModal: false,
      showDetailsModal: false,
      details: null,
    })
  }

  openDetailsModal = (event) => {
    this.setState({
      details: event,
      showDetailsModal: true,
    })
  }

  confirmCreateEvent = async () => {
    this.setState({
      showModal: false,
    })    

    const toCreate = {
      title: this.eventRefs.title.current.value,
      price: this.eventRefs.price.current.value,
      date: new Date(this.eventRefs.date.current.value + " " + this.eventRefs.time.current.value).toISOString(),
      description: this.eventRefs.description.current.value,
    }    
    
    
    let res = await fetch(GRAPHQL_ENDPOINT,
      apiAuthQuery(EventsApi.createEventMutation(toCreate),
      this.context.token),)
      .catch((err) => console.log(err))

    if (res.status !== 200 && res.status !== 201) {
      throw new Error("error in this request")
    } else {
      let jsond = await res.json()
      if (!jsond.errors) {
        this.setState((prevState) => {                    
          let data = [...prevState.data]
          data.push(jsond.data.createEvent)
          
          return {
            data
          }
        })
      } else {
        console.log(jsond.errors)
        alert ("error with this request")
      }
    }    
  }

  bookEventHandler = async () => {
    let res = await fetch("http://localhost:4000/graphql", {
      method: "POST",
      body: JSON.stringify({
        query:`
          mutation {
            bookEvent(eventId: "${this.state.details.eventId}") {
              createdAt
              updatedAt
            }
          }
        `
      }),
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + this.context.token
      },
    })

    let jsond = await res.json()
    if (!jsond.errors) {
      alert("successfully booked!")
    } else {
      alert("failed to book this event")
    }
    this.closeModal()
  }

  formatAMPM = (date) => {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return `on ${date.toLocaleDateString()} @ ${strTime}`;
  }

  render() {
    const dateDetails = this.state.details && this.formatAMPM(new Date(this.state.details.date))
    return <div>
    {
      this.context.token && <section>
        <p>Share your own Events!</p>
        <button className="g-btn" onClick={() => {this.setState({showModal: true})}}>
          Create Event
        </button>
        {
          this.state.showModal &&
        <section>
          <Backdrop/>
          <Modal
            title="Create Event"
            onClose={this.closeModal}
            onCancel={this.closeModal}
            onConfirm={this.confirmCreateEvent}
            cancelText="Cancel"
            confirmText="Confirm"
          >
            <CreateEventForm refs={this.eventRefs}/>
          </Modal>
        </section>
        }
      </section>
    }
    {
      this.state.loading
        ? <Spinner/>
        : <EventsList 
        data={this.state.data} 
        currentUserId={this.context.userId}
        onDetails={this.openDetailsModal}
      />
    }
    {
      this.state.showDetailsModal && <section>
        <Backdrop/>
        <Modal
          title={`Details For "${this.state.details.title}" ${dateDetails}`}
          onClose={this.closeModal}
          onCancel={this.context.token && this.closeModal}
          onConfirm={this.context.token && this.bookEventHandler}
          cancelText="Cancel"
          confirmText="Book This Event"
        >
          <div>
            Price: ${this.state.details.price} <br/>
            Description: {this.state.details.description} <br/>
            Created By: {this.state.details.creator.email}
          </div>
        </Modal>
      </section>
    }
    </div>
  }
}

const Backdrop = () => <div style={{
  position: "fixed",
  top: "0",
  left: "0",
  height: "100vh",
  width: "100%",
  backgroundColor: "#000000c0",
}}/>

export default EventsView