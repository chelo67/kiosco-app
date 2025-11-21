import { guestCredentials } from "@/auth/dal";
import { nullToEmptyString } from "@/utils";
import { defineAction } from "astro:actions";
import { z } from "astro:schema";

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
    }),

    signIn: defineAction({
        accept: 'form',
        input: z.object({
            username: z.preprocess(
                nullToEmptyString,
                z.string().min(1, {message: 'El Usuario no puede ir vacio'})
            ),
            password: z.preprocess(
                nullToEmptyString,
                z.string().min(1, {message: 'El Usuario no puede ir vacio'})
            ),
        }),
        handler: async (input, ctx) => {
            console.log(input)
        }
    }),


    signOut: defineAction({
        handler: (_, ctx) => {
            ctx.cookies.delete('FRESHCOFFEE_TOKEN', {
                path: '/',
            })
        }
    })
}