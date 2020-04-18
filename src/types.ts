export const enum DialogTypes {
  Default = 'default',
  Alert = 'alert',
  Confirm = 'confirm',
  Prompt = 'prompt',
}

export interface IDialogProps {
  message: string | React.ElementType
  defaultText?: string
  type?: ['default', 'alert', 'confirm', 'prompt'] | DialogTypes
  title?: string | React.ElementType
  style?: { [key: string]: React.CSSProperties }
  open?: boolean
  onSubmit?: (value: any) => void
  onClose?: () => void
}

export interface IDialogContextProps {
  dialog(props: IDialogProps): Promise<any>
  alert(message: string | React.ElementType): Promise<null>
  confirm(message: string | React.ElementType): Promise<boolean>
  prompt(
    message: string | React.ElementType,
    defaultText?: string | React.ElementType
  ): Promise<string | null>
}

export interface IDialogProviderProps {
  children: React.ReactChildren
  dialogComponent: React.ElementType<Partial<IDialogProps>>
}
