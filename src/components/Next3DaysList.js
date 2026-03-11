import React, { useMemo } from "react";

const startOfDay = (d) =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0);
const endOfDay = (d) =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59);

const fmtDayHeader = (d) =>
  d.toLocaleDateString("pl-PL", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  });

const fmtTime = (d) =>
  d.toLocaleTimeString("pl-PL", { hour: "2-digit", minute: "2-digit" });

const Next3DaysList = ({ meetings = [], onSelect }) => {
  const days = useMemo(() => {
    const base = new Date();
    return [0, 1, 2].map((i) => {
      const d = new Date(base);
      d.setDate(base.getDate() + i);
      return d;
    });
  }, []);

  const grouped = useMemo(() => {
    return days.map((day) => {
      const from = startOfDay(day);
      const to = endOfDay(day);

      const items = meetings
        .filter((m) => {
          const dt = new Date(m.date);
          return dt >= from && dt <= to;
        })
        .sort((a, b) => new Date(a.date) - new Date(b.date));

      return { day, items };
    });
  }, [days, meetings]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {grouped.map(({ day, items }) => (
        <div key={day.toISOString()}>
          <div style={{ fontWeight: 800, marginBottom: 8, fontSize: 14 }}>
            {fmtDayHeader(day)}
          </div>

          {items.length === 0 ? (
            <div style={{ opacity: 0.7, fontSize: 13 }}>Brak zajęć</div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {items.map((m) => {
                const start = new Date(m.date);
                const end = new Date(start.getTime() + m.duration * 60000);
                return (
                  <button
                    key={m.id}
                    onClick={() => onSelect?.(m)}
                    style={{
                      textAlign: "left",
                      border: "1px solid rgba(0,0,0,0.1)",
                      borderRadius: 14,
                      padding: "10px 12px",
                      background: "rgba(255,255,255,0.85)",
                      backdropFilter: "blur(8px)",
                      WebkitBackdropFilter: "blur(8px)",
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 10,
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                      }}
                    >
                      <div style={{ fontWeight: 800, fontSize: 13 }}>
                        {m.typeOfMeetingName}
                      </div>
                      <div style={{ fontSize: 12, opacity: 0.8 }}>
                        {m.locationName}
                      </div>
                    </div>

                    <div
                      style={{
                        fontWeight: 800,
                        fontSize: 12,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {fmtTime(start)}–{fmtTime(end)}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Next3DaysList;
