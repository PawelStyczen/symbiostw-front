export const TYPE_OF_MEETINGS_PATH = "/oferta";
export const NEWS_PATH = "/aktualnosci";
export const SCHEDULE_PATH = "/grafik";
export const ABOUT_US_PATH = "/onas";
export const CONTACT_PATH = "/kontakt";
export const NEW_HERE_PATH = "/jestemTuNowy";
export const MEETING_DETAIL_PATH_SEGMENT = "spotkanie";
export const MEETING_DETAIL_BASE_PATH = `${SCHEDULE_PATH}/${MEETING_DETAIL_PATH_SEGMENT}`;

export const slugify = (value = "") =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const getTypeOfMeetingSlug = (meeting) => slugify(meeting?.name);

export const getTypeOfMeetingPath = (meeting) =>
  `${TYPE_OF_MEETINGS_PATH}/${getTypeOfMeetingSlug(meeting)}`;

export const getNewsArticleSlug = (article) => slugify(article?.title);

export const getNewsArticlePath = (article) =>
  `${NEWS_PATH}/${getNewsArticleSlug(article)}`;

const formatMeetingDateForSlug = (meeting) => {
  const rawDate = meeting?.date || meeting?.start;

  if (!rawDate) {
    return "";
  }

  const date = new Date(rawDate);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toISOString().slice(0, 10);
};

export const getMeetingDetailSlug = (meeting) => {
  const title = slugify(
    meeting?.typeOfMeetingName || meeting?.name || meeting?.title || "spotkanie"
  );
  const datePart = formatMeetingDateForSlug(meeting);
  const idPart = String(meeting?.id || "").trim();

  return [title, datePart, idPart].filter(Boolean).join("-");
};

export const getMeetingIdFromSlug = (slug = "") => {
  const parts = String(slug).split("-").filter(Boolean);
  return parts.at(-1) || "";
};

export const getMeetingDetailPath = (meeting) =>
  `${MEETING_DETAIL_BASE_PATH}/${getMeetingDetailSlug(meeting)}`;
