import { useId } from 'react'

export type SelectBoxOption = {
  label: string
  value: string
}

type SelectBoxProps = {
  label: string
  value: string
  options: SelectBoxOption[]
  onChange: (value: string) => void
}

export default function SelectBox({ label, value, options, onChange }: SelectBoxProps) {
  const id = useId()

  return (
    <div className="flex items-center gap-2">
      <label htmlFor={id} className="text-xs font-semibold text-muted">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-[6px] border border-border-light bg-white px-2 py-1.5 text-xs font-bold text-label-strong outline-none"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
