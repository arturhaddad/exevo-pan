import { Popover } from 'components/Atoms'
import clsx from 'clsx'
import { PopoverProps } from 'components/Atoms/Popover/types'

const Tooltip = ({
  className,
  children,
  content,
  placement = 'top',
  trigger = 'hover',
  visible = false,
  offset = [0, 0],
  ...props
}: PopoverProps) => (
  <Popover
    content={
      <div
        role="tooltip"
        className={clsx('card text-tsm text-center', className)}
        {...props}
      >
        {content}
      </div>
    }
    placement={placement}
    trigger={trigger}
    visible={visible}
    offset={offset}
  >
    {children}
  </Popover>
)

export default Tooltip
