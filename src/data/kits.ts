import type { Kit } from '../types';

/**
 * Amazon Associates affiliate tag.
 * Associate ID: coldplanapp
 * Tag for URLs: coldplanapp-20
 */
export const AMAZON_AFFILIATE_TAG = 'coldplanapp-20';

/**
 * Curated cold/flu kits for different life situations.
 * Each kit is a carefully selected set of generic drugs optimized for the use case.
 *
 * ASINs selected Apr 2026 — best-reviewed bulk generics on Amazon:
 *   Acetaminophen 325mg 1000ct — TIME-Cap Labs (B091Y48B4M)
 *   Ibuprofen 200mg 500ct — Amazon Basic Care (B074F297T8)
 *   Guaifenesin 400mg 200ct — GenCare (B086S3P4FQ)
 *   DXM 15mg 200ct — RXZELL softgels (B0BKQQW6HS)
 *   Pseudoephedrine 30mg — NOT ON AMAZON (behind-the-counter, CMEA)
 *   Phenylephrine 5mg 300ct — HealthA2Z (B096G9TZCT)
 *   Diphenhydramine 25mg 400ct — Amazon Basic Care (B074F19XB8)
 *   Loratadine 10mg 300ct — Amazon Basic Care (B074F18H5N)
 *   Menthol lozenges 160ct — Amazon Basic Care (B0937TMQGV)
 *   AM/PM Pill Organizer — Ezy Dose Weekly (B001THDDFC)
 *   Travel Pill Case — Holii 8-compartment (B07ZNWH48K)
 */
