import type { Drug, AgeGroup, DaySchedule, ScheduleEntry, DrugId } from '../types';
import { getActiveInteractions } from './engine';

const DRUG_COLORS: Record<DrugId, string> = {
  guaifenesin: '#059669', // emerald
  dextromethorphan: '#7c3aed', // violet
  pseudoephedrine: '#2563eb', // blue
  phenylephrine: '#0891b2', // cyan
  acetaminophen: '#dc2626', // red
  ibuprofen: '#ea580c', // orange
  diphenhydramine: '#6d28d9', // purple (drowsy)
  loratadine: '#0d9488', // teal
  'menthol-benzocaine': '#65a30d', // lime
};

function timeToMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

function minutesToTime(mins: number): string {
  const h = Math.floor(mins / 60) % 24;
  const m = mins % 60;
  const period = h >= 12 ? 'PM' : 'AM';
  const hour12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${hour12}:${m.toString().padStart(2, '0')} ${period}`;
}

export function buildSchedule(
  drugs: Drug[],
  ageGroup: AgeGroup,
  wakeTime: string,
  sleepTime: string,
  days: number = 7
): DaySchedule[] {
  const wakeMin = timeToMinutes(wakeTime);
  let sleepMin = timeToMinutes(sleepTime);
  if (sleepMin <= wakeMin) sleepMin += 24 * 60; // handle past midnight

  const schedule: DaySchedule[] = [];

  // Separate drowsy vs non-drowsy drugs
  const drowsyDrugs = drugs.filter((d) => d.drowsy === 'yes');
  const nonDrowsyDrugs = drugs.filter((d) => d.drowsy !== 'yes');

  // Check interactions to know about spacing
  const allDrugIds = drugs.map((d) => d.id);
  const activeInteractions = getActiveInteractions(allDrugIds);

  // Check if we need to alternate APAP/ibuprofen
  const hasApapIbu =
    allDrugIds.includes('acetaminophen') && allDrugIds.includes('ibuprofen');

  for (let day = 0; day < days; day++) {
    const entries: ScheduleEntry[] = [];
    const reminders: string[] = [];

    // For each non-drowsy drug, calculate dose times during waking hours
    for (const drug of nonDrowsyDrugs) {
      const dose = drug.dosing[ageGroup];
      if (!dose) continue;

      // Check if drug should stop by this day
      if (dose.durationDays && day >= dose.durationDays) {
        if (day === dose.durationDays) {
          reminders.push(
            `Stop ${drug.genericName} today (${dose.durationDays}-day limit reached).`
          );
        }
        continue;
      }

      const freqMin = dose.frequencyHours * 60;
      let currentMin = wakeMin;

      // If alternating APAP/ibuprofen, stagger them
      if (hasApapIbu && drug.id === 'ibuprofen') {
        currentMin = wakeMin + 150; // Start ibuprofen 2.5h after APAP
      }

      while (currentMin < sleepMin - 30) {
        // Don't schedule within 30 min of bedtime
        entries.push({
          time: minutesToTime(currentMin),
          drugId: drug.id,
          drugName: drug.genericName,
          dose: dose.amount,
          color: DRUG_COLORS[drug.id] || '#6b7280',
        });
        currentMin += freqMin;
      }
    }

    // Drowsy drugs: schedule at/near bedtime
    for (const drug of drowsyDrugs) {
      const dose = drug.dosing[ageGroup];
      if (!dose) continue;

      if (dose.durationDays && day >= dose.durationDays) {
        continue;
      }

      // Schedule 30 minutes before sleep
      const bedtimeDose = sleepMin - 30;
      entries.push({
        time: minutesToTime(bedtimeDose),
        drugId: drug.id,
        drugName: drug.genericName,
        dose: dose.amount,
        color: DRUG_COLORS[drug.id] || '#6b7280',
        note: 'Bedtime dose (may cause drowsiness)',
      });
    }

    // Sort entries by time
    entries.sort((a, b) => {
      const timeA = parseTimeToMinutes(a.time);
      const timeB = parseTimeToMinutes(b.time);
      return timeA - timeB;
    });

    // Add re-evaluation reminders
    if (day === 2) {
      reminders.push(
        'Day 3: Re-evaluate your symptoms. Are they improving, the same, or worsening?'
      );
    }
    if (day === 6) {
      reminders.push(
        'Day 7: If symptoms persist, consider consulting a healthcare provider.'
      );
    }

    // Add interaction warnings for the day
    for (const interaction of activeInteractions) {
      if (
        entries.some((e) => e.drugId === interaction.drugs[0]) &&
        entries.some((e) => e.drugId === interaction.drugs[1])
      ) {
        if (interaction.spacing) {
          reminders.push(interaction.spacing);
        }
      }
    }

    schedule.push({
      day: day + 1,
      entries,
      reminders,
    });
  }

  return schedule;
}

function parseTimeToMinutes(timeStr: string): number {
  // Parse "7:00 AM" format
  const match = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!match) return 0;
  let h = parseInt(match[1]);
  const m = parseInt(match[2]);
  const period = match[3].toUpperCase();
  if (period === 'PM' && h !== 12) h += 12;
  if (period === 'AM' && h === 12) h = 0;
  return h * 60 + m;
}

export { DRUG_COLORS, minutesToTime, parseTimeToMinutes };
