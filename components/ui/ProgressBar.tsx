export function ProgressBar({ done, total, className = "" }: { done: number; total: number; className?: string }) {
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);
  return (
    <div
      className={`h-2.5 overflow-hidden rounded-full bg-royal-soft ${className}`}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={total}
      aria-valuenow={done}
    >
      <div className="h-full rounded-full bg-royal transition-all duration-500" style={{ width: `${percent}%` }} />
    </div>
  );
}
