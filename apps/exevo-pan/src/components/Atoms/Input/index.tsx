/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useTranslations } from 'contexts/useTranslation'
import { forwardRef, Ref, useState, useCallback, memo } from 'react'
import clsx from 'clsx'
import { useUuid, useSharedRef } from 'hooks'
import ClearIcon from 'assets/svgs/cross.svg'
import Label from '../Label'
import { useStateIcon } from './useStateIcon'
import { defaultMask } from './utils'
import { InputProps, InputValue } from './types'

const Input = (
  {
    className,
    style,
    id,
    label,
    allowClear = false,
    error,
    value: valueProp,
    defaultValue,
    disabled,
    onChange,
    noAlert = false,
    stateIcon = 'neutral',
    mask = defaultMask,
    ...props
  }: InputProps,
  refProp: Ref<HTMLInputElement>,
) => {
  const {
    translations: { common },
  } = useTranslations()

  const innerRef = useSharedRef<HTMLInputElement>(refProp)

  const inputId = id ?? useUuid()
  const errorId = useUuid()

  const [value, setValue] = useState<InputValue>(
    valueProp ?? defaultValue ?? '',
  )
  const derivedValue = mask(valueProp ?? value)
  const isClearButtonActive = allowClear && !!derivedValue

  const handleClearClick = useCallback(() => {
    if (innerRef.current) {
      if (isClearButtonActive) {
        const event = new Event('input', { bubbles: true })
        setValue('')
        innerRef.current.value = ''
        innerRef.current.dispatchEvent(event)
      }
      innerRef.current.focus()
    }
  }, [isClearButtonActive])

  const handleInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e)
      setValue(e.target.value)
    },
    [onChange],
  )

  const StateIcon = useStateIcon(stateIcon)

  return (
    <div className={clsx('text-tsm', className)} style={style}>
      <Label htmlFor={inputId} className="mb-2">
        {label}
      </Label>
      <div
        className={clsx(
          'border-1 flex w-full cursor-text items-center rounded-md border-solid transition-colors',
          error ? 'border-red' : 'border-separator focus-within:border-primary',
          disabled ? 'bg-separator' : 'bg-surface',
        )}
        onClick={() => innerRef.current?.focus()}
      >
        <input
          ref={innerRef}
          id={inputId}
          value={derivedValue}
          onInput={handleInput}
          aria-invalid={!!error}
          aria-errormessage={error ? errorId : undefined}
          autoComplete="off"
          className={clsx(
            'text-tsm text-onSurface w-full border-none bg-transparent py-2.5 px-4 outline-none transition-all',
            disabled
              ? 'placeholder:text-onSurface/50'
              : 'placeholder:text-separator',
          )}
          style={{ paddingRight: isClearButtonActive ? 0 : undefined }}
          disabled={disabled}
          {...props}
        />
        {allowClear && !disabled && (
          <button
            type="button"
            aria-label={common.ClearInputLabel}
            disabled={!isClearButtonActive}
            aria-hidden={!isClearButtonActive}
            onClick={handleClearClick}
            className={clsx(
              'text-none w-[40px] shrink-0 transition-opacity',
              isClearButtonActive
                ? 'cursor-pointer'
                : 'pointer-events-none opacity-0',
            )}
          >
            <ClearIcon className="fill-onSurface h-5 w-5" />
          </button>
        )}

        {StateIcon}
      </div>
      {!noAlert && (
        <span
          id={errorId}
          aria-hidden={!error}
          role="alert"
          className={clsx(
            'text-red px-2.5 text-xs transition-opacity',
            !error && 'opacity-0',
          )}
          suppressHydrationWarning
        >
          {error}
        </span>
      )}
    </div>
  )
}

export default memo(forwardRef(Input))
