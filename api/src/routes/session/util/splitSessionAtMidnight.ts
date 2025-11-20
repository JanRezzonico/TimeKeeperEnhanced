import { addDays, startOfDay, endOfDay, isSameDay, min } from "date-fns";

interface SessionInput {
  start: Date;
  end: Date | null;
  note: string;
}

interface SessionSplit {
  start: Date;
  end: Date;
  note: string;
}

/**
 * Splits a session into multiple sessions, each within a single calendar day.
 * If the session is within one day, returns an array with a single session.
 */
const splitSessionAtMidnight = (session: SessionInput): SessionSplit[] => {
  // If the session has no end, return as is
  if (!session.end) {
    return [session as SessionSplit];
  }

  const { start, end, note } = session;

  // Should never happen as it should already be validated earlier
  // but let's keep it just in ca se
  if (end <= start) {
    throw new Error("Session end must be after start");
  }

  const sessions: SessionSplit[] = [];
  let currentStart = start;

  while (!isSameDay(currentStart, end)) {
    const currentEnd = endOfDay(currentStart);
    sessions.push({
      start: currentStart,
      end: currentEnd,
      note,
    });
    currentStart = addDays(startOfDay(currentStart), 1);
  }

  // Add the last segment (same day as end)
  sessions.push({
    start: currentStart,
    end,
    note,
  });

  return sessions;
};

export default splitSessionAtMidnight;
