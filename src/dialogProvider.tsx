import * as React from 'react'
import {
  IDialogContextProps,
  IDialogProviderProps,
  IDialogProps,
  DialogTypes,
} from './types'
import { NativeDialog } from './nativeDialog'

export const DialogContext = React.createContext<Partial<IDialogContextProps>>(
  {}
)

export const DialogProvider: React.FC<IDialogProviderProps> = (props) => {
  const [dialogState, setDialogState] = React.useState<Partial<IDialogProps>>()
  const awaitingPromiseRef = React.useRef<any>()

  const dialog = (options: IDialogProps): Promise<any> => {
    setDialogState(options)
    return new Promise((resolve, reject) => {
      awaitingPromiseRef.current = { resolve, reject }
    })
  }

  const alert = (message: string | React.ElementType): Promise<null> => {
    const alertOptions = {
      message,
      type: DialogTypes.Alert,
      open: true,
    }
    return dialog(alertOptions)
  }

  const confirm = (message: string | React.ElementType): Promise<boolean> => {
    const confirmOptions = {
      type: DialogTypes.Confirm,
      message,
      open: true,
    }
    return dialog(confirmOptions)
  }

  const prompt = (
    message: string | React.ElementType,
    defaultText?: string
  ): Promise<string> => {
    const promptOptions = {
      type: DialogTypes.Prompt,
      message,
      defaultText,
      open: true,
    }
    return dialog(promptOptions)
  }

  const handleClose = () => {
    awaitingPromiseRef.current && awaitingPromiseRef.current.reject()
    setDialogState(undefined)
  }

  const handleSubmit = (value?: any) => {
    awaitingPromiseRef.current && awaitingPromiseRef.current.resolve(value)
    setDialogState(undefined)
  }

  const DialogComponent = props.dialogComponent || NativeDialog

  return (
    <DialogContext.Provider value={{ alert, confirm, dialog, prompt }}>
      {props.children}
      <DialogComponent
        open={!!dialogState}
        onSubmit={handleSubmit}
        onClose={handleClose}
        {...dialogState}
      />
    </DialogContext.Provider>
  )
}

export const useDialog = (): Partial<IDialogContextProps> =>
  React.useContext(DialogContext)
