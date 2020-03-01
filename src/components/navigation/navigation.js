import React from 'react'
import styles from './navigation.module.css'
import { NavLink } from 'react-router-dom'

const Navigation = () => {
  return (
    <nav>
      <NavLink
        exact
        className={styles.display}
        to={`/`}
        activeClassName={styles.active}
      >
        Сегодня
      </NavLink>
      <NavLink
        className={styles.display}
        to={`/5days`}
        activeClassName={styles.active}
      >
        На 5 дней
      </NavLink>
    </nav>
  )
}

export default Navigation
