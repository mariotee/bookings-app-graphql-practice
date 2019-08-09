import React from 'react'
import Backdrop from 'components/ModalBackdrop'
import Modal from 'components/Modal'

import styles from './style.module.css'

const formatAMPM = (date) => {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return `on ${date.toLocaleDateString()} @ ${strTime}`;
}


export default (props) => {
  const dateDetails = props.event && formatAMPM(new Date(props.event.date))
  
  return <section>
    <Backdrop/>
    <Modal      
      title={`Details For "${props.event.title}"`}
      subtitle={dateDetails}
      onClose={props.onClose}
      onCancel={props.onCancel}
      onConfirm={props.onConfirm}
      cancelText="Cancel"
      confirmText="Book This Event"
    >
      <div className={styles.content}>
        <p className={styles.price}>Price: ${props.event.price}</p>
        <div className={styles.body}>
          <p className={styles.label}>Description</p>
          <textarea readOnly rows={5} value={props.event.description}/>
          <p className={styles.createdby}>Created By: {props.event.creator.email}</p>
        </div>        
      </div>      
    </Modal>
  </section>
}
