import { useState } from 'react'


export default (initialValue = '') => {
  const [state, setState] = useState(initialValue)

  const handleChange = event => setState(event.target.value)

  return [state, handleChange, () => setState('')]
}