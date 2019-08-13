import React from 'react'
import styles from './style.module.css'

export default (props) => <form onSubmit={props.submitHandler} className={styles.root}>
  <header className={styles.header}>
    <h3>{props.isLogin ? "Sign In" : "Create User"}</h3>
  </header>
  <section className={styles.formcontrol}>
    <label>email</label>
    <input type="text" ref={props.emailRef}/>
  </section>
  <section className={styles.formcontrol}>
    <label>password</label>
    <input type="password" ref={props.passwordRef}/>
  </section>
  {
    !props.isLogin && <section className={styles.formcontrol}>
      <label>confirm password</label>
      <input type="password"/>
    </section>
  }
  <section className={styles.formactions}>
    <button className="g-btn" type="submit">Submit</button>
    <button className="g-btn" type="button" onClick={props.switchAuthState}>{props.isLogin ? "Sign Up" : "Log In"}</button>
  </section>
</form>