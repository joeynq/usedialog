import React, { useCallback, useState } from 'react'
import { useDialog } from 'use-dialog'

export default () => {
  const { alert, confirm, prompt } = useDialog()
  const [value, setValue] = useState()

  const alertClick = useCallback(
    (e) => {
      e.preventDefault()
      alert('Alert clicked!')
        .then(setValue)
        .catch(() => setValue('Cancel!'))
    },
    [alert]
  )
  const confirmClick = useCallback(
    (e) => {
      e.preventDefault()
      confirm('Confirm clicked!')
        .then(setValue)
        .catch(() => setValue('Cancel!'))
    },
    [confirm]
  )
  const promptClick = useCallback(
    (e) => {
      e.preventDefault()
      prompt('Prompt clicked!')
        .then(setValue)
        .catch(() => setValue('Cancel!'))
    },
    [prompt]
  )
  return (
    <div>
      <div>
        <button onClick={alertClick}>Alert</button>
        <button onClick={confirmClick}>Confirm</button>
        <button onClick={promptClick}>Prompt</button>
      </div>
      <div>{JSON.stringify(value)}</div>
    </div>
  )
}
