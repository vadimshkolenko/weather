import React, { useState, useEffect, useContext } from 'react'
import styles from './search-cities.module.css'
import useInput from '../custom-hooks/use-input'
import axios from 'axios'
import Suggestions from './suggestions'
import { CityContext } from '../../contexts/city'

const SearchCities = () => {
  const { setCity } = useContext(CityContext)
  const [query, setQuery, resetQuery] = useInput('')
  const [cities, setCities] = useState([])

  const handleQueryChange = setQuery

  const handleFormSubmit = (event) => {
    event.preventDefault()
    if (query) setCity(query)
    resetQuery()
  }

  const onKeyDown = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault()
      if (query) setCity(query)
      resetQuery()
    }
  }


  let requestURL = `http://geohelper.info/api/v1/cities?locale%5Blang%5D=uk&locale%5BfallbackLang%5D=uk&apiKey=ZbeWYpj1UQ0gjwxFIJISQRnxBNaX4A36&filter%5Bname%5D=${query}`

  useEffect(() => {
    axios.get(requestURL)
      .then(({ data }) => {
        setCities(data.result.slice(0, 5))
      })
  }, [query])

  return (
    <form className={styles.searchForm} onSubmit={handleFormSubmit} onKeyDown={onKeyDown}>
      <input
        value={query}
        placeholder="Введите город..."
        onChange={handleQueryChange}
      >
      </input>
      <Suggestions
        cities={cities}
        query={query}
        resetQuery={resetQuery}
      />
      {query &&
        <button onClick={resetQuery} className={styles.resetQuery}>
          <span className={styles.close}></span>
        </button>}
      <button className={styles.showWeather}>Поиск</button>
    </form>
  )
}

export default SearchCities