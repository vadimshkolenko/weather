import React, { useState, useEffect, useContext } from 'react'
import styles from './current-weather.module.css'
import { CityContext } from '../../contexts/city'
import useTime from '../custom-hooks/use-time'

const CurrentWheather = () => {
  const { city, setCity } = useContext(CityContext)
  const [weatherAvailable, setWeatherAvailable] = useState(false)
  const [weatherNow, setWeatherNow] = useState({})
  const [isLoaded, setLoaded] = useState(false)
  const [icon, setIcon] = useState()
  const [time] = useTime()
  let requestURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=ru&units=metric&APPID=886c162b2ef70b6cf3875f5ccb66afe5`

  useEffect(() => {
    fetch(requestURL)
      .then(res => res.json())
      .then(data => {
        setWeatherNow(data.list[0])
        setIcon("owf owf-" + data.list[0].weather[0].id + " owf-5x icon-style")
        setLoaded(true)
        setWeatherAvailable(true)
        setCity(data.city.name)
      })
      .catch(error => {
        setLoaded(true)
        setWeatherAvailable(false)
      })
  }, [city])

  if (!isLoaded) {
    return (
      <div className={styles.preloader}>Загрузка...</div>
    )
  }

  if (!city) {
    return (
      <div className={styles.weatherCard}>
        <div className={styles.error}>Выберите город</div>
      </div>
    )
  }

  if (!weatherAvailable) {
    return (
      <div className={styles.weatherCard}>
        <div className={styles.error}>Прогноз погоды для данной локации недоступен</div>
      </div>
    )
  }

  return (
    <div>
      <div className={styles.weatherCard}>
        <div className={styles.mainInformation}>
          <div className={styles.indicator}>
            <span className={styles.time}>
              сейчас {time}
            </span>
          </div>
          <div className={styles.indicator}>
            <span className={styles.temp}>{Math.round(weatherNow.main.temp)}<sup>&#176;</sup></span>
          </div>
          <div className={styles.indicator}>
            <span className={styles.description}>{weatherNow.weather[0].description}</span>
          </div>
          <i className={`${icon} ${styles.weatherIcon}`}></i>
          <div className={styles.indicator}>
            <span className={styles.feelsLike}>ощущается как {Math.round(weatherNow.main.feels_like)}<sup>&#176;</sup></span>
          </div>
        </div>
        <div className={styles.additionalInformation}>
          <div className={styles.indicator}>
            Давление {weatherNow.main.pressure} hPa
          </div>
          <div className={styles.indicator}>
            Скорость ветра {weatherNow.wind.speed} м/с
          </div>
          <div className={styles.indicator}>
            Облачность {weatherNow.clouds.all}%
          </div>
          <div className={styles.indicator}>
            Влажность {weatherNow.main.humidity}%
          </div>
        </div>
      </div>
    </div>
  )
}

export default CurrentWheather