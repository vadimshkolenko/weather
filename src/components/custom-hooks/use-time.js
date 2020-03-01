import { useState } from 'react'

export default () => {
  const [state, setState] = useState(new Date().toLocaleTimeString().slice(0,5))

  function time() {
    let now = new Date()
    setState(now.toLocaleTimeString().slice(0,5))
  }
  
  setInterval(time, 1000)

  return [state]
}