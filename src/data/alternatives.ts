import type { AlternativeGroup } from '../types';

export const alternativeGroups: AlternativeGroup[] = [
  {
    id: 'nasal-decongestant',
    name: 'Nasal Decongestant',
    drugs: ['pseudoephedrine', 'phenylephrine'],
    guidance:
      'Pseudoephedrine is generally considered more effective but is kept behind the pharmacy counter (no prescription needed — just ask the pharmacist). Phenylephrine is available on the shelf but some studies question its effectiveness at standard oral doses.',
  },
  {
    id: 'pain-fever',
    name: 'Pain Reliever / Fever Reducer',
    drugs: ['acetaminophen', 'ibuprofen'],
    guidance:
      'Acetaminophen is gentler on the stomach and safe for most people, but be careful not to exceed the daily maximum (liver risk). Ibuprofen is anti-inflammatory and may help more with swelling and body aches — take it with food. You may alternate them (space 2 hours apart) for more consistent relief.',
  },
  {
    id: 'antihistamine',
    name: 'Antihistamine',
    drugs: ['diphenhydramine', 'loratadine'],
    guidance:
      'Diphenhydramine (Benadryl) may be more effective for acute cold symptoms but causes significant drowsiness — best taken at bedtime. Loratadine (Claritin) is non-drowsy and lasts 24 hours — good for daytime.',
    allowBoth: true,
    bothLabel: 'Day & Night Combo',
    bothDescription: 'Loratadine during the day (non-drowsy) + Diphenhydramine at bedtime (helps you sleep). Best of both worlds.',
  },
];

export const altGroupMap = new Map(alternativeGroups.map((g) => [g.id, g]));
