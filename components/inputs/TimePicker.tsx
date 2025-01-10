import { Input } from '@/components/ui/input'

type TimePickerProps = {
  time: string
  setTime: (time: string) => void
}

export default function TimePicker({ time, setTime }: TimePickerProps) {
  const handleTime = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTime(event.target.value)
  }

  return (
    <div className="flex items-center justify-between bg-[#F0F0F0]">
      <h1>Time</h1>
      <Input
        value={time}
        onChange={handleTime}
        placeholder="12:00 AM"
        type="time"
        className="w-32"
      />
    </div>
  )
}
