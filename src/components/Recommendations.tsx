import type { Drug, AgeGroup, DrugId, AlternativeGroupId } from '../types';
import type { RecommendationResult } from '../utils/engine';
import { altGroupMap } from '../data/alternatives';
import { drugMap } from '../data/drugs';

interface Props {
  recommendations: RecommendationResult;
  ageGroup: AgeGroup;
  drugChoices: Record<AlternativeGroupId, DrugId | 'both'>;
  onChoose: (groupId: AlternativeGroupId, drugId: DrugId | 'both') => void;
  onNext: () => void;
  onBack: () => void;
}

function DrowsyBadge({ level }: { level: 'no' | 'mild' | 'yes' }) {
  if (level === 'no') return null;
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
        level === 'yes'
          ? 'bg-purple-100 text-purple-700'
          : 'bg-yellow-100 text-yellow-700'
      }`}
    >
      <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
      </svg>
      {level === 'yes' ? 'Causes drowsiness' : 'Mild drowsiness'}
    </span>
  );
}

function DrugCard({
  drug,
  ageGroup,
  isSelected,
  isAlternative,
  onSelect,
}: {
  drug: Drug;
  ageGroup: AgeGroup;
  isSelected?: boolean;
  isAlternative?: boolean;
  onSelect?: () => void;
}) {
  const dose = drug.dosing[ageGroup];

  return (
    <div
      onClick={onSelect}
      className={`
        p-4 rounded-xl border-2 transition-all
        ${
          isAlternative
            ? isSelected
              ? 'border-blue-500 bg-blue-50 cursor-pointer'
              : 'border-gray-200 bg-white hover:border-blue-200 cursor-pointer'
            : 'border-gray-200 bg-white'
        }
      `}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h4 className="font-semibold text-gray-900">{drug.genericName}</h4>
        <div className="flex items-center gap-2 shrink-0">
          <DrowsyBadge level={drug.drowsy} />
          {isAlternative && (
            <div
              className={`
              w-5 h-5 rounded-full border-2 flex items-center justify-center
              ${isSelected ? 'border-blue-500 bg-blue-500' : 'border-gray-300'}
            `}
            >
              {isSelected && (
                <div className="w-2 h-2 rounded-full bg-white" />
              )}
            </div>
          )}
        </div>
      </div>

      {dose && (
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm mb-2">
          <div>
            <span className="text-gray-400">Dose:</span>{' '}
            <span className="text-gray-700 font-medium">{dose.amount}</span>
          </div>
          <div>
            <span className="text-gray-400">Frequency:</span>{' '}
            <span className="text-gray-700 font-medium">{dose.frequency}</span>
          </div>
          <div>
            <span className="text-gray-400">Max daily:</span>{' '}
            <span className="text-gray-700 font-medium">{dose.maxDaily}</span>
          </div>
          {dose.durationDays && (
            <div>
              <span className="text-gray-400">Duration:</span>{' '}
              <span className="text-gray-700 font-medium">
                {dose.durationDays} days
              </span>
            </div>
          )}
        </div>
      )}

      {!dose && (
        <p className="text-sm text-red-600 mb-2">
          Not recommended for this age group.
        </p>
      )}

      {drug.notes && (
        <p className="text-sm text-gray-500 mt-1">{drug.notes}</p>
      )}
    </div>
  );
}

export function Recommendations({
  recommendations,
  ageGroup,
  drugChoices,
  onChoose,
  onNext,
  onBack,
}: Props) {
  const { recommendedDrugs, activeAlternativeGroups, activeInteractions } =
    recommendations;

  // Separate drugs into "no alternatives" and "alternative groups"
  const standaloneDrugs = recommendedDrugs.filter(
    (d) => !d.alternativeGroup
  );

  // Check if all alternative groups have a selection
  const allGroupsChosen = activeAlternativeGroups.every(
    (gid) => drugChoices[gid]
  );

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Your Drug Plan
      </h2>
      <p className="text-gray-500 mb-6">
        Based on your symptoms, these generic drugs may help. Where alternatives
        exist, select your preference.
      </p>

      {/* Standalone drugs */}
      {standaloneDrugs.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Recommended Drugs
          </h3>
          <div className="space-y-3">
            {standaloneDrugs.map((drug) => (
              <DrugCard key={drug.id} drug={drug} ageGroup={ageGroup} />
            ))}
          </div>
        </div>
      )}

      {/* Alternative groups */}
      {activeAlternativeGroups.map((groupId) => {
        const group = altGroupMap.get(groupId);
        if (!group) return null;

        const groupDrugs = group.drugs
          .map((id) => drugMap.get(id))
          .filter(Boolean) as Drug[];

        return (
          <div key={groupId} className="mb-6">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1">
              Choose: {group.name}
            </h3>
            <p className="text-sm text-gray-500 mb-3">{group.guidance}</p>
            <div className="space-y-3">
              {/* Day & Night combo option */}
              {group.allowBoth && (
                <div
                  onClick={() => onChoose(groupId, 'both')}
                  className={`
                    p-4 rounded-xl border-2 transition-all cursor-pointer
                    ${
                      drugChoices[groupId] === 'both'
                        ? 'border-indigo-500 bg-gradient-to-r from-amber-50 to-indigo-50'
                        : 'border-gray-200 bg-white hover:border-indigo-200'
                    }
                  `}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">☀️</span>
                      <h4 className="font-semibold text-gray-900">{group.bothLabel}</h4>
                      <span className="text-lg">🌙</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700">
                        Recommended
                      </span>
                      <div
                        className={`
                          w-5 h-5 rounded-full border-2 flex items-center justify-center
                          ${drugChoices[groupId] === 'both' ? 'border-indigo-500 bg-indigo-500' : 'border-gray-300'}
                        `}
                      >
                        {drugChoices[groupId] === 'both' && (
                          <div className="w-2 h-2 rounded-full bg-white" />
                        )}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{group.bothDescription}</p>
                  <div className="mt-3 flex gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <span>☀️</span>
                      <span>{drugMap.get(group.drugs.find(id => drugMap.get(id)?.drowsy !== 'yes') || group.drugs[0])?.genericName} (daytime)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>🌙</span>
                      <span>{drugMap.get(group.drugs.find(id => drugMap.get(id)?.drowsy === 'yes') || group.drugs[1])?.genericName} (bedtime)</span>
                    </div>
                  </div>
                </div>
              )}
              {/* Individual drug options */}
              {groupDrugs.map((drug) => (
                <DrugCard
                  key={drug.id}
                  drug={drug}
                  ageGroup={ageGroup}
                  isAlternative
                  isSelected={drugChoices[groupId] === drug.id}
                  onSelect={() => onChoose(groupId, drug.id)}
                />
              ))}
            </div>
          </div>
        );
      })}

      {/* Interaction warnings */}
      {activeInteractions.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-amber-600 uppercase tracking-wider mb-3">
            Interaction Notices
          </h3>
          <div className="space-y-2">
            {activeInteractions.map((interaction, i) => (
              <div
                key={i}
                className={`p-3 rounded-xl border text-sm ${
                  interaction.severity === 'conflict'
                    ? 'bg-red-50 border-red-200 text-red-800'
                    : 'bg-amber-50 border-amber-200 text-amber-800'
                }`}
              >
                <div className="flex items-start gap-2">
                  <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                  </svg>
                  <p>{interaction.message}</p>
                </div>
              </div>
            ))}
          </div>
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
          disabled={!allGroupsChosen}
          className={`
            flex-[2] py-3 rounded-xl font-semibold text-lg transition-colors
            ${
              allGroupsChosen
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }
          `}
        >
          {allGroupsChosen
            ? 'Build Dosing Schedule'
            : 'Select all choices to continue'}
        </button>
      </div>
    </div>
  );
}
