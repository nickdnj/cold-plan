import type { BrandProduct, GenericPrice } from '../types';

export const brandProducts: BrandProduct[] = [
  // === NIGHTTIME ===
  {
    id: 'nyquil-cold-flu',
    name: 'NyQuil Cold & Flu',
    manufacturer: 'Vicks',
    type: 'night',
    purpose: 'Nighttime cold & flu relief',
    ingredients: [
      { drugId: 'acetaminophen', name: 'Acetaminophen', purpose: 'Pain reliever / fever reducer', amount: '325 mg', amountMg: 325 },
      { drugId: 'dextromethorphan', name: 'Dextromethorphan HBr', purpose: 'Cough suppressant', amount: '15 mg', amountMg: 15 },
      { name: 'Doxylamine Succinate', purpose: 'Antihistamine (causes drowsiness)', amount: '6.25 mg', amountMg: 6.25, substituteId: 'diphenhydramine', substituteNote: 'Diphenhydramine 25mg is a similar sedating antihistamine' },
    ],
    dosing: { form: 'Liquid / LiquiCaps', amount: '30 mL or 2 LiquiCaps', frequency: 'Every 6 hours', maxDaily: '4 doses in 24 hours' },
    priceRange: [12, 15],
  },
  {
    id: 'nyquil-severe',
    name: 'NyQuil Severe Cold & Flu',
    manufacturer: 'Vicks',
    type: 'night',
    purpose: 'Maximum strength nighttime cold & flu',
    ingredients: [
      { drugId: 'acetaminophen', name: 'Acetaminophen', purpose: 'Pain reliever / fever reducer', amount: '650 mg', amountMg: 650 },
      { drugId: 'dextromethorphan', name: 'Dextromethorphan HBr', purpose: 'Cough suppressant', amount: '20 mg', amountMg: 20 },
      { drugId: 'phenylephrine', name: 'Phenylephrine HCl', purpose: 'Nasal decongestant', amount: '10 mg', amountMg: 10 },
      { name: 'Doxylamine Succinate', purpose: 'Antihistamine (causes drowsiness)', amount: '12.5 mg', amountMg: 12.5, substituteId: 'diphenhydramine', substituteNote: 'Diphenhydramine 25-50mg is a similar sedating antihistamine' },
    ],
    dosing: { form: 'Liquid', amount: '30 mL', frequency: 'Every 4 hours', maxDaily: '4 doses in 24 hours' },
    priceRange: [14, 18],
  },
  {
    id: 'theraflu-night',
    name: 'Theraflu Nighttime Severe Cold & Cough',
    manufacturer: 'Theraflu',
    type: 'night',
    purpose: 'Nighttime cold, cough & flu relief',
    ingredients: [
      { drugId: 'acetaminophen', name: 'Acetaminophen', purpose: 'Pain reliever / fever reducer', amount: '650 mg', amountMg: 650 },
      { drugId: 'diphenhydramine', name: 'Diphenhydramine HCl', purpose: 'Antihistamine (causes drowsiness)', amount: '25 mg', amountMg: 25 },
      { drugId: 'phenylephrine', name: 'Phenylephrine HCl', purpose: 'Nasal decongestant', amount: '10 mg', amountMg: 10 },
    ],
    dosing: { form: 'Hot liquid powder', amount: '1 packet in 8 oz hot water', frequency: 'Every 4 hours', maxDaily: '5 doses in 24 hours' },
    priceRange: [10, 12],
  },
  // === PM (PAIN + SLEEP) ===
  {
    id: 'advil-pm',
    name: 'Advil PM',
    manufacturer: 'Advil',
    type: 'pm',
    purpose: 'Nighttime pain relief + sleep aid',
    ingredients: [
      { drugId: 'ibuprofen', name: 'Ibuprofen', purpose: 'Pain reliever / anti-inflammatory', amount: '200 mg', amountMg: 200 },
      { drugId: 'diphenhydramine', name: 'Diphenhydramine Citrate', purpose: 'Sleep aid', amount: '38 mg', amountMg: 38 },
    ],
    dosing: { form: 'Caplets', amount: '2 caplets', frequency: 'At bedtime', maxDaily: '2 caplets in 24 hours' },
    priceRange: [10, 14],
  },
  {
    id: 'tylenol-pm',
    name: 'Tylenol PM',
    manufacturer: 'Tylenol',
    type: 'pm',
    purpose: 'Nighttime pain relief + sleep aid',
    ingredients: [
      { drugId: 'acetaminophen', name: 'Acetaminophen', purpose: 'Pain reliever / fever reducer', amount: '500 mg', amountMg: 500 },
      { drugId: 'diphenhydramine', name: 'Diphenhydramine HCl', purpose: 'Sleep aid', amount: '25 mg', amountMg: 25 },
    ],
    dosing: { form: 'Caplets', amount: '2 caplets', frequency: 'At bedtime', maxDaily: '2 caplets in 24 hours' },
    priceRange: [10, 14],
  },
  {
    id: 'zzzquil',
    name: 'ZzzQuil',
    manufacturer: 'Vicks',
    type: 'pm',
    purpose: 'Nighttime sleep aid',
    ingredients: [
      { drugId: 'diphenhydramine', name: 'Diphenhydramine HCl', purpose: 'Sleep aid / antihistamine', amount: '50 mg', amountMg: 50 },
    ],
    dosing: { form: 'LiquiCaps', amount: '1 LiquiCap', frequency: 'At bedtime', maxDaily: '1 dose in 24 hours' },
    priceRange: [8, 12],
  },
  // === DAYTIME ===
  {
    id: 'dayquil-cold-flu',
    name: 'DayQuil Cold & Flu',
    manufacturer: 'Vicks',
    type: 'day',
    purpose: 'Daytime cold & flu relief (non-drowsy)',
    ingredients: [
      { drugId: 'acetaminophen', name: 'Acetaminophen', purpose: 'Pain reliever / fever reducer', amount: '325 mg', amountMg: 325 },
      { drugId: 'dextromethorphan', name: 'Dextromethorphan HBr', purpose: 'Cough suppressant', amount: '10 mg', amountMg: 10 },
      { drugId: 'phenylephrine', name: 'Phenylephrine HCl', purpose: 'Nasal decongestant', amount: '5 mg', amountMg: 5 },
    ],
    dosing: { form: 'LiquiCaps', amount: '2 LiquiCaps', frequency: 'Every 4 hours', maxDaily: '4 doses in 24 hours' },
    priceRange: [12, 15],
  },
  {
    id: 'dayquil-severe',
    name: 'DayQuil Severe Cold & Flu',
    manufacturer: 'Vicks',
    type: 'day',
    purpose: 'Maximum strength daytime cold & flu (non-drowsy)',
    ingredients: [
      { drugId: 'acetaminophen', name: 'Acetaminophen', purpose: 'Pain reliever / fever reducer', amount: '325 mg', amountMg: 325 },
      { drugId: 'dextromethorphan', name: 'Dextromethorphan HBr', purpose: 'Cough suppressant', amount: '10 mg', amountMg: 10 },
      { drugId: 'guaifenesin', name: 'Guaifenesin', purpose: 'Expectorant (loosens mucus)', amount: '200 mg', amountMg: 200 },
      { drugId: 'phenylephrine', name: 'Phenylephrine HCl', purpose: 'Nasal decongestant', amount: '5 mg', amountMg: 5 },
    ],
    dosing: { form: 'LiquiCaps', amount: '2 LiquiCaps', frequency: 'Every 4 hours', maxDaily: '4 doses in 24 hours' },
    priceRange: [14, 17],
  },
  {
    id: 'theraflu-day',
    name: 'Theraflu Daytime Severe Cold & Cough',
    manufacturer: 'Theraflu',
    type: 'day',
    purpose: 'Daytime cold & cough relief',
    ingredients: [
      { drugId: 'acetaminophen', name: 'Acetaminophen', purpose: 'Pain reliever / fever reducer', amount: '650 mg', amountMg: 650 },
      { drugId: 'dextromethorphan', name: 'Dextromethorphan HBr', purpose: 'Cough suppressant', amount: '20 mg', amountMg: 20 },
      { drugId: 'phenylephrine', name: 'Phenylephrine HCl', purpose: 'Nasal decongestant', amount: '10 mg', amountMg: 10 },
    ],
    dosing: { form: 'Hot liquid powder', amount: '1 packet in 8 oz hot water', frequency: 'Every 4 hours', maxDaily: '5 doses in 24 hours' },
    priceRange: [10, 12],
  },
  // === COUGH / CHEST ===
  {
    id: 'mucinex-dm',
    name: 'Mucinex DM',
    manufacturer: 'Mucinex',
    type: 'combo',
    purpose: 'Cough + chest congestion relief',
    ingredients: [
      { drugId: 'guaifenesin', name: 'Guaifenesin', purpose: 'Expectorant (loosens mucus)', amount: '600 mg', amountMg: 600 },
      { drugId: 'dextromethorphan', name: 'Dextromethorphan HBr', purpose: 'Cough suppressant', amount: '30 mg', amountMg: 30 },
    ],
    dosing: { form: 'Extended-release tablets', amount: '1-2 tablets', frequency: 'Every 12 hours', maxDaily: '4 tablets in 24 hours' },
    priceRange: [15, 20],
  },
  {
    id: 'mucinex-d',
    name: 'Mucinex D',
    manufacturer: 'Mucinex',
    type: 'combo',
    purpose: 'Chest + nasal congestion relief',
    ingredients: [
      { drugId: 'guaifenesin', name: 'Guaifenesin', purpose: 'Expectorant (loosens mucus)', amount: '600 mg', amountMg: 600 },
      { drugId: 'pseudoephedrine', name: 'Pseudoephedrine HCl', purpose: 'Nasal decongestant', amount: '60 mg', amountMg: 60 },
    ],
    dosing: { form: 'Extended-release tablets', amount: '1-2 tablets', frequency: 'Every 12 hours', maxDaily: '4 tablets in 24 hours' },
    priceRange: [18, 22],
  },
  {
    id: 'robitussin-dm',
    name: 'Robitussin DM',
    manufacturer: 'Robitussin',
    type: 'combo',
    purpose: 'Cough + chest congestion relief',
    ingredients: [
      { drugId: 'guaifenesin', name: 'Guaifenesin', purpose: 'Expectorant (loosens mucus)', amount: '100 mg', amountMg: 100 },
      { drugId: 'dextromethorphan', name: 'Dextromethorphan HBr', purpose: 'Cough suppressant', amount: '10 mg', amountMg: 10 },
    ],
    dosing: { form: 'Liquid', amount: '10 mL', frequency: 'Every 4 hours', maxDaily: '6 doses in 24 hours' },
    priceRange: [10, 14],
  },
  {
    id: 'robitussin-cf',
    name: 'Robitussin Maximum Strength Cough + Chest Congestion DM',
    manufacturer: 'Robitussin',
    type: 'combo',
    purpose: 'Maximum strength cough + congestion',
    ingredients: [
      { drugId: 'guaifenesin', name: 'Guaifenesin', purpose: 'Expectorant (loosens mucus)', amount: '200 mg', amountMg: 200 },
      { drugId: 'dextromethorphan', name: 'Dextromethorphan HBr', purpose: 'Cough suppressant', amount: '10 mg', amountMg: 10 },
    ],
    dosing: { form: 'Liquid', amount: '20 mL', frequency: 'Every 4 hours', maxDaily: '6 doses in 24 hours' },
    priceRange: [12, 16],
  },
  // === SINUS / DECONGESTANT ===
  {
    id: 'advil-cold-sinus',
    name: 'Advil Cold & Sinus',
    manufacturer: 'Advil',
    type: 'combo',
    purpose: 'Cold, sinus pain & congestion relief',
    ingredients: [
      { drugId: 'ibuprofen', name: 'Ibuprofen', purpose: 'Pain reliever / anti-inflammatory', amount: '200 mg', amountMg: 200 },
      { drugId: 'pseudoephedrine', name: 'Pseudoephedrine HCl', purpose: 'Nasal decongestant', amount: '30 mg', amountMg: 30 },
    ],
    dosing: { form: 'Caplets', amount: '1 caplet', frequency: 'Every 4-6 hours', maxDaily: '6 caplets in 24 hours' },
    priceRange: [10, 14],
  },
  {
    id: 'sudafed-original',
    name: 'Sudafed (Original)',
    manufacturer: 'Sudafed',
    type: 'single',
    purpose: 'Nasal congestion relief',
    ingredients: [
      { drugId: 'pseudoephedrine', name: 'Pseudoephedrine HCl', purpose: 'Nasal decongestant', amount: '30 mg', amountMg: 30 },
    ],
    dosing: { form: 'Tablets', amount: '2 tablets', frequency: 'Every 4-6 hours', maxDaily: '8 tablets in 24 hours' },
    priceRange: [8, 10],
  },
  {
    id: 'sudafed-pe',
    name: 'Sudafed PE',
    manufacturer: 'Sudafed',
    type: 'single',
    purpose: 'Nasal congestion relief (shelf-available)',
    ingredients: [
      { drugId: 'phenylephrine', name: 'Phenylephrine HCl', purpose: 'Nasal decongestant', amount: '10 mg', amountMg: 10 },
    ],
    dosing: { form: 'Tablets', amount: '1 tablet', frequency: 'Every 4 hours', maxDaily: '6 tablets in 24 hours' },
    priceRange: [8, 10],
  },
  // === MULTI-SYMPTOM ===
  {
    id: 'tylenol-cold-flu-severe',
    name: 'Tylenol Cold + Flu Severe',
    manufacturer: 'Tylenol',
    type: 'day',
    purpose: 'Daytime multi-symptom cold & flu',
    ingredients: [
      { drugId: 'acetaminophen', name: 'Acetaminophen', purpose: 'Pain reliever / fever reducer', amount: '325 mg', amountMg: 325 },
      { drugId: 'dextromethorphan', name: 'Dextromethorphan HBr', purpose: 'Cough suppressant', amount: '10 mg', amountMg: 10 },
      { drugId: 'guaifenesin', name: 'Guaifenesin', purpose: 'Expectorant (loosens mucus)', amount: '200 mg', amountMg: 200 },
      { drugId: 'phenylephrine', name: 'Phenylephrine HCl', purpose: 'Nasal decongestant', amount: '5 mg', amountMg: 5 },
    ],
    dosing: { form: 'Caplets', amount: '2 caplets', frequency: 'Every 4 hours', maxDaily: '5 doses in 24 hours' },
    priceRange: [12, 15],
  },
  {
    id: 'alka-seltzer-plus-cold',
    name: 'Alka-Seltzer Plus Cold',
    manufacturer: 'Bayer',
    type: 'day',
    purpose: 'Cold symptom relief',
    ingredients: [
      { drugId: 'acetaminophen', name: 'Acetaminophen', purpose: 'Pain reliever / fever reducer', amount: '325 mg', amountMg: 325 },
      { drugId: 'dextromethorphan', name: 'Dextromethorphan HBr', purpose: 'Cough suppressant', amount: '10 mg', amountMg: 10 },
      { drugId: 'phenylephrine', name: 'Phenylephrine HCl', purpose: 'Nasal decongestant', amount: '5 mg', amountMg: 5 },
    ],
    dosing: { form: 'Effervescent tablets', amount: '2 tablets in water', frequency: 'Every 4 hours', maxDaily: '5 doses in 24 hours' },
    priceRange: [8, 12],
  },
  {
    id: 'coricidin-hbp',
    name: 'Coricidin HBP Cold & Flu',
    manufacturer: 'Bayer',
    type: 'combo',
    purpose: 'Cold & flu for high blood pressure patients (no decongestant)',
    ingredients: [
      { drugId: 'acetaminophen', name: 'Acetaminophen', purpose: 'Pain reliever / fever reducer', amount: '325 mg', amountMg: 325 },
      { name: 'Chlorpheniramine Maleate', purpose: 'Antihistamine', amount: '2 mg', amountMg: 2, substituteId: 'loratadine', substituteNote: 'Loratadine 10mg is a non-drowsy antihistamine alternative' },
    ],
    dosing: { form: 'Tablets', amount: '2 tablets', frequency: 'Every 4 hours', maxDaily: '6 tablets in 24 hours' },
    priceRange: [8, 12],
  },
  // === COMBO PACKS ===
  {
    id: 'nyquil-dayquil-combo',
    name: 'NyQuil / DayQuil Combo Pack',
    manufacturer: 'Vicks',
    type: 'combo',
    purpose: 'Day + night cold & flu coverage',
    ingredients: [
      { drugId: 'acetaminophen', name: 'Acetaminophen', purpose: 'Pain reliever / fever reducer', amount: '325 mg', amountMg: 325 },
      { drugId: 'dextromethorphan', name: 'Dextromethorphan HBr', purpose: 'Cough suppressant', amount: '10-15 mg', amountMg: 12.5 },
      { drugId: 'phenylephrine', name: 'Phenylephrine HCl', purpose: 'Nasal decongestant (Day)', amount: '5 mg', amountMg: 5 },
      { name: 'Doxylamine Succinate', purpose: 'Antihistamine / sleep aid (Night)', amount: '6.25 mg', amountMg: 6.25, substituteId: 'diphenhydramine', substituteNote: 'Diphenhydramine 25mg is a similar sedating antihistamine' },
    ],
    dosing: { form: 'LiquiCaps', amount: '2 DayQuil / 2 NyQuil', frequency: 'Day: every 4 hrs / Night: every 6 hrs', maxDaily: '4 doses each in 24 hours' },
    priceRange: [18, 22],
  },
  // === ALLERGY THAT PEOPLE CONFUSE WITH COLD ===
  {
    id: 'benadryl',
    name: 'Benadryl Allergy',
    manufacturer: 'Johnson & Johnson',
    type: 'single',
    purpose: 'Allergy relief + sleep aid',
    ingredients: [
      { drugId: 'diphenhydramine', name: 'Diphenhydramine HCl', purpose: 'Antihistamine', amount: '25 mg', amountMg: 25 },
    ],
    dosing: { form: 'Tablets', amount: '1-2 tablets', frequency: 'Every 4-6 hours', maxDaily: '6 tablets in 24 hours' },
    priceRange: [8, 12],
  },
  {
    id: 'claritin',
    name: 'Claritin',
    manufacturer: 'Bayer',
    type: 'single',
    purpose: 'Non-drowsy allergy relief',
    ingredients: [
      { drugId: 'loratadine', name: 'Loratadine', purpose: 'Antihistamine (non-drowsy)', amount: '10 mg', amountMg: 10 },
    ],
    dosing: { form: 'Tablets', amount: '1 tablet', frequency: 'Once daily', maxDaily: '1 tablet in 24 hours' },
    priceRange: [12, 18],
  },
];

