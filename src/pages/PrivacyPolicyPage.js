import React from "react";
import LegalDocumentPage from "../components/LegalDocumentPage";

const LAST_UPDATED = "10 czerwca 2026";

const sections = [
  {
    title: "1. Administrator danych",
    paragraphs: [
      "Administratorem danych osobowych jest podmiot prowadzący serwis internetowy i działalność Szkoły Tańca Symbio pod adresem ul. Ofiar Katynia 37, 37-450 Stalowa Wola. W sprawach związanych z prywatnością możesz skontaktować się z nami pod adresem kontakt@symbiostw.pl lub telefonicznie: 666 617 974.",
    ],
  },
  {
    title: "2. Jakie dane zbieramy",
    paragraphs: [
      "Zakres danych zależy od tego, z jakiej funkcji serwisu korzystasz. W szczególności możemy przetwarzać dane podane przez Ciebie dobrowolnie w formularzach oraz dane techniczne związane z korzystaniem z serwisu.",
    ],
    items: [
      "Przy zgłoszeniu gościa na wydarzenie: imię, nazwisko, adres e-mail, opcjonalnie numer telefonu oraz wybrane zgody marketingowe e-mail lub SMS.",
      "Przy założeniu konta lub aktualizacji profilu, jeśli ta funkcja jest aktywna: imię, nazwisko, miasto, ulica, adres e-mail oraz hasło zapisane i obsługiwane po stronie backendu.",
      "Przy korzystaniu z serwisu: dane o aktywności w serwisie, adres IP, podstawowe logi techniczne, informacje o urządzeniu i przeglądarce oraz identyfikatory zapisane lokalnie w przeglądarce, takie jak token sesji po zalogowaniu lub ustawienie motywu.",
      "Przy korzystaniu z podstrony kampanii /nowy-nabor: informacje o wyświetleniu strony kampanii oraz zdarzeniu Lead po poprawnym wysłaniu formularza, bez przekazywania do Meta treści formularza, imienia, nazwiska, adresu e-mail ani numeru telefonu.",
    ],
  },
  {
    title: "3. Cele i podstawy przetwarzania",
    items: [
      "Obsługa zgłoszeń na wydarzenia, kontakt organizacyjny i realizacja usług dostępnych w serwisie na podstawie art. 6 ust. 1 lit. b RODO.",
      "Prowadzenie korespondencji, obsługa zapytań i zapewnienie bieżącej komunikacji na podstawie art. 6 ust. 1 lit. f RODO, czyli naszego prawnie uzasadnionego interesu.",
      "Wysyłka newslettera lub informacji marketingowych e-mail albo SMS wyłącznie na podstawie udzielonej zgody, czyli art. 6 ust. 1 lit. a RODO.",
      "Pomiar skuteczności kampanii reklamowej na podstronie /nowy-nabor przy użyciu Meta Pixel.",
      "Zapewnienie bezpieczeństwa serwisu, wykrywanie nadużyć, prowadzenie kopii zapasowych i logów technicznych na podstawie art. 6 ust. 1 lit. f RODO.",
      "Wypełnianie obowiązków prawnych, jeśli wynikają z przepisów podatkowych, rachunkowych lub dotyczących dochodzenia roszczeń, na podstawie art. 6 ust. 1 lit. c RODO.",
    ],
  },
  {
    title: "4. Infrastruktura i odbiorcy danych",
    paragraphs: [
      "Serwis korzysta z zaplecza technicznego opartego o Microsoft Azure, w tym Azure Functions i Azure SQL. Dane mogą być powierzane podmiotom wspierającym nas w utrzymaniu hostingu, poczty, infrastruktury IT, analityki oraz komunikacji elektronicznej, wyłącznie w zakresie niezbędnym do realizacji wskazanych celów.",
      "W zakresie pomiaru kampanii odbiorcą danych może być Meta Platforms Ireland Limited jako dostawca narzędzia Meta Pixel.",
      "Jeżeli w przyszłości uruchomimy dodatkowe usługi, na przykład płatności online lub nowe kanały komunikacji, odpowiednie informacje zostaną przekazane w procesie korzystania z danej funkcji lub przez aktualizację niniejszej polityki.",
    ],
  },
  {
    title: "5. Jak długo przechowujemy dane",
    items: [
      "Dane związane ze zgłoszeniem na wydarzenie przechowujemy przez czas potrzebny do obsługi wydarzenia, kontaktu z uczestnikiem oraz przez okres niezbędny do obrony przed roszczeniami.",
      "Dane konta użytkownika przechowujemy przez okres utrzymywania konta, a po jego usunięciu przez czas konieczny do rozliczeń, zabezpieczenia roszczeń i wypełnienia obowiązków prawnych.",
      "Dane przetwarzane na podstawie zgody marketingowej przechowujemy do momentu cofnięcia zgody lub skutecznego wniesienia sprzeciwu.",
      "Logi techniczne i dane bezpieczeństwa przechowujemy przez okres uzasadniony potrzebą zapewnienia bezpieczeństwa oraz stabilności serwisu.",
    ],
  },
  {
    title: "6. Twoje prawa",
    paragraphs: [
      "Masz prawo żądać dostępu do swoich danych, ich sprostowania, usunięcia, ograniczenia przetwarzania, przenoszenia danych oraz wniesienia sprzeciwu wobec przetwarzania opartego na naszym uzasadnionym interesie. Jeżeli przetwarzanie odbywa się na podstawie zgody, możesz ją cofnąć w dowolnym momencie bez wpływu na zgodność z prawem wcześniejszego przetwarzania.",
      "Masz również prawo złożyć skargę do Prezesa Urzędu Ochrony Danych Osobowych.",
    ],
  },
  {
    title: "7. Dobrowolność podania danych",
    paragraphs: [
      "Podanie danych jest dobrowolne, ale w wielu przypadkach konieczne do zapisania się na wydarzenie, utworzenia konta, udzielenia odpowiedzi na wiadomość lub korzystania z określonych funkcji serwisu.",
    ],
  },
  {
    title: "8. Zautomatyzowane podejmowanie decyzji",
    paragraphs: [
      "Na podstawie aktualnej wersji serwisu nie podejmujemy wobec Ciebie decyzji wywołujących skutki prawne wyłącznie w sposób zautomatyzowany, w tym nie stosujemy profilowania w rozumieniu RODO do takich decyzji.",
    ],
  },
  {
    title: "9. Zmiany polityki",
    paragraphs: [
      "Polityka prywatności może być aktualizowana wraz ze zmianami w serwisie, formularzach, procesach biznesowych lub przepisach prawa. Aktualna wersja jest zawsze publikowana na tej stronie wraz z datą ostatniej aktualizacji.",
    ],
  },
];

const PrivacyPolicyPage = () => (
  <LegalDocumentPage
    title="Polityka prywatności"
    updatedAt={LAST_UPDATED}
    intro="Niniejsza polityka opisuje, jak przetwarzamy dane osobowe w serwisie Symbio. Dokument został przygotowany z uwzględnieniem aktualnych funkcji strony, formularzy dostępnych w aplikacji oraz zaplecza technicznego opartego o Microsoft Azure."
    sections={sections}
  />
);

export default PrivacyPolicyPage;
