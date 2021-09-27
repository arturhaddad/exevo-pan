import styled from 'styled-components'
import { MaterialCard } from 'styles'

export const Wrapper = styled.section`
  ${MaterialCard}
  padding-top: 0;
  border-radius: 12px;
  overflow: hidden;
`

export const Title = styled.h2`
  padding: 12px 24px;
  margin: 0 -12px 16px -12px;

  background-color: var(--primary);

  font-size: 24px;
  font-weight: 400;
  color: var(--onPrimary);
`
