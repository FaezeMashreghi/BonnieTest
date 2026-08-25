type LoadingProps = {
  label?: string
}

export default function Loading({ label = 'Loading...' }: LoadingProps) {
  return (
    <div className="absolute inset-0 flex items-center justify-center" role="status">
      <span className="flex items-center gap-2 rounded-full border border-border bg-white px-3 py-1.5 text-xs font-semibold text-label shadow-sm">
        <span className="h-3 w-3 animate-spin rounded-full border-2 border-border border-t-accent" aria-hidden="true" />
        {label}
      </span>
    </div>
  )
}
