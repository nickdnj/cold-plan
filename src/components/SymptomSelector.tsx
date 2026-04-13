import type { SymptomId } from '../types';
import type { JSX } from 'react';
import { symptoms } from '../data/symptoms';

interface Props {
  selected: SymptomId[];
  onToggle: (id: SymptomId) => void;
  onNext: () => void;
  onBack: () => void;
}

const SYMPTOM_ICONS: Record<string, JSX.Element> = {
  'cough-dry': (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
    </svg>
  ),
  'cough-wet': (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
    </svg>
  ),
  nose: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" />
    </svg>
  ),
  chest: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
    </svg>
  ),
  throat: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
    </svg>
  ),
  thermometer: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
    </svg>
  ),
  droplet: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3.75c-2.25 3-6 6.75-6 10.5a6 6 0 0 0 12 0c0-3.75-3.75-7.5-6-10.5Z" />
    </svg>
  ),
  sneeze: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
    </svg>
  ),
  head: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.572-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z" />
    </svg>
  ),
};

export function SymptomSelector({ selected, onToggle, onNext, onBack }: Props) {
  // Group symptoms by category
  const groups = [
    {
      label: 'Cough',
      items: symptoms.filter((s) => s.category === 'cough'),
      note: 'Select one type (dry or productive — they require different treatments)',
    },
    {
      label: 'Congestion',
      items: symptoms.filter((s) => s.category === 'congestion'),
    },
    {
      label: 'Throat',
      items: symptoms.filter((s) => s.category === 'throat'),
    },
    {
      label: 'Pain & Fever',
      items: symptoms.filter((s) => s.category === 'pain-fever'),
    },
    {
      label: 'Runny Nose & Sneezing',
      items: symptoms.filter((s) => s.category === 'allergy-like'),
    },
  ];

  const hasConflict = (id: SymptomId): boolean => {
    const symptom = symptoms.find((s) => s.id === id);
    if (!symptom?.conflictsWith) return false;
    return symptom.conflictsWith.some((c) => selected.includes(c));
  };

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        What are your symptoms?
      </h2>
      <p className="text-gray-500 mb-6">
        Select all symptoms you are currently experiencing.
      </p>

      <div className="space-y-6">
        {groups.map((group) => (
          <div key={group.label}>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
              {group.label}
            </h3>
            {group.note && (
              <p className="text-xs text-gray-400 mb-2">{group.note}</p>
            )}
            <div className="space-y-2">
              {group.items.map((symptom) => {
                const isSelected = selected.includes(symptom.id);
                const isConflict =
                  !isSelected && hasConflict(symptom.id);

                return (
                  <button
                    key={symptom.id}
                    onClick={() => onToggle(symptom.id)}
                    className={`
                      w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all text-left
                      ${
                        isSelected
                          ? 'border-blue-500 bg-blue-50'
                          : isConflict
                            ? 'border-gray-200 bg-gray-50 opacity-50'
                            : 'border-gray-200 bg-white hover:border-blue-200'
                      }
                    `}
                  >
                    <div
                      className={`
                      w-10 h-10 rounded-lg flex items-center justify-center shrink-0
                      ${isSelected ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}
                    `}
                    >
                      {SYMPTOM_ICONS[symptom.icon] || (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-gray-900">
                        {symptom.name}
                      </div>
                      <div className="text-sm text-gray-500 truncate">
                        {symptom.description}
                      </div>
                    </div>
                    <div
                      className={`
                      w-6 h-6 rounded-md border-2 flex items-center justify-center shrink-0
                      ${isSelected ? 'border-blue-500 bg-blue-500' : 'border-gray-300'}
                    `}
                    >
                      {isSelected && (
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 py-3 rounded-xl font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={selected.length === 0}
          className={`
            flex-[2] py-3 rounded-xl font-semibold text-lg transition-colors
            ${
              selected.length > 0
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }
          `}
        >
          Continue ({selected.length} selected)
        </button>
      </div>
    </div>
  );
}