export const kits: Kit[] = [
  {
    id: 'home',
    name: 'The Home Kit',
    tagline: 'Your family medicine cabinet, done right',
    description:
      'Full bulk bottles of every generic cold drug you\'d ever need. Covers the whole family for 1-2 years of cold seasons. Buy once, always be ready.',
    icon: '🏠',
    color: 'emerald',
    ageGroup: 'adult',
    drugs: [
      {
        drugId: 'acetaminophen',
        role: 'Fever, headache, body aches',
        amPm: 'both',
        amazonSearch: 'generic acetaminophen 325mg 1000 count tablets',
        asin: 'B091Y48B4M',
      },
      {
        drugId: 'ibuprofen',
        role: 'Anti-inflammatory pain relief (alternate with acetaminophen)',
        amPm: 'both',
        amazonSearch: 'generic ibuprofen 200mg 500 count tablets',
        asin: 'B074F297T8',
      },
      {
        drugId: 'guaifenesin',
        role: 'Chest congestion & productive cough',
        amPm: 'both',
        amazonSearch: 'generic guaifenesin 400mg 200 count tablets',
        asin: 'B086S3P4FQ',
      },
      {
        drugId: 'dextromethorphan',
        role: 'Dry cough suppression',
        amPm: 'both',
        amazonSearch: 'generic dextromethorphan 15mg cough gelcaps',
        asin: 'B0BKQQW6HS',
      },
      {
        drugId: 'pseudoephedrine',
        role: 'Nasal congestion (the effective decongestant)',
        amPm: 'am',
        amazonSearch: 'pseudoephedrine 30mg tablets',
        // No ASIN — behind the pharmacy counter (CMEA). Buy in person.
      },
      {
        drugId: 'loratadine',
        role: 'Daytime runny nose & sneezing (non-drowsy)',
        amPm: 'am',
        amazonSearch: 'generic loratadine 10mg 300 count allergy',
        asin: 'B074F18H5N',
      },
      {
        drugId: 'diphenhydramine',
        role: 'Nighttime runny nose, sneezing + sleep aid',
        amPm: 'pm',
        amazonSearch: 'generic diphenhydramine 25mg 400 count allergy',
        asin: 'B074F19XB8',
      },
      {
        drugId: 'menthol-benzocaine',
        role: 'Sore throat relief',
        amPm: 'both',
        amazonSearch: 'menthol cough drops bulk bag 160 count',
        asin: 'B0937TMQGV',
      },
    ],
    tips: [
      'Store in a cool, dry place — a bathroom cabinet with a shower gets too humid.',
      'Check expiration dates once a year. Most OTC drugs last 2-3 years sealed.',
      'Label the shelf: "Cold Kit" so anyone in the house can find it.',
      'Keep a printed copy of this app\'s dosing guide with the kit.',
      'Pseudoephedrine is behind the pharmacy counter — buy it in person at any pharmacy, no prescription needed.',
    ],
  },
  {
    id: 'travel',
    name: 'The Travel Kit',
    tagline: 'Never buy $25 NyQuil at the airport again',
    description:
      'Pre-counted pills for your trip. Fits in a toiletry bag. Everything you need if a cold hits on the road.',
    icon: '✈️',
    color: 'blue',
    ageGroup: 'adult',
    drugs: [
      {
        drugId: 'acetaminophen',
        role: 'Fever, headache, body aches',
        amPm: 'both',
        amazonSearch: 'generic acetaminophen 325mg 1000 count tablets',
        asin: 'B091Y48B4M',
      },
      {
        drugId: 'ibuprofen',
        role: 'Anti-inflammatory backup',
        amPm: 'both',
        amazonSearch: 'generic ibuprofen 200mg 500 count tablets',
        asin: 'B074F297T8',
      },
      {
        drugId: 'guaifenesin',
        role: 'Chest congestion',
        amPm: 'both',
        amazonSearch: 'generic guaifenesin 400mg tablets',
        asin: 'B086S3P4FQ',
      },
      {
        drugId: 'dextromethorphan',
        role: 'Dry cough (meetings, flights)',
        amPm: 'both',
        amazonSearch: 'generic dextromethorphan 15mg cough gelcaps',
        asin: 'B0BKQQW6HS',
      },
      {
        drugId: 'pseudoephedrine',
        role: 'Nasal congestion + ear pressure on flights',
        amPm: 'am',
        amazonSearch: 'pseudoephedrine 30mg tablets',
        // No ASIN — behind the pharmacy counter (CMEA). Buy in person.
      },
      {
        drugId: 'loratadine',
        role: 'Daytime antihistamine (non-drowsy for work)',
        amPm: 'am',
        amazonSearch: 'generic loratadine 10mg 300 count',
        asin: 'B074F18H5N',
      },
      {
        drugId: 'diphenhydramine',
        role: 'Nighttime antihistamine + hotel sleep aid',
        amPm: 'pm',
        amazonSearch: 'generic diphenhydramine 25mg 400 count',
        asin: 'B074F19XB8',
      },
      {
        drugId: 'menthol-benzocaine',
        role: 'Sore throat on the go',
        amPm: 'both',
        amazonSearch: 'menthol cough drops individually wrapped',
        asin: 'B0937TMQGV',
      },
    ],
    tips: [
      'TSA: OTC pills in carry-on are fine. No liquid limits for solid tablets/capsules.',
      'Use a weekly pill organizer labeled AM/PM. Count pills for your trip length.',
      'Pseudoephedrine: Buy before your trip — it\'s behind the pharmacy counter.',
      'Pseudoephedrine helps with ear pressure during takeoff and landing.',
      'Diphenhydramine doubles as a hotel sleep aid for jet lag.',
    ],
  },
  {
    id: 'college',
    name: 'The College Kit',
    tagline: 'Send them off prepared, not to the campus CVS at 2am',
    description:
      'Everything your student needs to handle cold season in the dorms. Bulk bottles that last the entire school year. They\'ll thank you (eventually).',
    icon: '🎓',
    color: 'violet',
    ageGroup: 'adult',
    drugs: [
      {
        drugId: 'acetaminophen',
        role: 'Fever, headache, body aches, hangover',
        amPm: 'both',
        amazonSearch: 'generic acetaminophen 325mg 1000 count tablets',
        asin: 'B091Y48B4M',
      },
      {
        drugId: 'ibuprofen',
        role: 'Anti-inflammatory (sore throat, body aches)',
        amPm: 'both',
        amazonSearch: 'generic ibuprofen 200mg 500 count tablets',
        asin: 'B074F297T8',
      },
      {
        drugId: 'guaifenesin',
        role: 'Chest congestion & productive cough',
        amPm: 'both',
        amazonSearch: 'generic guaifenesin 400mg 200 count',
        asin: 'B086S3P4FQ',
      },
      {
        drugId: 'dextromethorphan',
        role: 'Dry cough (can\'t cough through a lecture)',
        amPm: 'both',
        amazonSearch: 'generic dextromethorphan 15mg cough gelcaps',
        asin: 'B0BKQQW6HS',
      },
      {
        drugId: 'phenylephrine',
        role: 'Nasal congestion (shelf-available, no pharmacy counter needed)',
        amPm: 'am',
        amazonSearch: 'generic phenylephrine 5mg nasal decongestant',
        asin: 'B096G9TZCT',
      },
      {
        drugId: 'loratadine',
        role: 'Daytime runny nose & sneezing (non-drowsy for class)',
        amPm: 'am',
        amazonSearch: 'generic loratadine 10mg 300 count',
        asin: 'B074F18H5N',
      },
      {
        drugId: 'diphenhydramine',
        role: 'Nighttime antihistamine + sleep aid',
        amPm: 'pm',
        amazonSearch: 'generic diphenhydramine 25mg 400 count',
        asin: 'B074F19XB8',
      },
      {
        drugId: 'menthol-benzocaine',
        role: 'Sore throat — quiet relief during class',
        amPm: 'both',
        amazonSearch: 'menthol cough drops bag bulk',
        asin: 'B0937TMQGV',
      },
    ],
    tips: [
      'Dorm tip: Keep the kit in a shoebox on a shelf, not buried in a closet.',
      'Print the AM/PM guide and tape it inside the box lid.',
      'Phenylephrine instead of pseudoephedrine — no pharmacy counter trip needed.',
      'Loratadine is non-drowsy — won\'t knock them out before an exam.',
      'Each bottle lasts the full school year (and probably sophomore year too).',
      'Remind them: fever over 103, difficulty breathing → campus health center, not more pills.',
    ],
  },
  {
    id: 'office',
    name: 'The Office Kit',
    tagline: 'Get through the work day without the brain fog',
    description:
      'Daytime-only drugs. Zero drowsy ingredients. Keep a small stash in your desk drawer for when a cold hits mid-week. Stay functional.',
    icon: '💼',
    color: 'amber',
    ageGroup: 'adult',
    drugs: [
      {
        drugId: 'acetaminophen',
        role: 'Headache, fever, body aches',
        amPm: 'am',
        amazonSearch: 'generic acetaminophen 325mg 1000 count',
        asin: 'B091Y48B4M',
      },
      {
        drugId: 'ibuprofen',
        role: 'Anti-inflammatory (sore throat, aches)',
        amPm: 'am',
        amazonSearch: 'generic ibuprofen 200mg 500 count',
        asin: 'B074F297T8',
      },
      {
        drugId: 'guaifenesin',
        role: 'Chest congestion (clear it before meetings)',
        amPm: 'am',
        amazonSearch: 'generic guaifenesin 400mg tablets',
        asin: 'B086S3P4FQ',
      },
      {
        drugId: 'loratadine',
        role: 'Runny nose & sneezing (non-drowsy, lasts all day)',
        amPm: 'am',
        amazonSearch: 'generic loratadine 10mg 300 count',
        asin: 'B074F18H5N',
      },
      {
        drugId: 'pseudoephedrine',
        role: 'Nasal congestion (breathe through meetings)',
        amPm: 'am',
        amazonSearch: 'pseudoephedrine 30mg tablets',
        // No ASIN — behind the pharmacy counter (CMEA). Buy in person.
      },
      {
        drugId: 'menthol-benzocaine',
        role: 'Sore throat relief between calls',
        amPm: 'am',
        amazonSearch: 'menthol cough drops individually wrapped',
        asin: 'B0937TMQGV',
      },
    ],
    tips: [
      'No drowsy drugs — DXM and diphenhydramine left out on purpose.',
      'Loratadine: one pill in the morning covers you all day.',
      'Keep in a desk drawer or small bag in your work bag.',
      'Pair with the Home Kit — use the Office Kit during work, switch to the full kit at night.',
      'Stay home if you have a fever. This kit is for the "I have a cold but I can push through" days.',
      'Pseudoephedrine is behind the pharmacy counter — buy it in person, no prescription needed.',
    ],
  },
  {
    id: 'kids',
    name: 'The Kids Kit',
    tagline: 'Pediatric doses, parent-approved',
    description:
      'Child-safe drugs with age-appropriate dosing for ages 6-11. No guessing, no overdosing. Keep alongside the Home Kit for when the little ones catch something.',
    icon: '🧒',
    color: 'pink',
    ageGroup: 'child-6-11',
    drugs: [
      {
        drugId: 'acetaminophen',
        role: 'Fever, headache, body aches',
        amPm: 'both',
        amazonSearch: 'children acetaminophen chewable tablets 160mg',
      },
      {
        drugId: 'ibuprofen',
        role: 'Anti-inflammatory (alternate with acetaminophen)',
        amPm: 'both',
        amazonSearch: 'children ibuprofen chewable tablets 100mg',
      },
      {
        drugId: 'guaifenesin',
        role: 'Chest congestion & productive cough',
        amPm: 'both',
        amazonSearch: 'children guaifenesin liquid expectorant',
      },
      {
        drugId: 'dextromethorphan',
        role: 'Dry cough suppression',
        amPm: 'both',
        amazonSearch: 'children dextromethorphan cough syrup',
      },
      {
        drugId: 'loratadine',
        role: 'Runny nose & sneezing (non-drowsy for school)',
        amPm: 'am',
        amazonSearch: 'children loratadine 5mg chewable tablets',
      },
      {
        drugId: 'diphenhydramine',
        role: 'Nighttime runny nose & sneezing + helps sleep',
        amPm: 'pm',
        amazonSearch: 'children diphenhydramine liquid allergy',
      },
    ],
    tips: [
      'ALWAYS use the correct dose for your child\'s age and weight.',
      'No aspirin for children — it\'s linked to Reye\'s syndrome.',
      'Children\'s liquid formulations are easier to dose accurately.',
      'No cough/cold medicines for children under 2 — see a pediatrician.',
      'Fever over 102F in a child, or any fever in an infant under 3 months → call the doctor.',
      'Keep medicines locked or out of reach. Child-resistant doesn\'t mean child-proof.',
    ],
  },
];

export const kitMap = new Map(kits.map((k) => [k.id, k]));

/**
 * Build an Amazon product URL with affiliate tag.
 * Uses ASIN-based direct link if available, otherwise falls back to search.
 */
export function getAmazonLink(amazonSearch: string, asin?: string): string {
  if (asin) {
    return `https://www.amazon.com/dp/${asin}?tag=${AMAZON_AFFILIATE_TAG}`;
  }
  const query = encodeURIComponent(amazonSearch);
  return `https://www.amazon.com/s?k=${query}&tag=${AMAZON_AFFILIATE_TAG}`;
}
