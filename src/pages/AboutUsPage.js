import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchInstructors } from "../services/instructorService";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import {
  StyledCard,
  StyledButton,
  StyledTitle,
  StyledContainer,
  StyledSubTitle,
} from "../components/StyledComponents";
import styled from "styled-components";
import InstructorDetailsModal from "../components/InstructorDetailModal";
import MapEmbed from "../components/MapEmbed";
import ContactSection from "../components/ContactSection";

const StyledInstructorImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  object-position: top;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

const StyledInstructorName = styled.h3`
  font-size: 1.8rem;
  font-weight: 500;
  margin: 0;
  color: ${({ theme }) => theme.colors.primary};
`;

const StyledInstructorSpecialization = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.secondary};
`;

const StyledBioText = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1rem;
`;

// --- helpers: strip HTML & truncate to N words ---
const stripHtml = (html) => {
  if (!html) return "";
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};

const truncateWords = (text, maxWords = 18) => {
  const words = text.trim().split(/\s+/);
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(" ") + "…";
};

const AboutUsPage = () => {
  const {
    data: instructors = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["instructors"],
    queryFn: fetchInstructors,
    staleTime: 300000,
  });

  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleShowDetails = (instructor) => {
    setSelectedInstructor(instructor);
    setShowModal(true);
  };

  if (isLoading) {
    return (
      <StyledContainer>
        <Spinner animation="border" />
        <p>Loading instructors...</p>
      </StyledContainer>
    );
  }

  if (isError) {
    return (
      <StyledContainer>
        <Alert variant="danger">Failed to load instructors.</Alert>
      </StyledContainer>
    );
  }

  return (
    <>
      <StyledContainer>
        <StyledTitle className="text-center">Nasz zespół</StyledTitle>
        <Row>
          {instructors.length > 0 ? (
            instructors.map((instructor) => {
              const preview = truncateWords(
                stripHtml(instructor?.bio || ""),
                10
              );

              return (
                <Col key={instructor.id} md={4}>
                  <StyledCard $height="500px" className="mb-4">
                    <StyledInstructorImage
                      src={
                        instructor.imageUrl
                          ? `${process.env.REACT_APP_API_URL}/${instructor.imageUrl}`
                          : "/placeholder.jpg"
                      }
                      alt={instructor.name}
                    />
                    <StyledCard.Body>
                      <StyledInstructorName>
                        {instructor.name} {instructor.surname}
                      </StyledInstructorName>

                      {/* SAFE, TRUNCATED PREVIEW (plain text) */}
                      <StyledBioText>
                        {preview || "No bio available."}
                      </StyledBioText>

                      <StyledButton
                        $align="center"
                        onClick={() => handleShowDetails(instructor)}
                      >
                        Czytaj więcej
                      </StyledButton>
                    </StyledCard.Body>
                  </StyledCard>
                </Col>
              );
            })
          ) : (
            <Alert variant="info">No instructors found.</Alert>
          )}
        </Row>

        <section>
          <StyledTitle className="mt-3 mb-3 text-center">
            Z pasji, doświadczenia i marzeń – powstało <strong>Symbio</strong>
          </StyledTitle>
          <p>
            Wszystko zaczęło się w 2020 roku, gdy w Stalowej Woli narodził się
            projekt
            <strong> Alan Tańczy</strong> – miejsce stworzone z miłości do tańca
            i potrzeby dzielenia się tą pasją z innymi. Początki były skromne:
            niewielka sala, ograniczony czas między zajęciami na studiach,
            pierwsze grupy i zajęcia dla par młodych.
          </p>
          <p>
            Z każdym rokiem rosło zainteresowanie, pojawiały się nowe kursy i
            dziesiątki zadowolonych uczestników. <strong>Alan Tańczy</strong>{" "}
            stało się lokalną marką, a pierwsze tańce stworzone z naszym
            udziałem – wyjątkowym wspomnieniem wielu par młodych.
          </p>
          <p>
            Po pięciu latach intensywnej pracy i nieustannego rozwoju przyszedł
            czas na nowy rozdział. Tak powstała
            <strong> Szkoła Tańca Symbio</strong> – odpowiedź na rosnące
            potrzeby mieszkańców Stalowej Woli. Nowa przestrzeń, nowa energia,
            nowa jakość.
          </p>
        </section>

        <section>
          <StyledSubTitle class="text-center mb-3">
            Dlaczego Symbio?
          </StyledSubTitle>
          <p>
            Bo wierzymy, że taniec to coś więcej niż kroki i rytm. To połączenie
            emocji, relacji, pasji i ruchu. To sposób na poznawanie siebie i
            innych, na wyrażenie tego, czego nie da się opisać słowami.
          </p>
        </section>

        <section>
          <StyledSubTitle class="text-center mb-3">
            Co nas wyróżnia?
          </StyledSubTitle>
          <ul>
            <li>
              Nowoczesna przestrzeń – dwie duże sale taneczne w nowej
              lokalizacji
            </li>
            <li>Ponad 20 lat doświadczenia w tańcu i nauczaniu</li>
            <li>
              Indywidualne podejście do każdego uczestnika – niezależnie od
              wieku i poziomu
            </li>
            <li>
              Zajęcia dla dzieci, dorosłych, seniorów – każdy znajdzie coś dla
              siebie
            </li>
            <li>
              Przyjazna, wspierająca atmosfera – bo taniec ma być radością, nie
              presją
            </li>
            <li>Zaangażowana kadra i stale poszerzana oferta</li>
          </ul>
        </section>

        <section>
          <StyledSubTitle className=" mb-3">
            Dla kogo jest Symbio?
          </StyledSubTitle>
          <ul>
            <li>Dla każdego.</li>
            <li>Dla tych, którzy marzą o swoim pierwszym tańcu.</li>
            <li>Dla dzieci, które chcą rozpocząć taneczną przygodę.</li>
            <li>Dla dorosłych, którzy chcą poczuć się pewnie na parkiecie.</li>
            <li>Dla seniorów, którzy szukają ruchu i towarzystwa.</li>
            <li>Dla kobiet, które pragną tańczyć tylko dla siebie.</li>
          </ul>
        </section>

        <section>
          <StyledTitle className="text-center mb-3">
            Symbio to więcej niż tylko taniec
          </StyledTitle>
          <p>
            To społeczność, która spotyka się na parkiecie, ale zostaje ze sobą
            na dłużej. To miejsce, gdzie można się uczyć, śmiać, tańczyć i… po
            prostu być sobą.
          </p>
          <StyledSubTitle class="mt-4">
            <strong>
              Zapraszamy do naszej tanecznej rodziny gdzie taniec staje się
              Twoją przestrzenią.
            </strong>
          </StyledSubTitle>
        </section>

        <InstructorDetailsModal
          show={showModal}
          onHide={() => setShowModal(false)}
          instructorId={selectedInstructor?.id}
          instructor={selectedInstructor}
        />
      </StyledContainer>
      <ContactSection />
    </>
  );
};

export default AboutUsPage;
