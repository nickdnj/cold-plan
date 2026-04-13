import { useState, useCallback, useMemo } from 'react';
import type {
  AppStep,
  UserSelections,
  AgeGroup,
  SymptomId,
  DrugId,
  AlternativeGroupId,
  KitId,
} from '../types';
import { getRecommendations, resolveDrugChoices } from '../utils/engine';

const STEP_ORDER: AppStep[] = [
  'landing',
  'age',
  'symptoms',
  'doctor-check',
  'recommendations',
  'schedule',
  'brand-lookup',
];

export function useAppState() {
  const [step, setStep] = useState<AppStep>('landing');
  const [selectedKit, setSelectedKit] = useState<KitId | null>(null);
  const [selections, setSelections] = useState<UserSelections>({
    ageGroup: null,
    symptoms: [],
    drugChoices: {} as Record<AlternativeGroupId, DrugId | 'both'>,
    wakeTime: '07:00',
    sleepTime: '23:00',
  });

  const goTo = useCallback((s: AppStep) => setStep(s), []);

  const goNext = useCallback(() => {
    const idx = STEP_ORDER.indexOf(step);
    if (idx < STEP_ORDER.length - 1) {
      setStep(STEP_ORDER[idx + 1]);
    }
  }, [step]);

  const goBack = useCallback(() => {
    const idx = STEP_ORDER.indexOf(step);
    if (idx > 0) {
      setStep(STEP_ORDER[idx - 1]);
    }
  }, [step]);

  const setAgeGroup = useCallback((ag: AgeGroup) => {
    setSelections((s) => ({ ...s, ageGroup: ag }));
  }, []);

  const toggleSymptom = useCallback((symptomId: SymptomId) => {
    setSelections((s) => {
      const current = s.symptoms;
      if (current.includes(symptomId)) {
        return { ...s, symptoms: current.filter((id) => id !== symptomId) };
      }
      // Check for conflicts (dry-cough vs productive-cough)
      let next = [...current, symptomId];
      if (symptomId === 'dry-cough') {
        next = next.filter((id) => id !== 'productive-cough');
      } else if (symptomId === 'productive-cough') {
        next = next.filter((id) => id !== 'dry-cough');
      }
      return { ...s, symptoms: next };
    });
  }, []);

  const setDrugChoice = useCallback(
    (groupId: AlternativeGroupId, drugId: DrugId | 'both') => {
      setSelections((s) => ({
        ...s,
        drugChoices: { ...s.drugChoices, [groupId]: drugId },
      }));
    },
    []
  );

  const setWakeTime = useCallback((time: string) => {
    setSelections((s) => ({ ...s, wakeTime: time }));
  }, []);

  const setSleepTime = useCallback((time: string) => {
    setSelections((s) => ({ ...s, sleepTime: time }));
  }, []);

  const recommendations = useMemo(() => {
    if (!selections.ageGroup || selections.symptoms.length === 0) return null;
    return getRecommendations(selections.symptoms, selections.ageGroup);
  }, [selections.ageGroup, selections.symptoms]);

  const resolvedDrugs = useMemo(() => {
    if (!recommendations) return [];
    return resolveDrugChoices(recommendations, selections.drugChoices);
  }, [recommendations, selections.drugChoices]);

  const selectKit = useCallback((kitId: KitId) => {
    setSelectedKit(kitId);
    setStep('kit-detail');
  }, []);

  const startOver = useCallback(() => {
    setSelections({
      ageGroup: null,
      symptoms: [],
      drugChoices: {} as Record<AlternativeGroupId, DrugId | 'both'>,
      wakeTime: '07:00',
      sleepTime: '23:00',
    });
    setSelectedKit(null);
    setStep('landing');
  }, []);

  return {
    step,
    selections,
    recommendations,
    resolvedDrugs,
    selectedKit,
    goTo,
    goNext,
    goBack,
    setAgeGroup,
    toggleSymptom,
    setDrugChoice,
    setWakeTime,
    setSleepTime,
    selectKit,
    startOver,
  };
}
