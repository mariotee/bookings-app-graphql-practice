import React from 'react'
import Backdrop from 'components/ModalBackdrop'
import Modal from 'components/Modal'
import CreateEventForm from 'components/Events/CreateEventForm'

import styles from './style.module.css'

export default (props) => <section className={styles.root}>
  <p>Share your own Events!</p>
  <button className="g-btn" onClick={props.onOpen}>
    Create Event
  </button>
  {
    props.show && <section>
      <Backdrop/>
      <Modal
        title="Create Event"
        onClose={props.onClose}
        onCancel={props.onCancel}
        onConfirm={props.onConfirm}
        cancelText="Cancel"
        confirmText="Confirm"
      >
        <CreateEventForm refs={props.eventRefs}/>
      </Modal>
  </section>
  }
</section>