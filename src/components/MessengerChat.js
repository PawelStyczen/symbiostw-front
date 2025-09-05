import React, { useEffect } from "react";

const MessengerChat = ({
  pageId,
  locale = "en_US", // użyj polskiego
  themeColor = "#9F5965",
  loggedInGreeting = "Cześć! Jak możemy pomóc?",
  loggedOutGreeting = "Cześć! Napisz do nas tutaj.",
}) => {
  useEffect(() => {
    if (document.getElementById("fb-customerchat-sdk")) return;

    const fbRoot = document.getElementById("fb-root");
    if (!fbRoot) {
      const root = document.createElement("div");
      root.id = "fb-root";
      document.body.appendChild(root);
    }

    window.fbAsyncInit = function () {
      window.FB.init({
        xfbml: true,
        version: "v18.0",
      });
    };

    const script = document.createElement("script");
    script.id = "fb-customerchat-sdk";
    script.src = `https://connect.facebook.net/${locale}/sdk/xfbml.customerchat.js`;
    script.async = true;
    document.body.appendChild(script);
  }, [locale]);

  return (
    <div
      className="fb-customerchat"
      attribution="biz_inbox"
      page_id={pageId}
      theme_color={themeColor}
      logged_in_greeting={loggedInGreeting}
      logged_out_greeting={loggedOutGreeting}
    />
  );
};

export default MessengerChat;
