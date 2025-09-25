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
        <DayGroupItem value="Sun" label="Sunday" text="Sun" />
        <DayGroupItem value="Mon" label="Monday" text="Mon" />
        <DayGroupItem value="Tue" label="Tuesday" text="Tue" />
        <DayGroupItem value="Wed" label="Wednesday" text="Wed" />
        <DayGroupItem value="Thu" label="Thursday" text="Thu" />
        <DayGroupItem value="Fri" label="Friday" text="Fri" />
        <DayGroupItem value="Sat" label="Saturday" text="Sat" />
      </ToggleGroup>
    </div>
  )
}
