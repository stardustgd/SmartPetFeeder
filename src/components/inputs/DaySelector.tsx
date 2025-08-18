import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

type DayGroupItemProps = {
  value: string
  label: string
  text: string
}

type DaySelectorProps = {
  selectedDays: string[]
  setSelectedDays: (days: string[]) => void
}

function DayGroupItem(props: DayGroupItemProps) {
  return (
    <ToggleGroupItem
      value={props.value}
      aria-label={props.label}
      className="border border-gray-300"
    >
      <h1 className="text-center">{props.text}</h1>
    </ToggleGroupItem>
  )
}

export default function DaySelector({
  selectedDays,
  setSelectedDays,
}: DaySelectorProps) {
  return (
    <div className="items-center justify-center space-x-2 w-full">
      <ToggleGroup
        type="multiple"
        value={selectedDays}
        onValueChange={(newSelectedDays) => setSelectedDays(newSelectedDays)}
      >
        <DayGroupItem value="sunday" label="Sunday" text="Sun" />
        <DayGroupItem value="monday" label="Monday" text="Mon" />
        <DayGroupItem value="tuesday" label="Tuesday" text="Tue" />
        <DayGroupItem value="wednesday" label="Wednesday" text="Wed" />
        <DayGroupItem value="thursday" label="Thursday" text="Thu" />
        <DayGroupItem value="friday" label="Friday" text="Fri" />
        <DayGroupItem value="saturday" label="Saturday" text="Sat" />
      </ToggleGroup>
    </div>
  )
}
