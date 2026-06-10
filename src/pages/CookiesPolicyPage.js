import React from "react";
import LegalDocumentPage from "../components/LegalDocumentPage";

const LAST_UPDATED = "10 czerwca 2026";

const sections = [
  {
    title: "1. Czym są cookies i podobne technologie",
    paragraphs: [
      "Cookies to niewielkie pliki tekstowe zapisywane w urządzeniu użytkownika podczas korzystania ze strony internetowej. W praktyce serwis może korzystać także z podobnych technologii, takich jak localStorage, sessionStorage lub inne mechanizmy potrzebne do zapamiętania ustawień i prawidłowego działania strony.",
    ],
  },
  {
    title: "2. Z czego korzysta aktualna wersja serwisu",
    items: [
      "Niezbędne dane lokalne w przeglądarce, w szczególności zapis ustawienia motywu strony oraz danych sesyjnych po zalogowaniu, jeśli funkcja logowania jest aktywna.",
      "Narzędzie analityczne GoatCounter wykorzystywane do tworzenia zagregowanych statystyk odwiedzin. W obecnej integracji narzędzie to nie zapisuje identyfikatorów użytkownika w cookies ani localStorage po stronie przeglądarki.",
      "Meta Pixel wykorzystywany wyłącznie na podstronie kampanii /nowy-nabor, po udzieleniu zgody marketingowej, do pomiaru wyświetlenia strony kampanii oraz zdarzenia Lead po poprawnym wysłaniu formularza.",
      "Standardowe dane techniczne przekazywane w żądaniach HTTP, takie jak adres IP, informacje o przeglądarce czy adres odwiedzanej podstrony, które mogą trafiać do logów serwera lub narzędzi bezpieczeństwa.",
    ],
  },
  {
    title: "3. W jakim celu używamy tych technologii",
    items: [
      "Zapewnienie prawidłowego działania serwisu i utrzymanie sesji użytkownika.",
      "Zapamiętanie ustawień interfejsu, na przykład wybranego motywu.",
      "Tworzenie statystyk odwiedzin i ocena działania strony w ujęciu zbiorczym.",
      "Pomiar skuteczności kampanii reklamowej prowadzącej do formularza na podstronie /nowy-nabor, jeśli użytkownik wyraził zgodę marketingową.",
      "Zapewnienie bezpieczeństwa, stabilności i wykrywanie nadużyć.",
    ],
  },
  {
    title: "4. Zakres narzędzi marketingowych",
    paragraphs: [
      "Meta Pixel jest ograniczony do podstrony kampanii /nowy-nabor i nie jest uruchamiany na pozostałych podstronach serwisu. Pixel nie uruchamia się bez zgody marketingowej zapisanej w bannerze cookies.",
    ],
  },
  {
    title: "5. Zarządzanie ustawieniami",
    paragraphs: [
      "Możesz samodzielnie zarządzać cookies i danymi lokalnymi w ustawieniach swojej przeglądarki, w tym je usuwać, blokować albo ograniczać ich działanie. Pamiętaj jednak, że wyłączenie części niezbędnych mechanizmów może wpłynąć na poprawne działanie serwisu, w szczególności funkcji logowania i zapamiętywania ustawień.",
    ],
  },
  {
    title: "6. Odnośniki do serwisów zewnętrznych",
    paragraphs: [
      "Strona zawiera odnośniki do zewnętrznych serwisów społecznościowych, takich jak Facebook, Instagram i TikTok. Po przejściu do tych serwisów obowiązują ich własne zasady prywatności i cookies, na które nie mamy wpływu.",
    ],
  },
  {
    title: "7. Zmiany polityki cookies",
    paragraphs: [
      "Polityka cookies może być aktualizowana wraz ze zmianą funkcji serwisu, wykorzystywanych narzędzi lub obowiązujących przepisów. Aktualna wersja jest zawsze dostępna na tej stronie.",
    ],
  },
];

const CookiesPolicyPage = () => (
  <LegalDocumentPage
    title="Polityka cookies"
    updatedAt={LAST_UPDATED}
    intro="Ta polityka wyjaśnia, jakie pliki cookies i podobne technologie mogą być używane w serwisie Symbio oraz w jakim celu to robimy. Dokument został dopasowany do obecnej implementacji frontendu i znanych elementów zaplecza technicznego."
    sections={sections}
  />
);

export default CookiesPolicyPage;
