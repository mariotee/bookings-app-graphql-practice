import React from 'react'
import styles from './style.module.css'

export default (props) => <ul className={styles.root}>
{
  props.data.map((element) => {
    return <li key={element.bookingId}>
      <div className={styles.content}>
      {`${element.event.title}: ${new Date(element.createdAt).toLocaleDateString()}`}
      </div>
      <div className={styles.actions}>
        <button className="g-btn" onClick={() => props.onDelete(element.bookingId)}>Cancel</button>
      </div>
    </li>
  })
}
</ul>