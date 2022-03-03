import { useMemo } from 'react'
import { Checkbox } from 'components/CharacterCard/styles'
import { addonCheck } from './utils'
import * as S from './styles'
import { SpriteBoxProps } from './types'

const SpriteBox = ({
  offset = false,
  name,
  src,
  type,
  rareSet,
}: SpriteBoxProps): JSX.Element => {
  const isRare = useMemo(() => (rareSet ? rareSet.has(name) : false), [name])
  const showAddon = type !== undefined

  return (
    <S.Wrapper title={name} data-rare={isRare} data-show-addon={showAddon}>
      <S.SpritePortrait
        offset={offset}
        alt={name}
        src={src}
        width={64}
        height={64}
      />

      {showAddon && (
        /* @ ToDo: i18n */
        <S.CheckboxWrapper>
          <Checkbox aria-label="First addon" checked={addonCheck.first(type)} />
          <Checkbox
            aria-label="Second addon"
            checked={addonCheck.second(type)}
          />
        </S.CheckboxWrapper>
      )}
    </S.Wrapper>
  )
}

export default SpriteBox
