import React from 'react'
import styles from './style.module.css'

export default (props) => <div className={styles.root}>
  <header className={styles.header}>
    <div className={styles.title}>
      {props.title}
      <span className={styles.closeit} onClick={props.onClose}>X</span>    
    </div>
    {
      props.subtitle && <div className={styles.subtitle}>{props.subtitle}</div>
    }
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