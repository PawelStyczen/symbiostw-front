import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useCookieConsent } from "../components/CookieConsentProvider";
import MapEmbed from "../components/MapEmbed";
import { createLead } from "../services/leadService";
import { trackMetaLead } from "../utils/metaPixel";
import heroBackgroundImage from "../assets/images/landingPage/FK8A6728.JPG";
import childrenOfferImage from "../assets/images/landingPage/Jola.jpg";
import youthOfferImage from "../assets/images/landingPage/alan_wsparcie.jpg";
import adultsOfferImage from "../assets/images/landingPage/ludzie.jpeg";

const reasons = [
  {
    title: "Bezpieczny start",
    text: "Od pierwszych kroków dbamy o dobrą atmosferę i komfort naszych kursantów. Najmłodsi tancerze są pod opieką Joli — uśmiechniętej instruktorki i pedagoga edukacji przedszkolnej.",
    image: childrenOfferImage,
    imageAlt: "Placeholder dla bezpiecznego startu",
  },
  {
    title: "Rozwój przez wsparcie",
    text: "Uczymy techniki, rytmu i pewności siebie w atmosferze, która naprawdę daje frajdę z tańca.",
    image: youthOfferImage,
    imageAlt: "Placeholder dla rozwoju przez wsparcie",
  },
  {
    title: "Społeczność i wspólna pasja",
    text: "Dbamy o to, by każdy czuł się tu dobrze. Organizujemy wspólne wyjścia, imprezy i warsztaty, które pomagają budować fajną taneczną społeczność.",
    image: adultsOfferImage,
    imageAlt: "Placeholder dla spolecznosci i wspolnej pasji",
  },
];

const programs = [
  {
    title: "Zajęcia taneczne dla dzieci",
    details: ["3-4 lata", "5-6 lat"],
    image: childrenOfferImage,
    imageAlt: "Dzieci podczas zajec tanecznych",
  },
  {
    title: "Taniec towarzyski turniejowy",
    details: ["7-9 lat", "10-11 lat", "12-13 lat", "14+ lat"],
    image: youthOfferImage,
    imageAlt: "Mlodziez podczas zajec tanecznych",
  },
  {
    title: "Taniec dla dorosłych",
    details: ["bachata", "towarzyski", "uzytkowy", "solo"],
    image: adultsOfferImage,
    imageAlt: "Dorosli podczas zajec tanecznych",
  },
];

const leadGroupOptions = [
  { value: "dzieci-3-4", label: "Dzieci 3-4 lata" },
  { value: "dzieci-5-6", label: "Dzieci 5-6 lat" },
  { value: "towarzyski-7-9", label: "Towarzyski 7-9 lat" },
  { value: "towarzyski-10-11", label: "Towarzyski 10-11 lat" },
  { value: "towarzyski-12-13", label: "Towarzyski 12-13 lat" },
  { value: "towarzyski-14-plus", label: "Towarzyski 14+ lat" },
  { value: "dorosli-bachata", label: "Dorosli - bachata" },
  { value: "dorosli-towarzyski", label: "Dorosli - towarzyski" },
  { value: "dorosli-uzytkowy", label: "Dorosli - uzytkowy" },
  { value: "dorosli-solo", label: "Dorosli - solo" },
];

const initialLeadFormData = {
  imie: "",
  nazwisko: "",
  numerTelefonu: "",
  email: "",
  chceOtrzymywacEmailMarketing: true,
  chceOtrzymywacNewsletterISmsMarketing: true,
  grupa: "",
  dodatkowaWiadomosc: "",
};

const PageShell = styled.div`
  position: relative;
  overflow: hidden;
`;

const Section = styled.section`
  padding: 1.5rem 1.5rem 4.5rem;
`;

const HeroSection = styled.section`
  --hero-parallax-y: 0px;
  position: relative;
  padding: 9.5rem 1.5rem 4.5rem;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background:
      linear-gradient(
        180deg,
        rgb(190, 100, 97, 0.5) 0%,
        rgb(190, 100, 97, 0.3) 50%,
        rgba(251, 251, 239, 1) 100%
      ),
      url(${heroBackgroundImage});
    background-size:
      100% 100%,
      cover;
    background-position:
      0 0,
      calc(100% + 190px) calc(30% + var(--hero-parallax-y));
  }

  &::after {
    content: "";
    position: absolute;
    inset: auto 0 0 0;
    height: 120px;
    background: linear-gradient(180deg, rgba(244, 239, 231, 0), #f4efe7 100%);
  }

  @media (max-width: 900px) {
    padding-top: 15rem;

    &::before {
      background-size:
        100% 100%,
        108% auto;
      background-position:
        0 0,
        calc(100% + 45px) calc(-50px + var(--hero-parallax-y));
    }
  }
`;

