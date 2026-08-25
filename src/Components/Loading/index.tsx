type LoadingProps = {
  label?: string
}

export default function Loading({ label = 'Loading...' }: LoadingProps) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <span className="flex items-center gap-2 rounded-full border border-[#e2e8ec] bg-white px-3 py-1.5 text-[12px] font-semibold text-[#65727c] shadow-sm">
        <span className="h-3 w-3 animate-spin rounded-full border-2 border-[#e2e8ec] border-t-[#e36d4d]" />
        {label}
      </span>
    </div>
  )
}
