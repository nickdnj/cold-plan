import { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import type {
  SymptomId,
  DrugId,
  AlternativeGroupId,
} from '../types';
import { getRecommendations, resolveDrugChoices } from '../utils/engine';
import { trackEvent } from '../firebase';
import { Disclaimer } from '../components/Disclaimer';
import { StepIndicator } from '../components/StepIndicator';
import { SymptomSelector } from '../components/SymptomSelector';
import { DoctorCheck } from '../components/DoctorCheck';
import { Recommendations } from '../components/Recommendations';
import { Schedule } from '../components/Schedule';
import { BrandLookup } from '../components/BrandLookup';
import { SEOHead } from '../components/seo/SEOHead';
import type { AppStep, UserSelections } from '../types';

const PLANNER_STEPS: AppStep[] = [
  'symptoms',
  'doctor-check',
  'recommendations',
  'schedule',
  'brand-lookup',
];

export function PlannerPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<AppStep>('symptoms');
  const [selections, setSelections] = useState<UserSelections>({
    ageGroup: 'adult',
    symptoms: [],
    drugChoices: {} as Record<AlternativeGroupId, DrugId | 'both'>,
    wakeTime: '07:00',
    sleepTime: '23:00',
  });

  const goTo = useCallback((s: AppStep) => {
    trackEvent('navigate', { step: s });
    setStep(s);
  }, []);

  const goNext = useCallback(() => {
    const idx = PLANNER_STEPS.indexOf(step);
    if (idx < PLANNER_STEPS.length - 1) {
      setStep(PLANNER_STEPS[idx + 1]);
    }
  }, [step]);

  const goBack = useCallback(() => {
    const idx = PLANNER_STEPS.indexOf(step);
    if (idx > 0) {
      setStep(PLANNER_STEPS[idx - 1]);
    } else {
      navigate('/');
    }
  }, [step, navigate]);

  const toggleSymptom = useCallback((symptomId: SymptomId) => {
    setSelections((s) => {
      const current = s.symptoms;
      if (current.includes(symptomId)) {
        return { ...s, symptoms: current.filter((id) => id !== symptomId) };
      }
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
    if (selections.symptoms.length === 0) return null;
    return getRecommendations(selections.symptoms, 'adult');
  }, [selections.symptoms]);

  const resolvedDrugs = useMemo(() => {
    if (!recommendations) return [];
    return resolveDrugChoices(recommendations, selections.drugChoices);
  }, [recommendations, selections.drugChoices]);

  return (
    <>
      <SEOHead
        title="Cold Symptom Planner — Get a Personalized Generic Drug Plan"
        description="Select your cold symptoms and get a personalized 7-day dosing plan using only the generic drugs you need. No brand-name markup, no unnecessary ingredients."
        path="/planner"
        noindex
      />

      {/* Step indicator in header area */}
      <div className="max-w-3xl mx-auto px-4">
        <StepIndicator current={step} onNavigate={goTo} />
      </div>

      <div className="max-w-3xl mx-auto px-4">
        <div className="mb-6">
          <Disclaimer />
        </div>

        {step === 'symptoms' && (
          <SymptomSelector
            selected={selections.symptoms}
            onToggle={toggleSymptom}
            onNext={goNext}
            onBack={goBack}
          />
        )}

        {step === 'doctor-check' && (
          <DoctorCheck onNext={goNext} onBack={goBack} />
        )}

        {step === 'recommendations' && recommendations && (
          <Recommendations
            recommendations={recommendations}
            ageGroup="adult"
            drugChoices={selections.drugChoices}
            onChoose={setDrugChoice}
            onNext={goNext}
            onBack={goBack}
          />
        )}

        {step === 'schedule' && resolvedDrugs.length > 0 && (
          <Schedule
            drugs={resolvedDrugs}
            ageGroup="adult"
            wakeTime={selections.wakeTime}
            sleepTime={selections.sleepTime}
            onWakeTimeChange={setWakeTime}
            onSleepTimeChange={setSleepTime}
            onNext={goNext}
            onBack={goBack}
          />
        )}

        {step === 'brand-lookup' && (
          <BrandLookup
            onBack={goBack}
            onStartOver={() => navigate('/')}
          />
        )}
      </div>
    </>
  );
}
