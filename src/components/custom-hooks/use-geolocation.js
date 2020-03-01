import { useState, useEffect } from 'react'
import axios from 'axios'

export default () => {
  const [position, setPosition] = useState()
  navigator.geolocation.getCurrentPosition((position) => {
    setPosition({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
  })
  useEffect(() => {
    axios.get(`https://eu1.locationiq.com/v1/reverse.php?key=8a135aea0c2536&lat=${position.latitude}&lon=${position.longitude}&format=json`)
      .then(response => {
        console.log(response.address.state);
      })
      .catch(err => {
        console.log(err);
      });
  }, [position])

  return { ...position}
}