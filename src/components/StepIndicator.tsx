import type { AppStep } from '../types';

const STEPS: { id: AppStep; label: string }[] = [
  { id: 'symptoms', label: 'Symptoms' },
  { id: 'doctor-check', label: 'Safety' },
  { id: 'recommendations', label: 'Drugs' },
  { id: 'schedule', label: 'Schedule' },
  { id: 'brand-lookup', label: 'Brands' },
];

interface Props {
  current: AppStep;
  onNavigate: (step: AppStep) => void;
}

export function StepIndicator({ current, onNavigate }: Props) {
  const currentIdx = STEPS.findIndex((s) => s.id === current);

  if (current === 'landing' || current === 'kits' || current === 'kit-detail' || current === 'about' || currentIdx === -1) return null;

  return (
    <nav className="flex items-center justify-center gap-1 sm:gap-2 py-4 px-2">
      {STEPS.map((s, i) => {
        const isActive = s.id === current;
        const isPast = i < currentIdx;
        const isFuture = i > currentIdx;

        return (
          <div key={s.id} className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => isPast && onNavigate(s.id)}
              disabled={isFuture}
              className={`
                flex items-center gap-1 px-2 py-1 rounded-full text-xs sm:text-sm font-medium transition-colors
                ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : isPast
                      ? 'bg-blue-100 text-blue-700 hover:bg-blue-200 cursor-pointer'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }
              `}
            >
              <span
                className={`
                w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-xs font-bold
                ${
                  isActive
                    ? 'bg-white text-blue-600'
                    : isPast
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-300 text-gray-500'
                }
              `}
              >
                {isPast ? (
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                ) : (
                  i + 1
                )}
              </span>
              <span className="hidden sm:inline">{s.label}</span>
            </button>
            {i < STEPS.length - 1 && (
              <div
                className={`w-4 sm:w-8 h-0.5 ${isPast ? 'bg-blue-400' : 'bg-gray-200'}`}
              />
            )}
          </div>
        );
      })}
    </nav>
  );
}
