import React from 'react'
import styles from './style.module.css'

export default (props) => {      
  return <section>
    <h3 className={styles.header}>All Events</h3>
    {props.data.length > 0 ? "":"No Events!"}
    <ul className={styles.list}>
    {
      props.data.map((element) => {
        return <li key={"event-" + element.eventId}>
          <div>
            <h1>{element.title}</h1>
            <h2>${element.price}</h2>
          </div>
          <div>
          {
            props.currentUserId === element.creator.userId
              ? <p>You created this event</p>
              : <button className="g-btn" onClick={() => props.onDetails(element)}>View Details</button>
          }
          </div>
        </li>
      })
    }
    </ul>
  </section>
}