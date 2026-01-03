import React, { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/pl";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useQuery } from "@tanstack/react-query";
import { fetchMeetings } from "../services/meetingService";
import MeetingDetailsModal from "./MeetingDetailModal";
import SkillLevelBadge from "../components/SkillLevelBadge";
import Tag from "../components/Tag";
import { Offcanvas, Button } from "react-bootstrap";

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
      return "#ffffffff";
    case "SP Ulanów":
    case "Ulanow":
      return "#92c0f4ff";
    case "Tarnobrzeg":
      return "#bff6edff";
    default:
      return "grey";
  }
};

const CalendarView = () => {
  const isMobile = window.innerWidth <= 768;

  const [showFilters, setShowFilters] = useState(false);

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

  const { data: meetings = [] } = useQuery({
    queryKey: ["calendarData"],
    queryFn: fetchMeetings,
    staleTime: 300000,
  });

  const allTypes = useMemo(() => {
    const nonEventTypes = meetings
      .filter((m) => !m.isEvent) // 👈 tylko nie-eventy
      .map((m) => m.typeOfMeetingName);

    return [...new Set(nonEventTypes)];
  }, [meetings]);
  const allInstructors = useMemo(
    () => [...new Set(meetings.map((m) => m.instructorName))],
    [meetings]
  );
  const allLocations = useMemo(
    () => [...new Set(meetings.map((m) => m.locationName))],
    [meetings]
  );

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

  const hasActiveFilters = useMemo(() => {
    return (
      selectedTypes.length > 0 ||
      selectedInstructors.length > 0 ||
      selectedLocations.length > 0 ||
      soloOnly
    );
  }, [selectedTypes, selectedInstructors, selectedLocations, soloOnly]);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    count += selectedTypes.length;
    count += selectedInstructors.length;
    count += selectedLocations.length;
    if (soloOnly) count += 1;
    return count;
  }, [selectedTypes, selectedInstructors, selectedLocations, soloOnly]);

  const filteredMeetings = useMemo(() => {
    return meetings.filter((m) => {
      const matchType =
        selectedTypes.length === 0 ||
        selectedTypes.includes(m.typeOfMeetingName);

      const matchInstructor =
        selectedInstructors.length === 0 ||
        selectedInstructors.includes(m.instructorName);

      const matchLocation =
        selectedLocations.length === 0 ||
        selectedLocations.includes(m.locationName);

      const matchSolo = !soloOnly || m.isSolo;

      return matchType && matchInstructor && matchLocation && matchSolo;
    });
  }, [
    meetings,
    selectedTypes,
    selectedInstructors,
    selectedLocations,
    soloOnly,
  ]);

  const events = useMemo(() => {
    return filteredMeetings.map((meeting) => ({
      title: meeting.typeOfMeetingName,
      start: new Date(meeting.date),
      end: new Date(
        new Date(meeting.date).getTime() + meeting.duration * 60000
      ),
      id: meeting.id,
      level: meeting.level,
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
      isEvent: meeting.isEvent,
    }));
  }, [filteredMeetings]);

  const handleEventClick = (event) => {
    setSelectedMeeting(event);
    setModalShow(true);
  };

  const EventWithLevel = ({ event }) => (
    <span
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        flexWrap: "wrap",
      }}
    >
      <strong>{event.title}</strong>

      {event.isEvent && <Tag type="event" />}
      {event.isIndividual && <Tag type="individual" />}
      {event.isSolo && <Tag type="solo" />}

      {event.level !== null && event.level !== undefined && (
        <SkillLevelBadge value={event.level} size="sm" />
      )}
    </span>
  );

  const Legend = () => (
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
        />
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
        />
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
        />
        <span>Dostępne</span>
      </div>
    </div>
  );

  return (
    <div>
      {/* Legenda może zostać zawsze */}
      <div style={{ marginBottom: "12px" }}>
        <Legend />
      </div>

      {/* Floating Filters Button (desktop + mobile) */}
      <button
        onClick={() => setShowFilters(true)}
        aria-label="Otwórz filtry"
        style={{
          position: "fixed",
          right: "14px",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 1030,
          border: hasActiveFilters
            ? "1px solid rgba(182,79,102,0.6)"
            : "1px solid rgba(255,255,255,0.25)",
          background: hasActiveFilters
            ? "rgba(180,79,102,0.75)"
            : "rgba(0,0,0,0.55)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          color: "white",
          borderRadius: "999px",
          padding: "10px 12px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          fontWeight: 700,
          boxShadow: hasActiveFilters
            ? "0 10px 30px rgba(180,79,102,0.25)"
            : "0 10px 30px rgba(0,0,0,0.25)",
          cursor: "pointer",
        }}
      >
        <span style={{ fontSize: "16px", lineHeight: 1 }}>⚙️</span>

        <span
          style={{
            fontSize: "12px",
            letterSpacing: "0.3px",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}
        >
          Filtry
        </span>

        {/* Badge z liczbą aktywnych filtrów */}
        {hasActiveFilters && (
          <span
            style={{
              marginLeft: "2px",
              minWidth: "18px",
              height: "18px",
              borderRadius: "999px",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 6px",
              fontSize: "11px",
              fontWeight: 800,
              backgroundColor: "rgba(0,0,0,0.35)",
              border: "1px solid rgba(255,255,255,0.25)",
            }}
          >
            {activeFiltersCount}
          </span>
        )}
      </button>

      {/* Offcanvas Filters (desktop + mobile) */}
      <Offcanvas
        show={showFilters}
        onHide={() => setShowFilters(false)}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filtry</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {/* Rodzaje */}
          <div className="mb-3">
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
                    style={pillStyle(isActive, type)}
                  >
                    {type}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Solo */}
          <div className="mb-3">
            <strong>Filtry:</strong>
            <div
              style={{ marginTop: "0.5rem", display: "flex", flexWrap: "wrap" }}
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

          {/* Lokalizacje */}
          <div className="mb-3">
            <strong>Lokalizacje:</strong>
            <div
              style={{ marginTop: "0.5rem", display: "flex", flexWrap: "wrap" }}
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

          {/* Instruktorzy */}
          <div className="mb-3">
            <strong>Prowadzący:</strong>
            <div
              style={{ marginTop: "0.5rem", display: "flex", flexWrap: "wrap" }}
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

          {/* Akcje */}
          <div style={{ display: "flex", gap: "10px" }}>
            <Button
              variant="secondary"
              onClick={() => {
                setSelectedTypes([]);
                setSelectedInstructors([]);
                setSelectedLocations([]);
                setSoloOnly(false);
              }}
              style={{ borderRadius: "999px" }}
            >
              Wyczyść
            </Button>

            <Button
              variant="dark"
              onClick={() => setShowFilters(false)}
              style={{ borderRadius: "999px", marginLeft: "auto" }}
            >
              Zamknij
            </Button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Calendar */}
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
          timeGutterFormat: (date, culture, loc) =>
            loc.format(date, "HH:mm", culture),
          eventTimeRangeFormat: ({ start, end }, culture, loc) =>
            `${loc.format(start, "HH:mm", culture)} – ${loc.format(
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
              border: "1px solid grey",
              fontSize: isMobile ? "0.4rem" : "0.6rem",
              borderRadius: "5px",
              padding: isMobile ? "2px" : "10px",
            },
          };
        }}
        components={{
          event: EventWithLevel,
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