const SectionInner = styled.div`
  max-width: 1180px;
  margin: 0 auto;
`;

const HeroPanel = styled.div`
  position: relative;
  z-index: 1;
  display: block;
`;

const HeroCopy = styled.div`
  max-width: 760px;

  padding: 1.75rem;
  border-radius: 34px;
  background: rgba(251, 251, 239, 0.4);
  backdrop-filter: blur(14px);
  border: 1px solid rgba(159, 89, 101, 0.12);
  box-shadow: 0 22px 48px rgba(95, 42, 50, 0.16);

  @media (max-width: 900px) {
    max-width: 100%;
    padding: 1.4rem;
  }
`;

const Eyebrow = styled.p`
  margin: 0 0 1rem;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 700;
  letter-spacing: 0.22rem;
  text-transform: uppercase;
  font-size: 0.9rem;
`;

const HeroTitle = styled.h1`
  margin: 0;
  font-size: clamp(2.8rem, 6vw, 5.6rem);
  line-height: 0.93;
  letter-spacing: -0.05em;
  color: #342a28;
`;

const AccentLine = styled.span`
  display: block;
  font-family: "Sisterhood", cursive;
  font-size: clamp(3rem, 7vw, 6rem);
  color: ${({ theme }) => theme.colors.primary};
  line-height: 1;
  margin-top: 0.25rem;
`;

const HeroProgramList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.9rem;
  margin-top: 1.2rem;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const HeroProgramItem = styled.div`
  min-height: 100%;
  padding: 0.95rem 1rem;
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.54);
  border: 1px solid rgba(52, 42, 40, 0.08);
  line-height: 1.6;
  color: rgba(52, 42, 40, 0.9);
`;

const HeroProgramTitle = styled.div`
  font-weight: 800;
  color: #342a28;
`;

const HeroProgramDetails = styled.div`
  margin-top: 0.2rem;
  font-size: 0.95rem;
`;

const HeroActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 2rem;
`;

const PrimaryButton = styled.button`
  border: 0;
  border-radius: 999px;
  padding: 0.95rem 1.6rem;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  font-weight: 700;
  box-shadow: 0 18px 40px rgba(159, 89, 101, 0.28);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    background: #b86777;
    box-shadow: 0 22px 50px rgba(159, 89, 101, 0.35);
  }
`;

const SecondaryOutlineButton = styled.button`
  border: 1px solid rgba(52, 42, 40, 0.2);
  border-radius: 999px;
  padding: 0.95rem 1.6rem;
  background: rgba(255, 255, 255, 0.18);
  color: #b86777;
  font-weight: 700;
  backdrop-filter: blur(8px);
  transition:
    transform 0.2s ease,
    background 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.34);
    border-color: rgba(159, 89, 101, 0.32);
  }
`;

const SectionLabel = styled.p`
  margin: 0 0 0.75rem;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 100;
  text-transform: uppercase;
  letter-spacing: 0.16rem;
  font-size: 1.1rem;
`;

const SectionTitle = styled.h2`
  margin: 0;
  font-size: clamp(2rem, 4vw, 3.3rem);
  line-height: 1.05;
  color: #342a28;
`;

const SectionLead = styled.p`
  margin: 1rem 0 0;
  max-width: 760px;
  font-size: 1.05rem;
  line-height: 1.8;
  color: rgba(52, 42, 40, 0.82);
`;

const WhyGrid = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.35rem;
  align-items: start;
  margin-top: 2.7rem;
  perspective: 1200px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 1rem;
    margin-top: 2rem;
  }
`;

const WhyCard = styled.article`
  --card-rotate: ${({ $step }) =>
    $step === 1 ? "-2.3deg" : $step === 2 ? "1.5deg" : "-1.1deg"};
  --card-offset: ${({ $step }) =>
    $step === 2 ? "1.35rem" : $step === 3 ? "0.35rem" : "0rem"};
  --foot-rotate: ${({ $step }) =>
    $step === 1 ? "-22deg" : $step === 2 ? "18deg" : "-12deg"};

  position: relative;
  z-index: 1;
  overflow: hidden;
  padding: 1rem 1rem 1.45rem;
  border-radius: 42px;
  background: linear-gradient(
    145deg,
    rgba(255, 255, 255, 0.92),
    rgba(255, 255, 255, 0.66)
  );
  border: 1px solid rgba(52, 42, 40, 0.08);
  box-shadow: 0 18px 40px rgba(58, 41, 39, 0.1);
  transform: rotate(var(--card-rotate)) translateY(var(--card-offset));
  transform-origin: center;
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease,
    border-color 0.25s ease;

  &::before {
    content: ${({ $step }) => `"0${$step}"`};
    position: absolute;
    right: 0.6rem;
    bottom: -0.7rem;
    color: rgba(159, 89, 101, 0.08);
    font-size: clamp(5.8rem, 9vw, 8rem);
    font-weight: 900;
    line-height: 0.8;
    pointer-events: none;
    z-index: 0;
  }

  &::after {
    content: "";
    position: absolute;
    top: 1.35rem;
    right: 1.35rem;
    width: 0.9rem;
    height: 1.85rem;
    border-radius: 55% 45% 55% 45%;
    background: rgba(255, 255, 255, 0.7);
    box-shadow:
      -0.72rem 1.1rem 0 rgba(255, 255, 255, 0.52),
      0 10px 24px rgba(95, 42, 50, 0.1);
    transform: rotate(var(--foot-rotate));
    pointer-events: none;
    z-index: 2;
  }

  &:hover {
    transform: rotate(var(--card-rotate))
      translateY(calc(var(--card-offset) - 0.45rem)) scale(1.015);
    border-color: rgba(159, 89, 101, 0.18);
    box-shadow: 0 24px 54px rgba(58, 41, 39, 0.14);
  }

  @media (max-width: 900px) {
    --card-rotate: 0deg;
    --card-offset: 0rem;

    overflow: visible;
    &::after {
      display: none;
    }
  }
`;

