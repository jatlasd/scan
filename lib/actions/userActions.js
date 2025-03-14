"use server"

import { db } from "../db"
import { checkUser } from "../checkUser"

export async function initializeUserSettings() {
    const user = await checkUser();
    if (!user) {
        return null
    }

    const settings = await db.userSettings.create({
        data: {
            userId: user.id
        }
    });

    return settings;
}