import { useState, useEffect } from 'react'
import axios from 'axios'

export default (watch = false) => {
  const [position, setPosition] = useState({})
  const [error, setError] = useState(false)
  const [city, setCity] = useState(undefined)

  const onChange = ({ coords }) => {
    setPosition({
      latitude: coords.latitude,
      longitude: coords.longitude
    })
  }

  const onError = () => {
    setError(true) 
  };

  useEffect(() => {
    const geo = navigator.geolocation
    if (!geo) {
      setError(true)
      return
    }

    let watcher = null
    if (watch) {
      watcher = geo.watchPosition(onChange, onError)
    } else {
      geo.getCurrentPosition(onChange, onError)
    }

    return () => watcher && geo.clearWatch(watcher)
  }, [])

  useEffect(() => {
    axios.get(`https://eu1.locationiq.com/v1/reverse.php?key=8a135aea0c2536&lat=${position.latitude}&lon=${position.longitude}&format=json`)
      .then(response => {
        setCity(response.data.address.state)
      })
  }, [position])

  return [city, setCity]
}