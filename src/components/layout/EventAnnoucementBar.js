import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCurrentOrNextEvents } from "../../services/eventService";
import MeetingDetailsModal from "../MeetingDetailModal";

const EventAnnouncementBar = () => {
  const { data: events = [] } = useQuery({
    queryKey: ["currentOrNextEvents"],
    queryFn: fetchCurrentOrNextEvents, // ⬅️ max 3
    staleTime: 300000,
  });

  const [selectedEvent, setSelectedEvent] = useState(null);

  if (!events.length) return null;

  const isMobile = window.innerWidth < 768;

  return (
    <>
      {/* BAR */}
      <div
        style={{
          position: "fixed",
          top: "72px",
          left: 0,
          right: 0,
          zIndex: 1020,

          background: "rgba(248, 66, 66, 0.4)",
          backdropFilter: "blur(12px) saturate(160%)",
          WebkitBackdropFilter: "blur(12px) saturate(160%)",

          padding: "6px 0",
          overflowX: "auto",
          display: "flex",
          justifyContent: isMobile ? "flex-start" : "center",

          scrollSnapType: "x mandatory",
          gap: "12px",
        }}
      >
        {events.map((event) => (
          <div
            key={event.id}
            onClick={() => setSelectedEvent(event)}
            style={{
              flex: isMobile ? "0 0 85vw" : "0 0 auto",
              maxWidth: "520px",
              height: "40px",

              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "12px",

              padding: "0 14px",
              marginLeft: isMobile ? "4px" : 0,

              background: "rgba(0, 0, 0, 0.35)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "999px",

              color: "white",
              cursor: "pointer",

              scrollSnapAlign: "center",
              whiteSpace: "nowrap",
            }}
          >
            {/* NAME */}
            <span
              style={{
                fontSize: "0.8rem",
                fontWeight: 600,
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {event.typeOfMeetingName}
            </span>

            {/* DATE */}
            <span
              style={{
                fontSize: "0.75rem",
                opacity: 0.8,
              }}
            >
              {new Date(event.date).toLocaleDateString()}
            </span>
          </div>
        ))}
      </div>

      {/* MOBILE SWIPE HINT */}
      {isMobile && events.length > 1 && (
        <div
          style={{
            position: "fixed",
            top: "116px",
            right: "12px",
            zIndex: 1021,
            fontSize: "0.65rem",
            color: "rgba(255,255,255,0.7)",
          }}
        >
          ⇠ przesuń
        </div>
      )}

      {/* MODAL */}
      {selectedEvent && (
        <MeetingDetailsModal
          show={!!selectedEvent}
          onHide={() => setSelectedEvent(null)}
          meeting={{
            id: selectedEvent.id,
            title: selectedEvent.typeOfMeetingName,
            start: new Date(selectedEvent.date),
            end: new Date(
              new Date(selectedEvent.date).getTime() +
                selectedEvent.duration * 60000
            ),
            imageUrl: selectedEvent.imageUrl,
            price: selectedEvent.price,
            isEvent: true,

            location: selectedEvent.locationName,
            locationCity: selectedEvent.locationCity,
            locationStreet: selectedEvent.locationStreet,
            locationDescription: selectedEvent.locationDescription,

            typeOfMeetingId: selectedEvent.typeOfMeetingId,
            instructorId: selectedEvent.instructorId,
            level: selectedEvent.level,
          }}
        />
      )}
    </>
  );
};

export default EventAnnouncementBar;
