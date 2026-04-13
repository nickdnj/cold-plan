import type { InteractionRule } from '../types';

export const interactions: InteractionRule[] = [
  {
    drugs: ['acetaminophen', 'ibuprofen'],
    severity: 'warning',
    message:
      'Acetaminophen and ibuprofen may be alternated for more consistent relief. Space doses at least 2 hours apart. Do not exceed the daily maximum for either drug.',
    spacing: 'Space at least 2 hours apart',
  },
  {
    drugs: ['diphenhydramine', 'loratadine'],
    severity: 'warning',
    message:
      'Do not take diphenhydramine and loratadine at the same time. Use loratadine during the day (non-drowsy) and diphenhydramine at bedtime if needed.',
    spacing: 'Do not take simultaneously — use at different times of day',
  },
  {
    drugs: ['dextromethorphan', 'diphenhydramine'],
    severity: 'warning',
    message:
      'Both dextromethorphan and diphenhydramine may cause drowsiness. Combined sedation risk — use caution, especially when driving or operating machinery.',
  },
  {
    drugs: ['pseudoephedrine', 'phenylephrine'],
    severity: 'conflict',
    message:
      'Do not combine pseudoephedrine and phenylephrine. Choose one nasal decongestant — they work on the same receptors.',
  },
];
