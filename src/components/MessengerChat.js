import React, { useEffect } from "react";

const loadFbSdk = (locale = "en_US") => {
  if (document.getElementById("fb-customerchat-sdk")) return;

  // fb-root container (required)
  if (!document.getElementById("fb-root")) {
    const root = document.createElement("div");
    root.id = "fb-root";
    document.body.appendChild(root);
  }

  // load SDK
  const script = document.createElement("script");
  script.id = "fb-customerchat-sdk";
  script.src = `https://connect.facebook.net/${locale}/sdk/xfbml.customerchat.js`;
  script.async = true;
  document.body.appendChild(script);

  // init once SDK loads
  window.fbAsyncInit = function () {
    if (window.FB) {
      window.FB.init({
        xfbml: true,
        version: "v18.0",
      });
    }
  };
};

const MessengerChat = ({
  pageId,
  locale = "pl_PL", // change to your preferred locale
  themeColor = "#0084FF",
  loggedInGreeting = "Cześć! Jak możemy pomóc?",
  loggedOutGreeting = "Cześć! Napisz do nas tutaj.",
}) => {
  useEffect(() => {
    loadFbSdk(locale);
  }, [locale]);

  // Render the customer chat plugin node
  return (
    <div
      className="fb-customerchat"
      attribution="biz_inbox"
      page_id={pageId}
      theme_color={themeColor}
      logged_in_greeting={loggedInGreeting}
      logged_out_greeting={loggedOutGreeting}
      greeting_dialog_display="fade" // optional
    />
  );
};

export default MessengerChat;