export const brandProductMap = new Map(brandProducts.map((b) => [b.id, b]));

/**
 * The Cold Plan Kit pills — these are the specific pills you stock.
 * Strengths are chosen to cleanly match common brand-name formulations.
 *
 * Acetaminophen: 325mg (matches NyQuil, DayQuil, Tylenol Cold, Alka-Seltzer)
 * DXM: 15mg (standard gelcap; take 2 for 30mg Mucinex DM dose)
 * Guaifenesin: 200mg (matches DayQuil Severe; take 3 for 600mg Mucinex dose)
 * Pseudoephedrine: 30mg (standard; take 2 for 60mg Mucinex D dose)
 * Phenylephrine: 5mg (matches DayQuil per-cap; take 2 for 10mg standard dose)
 * Ibuprofen: 200mg (standard; matches Advil PM, Advil Cold & Sinus)
 * Diphenhydramine: 25mg (standard; matches Benadryl, Theraflu Night, Tylenol PM)
 * Loratadine: 10mg (standard; matches Claritin)
 * Menthol lozenges: 1 lozenge = 1 dose
 */
export const genericPrices: GenericPrice[] = [
  { drugId: 'acetaminophen', label: 'Acetaminophen 325mg tablets', strengthMg: 325, form: 'tablet', bulkPrice: [7, 10], bulkCount: 1000, dosesPerEpisode: 21 },
  { drugId: 'ibuprofen', label: 'Ibuprofen 200mg tablets', strengthMg: 200, form: 'tablet', bulkPrice: [8, 12], bulkCount: 500, dosesPerEpisode: 21 },
  { drugId: 'guaifenesin', label: 'Guaifenesin 200mg tablets', strengthMg: 200, form: 'tablet', bulkPrice: [10, 15], bulkCount: 200, dosesPerEpisode: 28 },
  { drugId: 'dextromethorphan', label: 'Dextromethorphan 15mg gelcaps', strengthMg: 15, form: 'gelcap', bulkPrice: [8, 12], bulkCount: 120, dosesPerEpisode: 28 },
  { drugId: 'pseudoephedrine', label: 'Pseudoephedrine 30mg tablets', strengthMg: 30, form: 'tablet', bulkPrice: [8, 12], bulkCount: 96, dosesPerEpisode: 21 },
  { drugId: 'phenylephrine', label: 'Phenylephrine 5mg tablets', strengthMg: 5, form: 'tablet', bulkPrice: [5, 8], bulkCount: 72, dosesPerEpisode: 28 },
  { drugId: 'diphenhydramine', label: 'Diphenhydramine 25mg tablets', strengthMg: 25, form: 'tablet', bulkPrice: [8, 12], bulkCount: 300, dosesPerEpisode: 7 },
  { drugId: 'loratadine', label: 'Loratadine 10mg tablets', strengthMg: 10, form: 'tablet', bulkPrice: [10, 15], bulkCount: 300, dosesPerEpisode: 7 },
  { drugId: 'menthol-benzocaine', label: 'Menthol throat lozenges', strengthMg: 0, form: 'lozenge', bulkPrice: [6, 10], bulkCount: 105, dosesPerEpisode: 35 },
];

export const genericPriceMap = new Map(genericPrices.map((p) => [p.drugId, p]));
