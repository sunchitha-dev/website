"use client";

interface QuantityStepperProps {
  value: number;
  onChange: (qty: number) => void;
  min?: number;
  max?: number;
}

export default function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 10,
}: QuantityStepperProps) {
  return (
    <div className="flex items-center">
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className="w-8 h-8 flex items-center justify-center bg-noir-700 text-cream text-sm hover:bg-noir-600 transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        -
      </button>
      <span className="w-10 text-center text-sm text-cream">{value}</span>
      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className="w-8 h-8 flex items-center justify-center bg-noir-700 text-cream text-sm hover:bg-noir-600 transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        +
      </button>
    </div>
  );
}
