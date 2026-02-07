'use client';

import { cn } from '@/lib/utils';
import type { DimensionOption } from '@/lib/constants';

interface DimensionSelectorProps<T extends string> {
  label: string;
  options: DimensionOption<T>[];
  value: T;
  onChange: (value: T) => void;
}

export function DimensionSelector<T extends string>({
  label,
  options,
  value,
  onChange,
}: DimensionSelectorProps<T>) {
  const selectedOption = options.find((o) => o.value === value);

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      <div className="flex gap-1 flex-wrap">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={cn(
              'px-3 py-1.5 text-xs rounded-md border transition-all',
              value === option.value
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-background border-border text-muted-foreground hover:text-foreground hover:border-foreground/30'
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
      {selectedOption && (
        <p className="text-xs text-muted-foreground">
          {selectedOption.description}
        </p>
      )}
    </div>
  );
}

interface MultiSelectProps<T extends string> {
  label: string;
  options: DimensionOption<T>[];
  value: T[];
  onChange: (value: T[]) => void;
}

export function MultiSelector<T extends string>({
  label,
  options,
  value,
  onChange,
}: MultiSelectProps<T>) {
  const toggle = (optionValue: T) => {
    if (value.includes(optionValue)) {
      onChange(value.filter((v) => v !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      <div className="flex gap-1 flex-wrap">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => toggle(option.value)}
            className={cn(
              'px-3 py-1.5 text-xs rounded-md border transition-all',
              value.includes(option.value)
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-background border-border text-muted-foreground hover:text-foreground hover:border-foreground/30'
            )}
            title={option.description}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
