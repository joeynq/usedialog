import React, { useState, useCallback, useEffect } from 'react'
import ReactModal from 'react-modal'

const CustomDialog = ({
  message,
  defaultText,
  type,
  title,
  open,
  onSubmit,
  onCancel,
  submitLabel,
  cancelLabel,
}) => {
  ReactModal.setAppElement('#root')

  const [isOpen, setIsOpen] = useState(open)
  const [value, setValue] = useState(defaultText)

  const altTitle = type
    ? type.replace(/^\w/, (c) => c.toUpperCase())
    : undefined

  const change = useCallback((e) => {
    setValue(e.target.value)
  }, [])

  const submit = useCallback(() => {
    console.log(value)
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

  return (
    <ReactModal
      isOpen={isOpen}
      style={{
        overlay: {
          backgroundColor: 'rgba(0,0,0,.5)',
        },
        content: {
          position: 'absolute',
          width: '250px',
          height: 'min-content',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        },
      }}
      onRequestClose={close}
      shouldCloseOnOverlayClick
      shouldCloseOnEsc
    >
      {(title || altTitle) && (
        <header>
          <h1 style={{ margin: 0 }}>{title || altTitle}</h1>
        </header>
      )}
      <div>
        <p>{message}</p>
        {type === 'prompt' && (
          <p>
            <input defaultValue={defaultText} onChange={change} />
          </p>
        )}
      </div>
      <button onClick={submit}>{submitLabel}</button>
      {(type === 'prompt' || type === 'confirm') && (
        <button onClick={close}>{cancelLabel}</button>
      )}
    </ReactModal>
  )
}

export default CustomDialog
