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

export const DialogProvider: React.FC<IDialogProviderProps> = ({
  children,
  dialogComponent,
  submitLabel = 'OK',
  cancelLabel = 'Cancel',
}) => {
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
      submitLabel,
    }
    return dialog(alertOptions)
  }

  const confirm = (message: string | React.ElementType): Promise<boolean> => {
    const confirmOptions = {
      type: DialogTypes.Confirm,
      message,
      submitLabel,
      cancelLabel,
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
      submitLabel,
      cancelLabel,
      open: true,
    }
    return dialog(promptOptions)
  }

  const handleCancel = () => {
    awaitingPromiseRef.current && awaitingPromiseRef.current.reject()
    setDialogState(undefined)
  }

  const handleSubmit = (value?: any) => {
    awaitingPromiseRef.current && awaitingPromiseRef.current.resolve(value)
    setDialogState(undefined)
  }

  const DialogComponent = dialogComponent || NativeDialog

  return (
    <DialogContext.Provider value={{ alert, confirm, dialog, prompt }}>
      {children}
      <DialogComponent
        open={!!dialogState}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        {...dialogState}
      />
    </DialogContext.Provider>
  )
}

export const useDialog = (): Partial<IDialogContextProps> =>
  React.useContext(DialogContext)
