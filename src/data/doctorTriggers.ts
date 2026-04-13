import type { DoctorTrigger } from '../types';

export const doctorTriggers: DoctorTrigger[] = [
  {
    id: 'high-fever',
    text: 'Fever above 103\u00B0F (39.4\u00B0C)',
    severity: 'urgent',
  },
  {
    id: 'long-symptoms',
    text: 'Symptoms lasting more than 10 days',
    severity: 'important',
  },
  {
    id: 'worsening',
    text: 'Symptoms that improve then suddenly worsen',
    severity: 'urgent',
  },
  {
    id: 'breathing',
    text: 'Difficulty breathing or shortness of breath',
    severity: 'urgent',
  },
  {
    id: 'chest-pain',
    text: 'Chest pain or pressure',
    severity: 'urgent',
  },
  {
    id: 'vomiting',
    text: 'Severe or persistent vomiting',
    severity: 'urgent',
  },
  {
    id: 'confusion',
    text: 'Confusion or difficulty staying alert',
    severity: 'urgent',
  },
];
