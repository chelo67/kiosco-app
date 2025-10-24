import { guestCredentials } from "@/auth/dal";
import { defineAction } from "astro:actions";

export const auth = {
    signinAsGuest: defineAction({
        handler: async () => {
            const res = await fetch(`${import.meta.env.AUTH_URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(guestCredentials)
            })

            const json = await res.json()
            console.log(json)
        }
    })
}