const WhyImageWrap = styled.div`
  position: relative;
  z-index: 1;
  overflow: hidden;
  margin: 0 0 1.25rem;
  border-radius: 34px;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background:
      linear-gradient(
        145deg,
        rgba(194, 209, 201, 0.38) 0%,
        rgba(194, 209, 201, 0.16) 42%,
        rgba(251, 251, 239, 0.12) 100%
      ),
      radial-gradient(
        circle at 18% 12%,
        rgba(112, 125, 115, 0.22),
        transparent 34%
      );
    mix-blend-mode: soft-light;
    pointer-events: none;
  }
`;

const WhyImage = styled.img`
  width: 100%;
  height: 260px;
  object-fit: cover;
  object-position: top;
  display: block;
  filter: saturate(0.92) contrast(1.04) brightness(0.98);

  @media (max-width: 900px) {
    height: 230px;
  }
`;

const WhyIndex = styled.div`
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  width: fit-content;
  margin: 0 0 0.85rem;
  padding: 0.48rem 0.86rem 0.48rem 0.62rem;
  border-radius: 999px;
  background: rgba(159, 89, 101, 0.92);
  color: #fff;
  font-size: 0.78rem;
  font-weight: 900;
  letter-spacing: 0.11rem;
  text-transform: uppercase;
  box-shadow: 0 12px 24px rgba(159, 89, 101, 0.2);

  @media (max-width: 900px) {
    font-size: 0.74rem;
  }
`;

const StepIcon = styled.span`
  position: relative;
  width: 1.15rem;
  height: 1.15rem;
  display: inline-block;
  flex: 0 0 auto;

  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 0.45rem;
    height: 0.82rem;
    border-radius: 55% 45% 55% 45%;
    background: rgba(255, 255, 255, 0.92);
  }

  &::before {
    left: 0.08rem;
    top: 0.05rem;
    transform: rotate(-28deg);
  }

  &::after {
    right: 0.05rem;
    bottom: 0.02rem;
    transform: rotate(24deg);
  }
`;

const WhyTitle = styled.h3`
  position: relative;
  z-index: 1;
  margin: 0 0 0.7rem;
  font-size: 1.35rem;
  color: #342a28;
`;

const WhyText = styled.p`
  position: relative;
  z-index: 1;
  margin: 0;
  line-height: 1.7;
  color: rgba(52, 42, 40, 0.82);
`;

const VideoSectionGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: center;
  margin-top: 2rem;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const VideoCopy = styled.div`
  display: grid;
  gap: 1rem;
`;

const VideoCard = styled.div`
  padding: 1.1rem;
  border-radius: 32px;
  background: rgba(255, 255, 255, 0.62);
  border: 1px solid rgba(52, 42, 40, 0.08);
  box-shadow: 0 18px 36px rgba(58, 41, 39, 0.08);
`;

const VideoWrap = styled.div`
  position: relative;
  width: 100%;

  margin: 0 auto;
  padding-top: 120%;
  overflow: hidden;
  border-radius: 24px;
  background: #140e11;

  @media (min-width: 992px) {
    padding-top: 104%;
  }

  iframe {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }
`;

const OfferGrid = styled.div`
  position: relative;
  display: grid;
  gap: 0;
  margin-top: 2.2rem;
  padding: 1rem;
  overflow: hidden;
  border-radius: 42px;
  background:
    radial-gradient(
      circle at 10% 10%,
      rgba(194, 209, 201, 0.22),
      transparent 32%
    ),
    radial-gradient(
      circle at 88% 12%,
      rgba(241, 197, 207, 0.2),
      transparent 28%
    ),
    linear-gradient(145deg, rgba(52, 42, 40, 0.97), rgba(77, 57, 53, 0.94));
  box-shadow: 0 28px 60px rgba(52, 42, 40, 0.18);
  color: white;

  &::before {
    content: "nabór";
    position: absolute;
    right: -1.2rem;
    bottom: -1rem;
    color: rgba(255, 255, 255, 0.045);
    font-family: "Sisterhood", cursive;
    font-size: clamp(7rem, 16vw, 15rem);
    line-height: 0.8;
    pointer-events: none;
  }
`;

