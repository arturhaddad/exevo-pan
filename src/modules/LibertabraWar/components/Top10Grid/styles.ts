import styled, { css } from 'styled-components'
import { CustomScrollbar, InnerContainer, Smooth, Spinner } from 'styles'
import CharacterTable from './CharacterTable'

export const Wrapper = styled.article`
  position: relative;

  ${InnerContainer}
  padding-top: 16px;

  max-height: calc(100% - 44px);
  overflow: auto;
  ${CustomScrollbar}

  background-color: var(--background);
  ${Smooth}

  > * {
    margin-bottom: 16px;
  }

  &::before {
    content: '';
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    height: 72px;
    background-image: linear-gradient(
      to top,
      var(--background),
      rgba(0, 0, 0, 0)
    );
    pointer-events: none;
  }

  display: grid;
  grid-gap: 16px;
  grid-template-columns: 1fr;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1400px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }

  ::after {
    content: '';
    grid-column: 1 / -1;
    height: 16px;
  }
`

export const Loading = styled(Spinner)`
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 1;
  transform: translate(-50%, -50%);
`

const HighlightedTh = css`
  &::before {
    content: '▴';
    position: relative;
    top: -1px;
    left: -3px;
  }
`

export const KillsTable = styled(CharacterTable)`
  th:nth-child(3) {
    ${HighlightedTh}
  }
  tbody td:nth-child(3) {
    color: var(--green);
    font-weight: 400;
  }
`

export const DeathsTable = styled(CharacterTable)`
  th:nth-child(4) {
    ${HighlightedTh}
  }
  tbody td:nth-child(4) {
    color: var(--red);
    font-weight: 400;
  }
`
