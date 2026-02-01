import { cache } from "@/lib/cashe";
import { db } from "@/lib/prisma";

export const getUsers = cache(
  async () => {
    const users = await db.user.findMany();
    return users;
  },
  ["users"],
  { revalidate: 3600 },
);
export const getUser = cache(
  async (userId: string) => {
    const user = await db.user.findUnique({ where: { id: userId } });
    return user;
  },
  ["user"],
  { revalidate: 3600 },
);
