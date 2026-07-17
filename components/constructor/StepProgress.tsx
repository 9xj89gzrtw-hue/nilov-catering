'use client';
interface Props { steps: string[]; currentStep: number; onStepClick: (s: number) => void; }
export default function StepProgress({ steps, currentStep, onStepClick }: Props) {
  return (
    <div className="flex items-center justify-between gap-1 overflow-x-auto pb-2">
      {steps.map((step, i) => (
        <button key={i} onClick={() => onStepClick(i + 1)} disabled={i + 1 > currentStep}
          className={`flex items-center gap-2 whitespace-nowrap text-xs transition-colors ${i + 1 <= currentStep ? 'text-gold' : 'text-cream-muted/40'} disabled:cursor-not-allowed`}>
          <span className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-mono ${i + 1 < currentStep ? 'bg-gold text-background' : i + 1 === currentStep ? 'border-2 border-gold text-gold' : 'border border-border text-cream-muted/40'}`}>
            {i + 1 < currentStep ? '✓' : i + 1}
          </span>
          <span className="hidden sm:inline">{step}</span>
        </button>
      ))}
    </div>
  );
}