const OfferCard = styled.article`
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 5rem minmax(0, 1fr);
  gap: 1.1rem;
  align-items: center;
  padding: 1.35rem;
  border-radius: 32px;
  background: rgba(255, 255, 255, 0.055);
  border: 1px solid rgba(255, 255, 255, 0.08);

  & + & {
    margin-top: 0.8rem;
  }

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
    gap: 0.8rem;
  }
`;

const OfferIndex = styled.div`
  width: 4.2rem;
  height: 4.2rem;
  display: grid;
  place-items: center;
  border-radius: 24px;
  background: rgba(194, 209, 201, 0.18);
  color: #f4efe7;
  font-size: 1.35rem;
  font-weight: 900;
  box-shadow: inset 0 0 0 1px rgba(194, 209, 201, 0.28);
`;

const OfferTitle = styled.h3`
  margin: 0;
  font-size: clamp(1.45rem, 3vw, 2.45rem);
  line-height: 1.25;
  color: #ffffff;
`;

const TagWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  margin-top: 0.85rem;
`;

const OfferTag = styled.span`
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  padding: 0.55rem 0.9rem;
  background: rgba(244, 239, 231, 0.1);
  color: rgba(255, 255, 255, 0.88);
  border: 1px solid rgba(244, 239, 231, 0.12);
  font-weight: 700;
  font-size: 0.95rem;
`;

const OfferFooter = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  margin-top: 1rem;
  padding: 1rem 1.15rem;
  border-radius: 28px;
  background: rgba(194, 209, 201, 0.12);
  border: 1px solid rgba(194, 209, 201, 0.16);
`;

const OfferHint = styled.p`
  margin: 0;
  max-width: 640px;
  color: rgba(255, 255, 255, 0.78);
  line-height: 1.65;
`;

const OfferButton = styled.button`
  border: 0;
  border-radius: 999px;
  padding: 0.85rem 1.25rem;
  background: #f1c5cf;
  color: #4d3935;
  font-weight: 900;
  white-space: nowrap;
  transition:
    transform 0.2s ease,
    background 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    background: #f6d5dc;
  }
`;

const FormPanel = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas:
    "header"
    "form"
    "contact";
  gap: 1.5rem;
  margin-top: 2rem;
  padding: 1.5rem;
  border-radius: 36px;
  background: linear-gradient(
    155deg,
    rgba(52, 42, 40, 0.96),
    rgba(77, 57, 53, 0.92)
  );
  color: white;
  box-shadow: 0 28px 60px rgba(52, 42, 40, 0.22);
`;

const FormHeader = styled.div`
  grid-area: header;
  padding: 1rem 1rem 0;
`;

const FormIntro = styled.div`
  grid-area: contact;
  padding: 1rem;
`;

const FormTitle = styled.h3`
  margin: 0;
  font-size: clamp(2rem, 4vw, 3.2rem);
  line-height: 1.02;
  color: white;
`;

const FormAccent = styled.span`
  display: block;
  margin-top: 0.35rem;
  font-family: "Sisterhood", cursive;
  color: #f1c5cf;
  font-size: clamp(2.3rem, 5vw, 4.2rem);
  line-height: 1;
`;

const FormLocationCard = styled.div`
  padding: 0.75rem;
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const FormMapFrame = styled.div`
  overflow: hidden;

  border-radius: 24px;
  box-shadow: 0 16px 34px rgba(31, 24, 23, 0.22);

  iframe {
    display: block;
  }
`;

const FormAddressCard = styled.address`
  margin: 0.85rem 0 0;
  padding: 1rem;
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.86);
  font-style: normal;
  line-height: 1.65;
`;

const FormAddressTitle = styled.strong`
  display: block;
  margin-bottom: 0.3rem;
  color: #ffffff;
  font-size: 1.05rem;
`;

const FormCard = styled.form`
  grid-area: form;
  display: grid;
  gap: 1rem;
  padding: 1.25rem;
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(8px);
`;

const FieldGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const Field = styled.label`
  display: grid;
  gap: 0.45rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.92);
  font-size: 0.95rem;
`;

const inputStyles = `
  width: 100%;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 16px;
  padding: 0.95rem 1rem;
  background: rgba(255, 255, 255, 0.96);
  color: #342a28;
  outline: none;
  transition: box-shadow 0.2s ease, border-color 0.2s ease;

  &:focus {
    border-color: rgba(241, 197, 207, 0.9);
    box-shadow: 0 0 0 4px rgba(241, 197, 207, 0.18);
  }
`;

