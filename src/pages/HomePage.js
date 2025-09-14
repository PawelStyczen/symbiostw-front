import React from "react";
import styled from "styled-components";
import { GiWalkingBoot } from "react-icons/gi";
import { IoFootstepsOutline } from "react-icons/io5";
import HighlightedMeetings from "../components/HighlightedMeetings";
import HighlightedTypesOfMeetings from "../components/HighlightedTypesOfMeetings";
import HighlightedNews from "../components/HighlightedNews";
import { Link } from "react-router-dom";
import { hexToRgba } from "../utils/colorUtils";
import { ReactComponent as Logo } from "../assets/logo.svg";

// Full-Screen Background (Stretches Across Entire Width)
const StyledLogo = styled(Logo)`
  width: 700px;
  height: auto;

  @media (max-width: 768px) {
    width: 350px;
  }
`;

const VideoBackground = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  z-index: -2;
`;

const VideoOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0),
    /* fully transparent at the very top */ rgba(0, 0, 0, 0) 0%,
    /* stay transparent until 30% */
      ${({ theme }) => hexToRgba(theme.colors.background, 1)} 90%
      /* fade to solid color */
  );
  backdrop-filter: blur(10px);
  z-index: -1;
`;

// Hero Section with a Bounded Container
const HeroSection = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;m
  justify-content: center;
  text-align: center;
  position: relative;

    @media (max-width: 768px) {
      height: 100vh;
      margin-top: 6rem;
  }
`;

const IconBackground = styled(IoFootstepsOutline)`
  position: absolute;
  font-size: 5rem;
  color: white;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 0;
`;

const HeroButton = styled(Link)`
  position: absolute;
  top: 200px;
  right: 250px;
  width: 140px;
  height: 140px;

  padding: 0.2rem 0.5rem;
  background-color: #9f5965;
  color: white;
  font-weight: 600;
  font-size: 1rem;
  border-radius: 50%;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  z-index: 1;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease, color 0.3s ease, font-size 0.3s ease;

@media (max-width: 768px) {
    top: 350px;
    right: 100px;
    width: 100px;
    height: 100px;
    font-size: 0.8rem;
  }


   animation: shimmer 6s infinite ease-in-out;
  &:hover {
    background-color: #cb7a89;
    color: white;
    font-size: 2.5rem;
    width: 200px;
    height: 200px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.5);
  }

  &:hover ${IconBackground} {
    opacity: 0.4;
    font-size: 6rem;
  }

  

  @keyframes shimmer {
    0%,
    100% {
      box-shadow: 0 4px 60px rgba(0, 0, 0, 0.3),
        inset 0 0 10px rgba(255, 255, 255, 0.1);
    }
    50% {
      transform: scale(1.2);
      box-shadow: 0 6px 80px rgba(0, 0, 0, 0.5),
        inset 0 0 15px rgba(255, 255, 255, 0.15);
    }
`;
// Neumorphic Title (Same Color as Background, Shadow Effect)

const HeroSubtitle = styled.h2`
  font-size: 2rem;
  font-family: "DM Sans", cursive;
  letter-spacing: 1rem;
  font-weight: 400;
  color: #9f5965;

  transform: translateY(50px) translateX(0px);

  @media (max-width: 768px) {
    font-size: 1.2rem;
    transform: translateY(0px) translateX(0px);
  }
`;
const HeroSubtitle2 = styled.h2`
  font-size: 1.2rem;
  font-family: "DM Sans", cursive;

  font-weight: 400;
  color: rgb(8, 7, 7);
  transform: translateY(-259px) translateX(200px);

  @media (max-width: 768px) {
    font-size: 1.2rem;
    transform: translateY(-100px) translateX(0px);
  }
`;

// Scroll Down Icon
const ScrollIcon = styled(IoFootstepsOutline)`
  position: absolute;
  bottom: 200px;
  font-size: 2.5rem;
  color: white;
  cursor: pointer;
  animation: bounce 2s infinite;
  color: #9f5965;
  rotate: 180deg;

  @media (max-width: 768px) {
    bottom: 175px;
  }

  @keyframes bounce {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(10px);
    }
  }
`;

const scrollToContent = () => {
  window.scrollTo({
    top: window.innerHeight,
    behavior: "smooth",
  });
};

const HomePage = () => {
  return (
    <div>
      <VideoBackground autoPlay loop muted playsInline>
        <source src="/videos/symbio_roll.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </VideoBackground>
      <VideoOverlay />
      <HeroSection>
        <HeroSubtitle>ALAN BANACH PRZEDSTAWIA</HeroSubtitle>
        <StyledLogo />
        <HeroSubtitle2>WIĘCEJ NIŻ TYLKO TANIEC</HeroSubtitle2>
        <HeroButton to="/newhere">
          <IconBackground />
          <p>Jestem tu Nowy</p>
        </HeroButton>
        <ScrollIcon onClick={scrollToContent} />
      </HeroSection>

      <HighlightedNews />
      <HighlightedMeetings />
      <HighlightedTypesOfMeetings />
    </div>
  );
};

export default HomePage;
