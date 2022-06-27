export type ExtendedProps = Omit<
  JSX.IntrinsicElements['input'],
  'value' | 'defaultValue' | 'aria-label'
>

export type CustomProps = {
  defaultValue?: string
  value?: string
  min?: number
  max?: number
  error?: boolean | string
  noAlert?: boolean
}

export type TimeInputProps = CustomProps & ExtendedProps & AccessibleLabelProps
