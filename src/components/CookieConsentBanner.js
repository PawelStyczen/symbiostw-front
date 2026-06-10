import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useCookieConsent } from "./CookieConsentProvider";
import {
  COOKIES_POLICY_PATH,
  PRIVACY_POLICY_PATH,
} from "../utils/contentRoutes";

const Banner = styled.aside`
  position: fixed;
  left: 20px;
  bottom: 20px;
  z-index: 1000;
  width: min(560px, calc(100vw - 170px));
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.textColor || "#2e2e2e"};

  border-radius: 28px;
  box-shadow: 0 18px 42px rgba(0, 0, 0, 0.18);
  padding: 1.25rem 1.25rem 1rem;

  @media (max-width: 768px) {
    left: 16px;
    right: 16px;
    bottom: 92px;
    width: auto;
  }
`;

const Title = styled.h2`
  font-size: 1.1rem;
  margin: 0 0 0.5rem;
  color: ${({ theme }) => theme.colors.primary};
`;

const Text = styled.p`
  margin: 0;
  line-height: 1.6;
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1rem;
`;

const ActionButton = styled.button`
  border: 0;
  border-radius: 999px;
  padding: 0.7rem 1rem;
  font-weight: 600;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    opacity 0.2s ease;
  background: ${({ $primary, theme }) =>
    $primary ? theme.colors.primary : theme.colors.cardBackground};
  color: ${({ $primary, theme }) =>
    $primary ? "#ffffff" : theme.colors.textColor || "#2e2e2e"};

  &:hover {
    transform: translateY(-1px);
    opacity: 0.95;
  }
`;

const SecondaryAction = styled.button`
  border: 0;
  background: transparent;
  color: ${({ theme }) => theme.colors.secondary};
  padding: 0.5rem 0;
  cursor: pointer;
  font-weight: 600;
`;

const InlineLink = styled(Link)`
  font-weight: 600;
`;

const CookieConsentBanner = () => {
  const {
    isBannerVisible,
    acceptAll,
    closePreferences,
    hasAnswered,
  } = useCookieConsent();

  if (!isBannerVisible) {
    return null;
  }

  return (
    <Banner aria-live="polite" aria-label="Ustawienia cookies">
      <Title>Szanujemy Twoją prywatność</Title>
      <Text>
        Używamy niezbędnych danych lokalnych do działania strony oraz
        opcjonalnej analityki odwiedzin. Za Twoją zgodą możemy też używać
        narzędzi marketingowych, takich jak Meta Pixel na stronie kampanii,
        żeby mierzyć skuteczność reklam. Szczegóły znajdziesz w{" "}
        <InlineLink to={COOKIES_POLICY_PATH}>polityce cookies</InlineLink> i{" "}
        <InlineLink to={PRIVACY_POLICY_PATH}>polityce prywatności</InlineLink>.
      </Text>

      <Actions>
        <ActionButton type="button" $primary onClick={acceptAll}>
          Akceptuję
        </ActionButton>
      </Actions>

      {hasAnswered ? (
        <SecondaryAction type="button" onClick={closePreferences}>
          Zamknij
        </SecondaryAction>
      ) : null}
    </Banner>
  );
};

export default CookieConsentBanner;
