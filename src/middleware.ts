import { defineMiddleware } from "astro:middleware";
import { verifySession } from "./auth/dal";

export const onRequest = defineMiddleware( async(ctx, next) => {

    const { pathname } = ctx.url
    const isAdminRoute = pathname.startsWith('/admin')
    const isOrderRoute = pathname.startsWith('/order')

    const isProtected = isAdminRoute || isOrderRoute

    if(!isProtected) return next()

    const token = ctx.cookies.get('FRESHCOFFEE_TOKEN')?.value ?? ''
    const { user } = await verifySession(token)
    if(!user) {
        return Response.redirect(new URL('/', ctx.url), 302)
    }
    next()
})