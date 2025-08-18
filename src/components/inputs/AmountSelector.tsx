import { Input } from '@/components/ui/input'

type AmountSelectorProps = {
  amount: number
  setAmount: (amount: number) => void
}

export default function AmountSelector({
  amount,
  setAmount,
}: AmountSelectorProps) {
  return (
    <div className="flex items-center justify-between bg-[#F0F0F0]">
      <h1>
        Amount{' '}
        <span className="ml-1 font-extralight text-gray-700">(cups)</span>
      </h1>
      <Input
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        placeholder="0"
        type="number"
        min={0}
        max={10}
        className="w-32"
      />
    </div>
  )
}
