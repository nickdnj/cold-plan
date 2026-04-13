# Cold Plan

Smart OTC cold relief with generic drugs. Stop overpaying for brand-name cold medicine.

**Live:** https://cold-plan-app.web.app

## What It Does

Every brand-name cold medicine (NyQuil, DayQuil, Mucinex, Advil PM) is just a combination of a handful of generic drugs at a significant markup. Cold Plan shows you exactly what's inside, how to replicate it with generics, and how to build a stocked medicine cabinet for a fraction of the cost.

Three ways to use it:

**I Have a Cold** -- Select your symptoms, get matched to generic drugs, choose between alternatives (AM/PM day/night combos), and get a 7-day dosing schedule with proper timing, max dose limits, and interaction warnings.

**What's In My Medicine?** -- Browse 20 brand-name products organized by manufacturer (Vicks, Advil, Tylenol, Mucinex, Theraflu, Robitussin, Sudafed). Each product shows the exact active ingredients, dosing directions from the label, and a "Recipe" -- the specific generic pills from your kit that replicate it.

**Shop Kits** -- Five curated bulk-buy kits with Amazon links:

| Kit | Who It's For |
|-----|-------------|
| Home | Family medicine cabinet. All 8 drugs in bulk. Covers 1-2 years. |
| Travel | Business travelers. Fits in a toiletry bag. Never buy airport NyQuil again. |
| College | Send your kid to school prepared. Lasts the whole year. |
| Office | Daytime-only, zero drowsy drugs. Stay functional at work. |
| Kids | Child-safe doses (ages 6-11) with pediatric safety tips. |

## The Drug Database

9 generic drugs with full dosing data across 3 age groups (Adult, Child 6-11, Child 2-5):

| Drug | Pill Strength | Treats |
|------|--------------|--------|
| Acetaminophen | 325mg tablet | Fever, headache, body aches |
| Ibuprofen | 200mg tablet | Pain, inflammation, fever |
| Guaifenesin | 200mg tablet | Chest congestion, productive cough |
| Dextromethorphan | 15mg gelcap | Dry cough |
| Pseudoephedrine | 30mg tablet | Nasal congestion |
| Phenylephrine | 5mg tablet | Nasal congestion (shelf-available) |
| Diphenhydramine | 25mg tablet | Runny nose, sneezing, sleep aid |
| Loratadine | 10mg tablet | Runny nose, sneezing (non-drowsy) |
| Menthol/Benzocaine | lozenge | Sore throat |

Pill strengths are chosen to cleanly divide into brand-name formulations. 1 NyQuil dose = 1 Acetaminophen 325mg + 1 DXM 15mg + 1 Diphenhydramine 25mg.

## Tech Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4
- PWA with offline support (vite-plugin-pwa / Workbox)
- Firebase Hosting (static, no backend)
- All drug data is static TypeScript -- no database, no API calls

## Project Structure

```
src/
  components/       UI components (one per page/feature)
    LandingPage      Three entry points: symptoms, brands, kits
    AgeSelector      Adult / Child 6-11 / Child 2-5
    SymptomSelector  8 symptom categories with conflict detection
    DoctorCheck      Safety gate before drug recommendations
    Recommendations  Drug cards with alternative groups + AM/PM combo
    Schedule         7-day dosing planner with timeline view
    BrandLookup      Brand medicine search grouped by manufacturer
    KitCatalog       Kit cards with pricing
    KitDetail        Full kit with Amazon links + AM/PM guide
    About            Founder story
  data/              Static drug, brand, and kit databases
    drugs.ts         9 generic drugs with dosing across 3 age groups
    brands.ts        20 brand products with per-ingredient dosages
    kits.ts          5 curated kits with Amazon affiliate config
    symptoms.ts      8 symptom categories
    interactions.ts  Drug interaction rules
    alternatives.ts  Alternative groups (decongestant, pain, antihistamine)
    doctorTriggers.ts  When-to-see-a-doctor conditions
  utils/             Business logic
    engine.ts        Symptom-to-drug recommendation engine
    schedule.ts      Dosing schedule builder (AM/PM, interaction-aware)
  hooks/
    useAppState.ts   Central app state management
  types/
    index.ts         All TypeScript interfaces
```

## Development

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # Production build to dist/
npm run preview    # Preview production build
```

## Deployment

Firebase Hosting. Build and deploy:

```bash
npm run build
firebase deploy --only hosting
```

## Affiliate Configuration

Amazon affiliate tag and product links are configured in `src/data/kits.ts`:

```typescript
export const AMAZON_AFFILIATE_TAG = 'coldplan-20';
```

Each kit drug has an `amazonSearch` field (search URL fallback) and an optional `asin` field (direct product link). Set the `asin` for each product once you have your Amazon Associates account.

## Disclaimer

Cold Plan is for informational purposes only. It is not medical advice. Consult a doctor or pharmacist before starting any medication. Generic drugs contain the same active ingredients as their brand-name counterparts.

## License

MIT
