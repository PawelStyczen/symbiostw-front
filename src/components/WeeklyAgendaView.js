import React, { useMemo, useState, useRef, useEffect } from "react";
import moment from "moment";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import Tag from "./Tag";
import SkillLevelBadge from "./SkillLevelBadge";

// Formatki
const fmtTime = (d) => moment(d).format("HH:mm");

const weekRangeLabel = (date) => {
  const start = moment(date).startOf("isoWeek");
  const end = moment(date).endOf("isoWeek");
  return `${start.format("DD.MM")} – ${end.format("DD.MM")}`;
};

/* =========================
   Styled Components
========================= */

const ScrollArea = styled.div`
  max-height: calc(100vh - 300px);
  overflow-y: auto;
  padding-right: 4px;
  -webkit-overflow-scrolling: touch;

  @media (max-width: 768px) {
    max-height: calc(100vh - 450px);
  }
`;

const AnimatedContent = styled(motion.div)`
  min-height: 50vh;
`;

const Wrapper = styled.div`
  padding: 12px;
`;

const WeekHeader = styled.div`
  font-weight: 900;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 10px;
`;

const WeekHeaderTitle = styled.span`
  font-weight: 900;
`;

const WeekHeaderRange = styled.span`
  font-weight: 700;
  opacity: 0.75;
`;

const SwipeHint = styled.div`
  font-size: 12px;
  opacity: 0.5;
  text-align: center;
  margin-bottom: 10px;
`;

const EmptyState = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 14px;
  padding: 12px;
  background: white;
  opacity: 0.8;
`;

const DaysList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const DayCard = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 14px;
  overflow: hidden;
  background: white;
`;

const DayHeader = styled.div`
  padding: 10px 12px;
  font-weight: 900;
  background: rgba(0, 0, 0, 0.04);
  text-transform: capitalize;
`;

const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
`;

const EventCard = styled.button`
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 16px;
  background: white;
  padding: 12px;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 8px;
  cursor: pointer;
  transition:
    transform 0.08s ease,
    background-color 0.12s ease,
    box-shadow 0.15s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

  &:active {
    transform: scale(0.985);
    background-color: rgba(180, 79, 102, 0.08);
  }
`;

const TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

const TimeText = styled.div`
  font-size: 13px;
  font-weight: 800;
  opacity: 0.8;
  white-space: nowrap;
`;

const Arrow = styled.div`
  font-size: 20px;
  line-height: 1;
  opacity: 0.45;
  flex-shrink: 0;
`;

const TitleText = styled.div`
  font-size: 15px;
  font-weight: 900;
  line-height: 1.3;
`;

const MetaRow = styled.div`
  font-size: 13px;
  opacity: 0.75;
`;

const TagsWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: center;
`;

/* =========================
   Animation
========================= */

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
  }),
};

/* =========================
   Component
========================= */

const WeeklyAgendaView = ({ date, events = [], onSelectEvent, onNavigate }) => {
  const previousDateRef = useRef(date);
  const touchStartRef = useRef({ x: 0, y: 0 });
  const touchDeltaRef = useRef({ x: 0, y: 0 });

  const direction = moment(date).isAfter(previousDateRef.current) ? 1 : -1;

  useEffect(() => {
    previousDateRef.current = date;
  }, [date]);

  const weekEvents = useMemo(() => {
    const start = moment(date).startOf("isoWeek");
    const end = moment(date).endOf("isoWeek");

    return events
      .filter((e) => moment(e.start).isBetween(start, end, null, "[]"))
      .sort((a, b) => new Date(a.start) - new Date(b.start));
  }, [events, date]);

  const byDay = useMemo(() => {
    const map = new Map();

    for (const e of weekEvents) {
      const key = moment(e.start).format("YYYY-MM-DD");
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(e);
    }

    return [...map.entries()].sort(([a], [b]) => (a < b ? -1 : 1));
  }, [weekEvents]);

  const handleWeekChange = (dir) => {
    const nextDate =
      dir > 0
        ? moment(date).add(1, "week").toDate()
        : moment(date).subtract(1, "week").toDate();

    onNavigate?.(nextDate);
  };

  const handleTouchStart = (e) => {
    const touch = e.touches?.[0];
    if (!touch) return;

    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    touchDeltaRef.current = { x: 0, y: 0 };
  };

  const handleTouchMove = (e) => {
    const touch = e.touches?.[0];
    if (!touch) return;

    touchDeltaRef.current = {
      x: touch.clientX - touchStartRef.current.x,
      y: touch.clientY - touchStartRef.current.y,
    };
  };

  const handleTouchEnd = () => {
    const { x, y } = touchDeltaRef.current;

    const absX = Math.abs(x);
    const absY = Math.abs(y);

    if (absX > 60 && absX > absY * 1.3) {
      if (x < 0) {
        handleWeekChange(1);
      } else {
        handleWeekChange(-1);
      }
    }
  };

  return (
    <ScrollArea>
      <AnimatePresence mode="wait" custom={direction}>
        <AnimatedContent
          key={moment(date).startOf("isoWeek").format("YYYY-[W]WW")}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.2, ease: "easeOut" }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <Wrapper>
            <WeekHeader>
              <WeekHeaderTitle>Tydzień</WeekHeaderTitle>
              <WeekHeaderRange>{weekRangeLabel(date)}</WeekHeaderRange>
            </WeekHeader>

            <SwipeHint>Przesuń w lewo lub prawo, aby zmienić tydzień</SwipeHint>

            {weekEvents.length === 0 ? (
              <EmptyState>Brak wydarzeń w tym tygodniu</EmptyState>
            ) : (
              <DaysList>
                {byDay.map(([dayKey, items]) => {
                  const day = moment(dayKey, "YYYY-MM-DD");

                  return (
                    <DayCard key={dayKey}>
                      <DayHeader>{day.format("dddd, DD.MM")}</DayHeader>

                      <CardList>
                        {items.map((e) => (
                          <EventCard
                            key={e.id}
                            onClick={() => onSelectEvent?.(e)}
                            type="button"
                            aria-label={`Otwórz szczegóły: ${e.title}`}
                          >
                            <TopRow>
                              <TimeText>
                                {fmtTime(e.start)}–{fmtTime(e.end)}
                              </TimeText>
                              <Arrow>›</Arrow>
                            </TopRow>

                            <TitleText>{e.title}</TitleText>

                            <MetaRow>{e.location || "-"}</MetaRow>

                            <TagsWrap>
                              {e.isEvent && <Tag type="event" size="sm" />}
                              {e.isIndividual && (
                                <Tag type="individual" size="sm" />
                              )}
                              {e.isSolo && <Tag type="solo" size="sm" />}
                              {e.level !== null && e.level !== undefined && (
                                <SkillLevelBadge value={e.level} size="sm" />
                              )}
                            </TagsWrap>
                          </EventCard>
                        ))}
                      </CardList>
                    </DayCard>
                  );
                })}
              </DaysList>
            )}
          </Wrapper>
        </AnimatedContent>
      </AnimatePresence>
    </ScrollArea>
  );
};
export default WeeklyAgendaView;
