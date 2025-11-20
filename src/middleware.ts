import { defineMiddleware } from "astro:middleware";
import { verifySession } from "./auth/dal";

export const onRequest = defineMiddleware( async(ctx, next) => {

    const { pathname } = ctx.url
    const isAdminRoute = pathname.startsWith('/admin')
    const isOrderRoute = pathname.startsWith('/order')

    const isProtected = isAdminRoute || isOrderRoute

    if(!isProtected) {
        await next()
        return
    }

    const token = ctx.cookies.get('FRESHCOFFEE_TOKEN')?.value ?? ''
    const { user } = await verifySession(token)
    if(!user) {
        return Response.redirect(new URL('/', ctx.url), 302)
    }

    const {role} = user

    if(role === 'freshcoffee_customer') {
        if(isAdminRoute) {
            ctx.cookies.delete('FRESHCOFFEE_TOKEN', {
                path: '/'
            })
            return Response.redirect(new URL('/', ctx.url), 302)
        }
        return next()
    }
    return new Response('Rol no permitido', {status:403})
})