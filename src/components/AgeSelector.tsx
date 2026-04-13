import type { AgeGroup } from '../types';

interface Props {
  selected: AgeGroup | null;
  onSelect: (ag: AgeGroup) => void;
  onNext: () => void;
}

const AGE_OPTIONS: { id: AgeGroup; label: string; desc: string; icon: string }[] = [
  {
    id: 'adult',
    label: 'Adult (12+)',
    desc: 'Adolescents and adults',
    icon: 'adult',
  },
  {
    id: 'child-6-11',
    label: 'Child (6-11)',
    desc: 'School-age children',
    icon: 'child',
  },
  {
    id: 'child-2-5',
    label: 'Child (2-5)',
    desc: 'Toddlers and preschoolers',
    icon: 'toddler',
  },
];

export function AgeSelector({ selected, onSelect, onNext }: Props) {
  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Who is this for?
      </h2>
      <p className="text-gray-500 mb-6">
        Dosing varies by age group. Select the appropriate category.
      </p>

      <div className="space-y-3">
        {AGE_OPTIONS.map((opt) => (
          <button
            key={opt.id}
            onClick={() => onSelect(opt.id)}
            className={`
              w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left
              ${
                selected === opt.id
                  ? 'border-blue-500 bg-blue-50 shadow-sm'
                  : 'border-gray-200 bg-white hover:border-blue-200 hover:bg-blue-50/50'
              }
            `}
          >
            <div
              className={`
              w-12 h-12 rounded-full flex items-center justify-center text-2xl
              ${selected === opt.id ? 'bg-blue-100' : 'bg-gray-100'}
            `}
            >
              {opt.id === 'adult' ? (
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
              ) : opt.id === 'child-6-11' ? (
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                </svg>
              ) : (
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
                </svg>
              )}
            </div>
            <div>
              <div className="font-semibold text-gray-900">{opt.label}</div>
              <div className="text-sm text-gray-500">{opt.desc}</div>
            </div>
            {selected === opt.id && (
              <svg
                className="w-6 h-6 text-blue-600 ml-auto"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </button>
        ))}
      </div>

      <div className="mt-6 text-center text-sm text-red-600 bg-red-50 rounded-lg p-3">
        <strong>Children under 2:</strong> Do not use OTC cold medications.
        Please consult a pediatrician.
      </div>

      <button
        onClick={onNext}
        disabled={!selected}
        className={`
          mt-6 w-full py-3 rounded-xl font-semibold text-lg transition-colors
          ${
            selected
              ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }
        `}
      >
        Continue
      </button>
    </div>
  );
}
