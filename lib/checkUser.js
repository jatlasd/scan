import { currentUser } from "@clerk/nextjs/server";
import { db } from "./db";

export const checkUser = async () => {
    const user = await currentUser();
    if (!user) {
        return null
    }

    let loggedInUser = await db.user.findUnique({
        where: { id: user.id},

    })

    if(!loggedInUser) {
        loggedInUser = await db.user.create({
            data: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.emailAddresses[0].emailAddress,
            }
        })
    }

    return loggedInUser;
}