const Input = styled.input`
  ${inputStyles}
`;

const Select = styled.select`
  ${inputStyles}
`;

const TextArea = styled.textarea`
  ${inputStyles}
  min-height: 130px;
  resize: vertical;
`;

const ConsentField = styled.label`
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
  color: rgba(255, 255, 255, 0.88);
  font-size: 0.92rem;
  line-height: 1.55;

  input {
    width: 1.05rem;
    height: 1.05rem;
    margin-top: 0.2rem;
    accent-color: #f1c5cf;
    flex-shrink: 0;
  }
`;

const FormButton = styled.button`
  border: 0;
  border-radius: 999px;
  padding: 1rem 1.45rem;
  background: #f1c5cf;
  color: #4d3935;
  font-weight: 800;
  transition:
    transform 0.2s ease,
    background 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    background: #f6d5dc;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.72;
    transform: none;
  }
`;

const FormNote = styled.p`
  margin: 0;
  font-size: 0.92rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.74);
`;

const ErrorMessage = styled.div`
  padding: 1rem 1.1rem;
  border-radius: 18px;
  background: rgba(255, 210, 210, 0.13);
  border: 1px solid rgba(255, 210, 210, 0.34);
  color: #ffd7d7;
  line-height: 1.6;
`;

const SuccessModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 3000;
  display: grid;
  place-items: center;
  padding: 1.25rem;
  background:
    radial-gradient(
      circle at 20% 10%,
      rgba(241, 197, 207, 0.28),
      transparent 34%
    ),
    radial-gradient(
      circle at 82% 72%,
      rgba(190, 100, 97, 0.3),
      transparent 32%
    ),
    rgba(31, 24, 23, 0.62);
  backdrop-filter: blur(12px);
