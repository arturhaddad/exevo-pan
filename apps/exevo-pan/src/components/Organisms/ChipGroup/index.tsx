import { useRef, useCallback, useState, useId } from 'react'
import clsx from 'clsx'
import { Chip, Label } from 'components/Atoms'
import { ChipGroupProps, OptionProps } from './types'

const Option = ({ groupName, name, value, ...props }: OptionProps) => {
  const id = useId()

  const inputRef = useRef<HTMLInputElement>(null)

  const handleClick = useCallback(() => inputRef.current?.click(), [])

  return (
    <Chip
      id={id}
      className="relative"
      onClick={handleClick}
      overrideStatus={props.checked}
      role="radio"
    >
      <>
        <input
          ref={inputRef}
          type="radio"
          name={groupName}
          value={value}
          tabIndex={-1}
          className={clsx('-z-1 absolute h-0 w-0')}
          aria-labelledby={id}
          {...props}
        />
        {name}
      </>
    </Chip>
  )
}

const ChipGroup = ({
  'aria-label': ariaLabel,
  label,
  name: groupName,
  options,
  onChange,
  value,
  defaultValue,
  className,
  ...props
}: ChipGroupProps) => {
  const accessibleLabel = typeof label === 'string' ? label : ariaLabel

  const [stateValue, setStateValue] = useState(value ?? defaultValue)
  const derivedValue = value ?? stateValue

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      setStateValue(event.target.value)
      onChange?.(event)
    },
    [onChange],
  )

  return (
    <div className={className}>
      <Label className="mb-2">{label}</Label>
      <div
        role="radiogroup"
        aria-label={accessibleLabel}
        className="flex flex-wrap items-center gap-2"
        {...(props as React.InputHTMLAttributes<HTMLDivElement>)}
      >
        {options.map((option) => (
          <Option
            key={option.value}
            groupName={groupName}
            checked={derivedValue === option.value}
            onChange={handleChange}
            {...option}
          />
        ))}
      </div>
    </div>
  )
}

export default ChipGroup
