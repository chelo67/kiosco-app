import { guestCredentials } from "@/auth/dal";
import { defineAction } from "astro:actions";

export const auth = {
    signinAsGuest: defineAction({
        handler: async (input, ctx) => {
            const res = await fetch(`${import.meta.env.AUTH_URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(guestCredentials)
            })

            const json = await res.json()
            ctx.cookies.set('FRESHCOFFEE_TOKEN', json.token, {
                httpOnly: true,
                sameSite: 'strict',
                path: '/',
                maxAge: 60 * 60 * 24 * 7
            })
            
            return true
        }
    })
}