import { useState, useMemo } from 'react';
import type { Drug, AgeGroup, DaySchedule } from '../types';
import { buildSchedule, DRUG_COLORS, parseTimeToMinutes } from '../utils/schedule';

interface Props {
  drugs: Drug[];
  ageGroup: AgeGroup;
  wakeTime: string;
  sleepTime: string;
  onWakeTimeChange: (time: string) => void;
  onSleepTimeChange: (time: string) => void;
  onNext: () => void;
  onBack: () => void;
}

function TimelineBar({
  schedule,
  wakeTime,
  sleepTime,
}: {
  schedule: DaySchedule;
  wakeTime: string;
  sleepTime: string;
}) {
  const wakeMin = timeToMinutes24(wakeTime);
  let sleepMin = timeToMinutes24(sleepTime);
  if (sleepMin <= wakeMin) sleepMin += 24 * 60;
  const totalMin = sleepMin - wakeMin;

  return (
    <div className="relative h-12 bg-gray-100 rounded-lg overflow-hidden">
      {/* Time labels */}
      <div className="absolute inset-0 flex items-end px-1 pb-0.5">
        <span className="text-[10px] text-gray-400">{formatTime24(wakeTime)}</span>
        <span className="text-[10px] text-gray-400 ml-auto">{formatTime24(sleepTime)}</span>
      </div>

      {/* Dose markers */}
      {schedule.entries.map((entry, i) => {
        const entryMin = parseTimeToMinutes(entry.time);
        const pos = ((entryMin - wakeMin) / totalMin) * 100;
        return (
          <div
            key={i}
            className="absolute top-1 w-3 h-7 rounded-sm"
            style={{
              left: `${Math.min(Math.max(pos, 1), 97)}%`,
              backgroundColor: entry.color,
              opacity: 0.85,
            }}
            title={`${entry.time} — ${entry.drugName} ${entry.dose}`}
          />
        );
      })}
    </div>
  );
}

