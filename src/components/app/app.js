import React from 'react'
import styles from './app.module.css'
import Header from '../header'
import Navigation from '../navigation'
import { BrowserRouter, Route } from 'react-router-dom'
import CurrentWheather from '../current-weather'
import WeatherForTheDay from '../weather-for-the-day'
import SearchCities from '../search-cities'
import { CityContext } from '../../contexts/city'
import usePosition from '../custom-hooks/use-position'

const App = () => {
  const [city, setCity] = usePosition()

  return (
    <CityContext.Provider value={{ city, setCity }}>
      <BrowserRouter>
        <div className={styles.wrapper}>
          <Header />
          {/* <Navigation /> */}
          <SearchCities />
          <h2>{city}</h2>
          <Route
            exact
            path={'/'}
            component={CurrentWheather}
          />
          {/* <Route
            path={'/5days'}
            component={WeatherForTheDay}
          /> */}
        </div>
      </BrowserRouter>
    </CityContext.Provider>
  )
}

export default App
