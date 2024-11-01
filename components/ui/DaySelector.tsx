import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

type DayGroupItemProps = {
  value: string
  label: string
  text: string
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

export default function DaySelector() {
  return (
    <div className="flex items-center justify-center space-x-2">
      <ToggleGroup type="multiple">
        <DayGroupItem value="sunday" label="Sunday" text="Sun" />
        <DayGroupItem value="Monday" label="Monday" text="Mon" />
        <DayGroupItem value="Tuesday" label="Tuesday" text="Tue" />
        <DayGroupItem value="Wednesday" label="Wednesday" text="Wed" />
        <DayGroupItem value="Thursday" label="Thursday" text="Thu" />
        <DayGroupItem value="Friday" label="Friday" text="Fri" />
        <DayGroupItem value="Saturday" label="Saturday" text="Sat" />
      </ToggleGroup>
    </div>
  )
}
