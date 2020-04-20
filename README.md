# useDialog

> Common Dialog provider to override native method

[![NPM](https://img.shields.io/npm/v/@datnq/usedialog.svg)](https://www.npmjs.com/package/@datnq/usedialog) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @datnq/usedialog
```

```bash
yarn add @datnq/usedialog
```

## Usage

```jsx
// App.js
import React, { Component } from 'react'
import { DialogProvider } from '@datnq/usedialog'

class ExampleApp extends Component {
  render() {
    return (
      <DialogProvider
        dialogComponent={
          CustomDialog
        } /* Use native dialog if dialogComponent is not provided */
        submitLabel='Yes' /* Override submit button label with string | ReactElement. Default = OK */
        cancelLabel='No' /* Override cancel button label with string | ReactElement. Default = Cancel */
      >
        {props.children}
      </DialogProvider>
    )
  }
}

// MyComponent.js
const MyComponent = () => {
  const { alert, confirm, prompt } = useDialog()

  /* use dialogs as Promise */

  alert('Alert message').then(/* do things after OK button clicked */)

  confirm('Confirm message')
    .then(/* do things after OK button clicked */)
    .catch(/* do things after Cancel button clicked */)

  prompt('Prompt message')
    .then((value) => {
      // value: string input but user
      /* do things after OK button clicked */
    })
    .catch(/* do things after Cancel button clicked */)
}

// CustomDialog.js
/*
interface IDialogProps {
  message: string | React.ElementType
  defaultText?: string
  type: ['default', 'alert', 'confirm', 'prompt'] | DialogTypes
  title?: string | React.ElementType
  open: boolean
  submitLabel: string | React.ElementType
  cancelLabel?: string | React.ElementType
  onSubmit?: (value: any) => void
  onCancel?: () => void
}
*/
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
  // ...
  const submit = useCallback(() => {
    onSubmit(type !== 'prompt' || value)
  }, [onSubmit, type, value])

  const close = useCallback(() => {
    onCancel()
  }, [onCancel])

  return (
    <ModalComponent>
      {/* ... */}
      <button onClick={submit}>{submitLabel}</button>
      {showCancel && <button onClick={close}>{cancelLabel}</button>}
    </ModalComponent>
  )
}
```

## License

MIT © [datnq](https://github.com/datnq)