function formatTime24(t: string): string {
  const [h, m] = t.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const hour12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${hour12}:${m.toString().padStart(2, '0')} ${period}`;
}

function timeToMinutes24(t: string): number {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
}

export function Schedule({
  drugs,
  ageGroup,
  wakeTime,
  sleepTime,
  onWakeTimeChange,
  onSleepTimeChange,
  onNext,
  onBack,
}: Props) {
  const [selectedDay, setSelectedDay] = useState(0);
  const [view, setView] = useState<'list' | 'timeline'>('list');

  const schedule = useMemo(
    () => buildSchedule(drugs, ageGroup, wakeTime, sleepTime),
    [drugs, ageGroup, wakeTime, sleepTime]
  );

  const daySchedule = schedule[selectedDay];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl font-bold text-gray-900">Dosing Schedule</h2>
        <button
          onClick={handlePrint}
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg transition-colors print:hidden"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z" />
          </svg>
          Print
        </button>
      </div>

      <p className="text-gray-500 mb-4">
        Your personalized 7-day dosing plan. Adjust wake and sleep times to fit
        your routine.
      </p>

      {/* Time settings */}
      <div className="flex gap-4 mb-6 print:hidden">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Wake time
          </label>
          <input
            type="time"
            value={wakeTime}
            onChange={(e) => onWakeTimeChange(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Sleep time
          </label>
          <input
            type="time"
            value={sleepTime}
            onChange={(e) => onSleepTimeChange(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Drug legend */}
      <div className="flex flex-wrap gap-2 mb-4">
        {drugs.map((drug) => (
          <span
            key={drug.id}
            className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium text-white"
            style={{ backgroundColor: DRUG_COLORS[drug.id] || '#6b7280' }}
          >
            <span
              className="w-2 h-2 rounded-full bg-white/40"
            />
            {drug.genericName.split(' (')[0]}
          </span>
        ))}
      </div>

      {/* View toggle */}
      <div className="flex gap-1 bg-gray-100 rounded-lg p-1 mb-4 print:hidden">
        <button
          onClick={() => setView('list')}
          className={`flex-1 py-1.5 rounded-md text-sm font-medium transition-colors ${
            view === 'list'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Day-by-Day
        </button>
        <button
          onClick={() => setView('timeline')}
          className={`flex-1 py-1.5 rounded-md text-sm font-medium transition-colors ${
            view === 'timeline'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Timeline
        </button>
      </div>

      {/* Day selector */}
      <div className="flex gap-1 mb-4 overflow-x-auto pb-1">
        {schedule.map((day, i) => (
          <button
            key={i}
            onClick={() => setSelectedDay(i)}
            className={`
              shrink-0 px-3 py-2 rounded-lg text-sm font-medium transition-colors
              ${
                selectedDay === i
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }
            `}
          >
            Day {day.day}
          </button>
        ))}
      </div>

      {/* Timeline view */}
      {view === 'timeline' && daySchedule && (
        <div className="mb-6">
          <TimelineBar
            schedule={daySchedule}
            wakeTime={wakeTime}
            sleepTime={sleepTime}
          />
          <div className="mt-3 space-y-1">
            {daySchedule.entries.map((entry, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <div
                  className="w-3 h-3 rounded-sm shrink-0"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="font-mono text-gray-500 w-20 shrink-0">
                  {entry.time}
                </span>
                <span className="text-gray-700">
                  {entry.drugName} — {entry.dose}
                </span>
                {entry.note && (
                  <span className="text-xs text-purple-600 ml-auto">
                    {entry.note}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* List view */}
      {view === 'list' && daySchedule && (
        <div className="mb-6 space-y-2">
          {daySchedule.entries.map((entry, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-200"
            >
              <div
                className="w-1.5 h-10 rounded-full shrink-0"
                style={{ backgroundColor: entry.color }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-semibold text-gray-900">
                    {entry.time}
                  </span>
                  {entry.note && (
                    <span className="text-xs text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">
                      {entry.note}
                    </span>
                  )}
                </div>
                <div className="text-sm text-gray-600">
                  {entry.drugName} — {entry.dose}
                </div>
              </div>
            </div>
          ))}

          {daySchedule.entries.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              No medications scheduled for this day.
            </div>
          )}
        </div>
      )}

      {/* Reminders */}
      {daySchedule && daySchedule.reminders.length > 0 && (
        <div className="space-y-2 mb-6">
          {daySchedule.reminders.map((reminder, i) => (
            <div
              key={i}
              className="flex items-start gap-2 p-3 rounded-xl bg-blue-50 border border-blue-200 text-sm text-blue-800"
            >
              <svg className="w-5 h-5 shrink-0 mt-0.5 text-blue-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
              </svg>
              {reminder}
            </div>
          ))}
        </div>
      )}

      {/* Print-only: full schedule */}
      <div className="hidden print:block">
        <h3 className="text-lg font-bold mb-4">Full 7-Day Schedule</h3>
        {schedule.map((day) => (
          <div key={day.day} className="mb-4 break-inside-avoid">
            <h4 className="font-semibold text-gray-900 mb-1">
              Day {day.day}
            </h4>
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-1 pr-4">Time</th>
                  <th className="text-left py-1 pr-4">Drug</th>
                  <th className="text-left py-1">Dose</th>
                </tr>
              </thead>
              <tbody>
                {day.entries.map((entry, i) => (
                  <tr key={i} className="border-b border-gray-100">
                    <td className="py-1 pr-4 font-mono">{entry.time}</td>
                    <td className="py-1 pr-4">{entry.drugName}</td>
                    <td className="py-1">{entry.dose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {day.reminders.length > 0 && (
              <ul className="mt-1 text-xs text-gray-500">
                {day.reminders.map((r, i) => (
                  <li key={i}>* {r}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-3 print:hidden">
        <button
          onClick={onBack}
          className="flex-1 py-3 rounded-xl font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="flex-[2] py-3 rounded-xl font-semibold text-lg bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200 transition-colors"
        >
          View Cost Comparison
        </button>
      </div>
    </div>
  );
}
