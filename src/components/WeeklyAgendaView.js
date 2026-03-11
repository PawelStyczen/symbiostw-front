import React, { useMemo } from "react";
import moment from "moment";
import styled from "styled-components";
import Tag from "./Tag";
import SkillLevelBadge from "./SkillLevelBadge";

// Formatki
const fmtTime = (d) => moment(d).format("HH:mm");

const weekRangeLabel = (date) => {
  const start = moment(date).startOf("isoWeek");
  const end = moment(date).endOf("isoWeek");
  return `${start.format("DD.MM")} – ${end.format("DD.MM")}`;
};

const ScrollArea = styled.div`
  max-height: calc(100vh - 300px);
  overflow-y: auto;
  padding-right: 4px;

  -webkit-overflow-scrolling: touch;

  @media (max-width: 768px) {
    max-height: calc(100vh - 450px);
  }
`;
/* =========================
   Styled Components
========================= */

const Wrapper = styled.div`
  padding: 12px;
  min-height: 50vh;
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

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeadRow = styled.tr`
  text-align: left;
`;

const Th = styled.th`
  padding: 7px 10px;
  white-space: nowrap;
`;

const TableRow = styled.tr`
  cursor: pointer;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  transition: background-color 0.15s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.03);
  }
`;

const Td = styled.td`
  padding: 10px 12px;
  vertical-align: middle;
`;

const TimeCell = styled(Td)`
  white-space: nowrap;
  font-weight: 800;
  font-size: 14px;
`;

const TitleCell = styled(Td)`
  font-size: 14px;
`;

const LocationCell = styled(Td)`
  opacity: 0.85;
  font-size: 14px;
`;

const TagsCell = styled(Td)`
  white-space: nowrap;
`;

const TagsWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  justify-content: flex-start;
  align-items: center;
`;

/* =========================
   Component
========================= */

const WeeklyAgendaView = ({ date, events = [], onSelectEvent }) => {
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

  return (
    <ScrollArea>
      <Wrapper>
        <WeekHeader>
          <WeekHeaderTitle>Tydzień</WeekHeaderTitle>
          <WeekHeaderRange>{weekRangeLabel(date)}</WeekHeaderRange>
        </WeekHeader>

        {weekEvents.length === 0 ? (
          <EmptyState>Brak wydarzeń w tym tygodniu</EmptyState>
        ) : (
          <DaysList>
            {byDay.map(([dayKey, items]) => {
              const day = moment(dayKey, "YYYY-MM-DD");

              return (
                <DayCard key={dayKey}>
                  <DayHeader>{day.format("dddd, DD.MM")}</DayHeader>

                  <TableWrapper>
                    <StyledTable>
                      <tbody>
                        {items.map((e) => (
                          <TableRow
                            key={e.id}
                            onClick={() => onSelectEvent?.(e)}
                          >
                            <TimeCell>
                              {fmtTime(e.start)}–{fmtTime(e.end)}
                            </TimeCell>

                            <TitleCell>{e.title}</TitleCell>

                            <LocationCell>{e.location || "-"}</LocationCell>

                            <TagsCell>
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
                            </TagsCell>
                          </TableRow>
                        ))}
                      </tbody>
                    </StyledTable>
                  </TableWrapper>
                </DayCard>
              );
            })}
          </DaysList>
        )}
      </Wrapper>
    </ScrollArea>
  );
};

export default WeeklyAgendaView;
