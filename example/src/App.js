import React from 'react'
import { Prism } from 'react-syntax-highlighter'
import { DialogProvider } from '@datnq/usedialog'
import Content from './content'
import CustomDialog from './customDialog'

const App = () => {
  return (
    <>
      <DialogProvider>
        <h1>Native Dialog</h1>
        <Content />
      </DialogProvider>
      <hr />
      <DialogProvider
        dialogComponent={CustomDialog}
        submitLabel='Yes'
        cancelLabel='No'
      >
        <h1>React Dialog</h1>
        <Content />
        <h2>Custom dialog component</h2>
        <Prism language='jsx'>
          {`import React, { useState, useCallback, useEffect } from 'react'
import ReactModal from 'react-modal'

const CustomDialog = ({ message, defaultText, type, title, open, onSubmit, onCancel, submitLabel, cancelLabel }) => {
  ReactModal.setAppElement('#root')

  const [isOpen, setIsOpen] = useState(open)
  const [value, setValue] = useState(defaultText)

  const change = useCallback((e) => {
    setValue(e.target.value)
  }, [])

  const submit = useCallback(() => {
    onSubmit(type !== 'prompt' || value)
  }, [onSubmit, type, value])

  const close = useCallback(() => {
    onCancel()
  }, [onCancel])

  useEffect(() => {
    setIsOpen(open)
  }, [open])

  useEffect(() => {
    setValue(defaultText)
  }, [defaultText])

  const renderTitle = () => {
    const altTitle = type ? type.replace(/^\\w/, (c) => c.toUpperCase()) : undefined
    if (!title && !altTitle) return

    return <header>{title || altTitle}</header>
  }

  const isPrompt = type === 'prompt'
  const hasClose = type === 'prompt' || type === 'confirm'

  return (
    <ReactModal isOpen={isOpen} style={{ /* ... */ }} onRequestClose={close} shouldCloseOnOverlayClick shouldCloseOnEsc >
      {renderTitle()}
      <div>
        <p>{message}</p>
        {isPrompt && (
          <p>
            <input defaultValue={defaultText} onChange={change} />
          </p>
        )}
      </div>
      <button onClick={submit}>{submitLabel}</button>
      {hasClose && (
        <button onClick={close}>{cancelLabel}</button>
      )}
    </ReactModal>
  )
}

export default CustomDialog
`}
        </Prism>
      </DialogProvider>
    </>
  )
}

export default App
