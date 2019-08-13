import React from 'react'
import {NavLink} from 'react-router-dom'

import AuthContext from 'utils/context/auth'

import styles from "./style.module.css"

export default (props) => <AuthContext.Consumer>
{
  (context) => <header className={styles.root}>
    <section className={styles.logo}>
      <h1>EasyEvent</h1>
    </section>
    <section className={styles.navwrapper}>
      <ul className={styles.navlist}>
        {
          !context.token && <li>
            <NavLink to="/auth">Log In</NavLink>
          </li>
        }
        <li><NavLink to="/events">Events</NavLink></li>
        {
          context.token && <li>
            <NavLink to="/bookings">Bookings</NavLink>
          </li>
        }
        {
          context.token && <button className={styles.logout} onClick={context.logout}>
            Logout
          </button>
        }
      </ul>
    </section>
  </header>
}
</AuthContext.Consumer>