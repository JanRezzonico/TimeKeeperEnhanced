import db from "../../../lib/db.js";

/**
 * Checks whether a new session for a user would overlap with any existing sessions.
 *
 * Overlap is defined as any time period where two sessions intersect, including:
 *   - The new session starts during an existing session.
 *   - The new session ends during an existing session.
 *   - The new session completely contains an existing session.
 *   - Any session that is ongoing (`end === null`) overlaps with another ongoing session or
 *     a session that starts before the ongoing session.
 *
 * For ongoing sessions (`end === null`), they are considered to extend indefinitely into the future.
 *
 * @param userId - ID of the user whose sessions to check against.
 * @param start - Start time of the new session.
 * @param end - End time of the new session, or `null` if the session is ongoing.
 * @returns `true` if the new session would overlap with any existing session, `false` otherwise.
 */
const causesSessionOverlap = async (
  userId: string,
  start: Date,
  end: Date | null,
  excludeSessionId?: string
): Promise<boolean> => {
  // Treat ongoing sessions as ending far in the future
  const newSessionEnd = end ?? getMaxDate();

  // Fetch all existing sessions for the user that could overlap
  const existingSessions = await db.session.findMany({
    where: {
      userId,
      ...(excludeSessionId ? { NOT: { id: excludeSessionId } } : {}),
      OR: [
        {
          end: null, // ongoing sessions
        },
        {
          end: {
            gt: start, // sessions that end after the new session starts
          },
        },
      ],
    },
  });

  // Check for overlap, done in js to make things simpler
  return existingSessions.some((session) => {
    const sessionEnd = session.end ?? getMaxDate();
    return start < sessionEnd && session.start < newSessionEnd;
  });
};

const getMaxDate = () => new Date(8640000000000000);

export default causesSessionOverlap;
