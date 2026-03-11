import moment from "moment";

export const weeklyAgendaRange = (date) => {
  const start = moment(date).startOf("isoWeek").toDate();
  const end = moment(date).endOf("isoWeek").toDate();
  return [start, end];
};

export const weeklyAgendaNavigate = (date, action) => {
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

export const weeklyAgendaTitle = (date) => {
  const start = moment(date).startOf("isoWeek");
  const end = moment(date).endOf("isoWeek");
  return `Tydzień: ${start.format("DD.MM")} – ${end.format("DD.MM")}`;
};
