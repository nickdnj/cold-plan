import type { Symptom } from '../types';

export const symptoms: Symptom[] = [
  {
    id: 'dry-cough',
    name: 'Dry Cough',
    category: 'cough',
    description: 'Non-productive cough without mucus',
    icon: 'cough-dry',
    conflictsWith: ['productive-cough'],
  },
  {
    id: 'productive-cough',
    name: 'Wet / Productive Cough',
    category: 'cough',
    description: 'Cough that produces mucus or phlegm',
    icon: 'cough-wet',
    conflictsWith: ['dry-cough'],
  },
  {
    id: 'nasal-congestion',
    name: 'Nasal Congestion',
    category: 'congestion',
    description: 'Stuffy or blocked nose',
    icon: 'nose',
  },
  {
    id: 'chest-congestion',
    name: 'Chest Congestion',
    category: 'congestion',
    description: 'Mucus buildup in the chest or lungs',
    icon: 'chest',
  },
  {
    id: 'sore-throat',
    name: 'Sore Throat',
    category: 'throat',
    description: 'Pain or irritation in the throat',
    icon: 'throat',
  },
  {
    id: 'fever-body-aches',
    name: 'Fever / Body Aches',
    category: 'pain-fever',
    description: 'Elevated temperature or general body pain',
    icon: 'thermometer',
  },
  {
    id: 'runny-nose',
    name: 'Runny Nose',
    category: 'allergy-like',
    description: 'Clear or thin nasal discharge',
    icon: 'droplet',
  },
  {
    id: 'sneezing',
    name: 'Sneezing',
    category: 'allergy-like',
    description: 'Frequent sneezing episodes',
    icon: 'sneeze',
  },
  {
    id: 'headache',
    name: 'Headache',
    category: 'pain-fever',
    description: 'Head pain or pressure',
    icon: 'head',
  },
];
