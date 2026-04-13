export type AgeGroup = 'adult';

export type SymptomId =
  | 'dry-cough'
  | 'productive-cough'
  | 'nasal-congestion'
  | 'chest-congestion'
  | 'sore-throat'
  | 'fever-body-aches'
  | 'runny-nose'
  | 'sneezing'
  | 'headache';

export type SymptomCategory =
  | 'cough'
  | 'congestion'
  | 'throat'
  | 'pain-fever'
  | 'allergy-like';

export interface Symptom {
  id: SymptomId;
  name: string;
  category: SymptomCategory;
  description: string;
  icon: string;
  conflictsWith?: SymptomId[];
}

export type DrugId =
  | 'guaifenesin'
  | 'dextromethorphan'
  | 'pseudoephedrine'
  | 'phenylephrine'
  | 'acetaminophen'
  | 'ibuprofen'
  | 'diphenhydramine'
  | 'loratadine'
  | 'menthol-benzocaine';

export type AlternativeGroupId =
  | 'nasal-decongestant'
  | 'pain-fever'
  | 'antihistamine';

export interface DoseInfo {
  amount: string;
  frequency: string;
  frequencyHours: number;
  maxDaily: string;
  maxDailyMg?: number;
  durationDays?: number;
}

export interface Drug {
  id: DrugId;
  genericName: string;
  /** The brand name people know (e.g., "Tylenol", "Benadryl") */
  brandName: string;
  treats: SymptomId[];
  dosing: Record<AgeGroup, DoseInfo | null>;
  drowsy: 'no' | 'mild' | 'yes';
  alternativeGroup?: AlternativeGroupId;
  notes?: string;
}

export interface AlternativeGroup {
  id: AlternativeGroupId;
  name: string;
  drugs: DrugId[];
  guidance: string;
  /** When true, user can pick "both" for a day/night split */
  allowBoth?: boolean;
  bothLabel?: string;
  bothDescription?: string;
}

export interface InteractionRule {
  drugs: [DrugId, DrugId];
  severity: 'warning' | 'conflict';
  message: string;
  spacing?: string;
}

export interface BrandIngredient {
  /** Matches our generic DB if we carry it */
  drugId?: DrugId;
  /** Always present — the actual generic name in the product */
  name: string;
  /** What it does */
  purpose: string;
  /** Per-dose amount as printed on label */
  amount: string;
  amountMg: number;
  /** If drugId is null, suggest this as a close generic substitute */
  substituteId?: DrugId;
  substituteNote?: string;
}

export interface BrandProduct {
  id: string;
  name: string;
  manufacturer: string;
  type: 'day' | 'night' | 'combo' | 'single' | 'pm';
  /** "Cold & Flu Relief", "PM Pain Relief + Sleep Aid", etc. */
  purpose: string;
  ingredients: BrandIngredient[];
  /** How to take it (from the label) */
  dosing: {
    form: string;
    amount: string;
    frequency: string;
    maxDaily: string;
  };
  priceRange: [number, number];
}

export interface GenericPrice {
  drugId: DrugId;
  label: string;
  /** mg per pill/tablet/gelcap */
  strengthMg: number;
  /** What each unit is (tablet, gelcap, lozenge) */
  form: string;
  /** Bulk bottle price range (e.g., 300-count on Amazon) */
  bulkPrice: [number, number];
  /** Number of pills/doses in the bulk bottle */
  bulkCount: number;
  /** Doses needed per 7-day cold episode */
  dosesPerEpisode: number;
}

export interface DoctorTrigger {
  id: string;
  text: string;
  severity: 'urgent' | 'important';
}

export interface ScheduleEntry {
  time: string;
  drugId: DrugId;
  drugName: string;
  dose: string;
  color: string;
  note?: string;
}

export interface DaySchedule {
  day: number;
  entries: ScheduleEntry[];
  reminders: string[];
}

export interface UserSelections {
  ageGroup: AgeGroup | null;
  symptoms: SymptomId[];
  drugChoices: Record<AlternativeGroupId, DrugId | 'both'>;
  wakeTime: string;
  sleepTime: string;
}

export type KitId = 'home' | 'travel' | 'college' | 'office';

export interface KitDrug {
  drugId: DrugId;
  role: string;
  amPm: 'am' | 'pm' | 'both';
  /** Amazon search keywords for this product */
  amazonSearch: string;
  /** Specific ASIN override (set once you have affiliate account) */
  asin?: string;
}

export interface Kit {
  id: KitId;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  color: string;
  ageGroup: AgeGroup;
  drugs: KitDrug[];
  /** Pro tips specific to this kit */
  tips: string[];
}

export type AppStep =
  | 'landing'
  | 'symptoms'
  | 'doctor-check'
  | 'recommendations'
  | 'schedule'
  | 'brand-lookup'
  | 'kits'
  | 'kit-detail'
  | 'about';
