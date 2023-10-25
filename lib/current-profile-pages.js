import { getAuth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export const currentProfilePages = async (req) => {
    const { userId } = getAuth(req);
    const userID = userId

    if (!userId) {
        return null;
    }

    const profile = await db.profile.findUnique({
        where: {
            userID
        }
    });

    return profile;
}