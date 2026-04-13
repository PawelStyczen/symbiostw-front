import React from "react";
import styled from "styled-components";
import { StyledContainer, StyledTitle, StyledText } from "./StyledComponents";

const DocumentCard = styled.article``;

const Meta = styled.p`
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.75;
  margin-bottom: 2rem;
`;

const Section = styled.section`
  &:not(:last-child) {
    margin-bottom: 2rem;
  }
`;

const SectionTitle = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.3rem;
  margin-bottom: 0.75rem;
`;

const LegalList = styled.ul`
  margin: 0;
  padding-left: 1.25rem;

  li {
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.7;
    margin-bottom: 0.5rem;
  }
`;

const LegalDocumentPage = ({ title, updatedAt, intro, sections }) => (
  <StyledContainer>
    <DocumentCard>
      <StyledTitle>{title}</StyledTitle>
      <Meta>Ostatnia aktualizacja: {updatedAt}</Meta>
      {intro && <StyledText>{intro}</StyledText>}

      {sections.map((section) => (
        <Section key={section.title}>
          <SectionTitle>{section.title}</SectionTitle>
          {section.paragraphs?.map((paragraph) => (
            <StyledText key={paragraph}>{paragraph}</StyledText>
          ))}
          {section.items?.length ? (
            <LegalList>
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </LegalList>
          ) : null}
        </Section>
      ))}
    </DocumentCard>
  </StyledContainer>
);

export default LegalDocumentPage;
