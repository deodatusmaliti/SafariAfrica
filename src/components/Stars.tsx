import { Star } from 'lucide-react';

export default function Stars({ value, className = '' }: { value: number; className?: string }) {
  return (
    <div className={`flex items-center gap-0.5 ${className}`} aria-label={`${value} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < value ? 'fill-sunset-400 text-sunset-400' : 'fill-ink-200 text-ink-200'}`}
        />
      ))}
    </div>
  );
}
