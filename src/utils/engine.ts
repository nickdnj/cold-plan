import type {
  SymptomId,
  DrugId,
  AgeGroup,
  AlternativeGroupId,
  Drug,
} from '../types';
import { drugs } from '../data/drugs';
import { interactions } from '../data/interactions';

/**
 * Consolidation rules: some symptom combos map to a single drug category.
 * - runny-nose + sneezing => single antihistamine (don't double up)
 * - fever-body-aches + headache => single pain reliever
 */
function consolidateSymptoms(selected: SymptomId[]): SymptomId[] {
  const set = new Set(selected);
  // These pairs are already covered by the same drug, no dedup needed at this level
  // The dedup happens at the drug recommendation level
  return Array.from(set);
}

export interface RecommendationResult {
  /** Drugs that directly treat the selected symptoms */
  recommendedDrugs: Drug[];
  /** Alternative groups the user needs to choose from */
  activeAlternativeGroups: AlternativeGroupId[];
  /** Any applicable interaction warnings */
  activeInteractions: typeof interactions;
}

export function getRecommendations(
  selectedSymptoms: SymptomId[],
  ageGroup: AgeGroup
): RecommendationResult {
  const consolidated = consolidateSymptoms(selectedSymptoms);

  // Find all drugs that treat at least one selected symptom
  const matchingDrugs = drugs.filter(
    (drug) =>
      drug.treats.some((t) => consolidated.includes(t)) &&
      drug.dosing[ageGroup] !== null
  );

  // Group by symptom to deduplicate
  // Track which drugs are chosen vs alternatives
  const neededDrugIds = new Set<DrugId>();
  const activeAltGroups = new Set<AlternativeGroupId>();

  // For each symptom, find which drugs cover it
  for (const symptom of consolidated) {
    const coveringDrugs = matchingDrugs.filter((d) =>
      d.treats.includes(symptom)
    );

    for (const drug of coveringDrugs) {
      if (drug.alternativeGroup) {
        activeAltGroups.add(drug.alternativeGroup);
      }
      neededDrugIds.add(drug.id);
    }
  }

  // Build the final drug list (deduped)
  const recommendedDrugs = matchingDrugs.filter((d) =>
    neededDrugIds.has(d.id)
  );

  // Find active interactions among recommended drugs
  const activeInteractions = interactions.filter((rule) => {
    return (
      neededDrugIds.has(rule.drugs[0]) && neededDrugIds.has(rule.drugs[1])
    );
  });

  return {
    recommendedDrugs,
    activeAlternativeGroups: Array.from(activeAltGroups),
    activeInteractions,
  };
}

/**
 * Given the user's alternative choices, return the final drug list.
 * Supports 'both' for groups that allow a day/night combo.
 */
export function resolveDrugChoices(
  recommendations: RecommendationResult,
  choices: Record<AlternativeGroupId, DrugId | 'both'>
): Drug[] {
  const finalDrugs: Drug[] = [];
  const seen = new Set<DrugId>();

  for (const drug of recommendations.recommendedDrugs) {
    if (drug.alternativeGroup) {
      const chosen = choices[drug.alternativeGroup];
      if (chosen === 'both') {
        // Include all drugs from this alternative group
        if (!seen.has(drug.id)) {
          finalDrugs.push(drug);
          seen.add(drug.id);
        }
      } else if (chosen && chosen === drug.id && !seen.has(drug.id)) {
        finalDrugs.push(drug);
        seen.add(drug.id);
      }
    } else {
      if (!seen.has(drug.id)) {
        finalDrugs.push(drug);
        seen.add(drug.id);
      }
    }
  }

  return finalDrugs;
}

/**
 * Get relevant interactions for the resolved drug list.
 */
export function getActiveInteractions(drugIds: DrugId[]) {
  const idSet = new Set(drugIds);
  return interactions.filter(
    (rule) => idSet.has(rule.drugs[0]) && idSet.has(rule.drugs[1])
  );
}
