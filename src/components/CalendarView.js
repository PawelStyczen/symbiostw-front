import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/pl";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useQuery } from "@tanstack/react-query";
import { fetchMeetings } from "../services/meetingService";
import MeetingDetailsModal from "./MeetingDetailModal";
import SkillLevelBadge from "../components/SkillLevelBadge"; // 👈 import the pill

const localizer = momentLocalizer(moment);

// Style generator for toggle pills
const pillStyle = (active, type) => {
  const isIndividualType = type === "Indywidualne spotkanie | wolne miejsce";
  return {
    cursor: "pointer",
    padding: "6px 12px",
    borderRadius: "50px",
    backgroundColor: active
      ? isIndividualType
        ? "#81D4FA"
        : "#B44F66"
      : "#e0e0e0",
    color: active ? (isIndividualType ? "black" : "white") : "black",
    opacity: active ? 1 : 0.6,
    border: "none",
    marginRight: "0.5rem",
    marginBottom: "0.5rem",
    fontSize: "0.9rem",
    transition: "all 0.2s",
  };
};

const getLocationBorderColor = (locationName) => {
  switch (locationName) {
    case "Szkoła tańca Symbio":
      return "#ffffffff"; // zielony
    case "SP Ulanów":
    case "Ulanow": // zostaw obie wersje albo tylko tę której używasz
      return "#92c0f4ff"; // niebieski
    case "Tarnobrzeg":
      return "#bff6edff"; // ciemny teal
    default:
      return "grey"; // fallback
  }
};

