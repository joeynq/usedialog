import React, { useCallback, useState } from 'react'
import { useDialog } from '@datnq/usedialog'

export default () => {
  const { alert, confirm, prompt } = useDialog()
  const [value, setValue] = useState()

  const alertClick = useCallback(
    (e) => {
      e.preventDefault()
      alert('Alert clicked!')
        .then(setValue)
        .catch(() => setValue(false))
    },
    [alert]
  )
  const confirmClick = useCallback(
    (e) => {
      e.preventDefault()
      confirm('Confirm clicked!')
        .then(setValue)
        .catch(() => setValue(false))
    },
    [confirm]
  )
  const promptClick = useCallback(
    (e) => {
      e.preventDefault()
      prompt('Prompt clicked!', 'This is default value')
        .then(setValue)
        .catch(() => setValue(false))
    },
    [prompt]
  )
  return (
    <div>
      <p>
        <button onClick={alertClick}>Alert</button>
        <button onClick={confirmClick}>Confirm</button>
        <button onClick={promptClick}>Prompt</button>
      </p>
      <p>&nbsp;{JSON.stringify(value)}</p>
    </div>
  )
}
