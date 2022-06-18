import { useMemo, useEffect } from 'react'
import clsx from 'clsx'
import { useStoredState } from 'hooks'
import { isServer } from 'utils'
import { Input, Slider } from 'components/Atoms'
import { ChipGroup, InfoTooltip, ClientComponent } from 'components/Organisms'
import ChevronRight from 'assets/svgs/chevronRight.svg'
import { Card } from '../../layout'
import { vocationOptions, skillOptions } from './options'
import { calculateRequiredPoints } from './utils'
import { CharacterConfigProps, Vocation, Skill } from './types'

const CharacterConfig = ({ updatePointsRequired }: CharacterConfigProps) => {
  const [vocation, setVocation] = useStoredState<Vocation>(
    'ew-vocation',
    'knight',
  )
  const [skill, setSkill] = useStoredState<Skill>('ew-skill', 'melee')
  const [currentSkill, setCurrentSkill] = useStoredState('ew-currentSkill', 100)
  const [targetSkill, setTargetSkill] = useStoredState('ew-targetSkill', 120)
  const [loyaltyBonus, setLoyaltyBonus] = useStoredState('ew-loyalty', 0)
  const [percentageLeft, setPercentageLeft] = useStoredState(
    'ew-percentageLeft',
    50,
  )

  const pointsRequired = useMemo(
    () =>
      calculateRequiredPoints({
        currentSkill,
        targetSkill,
        vocation,
        skill,
        percentageLeft,
        loyaltyBonus,
      }),
    [currentSkill, targetSkill, vocation, skill, percentageLeft, loyaltyBonus],
  )

  useEffect(
    () => updatePointsRequired(pointsRequired),
    [pointsRequired, updatePointsRequired],
  )

  const invalidSkill = targetSkill <= currentSkill

  return (
    <Card>
      <ClientComponent className="grid gap-4">
        <ChipGroup
          label="Vocation"
          options={vocationOptions}
          value={vocation}
          onChange={(e) => setVocation(e.target.value as Vocation)}
        />

        <ChipGroup
          label="Skill"
          options={skillOptions}
          value={skill}
          onChange={(e) => setSkill(e.target.value as Skill)}
        />
      </ClientComponent>

      <div className="grid items-start gap-4 sm:flex sm:gap-8">
        <div className="flex items-end gap-2">
          <Input
            label={
              <span className="flex items-center gap-1 whitespace-nowrap">
                Current skill
                <InfoTooltip content="Base + Loyalty" className="h-3 w-3" />
              </span>
            }
            aria-label="Current skill"
            type="number"
            value={currentSkill}
            onChange={(e) => setCurrentSkill(+e.target.value)}
            error={invalidSkill}
            noAlert
            className="w-full sm:w-20"
          />
          <ChevronRight
            className={clsx(
              'mb-1.5 shrink-0',
              invalidSkill ? 'fill-red' : 'fill-onSurface',
            )}
          />
          <Input
            label="Target skill"
            type="number"
            value={targetSkill}
            onChange={(e) => setTargetSkill(+e.target.value)}
            error={invalidSkill}
            noAlert
            className="w-full sm:w-20"
          />
        </div>

        <Slider
          label="% left"
          title={`You have ${percentageLeft} percent to go`}
          min={0}
          max={100}
          step={0.01}
          showInput
          invert
          value={percentageLeft}
          onChange={(e) => setPercentageLeft(+e.target.value)}
          className="flex-grow"
          ssr
        />
      </div>

      <Slider
        label="Loyalty"
        min={0}
        max={50}
        step={5}
        displayValue
        transformDisplayedValues={(value) => {
          if (!value) return 'None'

          return `${value * 72} points`
        }}
        marks={[
          { label: 'None', value: 0 },
          { label: '5%', value: 5 },
          { label: '10%', value: 10 },
          { label: '15%', value: 15 },
          { label: '20%', value: 20 },
          { label: '25%', value: 25 },
          { label: '30%', value: 30 },
          { label: '35%', value: 35 },
          { label: '40%', value: 40 },
          { label: '45%', value: 45 },
          { label: '50%', value: 50 },
        ]}
        value={loyaltyBonus}
        onChange={(e) => setLoyaltyBonus(+e.target.value)}
        ssr
      />
    </Card>
  )
}

export default CharacterConfig
