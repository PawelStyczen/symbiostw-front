export const TYPE_OF_MEETINGS_PATH = "/oferta";
export const NEWS_PATH = "/aktualnosci";
export const SCHEDULE_PATH = "/grafik";
export const ABOUT_US_PATH = "/onas";
export const CONTACT_PATH = "/kontakt";
export const NEW_HERE_PATH = "/jestemTuNowy";

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
