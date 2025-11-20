import type { RequestHandler } from "express";
import type { PatchBodyType } from "../schemas/patchBodySchema.js";
import type { Session } from "../../../generated/prisma/client.js";
import db from "../../../lib/db.js";
import causesSessionOverlap from "../util/causesSessionOverlap.js";
import splitSessionAtMidnight from "../util/splitSessionAtMidnight.js";

const patchOne: RequestHandler<{ id: string }> = async (req, res) => {
  const { start, end, note } = req.body as PatchBodyType;
  const { id } = req.session as Session;
  const session = req.session as Session;
  const { id: userId } = req.user!;

  // Skip the whole process if only note is being updated
  if (start === undefined && end === undefined && note !== undefined) {
    await db.session.update({
      where: {
        id,
      },
      data: {
        note,
      },
    });
    return res.sendStatus(204);
  }

  // Avoid ever having start > end
  const actualStart = start ?? session.start;
  const actualEnd = end ?? session.end;
  const actualNote = note ?? session.note;
  if (actualEnd && actualStart > actualEnd) {
    return res
      .status(400)
      .json({ error: "End date must be after start date." });
  }

  if (await causesSessionOverlap(userId, actualStart, actualEnd, id)) {
    return res
      .status(400)
      .json({ error: "Session overlaps with an existing session." });
  }

  const records = splitSessionAtMidnight({
    start: actualStart,
    end: actualEnd,
    note: actualNote,
  });

  await db.$transaction(async (tx) => {
    // If only one record, just update the existing session
    if (records.length === 1) {
      await tx.session.update({
        where: {
          id,
        },
        data: {
          start: actualStart,
          end: actualEnd,
          note: actualNote,
        },
      });
      return;
    }

    // Multiple records, need to delete and recreate

    // First, delete the existing session
    await tx.session.delete({
      where: {
        id,
      },
    });

    // Then, create the new sessions
    await tx.session.createMany({
      data: records.map((record) => ({
        userId: session.userId,
        start: record.start,
        end: record.end,
        note: record.note,
      })),
    });
  });

  res.sendStatus(204);
};

export default patchOne;