const CalendarView = () => {
  const location = useLocation();
  const preselectedType = location.state?.type;
  const preselectedInstructors = location.state?.instructorName;

  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [modalShow, setModalShow] = useState(false);

  const [selectedTypes, setSelectedTypes] = useState(
    preselectedType ? [preselectedType] : []
  );
  const [selectedInstructors, setSelectedInstructors] = useState(
    preselectedInstructors ? [preselectedInstructors] : []
  );
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [soloOnly, setSoloOnly] = useState(false);

  const toggleType = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };
  const toggleInstructor = (instructor) => {
    setSelectedInstructors((prev) =>
      prev.includes(instructor)
        ? prev.filter((i) => i !== instructor)
        : [...prev, instructor]
    );
  };

  const toggleLocation = (locationName) => {
    setSelectedLocations((prev) =>
      prev.includes(locationName)
        ? prev.filter((loc) => loc !== locationName)
        : [...prev, locationName]
    );
  };

  const { data: meetings = [] } = useQuery({
    queryKey: ["calendarData"],
    queryFn: fetchMeetings,
    staleTime: 300000,
  });

  const allTypes = [...new Set(meetings.map((m) => m.typeOfMeetingName))];
  const allInstructors = [...new Set(meetings.map((m) => m.instructorName))];
  const allLocations = [...new Set(meetings.map((m) => m.locationName))];

  const filteredMeetings = meetings.filter((m) => {
    const matchType =
      selectedTypes.length === 0 || selectedTypes.includes(m.typeOfMeetingName);

    const matchInstructor =
      selectedInstructors.length === 0 ||
      selectedInstructors.includes(m.instructorName);

    const matchLocation =
      selectedLocations.length === 0 ||
      selectedLocations.includes(m.locationName); // or m.locationCity

    const matchSolo = !soloOnly || m.isSolo;

    return matchType && matchInstructor && matchLocation && matchSolo;
  });

  // Map to events: title = type only; keep level & flags on the event
  const events = filteredMeetings.map((meeting) => ({
    title: meeting.typeOfMeetingName,
    start: new Date(meeting.date),
    end: new Date(new Date(meeting.date).getTime() + meeting.duration * 60000),
    id: meeting.id,
    level: meeting.level, // 👈 numeric or null
    isIndividual: meeting.isIndividual,
    isSolo: meeting.isSolo,
    imageUrl: meeting.imageUrl,
    location: meeting.locationName,
    locationCity: meeting.locationCity,
    locationStreet: meeting.locationStreet,
    locationDescription: meeting.locationDescription,
    instructor: meeting.instructorName,
    price: meeting.price,
    typeOfMeetingId: meeting.typeOfMeetingId,
    instructorId: meeting.instructorId,
  }));

  const handleEventClick = (event) => {
    setSelectedMeeting(event);
    setModalShow(true);
  };

  // Custom renderer: type name + level pill (no instructor name)
  const EventWithLevel = ({ event }) => (
    <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <strong>{event.title}</strong>
      {event.level !== null && event.level !== undefined && (
        <SkillLevelBadge value={event.level} size="sm" />
      )}
    </span>
  );

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          marginBottom: "20px",
          gap: "1rem",
        }}
      >
        {/* 🔵 Legend */}

        <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <div
              style={{
                width: "20px",
                height: "20px",
                backgroundColor: "#81D4FA",
                border: "1px solid grey",
                borderRadius: "5px",
              }}
            ></div>
            <span>Indywidualne spotkanie | wolne miejsce</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <div
              style={{
                width: "20px",
                height: "20px",
                backgroundColor: "#B0BEC5",
                border: "1px solid grey",
                borderRadius: "5px",
              }}
            ></div>
            <span>Przeszłe</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <div
              style={{
                width: "20px",
                height: "20px",
                backgroundColor: "white",
                border: "1px solid grey",
                borderRadius: "5px",
              }}
            ></div>
            <span>Dostępne</span>
          </div>
        </div>

        {/* 🟢 Filters */}
        <div style={{ minWidth: "300px" }}>
          <div className="mb-2">
            <strong>Rodzaje spotkań:</strong>
            <div
              style={{ marginTop: "0.5rem", display: "flex", flexWrap: "wrap" }}
            >
              {allTypes.map((type) => {
                const isActive = selectedTypes.includes(type);
                return (
                  <button
                    key={type}
                    onClick={() => toggleType(type)}
                    style={pillStyle(isActive, type)} // 👈 dodaj typ jako drugi argument
                  >
                    {type}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="me-3 d-flex flex-row align-items-center">
            <div className="me-3 d-flex flex-row align-items-center">
              <strong>Filtry:</strong>
              <div
                style={{
                  marginTop: "0.5rem",
                  display: "flex",
                  flexWrap: "wrap",
                }}
              >
                <button
                  onClick={() => setSoloOnly((prev) => !prev)}
                  style={{
                    ...pillStyle(soloOnly),
                    backgroundColor: soloOnly ? "#6A1B9A" : "#e0e0e0",
                    color: soloOnly ? "white" : "black",
                  }}
                >
                  Solo
                </button>
              </div>
            </div>
            <div className="me-3 d-flex flex-row align-items-center">
              <strong>Lokalizacje:</strong>
              <div
                style={{
                  marginTop: "0.5rem",
                  display: "flex",
                  flexWrap: "wrap",
                }}
              >
                {allLocations.map((loc) => {
                  const isActive = selectedLocations.includes(loc);
                  return (
                    <button
                      key={loc}
                      onClick={() => toggleLocation(loc)}
                      style={{
                        ...pillStyle(isActive),
                        border: `6px solid ${getLocationBorderColor(loc)}`,
                      }}
                    >
                      {loc}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="me-3 d-flex flex-row align-items-center">
              <strong>Prowadzący:</strong>
              <div
                style={{
                  marginTop: "0.5rem",
                  display: "flex",
                  flexWrap: "wrap",
                }}
              >
                {allInstructors.map((instructor) => {
                  const isActive = selectedInstructors.includes(instructor);
                  return (
                    <button
                      key={instructor}
                      onClick={() => toggleInstructor(instructor)}
                      style={pillStyle(isActive)}
                    >
                      {instructor}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultView="week"
        style={{ height: "80vh" }}
        min={new Date(1970, 1, 1, 10, 0)}
        max={new Date(1970, 1, 1, 22, 0)}
        onSelectEvent={handleEventClick}
        formats={{
          timeGutterFormat: (date, culture, localizer) =>
            localizer.format(date, "HH:mm", culture),
          eventTimeRangeFormat: ({ start, end }, culture, localizer) =>
            `${localizer.format(start, "HH:mm", culture)} – ${localizer.format(
              end,
              "HH:mm",
              culture
            )}`,
        }}
        messages={{
          today: "Dzisiaj",
          previous: "Poprzedni",
          next: "Następny",
          month: "Miesiąc",
          week: "Tydzień",
          day: "Dzień",
          agenda: "Agenda",
          date: "Data",
          time: "Godzina",
          event: "Wydarzenie",
          noEventsInRange: "Brak wydarzeń w tym okresie",
          showMore: (total) => `+${total} więcej`,
        }}
        eventPropGetter={(event) => {
          const isPast = event.start < new Date();
          const isIndividualSpot = event.isIndividual;
          const isMobile = window.innerWidth <= 768;

          let backgroundColor = "white";
          let color = "black";

          if (isPast) {
            backgroundColor = "#B0BEC5";
            color = "#757575";
          } else if (isIndividualSpot) {
            backgroundColor = "#81D4FA";
            color = "#000";
          }

          const locationBorderColor = getLocationBorderColor(event.location);

          return {
            style: {
              backgroundColor: `${locationBorderColor}`,
              color,
              border: `1px  solid grey`, // 👈 tu magia
              fontSize: isMobile ? "0.4rem" : "0.6rem",
              borderRadius: "5px",
              padding: isMobile ? "2px" : "10px",
            },
          };
        }}
        components={{
          event: EventWithLevel, // 👈 render pill instead of instructor name
        }}
      />

      {/* Modal */}
      {selectedMeeting && (
        <MeetingDetailsModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          meeting={selectedMeeting}
        />
      )}
    </div>
  );
};

export default CalendarView;
