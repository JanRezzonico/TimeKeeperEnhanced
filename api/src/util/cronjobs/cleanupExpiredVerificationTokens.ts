import db from "../../lib/db.js";

const cleanupExpiredVerificationTokens = async () => {
  const now = new Date();
  try {
    const deleted = await db.verificationToken.deleteMany({
      where: {
        expiresAt: {
          lt: now,
        },
      },
    });
    if (deleted.count > 0) {
      console.log(
        `[Cron] Deleted ${deleted.count} expired verification tokens.`
      );
    }
  } catch (error) {
    console.error("[Cron] Error deleting expired tokens:", error);
  }
};

export default cleanupExpiredVerificationTokens;