`;

const SuccessModal = styled.div`
  position: relative;
  width: min(100%, 620px);
  overflow: hidden;
  padding: clamp(1.45rem, 4vw, 2.3rem);
  border-radius: 34px;
  background:
    linear-gradient(
      145deg,
      rgba(255, 255, 255, 0.96),
      rgba(244, 239, 231, 0.92)
    ),
    #f4efe7;
  color: #342a28;
  box-shadow: 0 34px 90px rgba(31, 24, 23, 0.32);
  animation: successModalIn 0.34s ease both;

  &::before {
    content: "";
    position: absolute;
    inset: -40% auto auto -18%;
    width: 260px;
    height: 260px;
    border-radius: 999px;
    background: rgba(241, 197, 207, 0.42);
    filter: blur(8px);
  }

  &::after {
    content: "";
    position: absolute;
    right: -70px;
    bottom: -80px;
    width: 220px;
    height: 220px;
    border-radius: 999px;
    border: 34px solid rgba(190, 100, 97, 0.13);
  }

  @keyframes successModalIn {
    from {
      opacity: 0;
      transform: translateY(18px) scale(0.98);
    }

    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
`;

const SuccessModalContent = styled.div`
  position: relative;
  z-index: 1;
`;

const SuccessModalClose = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 2;
  width: 2.5rem;
  height: 2.5rem;
  border: 0;
  border-radius: 999px;
  background: rgba(52, 42, 40, 0.08);
  color: #342a28;
  font-size: 1.4rem;
  line-height: 1;
  transition:
    transform 0.2s ease,
    background 0.2s ease;

  &:hover {
    transform: rotate(6deg) scale(1.04);
    background: rgba(159, 89, 101, 0.16);
  }
`;

const SuccessDanceIcon = styled.div`
  position: relative;
  width: 5.4rem;
  height: 5.4rem;
  margin-bottom: 1.15rem;
  border-radius: 30px;
  background: linear-gradient(145deg, #b86777, #f1c5cf);
  box-shadow: 0 22px 38px rgba(159, 89, 101, 0.25);
  transform: rotate(-4deg);

  &::before {
    content: "";
    position: absolute;
    left: 1.55rem;
    top: 1rem;
    width: 1.45rem;
    height: 1.45rem;
    border-radius: 999px;
    background: #fffaf5;
  }

  &::after {
    content: "";
    position: absolute;
    left: 2.35rem;
    top: 2.05rem;
    width: 1.65rem;
    height: 2.4rem;
    border-radius: 999px 999px 999px 0;
    border-left: 0.42rem solid #fffaf5;
    border-bottom: 0.42rem solid #fffaf5;
    transform: rotate(34deg);
  }
`;

const SuccessModalLabel = styled.p`
  margin: 0 0 0.7rem;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 800;
  letter-spacing: 0.16rem;
  text-transform: uppercase;
  font-size: 0.82rem;
`;

const SuccessModalTitle = styled.h3`
  margin: 0;
  max-width: 520px;
  font-size: clamp(2rem, 5vw, 3.2rem);
  line-height: 1.02;
  letter-spacing: -0.04em;
  color: #342a28;
`;

const SuccessModalAccent = styled.span`
  display: block;
  margin-top: 5.2rem;
  font-family: "Sisterhood", cursive;
  color: ${({ theme }) => theme.colors.primary};
  font-size: clamp(2rem, 6vw, 3rem);
  line-height: 0.9;
  letter-spacing: 0;
`;

const SuccessModalText = styled.p`
  margin: 1.15rem 0 0;
  max-width: 530px;
  color: rgba(52, 42, 40, 0.78);
  font-size: 1.02rem;
  line-height: 1.8;
`;

const SuccessModalActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-top: 1.6rem;
`;

const SuccessModalLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  padding: 0.95rem 1.35rem;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  font-weight: 800;
  text-decoration: none;
  box-shadow: 0 18px 34px rgba(159, 89, 101, 0.24);
  transition:
    transform 0.2s ease,
    background 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    background: #b86777;
    color: white;
  }
`;

const SuccessModalGhostButton = styled.button`
  border: 1px solid rgba(52, 42, 40, 0.14);
  border-radius: 999px;
  padding: 0.95rem 1.35rem;
  background: rgba(255, 255, 255, 0.52);
  color: #342a28;
  font-weight: 800;
  transition:
    transform 0.2s ease,
    background 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.82);
  }
`;

const NewRecruitmentLandingPage = () => {
  const heroRef = useRef(null);
  const formRef = useRef(null);
  const introRef = useRef(null);
  const [formData, setFormData] = useState(initialLeadFormData);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const { consent } = useCookieConsent();

  useEffect(() => {
    document.body.style.backgroundColor = "#f4efe7";

    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  useEffect(() => {
    const heroElement = heroRef.current;

    if (!heroElement) {
      return undefined;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    if (prefersReducedMotion.matches) {
      return undefined;
    }

    let frameId = null;

    const updateParallax = () => {
      frameId = null;

      const rect = heroElement.getBoundingClientRect();
      const viewportHeight =
        window.innerHeight || document.documentElement.clientHeight;

      if (rect.bottom < 0 || rect.top > viewportHeight) {
        return;
      }

      const isMobile = window.matchMedia("(max-width: 900px)").matches;
      const intensity = isMobile ? 0.2 : 0.2;
      const maxOffset = isMobile ? 300 : 300;
      const offset = Math.max(
        -maxOffset,
        Math.min(maxOffset, -rect.top * intensity),
      );

      heroElement.style.setProperty(
        "--hero-parallax-y",
        `${offset.toFixed(1)}px`,
      );
    };

    const requestParallaxUpdate = () => {
      if (frameId !== null) {
        return;
      }

      frameId = window.requestAnimationFrame(updateParallax);
    };

    updateParallax();
    window.addEventListener("scroll", requestParallaxUpdate, {
      passive: true,
    });
    window.addEventListener("resize", requestParallaxUpdate);

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }

      window.removeEventListener("scroll", requestParallaxUpdate);
      window.removeEventListener("resize", requestParallaxUpdate);
      heroElement.style.removeProperty("--hero-parallax-y");
    };
  }, []);

  useEffect(() => {
    if (!isSuccessModalOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsSuccessModalOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSuccessModalOpen]);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToIntro = () => {
    introRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleChange = (event) => {
    const { name, type, checked, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
    setIsSuccessModalOpen(false);
    setSubmitError("");
  };

  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const selectedGroup = leadGroupOptions.find(
      (option) => option.value === formData.grupa,
    );

    const leadPayload = {
      imie: formData.imie.trim(),
      nazwisko: formData.nazwisko.trim(),
      numerTelefonu: formData.numerTelefonu.trim(),
      email: formData.email.trim() || null,
      chceOtrzymywacEmailMarketing: formData.chceOtrzymywacEmailMarketing,
      chceOtrzymywacNewsletterISmsMarketing:
        formData.chceOtrzymywacNewsletterISmsMarketing,
      grupa: selectedGroup?.label || formData.grupa,
      dodatkowaWiadomosc: formData.dodatkowaWiadomosc.trim() || null,
    };

    try {
      setIsSubmitting(true);
      setSubmitError("");
      await createLead(leadPayload);
      if (consent?.marketing) {
        trackMetaLead();
      }
      setIsSuccessModalOpen(true);
      setFormData(initialLeadFormData);
    } catch (error) {
      setSubmitError(
        error.response?.data?.message ||
          error.message ||
          "Nie udało się wysłać zgłoszenia. Spróbuj ponownie za chwilę.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageShell>
      <HeroSection ref={heroRef}>
        <SectionInner>
          <HeroPanel>
            <HeroCopy>
              <Eyebrow>
                Nowy nabór do szkoły tańca <br /> SYMBIO stalowa wola
              </Eyebrow>
              <HeroTitle>
                Tutaj zaczyna się Twoja
                <AccentLine>taneczna przygoda</AccentLine>
              </HeroTitle>

              <HeroProgramList>
                {programs.map((program) => (
                  <HeroProgramItem key={program.title}>
                    <HeroProgramTitle>{program.title}</HeroProgramTitle>
                    <HeroProgramDetails>
                      {program.details.join(", ")}
                    </HeroProgramDetails>
                  </HeroProgramItem>
                ))}
              </HeroProgramList>
              <HeroActions>
                <PrimaryButton type="button" onClick={scrollToForm}>
                  Dołącz do naszej społeczności.
                </PrimaryButton>
                <SecondaryOutlineButton type="button" onClick={scrollToIntro}>
                  Dowiedz się więcej
                </SecondaryOutlineButton>
              </HeroActions>
            </HeroCopy>
          </HeroPanel>
        </SectionInner>
      </HeroSection>

      <Section ref={introRef}>
        <SectionInner>
          <SectionLabel>Dlaczego my</SectionLabel>
          <SectionTitle>
            Szkoła tańca, w której łatwo poczuć, że to Twoje miejsce
          </SectionTitle>
          <SectionLead>
            Stawiamy na dobra atmosfere, madrze prowadzony rozwoj i grupy, ktore
            sa dopasowane do wieku oraz poziomu.{" "}
            <b>Tu znajdziesz miejsce dla siebie.</b>
          </SectionLead>

          <WhyGrid>
            {reasons.map((reason, index) => (
              <WhyCard key={reason.title} $step={index + 1}>
                <WhyImageWrap>
                  <WhyImage src={reason.image} alt={reason.imageAlt} />
                </WhyImageWrap>
                <WhyIndex>
                  <StepIcon aria-hidden="true" />
                  Krok {String(index + 1).padStart(2, "0")}
                </WhyIndex>
                <WhyTitle>{reason.title}</WhyTitle>
                <WhyText>{reason.text}</WhyText>
              </WhyCard>
            ))}
          </WhyGrid>
        </SectionInner>
      </Section>

      <Section>
        <SectionInner>
          <VideoSectionGrid>
            <VideoCopy>
              <div>
                <SectionLabel>Zobacz klimat</SectionLabel>
                <SectionTitle>Poczuj energię zajęć</SectionTitle>
                <SectionLead>
                  Pozytywna atmosfera na sali i styl pracy, ktory sprawia, źe
                  taniec stanie się czymś wiecej niź tylko kolejnym treningiem.
                </SectionLead>
              </div>
            </VideoCopy>

            <VideoCard>
              <VideoWrap>
                <iframe
                  src="https://www.instagram.com/reel/DN0B_GX2jSi/embed"
                  title="Symbio - Instagram reel"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </VideoWrap>
            </VideoCard>
          </VideoSectionGrid>
        </SectionInner>
      </Section>

      <Section>
        <SectionInner>
          <SectionLabel>Nowy nabór</SectionLabel>
          <SectionTitle>Ruszamy z zapisami na nowe zajecia</SectionTitle>
          <SectionLead>
            To <b>idealny moment zeby dołączyć</b> do naszej tanecznej
            społeczności. Niezależnie od wieku czy poziomu.
          </SectionLead>

          <OfferGrid>
            {programs.map((program, index) => (
              <OfferCard key={program.title}>
                <OfferIndex>{String(index + 1).padStart(2, "0")}</OfferIndex>
                <div>
                  <OfferTitle>{program.title}</OfferTitle>
                  <TagWrap>
                    {program.details.map((detail) => (
                      <OfferTag key={detail}>{detail}</OfferTag>
                    ))}
                  </TagWrap>
                </div>
              </OfferCard>
            ))}
            <OfferFooter>
              <OfferHint>
                Nie musisz wiedzieć, która grupa będzie najlepsza. Zostaw
                kontakt, a pomożemy dobrać wiek, poziom i styl zajęć.
              </OfferHint>
              <OfferButton type="button" onClick={scrollToForm}>
                Zgłoś zainteresowanie
              </OfferButton>
            </OfferFooter>
          </OfferGrid>
        </SectionInner>
      </Section>

      <Section ref={formRef} id="landing-lead-form">
        <SectionInner>
          <FormPanel>
            <FormHeader>
              <FormTitle>
                Zostaw kontakt,
                <FormAccent>a my odezwiemy się do Ciebie</FormAccent>
              </FormTitle>
            </FormHeader>

            <FormCard onSubmit={handleSubmit}>
              <FieldGrid>
                <Field>
                  Imie
                  <Input
                    type="text"
                    name="imie"
                    value={formData.imie}
                    onChange={handleChange}
                    placeholder="Np. Anna"
                    required
                  />
                </Field>

                <Field>
                  Nazwisko
                  <Input
                    type="text"
                    name="nazwisko"
                    value={formData.nazwisko}
                    onChange={handleChange}
                    placeholder="Np. Kowalska"
                    required
                  />
                </Field>
              </FieldGrid>

              <FieldGrid>
                <Field>
                  Telefon
                  <Input
                    type="tel"
                    name="numerTelefonu"
                    value={formData.numerTelefonu}
                    onChange={handleChange}
                    placeholder="Np. 600 000 000"
                    required
                  />
                </Field>

                <Field>
                  E-mail
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Np. anna@email.com"
                    required
                  />
                </Field>
              </FieldGrid>

              <FieldGrid>
                <Field>
                  Interesujaca grupa
                  <Select
                    name="grupa"
                    value={formData.grupa}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Wybierz grupe</option>
                    {leadGroupOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Select>
                </Field>
              </FieldGrid>

              <ConsentField>
                <input
                  type="checkbox"
                  name="chceOtrzymywacEmailMarketing"
                  checked={formData.chceOtrzymywacEmailMarketing}
                  onChange={handleChange}
                />
                Chce otrzymywać newsletter i informacje marketingowe EMAIL.
              </ConsentField>

              <ConsentField>
                <input
                  type="checkbox"
                  name="chceOtrzymywacNewsletterISmsMarketing"
                  checked={formData.chceOtrzymywacNewsletterISmsMarketing}
                  onChange={handleChange}
                />
                Chce otrzymywać newsletter i informacje marketingowe SMS.
              </ConsentField>

              <Field>
                Dodatkowa wiadomosc
                <TextArea
                  name="dodatkowaWiadomosc"
                  value={formData.dodatkowaWiadomosc}
                  onChange={handleChange}
                  placeholder="Np. interesuja mnie zajecia dla corki, najlepiej po 17:00"
                />
              </Field>

              <FormButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Wysyłanie..." : "Wyślij zgłoszenie"}
              </FormButton>
              <FormNote>
                Po wysłaniu formularza odezwiemy się, zeby pomoc dobrac
                odpowiednia grupe i odpowiedziec na pytania.
              </FormNote>

              {submitError && <ErrorMessage>{submitError}</ErrorMessage>}
            </FormCard>

            <FormIntro>
              <FormLocationCard>
                <FormMapFrame>
                  <MapEmbed
                    height="320px"
                    style={{
                      borderRadius: "24px",
                      filter: "sepia(35%) contrast(96%) brightness(82%)",
                    }}
                  />
                </FormMapFrame>

                <FormAddressCard>
                  <FormAddressTitle>Budynek Jubilatu</FormAddressTitle>
                  ul.Ofiar Katynia 37
                  <br />
                  37-450 Stalowa Wola
                </FormAddressCard>
              </FormLocationCard>
            </FormIntro>
          </FormPanel>
        </SectionInner>
      </Section>

      {isSuccessModalOpen && (
        <SuccessModalOverlay onClick={closeSuccessModal}>
          <SuccessModal
            role="dialog"
            aria-modal="true"
            aria-labelledby="lead-success-title"
            onClick={(event) => event.stopPropagation()}
          >
            <SuccessModalClose
              type="button"
              aria-label="Zamknij komunikat"
              onClick={closeSuccessModal}
            >
              ×
            </SuccessModalClose>

            <SuccessModalContent>
              <SuccessModalLabel>Zgłoszenie wysłane</SuccessModalLabel>
              <SuccessModalTitle id="lead-success-title">
                Dziękujemy za kontakt
                <SuccessModalAccent>
                  to Twój pierwszy taneczny krok
                </SuccessModalAccent>
              </SuccessModalTitle>
              <SuccessModalText>
                w kierunku naszej społeczności. Wkrótce skontaktujemy się z Tobą
                i pomożemy dobrać najlepszą grupę.
              </SuccessModalText>
              <SuccessModalText>
                W tym czasie zajrzyj do nas na www.symbiostw.pl, i zobacz, co u
                nas słychać 🎶
              </SuccessModalText>

              <SuccessModalActions>
                <SuccessModalLink
                  href="https://www.symbiostw.pl/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Zobacz, co u nas słychać
                </SuccessModalLink>
                <SuccessModalGhostButton
                  type="button"
                  onClick={closeSuccessModal}
                >
                  Zostaję tutaj
                </SuccessModalGhostButton>
              </SuccessModalActions>
            </SuccessModalContent>
          </SuccessModal>
        </SuccessModalOverlay>
      )}
    </PageShell>
  );
};

export default NewRecruitmentLandingPage;
