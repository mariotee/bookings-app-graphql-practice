import React from 'react'
import styles from './style.module.css'

export default (props) => {
  return <form className={styles.form}>
    <label>Title</label>
    <input type="text" ref={props.refs.title}/>
    <br/>
    <label>Date</label>
    <input type="date" ref={props.refs.date}/>
    <label>Time</label>
    <input type="time" ref={props.refs.time}/>
    <br/>
    <label>Price</label>
    <input type="number" ref={props.refs.price}/>
    <br/>
    <label>Description</label><br/>
    <textarea rows="5" ref={props.refs.description}/>
  </form>
}