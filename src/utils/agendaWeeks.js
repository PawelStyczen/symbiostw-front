// helpers/agendaWeeks.js
import moment from "moment";

export const groupEventsByIsoWeek = (events) => {
  const map = new Map();

  events.forEach((e) => {
    const m = moment(e.start);
    const key = `${m.isoWeekYear()}-W${String(m.isoWeek()).padStart(2, "0")}`;
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(e);
  });

  // sortuj w tygodniu po czasie
  for (const [k, arr] of map) {
    arr.sort((a, b) => a.start - b.start);
    map.set(k, arr);
  }

  // sortuj tygodnie po kluczu
  return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
};
