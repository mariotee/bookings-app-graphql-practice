import React from 'react'
import styles from './style.module.css'

export default (props) => <div className={styles.root}>  
  <header className={styles.header}>
    {props.title}
    <span className={styles.closeit} onClick={props.onClose}>X</span>
  </header>
  <section>
    {props.children}
  </section>
  <section className={styles.actionbuttons}>
  {
    props.onCancel 
      && <button className="g-btn" onClick={props.onCancel}>{props.cancelText}</button>
  }
  {
    props.onConfirm
      && <button className="g-btn" onClick={props.onConfirm}>{props.confirmText}</button>
  }
  </section>
</div>