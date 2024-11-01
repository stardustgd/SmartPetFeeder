import { Input } from '@/components/ui/input'

export default function TimePicker() {
  return (
    <div className="flex items-center justify-between bg-[#F0F0F0]">
      <h1>Time</h1>
      <Input placeholder="12:00 AM" type="time" className="w-32" />
    </div>
  )
}
