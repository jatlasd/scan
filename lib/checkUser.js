import { currentUser } from "@clerk/nextjs/server";
import { db } from "./db";
import { Prisma } from "@prisma/client";

export const checkUser = async () => {
    const user = await currentUser();
    if (!user) {
        return null
    }

    function getAllIncludes(modelName) {
        const model = Prisma.dmmf.datamodel.models.find(m => m.name === modelName);
        if (!model) return {};

        return Object.fromEntries(
            model.fields
                .filter(field => field.kind === "object")
                .map(field => [field.name, true])
        );
    }

    const includeRelations = getAllIncludes("User");

    let loggedInUser = await db.user.findUnique({
        where: { id: user.id },
        include: includeRelations,
    });

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