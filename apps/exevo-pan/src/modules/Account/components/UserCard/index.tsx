import type { BuiltInProviderType } from 'next-auth/providers'
import { useTranslations } from 'contexts/useTranslation'
import { FadeImage } from 'components/Atoms'
import { Tooltip } from 'components/Organisms'
import { GoogleIcon, DiscordIcon } from 'assets/svgs'
import { UserCardProps } from './types'

/* @ ToDo:

- loading skeleton
- upgrade to pro CTA
- i18n

*/

const providerIcons: Partial<
  Record<
    BuiltInProviderType,
    (args: JSX.IntrinsicElements['svg']) => JSX.Element
  >
> = {
  google: GoogleIcon,
  discord: DiscordIcon,
}

const UserCard = ({ user }: UserCardProps) => {
  const {
    translations: { common },
  } = useTranslations()

  const loading = !user

  if (loading) return <div>loading...</div>

  const { name, picture, provider, proStatus, proSince } = user

  const ProviderIcon = providerIcons[provider]

  return (
    <section>
      <div className="flex items-center gap-4">
        <FadeImage
          src={picture}
          alt={name}
          width={64}
          height={64}
          unoptimized
          className="bg-surface rounded shadow"
        />
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <strong>{name}</strong>
            {ProviderIcon && (
              <div className="card grid place-content-center rounded p-1 shadow-sm">
                <ProviderIcon className="fill-onSurface h-3 w-3 transition-colors" />
              </div>
            )}
          </div>

          <span className="text-tsm font-thin">
            Status:{' '}
            {proStatus ? (
              <Tooltip
                content={
                  <>Pro since: {new Date(proSince ?? '').toLocaleString()}</>
                }
                offset={[0, 6]}
              >
                <strong className="text-primaryHighlight tracking-wide">
                  Exevo Pro
                </strong>
              </Tooltip>
            ) : (
              <strong className="tracking-wide">Free</strong>
            )}
          </span>
        </div>
      </div>
    </section>
  )
}

export default UserCard
