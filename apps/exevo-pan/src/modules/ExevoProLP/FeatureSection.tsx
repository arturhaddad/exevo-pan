import clsx from 'clsx'

const FeatureSection = ({
  className,
  ...props
}: JSX.IntrinsicElements['section']) => (
  <section
    className={clsx(
      className,
      'flex flex-col items-center justify-center gap-8 md:flex-row md:gap-16',
    )}
    {...props}
  />
)

export default FeatureSection
