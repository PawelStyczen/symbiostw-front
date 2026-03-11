import React from "react";
import moment from "moment";
import WeeklyAgendaView from "../components/WeeklyAgendaView";

export default function WeeklyAgendaRBCView(props) {
  // RBC przekaże m.in.: date, events, onSelectEvent
  return (
    <WeeklyAgendaView
      date={props.date}
      events={props.events}
      onSelectEvent={props.onSelectEvent}
    />
  );
}

/**
 * Zakres renderowania widoku (RBC używa tego do nawigacji i filtrowania)
 * Tu: ISO tydzień (pon–niedz)
 */
WeeklyAgendaRBCView.range = (date) => {
  const start = moment(date).startOf("isoWeek").toDate();
  const end = moment(date).endOf("isoWeek").toDate();
  return [start, end];
};

/**
 * Obsługa toolbar PREV/NEXT/TODAY
 */
WeeklyAgendaRBCView.navigate = (date, action) => {
  switch (action) {
    case "PREV":
      return moment(date).subtract(1, "week").toDate();
    case "NEXT":
      return moment(date).add(1, "week").toDate();
    case "TODAY":
      return new Date();
    default:
      return date;
  }
};

/**
 * Tytuł w toolbarze
 */
WeeklyAgendaRBCView.title = (date) => {
  const start = moment(date).startOf("isoWeek");
  const end = moment(date).endOf("isoWeek");
  return `Tydzień: ${start.format("DD.MM")} – ${end.format("DD.MM")}`;
};
