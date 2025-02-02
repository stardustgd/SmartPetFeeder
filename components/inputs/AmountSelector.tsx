import { Input } from '@/components/ui/input'

type AmountSelectorProps = {
  amount: number
  setAmount: (amount: number) => void
}

export default function AmountSelector({
  amount,
  setAmount,
}: AmountSelectorProps) {
  const handleAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(parseInt(event.target.value))
  }

  return (
    <div className="flex items-center justify-between bg-[#F0F0F0]">
      <h1>
        Amount <span className="ml-1 font-extralight text-gray-700">(oz)</span>
      </h1>
      <Input
        value={amount}
        onChange={handleAmount}
        placeholder="0"
        type="number"
        min={0}
        max={50}
        className="w-32"
      />
    </div>
  )
}
