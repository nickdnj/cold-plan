import { useState } from 'react';
import { doctorTriggers } from '../data/doctorTriggers';

interface Props {
  onNext: () => void;
  onBack: () => void;
}

export function DoctorCheck({ onNext, onBack }: Props) {
  const [checkedTriggers, setCheckedTriggers] = useState<Set<string>>(
    new Set()
  );
  const [acknowledged, setAcknowledged] = useState(false);

  const hasUrgent = doctorTriggers
    .filter((t) => t.severity === 'urgent')
    .some((t) => checkedTriggers.has(t.id));

  const hasAny = checkedTriggers.size > 0;

  const toggle = (id: string) => {
    setCheckedTriggers((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
    setAcknowledged(false);
  };

  return (
    <div className="max-w-lg mx-auto">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
          <svg
            className="w-7 h-7 text-red-600"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
            />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Safety Check</h2>
          <p className="text-gray-500">
            When to see a doctor instead
          </p>
        </div>
      </div>

      <p className="text-gray-600 mb-4">
        Before proceeding, check if any of the following apply. If so, please
        seek medical attention rather than self-treating with OTC drugs.
      </p>

      <div className="space-y-2 mb-6">
        {doctorTriggers.map((trigger) => {
          const isChecked = checkedTriggers.has(trigger.id);
          return (
            <button
              key={trigger.id}
              onClick={() => toggle(trigger.id)}
              className={`
                w-full flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all
                ${
                  isChecked
                    ? trigger.severity === 'urgent'
                      ? 'border-red-400 bg-red-50'
                      : 'border-amber-400 bg-amber-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }
              `}
            >
              <div
                className={`
                w-6 h-6 rounded-md border-2 flex items-center justify-center shrink-0
                ${
                  isChecked
                    ? trigger.severity === 'urgent'
                      ? 'border-red-500 bg-red-500'
                      : 'border-amber-500 bg-amber-500'
                    : 'border-gray-300'
                }
              `}
              >
                {isChecked && (
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                )}
              </div>
              <span
                className={`font-medium ${
                  isChecked
                    ? trigger.severity === 'urgent'
                      ? 'text-red-800'
                      : 'text-amber-800'
                    : 'text-gray-700'
                }`}
              >
                {trigger.text}
              </span>
              {trigger.severity === 'urgent' && (
                <span className="ml-auto text-xs font-semibold text-red-600 bg-red-100 px-2 py-0.5 rounded-full shrink-0">
                  Urgent
                </span>
              )}
            </button>
          );
        })}
      </div>

      {hasUrgent && (
        <div className="bg-red-100 border border-red-300 rounded-xl p-4 mb-4">
          <div className="flex items-start gap-3">
            <svg className="w-6 h-6 text-red-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
            </svg>
            <div>
              <p className="font-semibold text-red-800">
                Please seek medical attention.
              </p>
              <p className="text-sm text-red-700 mt-1">
                One or more urgent conditions were indicated. OTC cold
                medications are not appropriate in these situations. Please
                contact a healthcare provider or visit an urgent care facility.
              </p>
            </div>
          </div>
        </div>
      )}

      {hasAny && !hasUrgent && (
        <div className="bg-amber-50 border border-amber-300 rounded-xl p-4 mb-4">
          <p className="text-amber-800 text-sm">
            One or more conditions were indicated. Consider consulting a
            healthcare provider. If you wish to continue, acknowledge below.
          </p>
          <label className="flex items-center gap-2 mt-3 cursor-pointer">
            <input
              type="checkbox"
              checked={acknowledged}
              onChange={(e) => setAcknowledged(e.target.checked)}
              className="w-4 h-4 rounded border-amber-400 text-amber-600 focus:ring-amber-500"
            />
            <span className="text-sm text-amber-800">
              I understand and wish to continue
            </span>
          </label>
        </div>
      )}

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 py-3 rounded-xl font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={hasUrgent || (hasAny && !acknowledged)}
          className={`
            flex-[2] py-3 rounded-xl font-semibold text-lg transition-colors
            ${
              hasUrgent || (hasAny && !acknowledged)
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200'
            }
          `}
        >
          {hasAny ? 'Continue Anyway' : 'None of these apply — Continue'}
        </button>
      </div>
    </div>
  );
}
