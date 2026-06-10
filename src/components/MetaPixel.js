import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { NEW_RECRUITMENT_PATH } from "../utils/contentRoutes";
import { trackMetaPageView } from "../utils/metaPixel";

const MetaPixel = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== NEW_RECRUITMENT_PATH) {
      return;
    }

    trackMetaPageView(`${location.pathname}${location.search}`);
  }, [location.pathname, location.search]);

  return null;
};

export default MetaPixel;
