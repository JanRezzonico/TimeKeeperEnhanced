import db from "./db.js";

const isEmailTaken = async (email: string): Promise<boolean> => {
  const user = await db.user.findUnique({
    where: { email },
  });
  return user !== null;
};

export { isEmailTaken };
