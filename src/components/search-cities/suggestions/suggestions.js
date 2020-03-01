import React, {useContext} from 'react'
import styles from './suggestions.module.css'
import {CityContext} from '../../../contexts/city'

const Suggestions = (props) => {
  const {setCity} = useContext(CityContext)

  const selectCity = event => {
    setCity(event.target.innerHTML)
    props.resetQuery()
  }

  const options = props.cities.map(city => (
    <li key={city.id} onClick={selectCity}>
      {city.name}
    </li>
  ))
  if (!props.query) return null
  return <ul>{options}</ul>
}

export default Suggestions