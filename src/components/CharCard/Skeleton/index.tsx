import { memo } from 'react'
import * as S from '../styles'
import * as Skeletons from './styles'

const CardSkeleton = ({
  ...props
}: React.HTMLAttributes<HTMLDivElement>): JSX.Element => (
  <S.Wrapper {...props}>
    <S.Head>
      <Skeletons.Square />
      <S.HeadInfo>
        <Skeletons.Text animation="wave" style={{ width: '50%' }} />
        <Skeletons.Text animation="wave" style={{ width: '75%', height: 8 }} />
      </S.HeadInfo>

      <S.FavButton
        style={{ pointerEvents: 'none' }}
        characterObject={{} as CharacterObject}
      />
    </S.Head>

    <S.InfoGrid>
      <S.LabeledTextBox labelText="Server">
        <Skeletons.Flex>
          <Skeletons.Flag />
          <Skeletons.Text animation="wave" style={{ width: '35%' }} />
          <Skeletons.Circle style={{ marginLeft: 'auto' }} />
        </Skeletons.Flex>
      </S.LabeledTextBox>
      <S.LabeledTextBox labelText="PvP">
        <Skeletons.Flex>
          <Skeletons.Circle style={{ width: 12, height: 12, marginRight: 4 }} />
          <Skeletons.Text animation="wave" style={{ width: '70%' }} />
        </Skeletons.Flex>
      </S.LabeledTextBox>
      <S.LabeledTextBox labelText="Auction status">
        <Skeletons.Text animation="wave" style={{ width: '65%' }} />
      </S.LabeledTextBox>

      <S.LabeledTextBox labelText="Bid status">
        <Skeletons.Flex>
          <Skeletons.Circle style={{ width: 12, height: 12, marginRight: 4 }} />
          <Skeletons.Text animation="wave" style={{ width: '50%' }} />
        </Skeletons.Flex>
      </S.LabeledTextBox>
    </S.InfoGrid>

    <Skeletons.ItemWrapper>
      {[1, 2, 3, 4].map(index => (
        <Skeletons.Square key={index} style={{ width: 48, height: 48 }} />
      ))}
    </Skeletons.ItemWrapper>

    <Skeletons.SkillWrapper>
      {[1, 2, 3, 4, 5, 6, 7, 8].map(index => (
        <Skeletons.SkillItem key={index}>
          <Skeletons.Skillbox />
          <div style={{ width: '100%' }}>
            <Skeletons.Text
              animation="wave"
              style={{ width: 48, height: 6, marginBottom: 3 }}
            />
            <Skeletons.Text
              animation="wave"
              style={{ width: '100%', height: 4 }}
            />
          </div>
        </Skeletons.SkillItem>
      ))}
    </Skeletons.SkillWrapper>

    <S.Footer>
      <Skeletons.Flex style={{ marginBottom: 12 }}>
        <Skeletons.ImbuementsIcon />
        <Skeletons.Text animation="wave" style={{ width: 100, height: 10 }} />
      </Skeletons.Flex>

      <Skeletons.Flex>
        <Skeletons.Charm style={{ width: 94 }} />
        <Skeletons.Charm style={{ width: 54 }} />
        <Skeletons.Charm />
      </Skeletons.Flex>
    </S.Footer>
  </S.Wrapper>
)

export default memo(CardSkeleton)
