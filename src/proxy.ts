import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from './lib/auth'
import { headers } from 'next/headers'


export async function proxy(request: NextRequest) {

    const session = await auth.api.getSession({
        headers: await headers(),
    })

    const user = session?.user
    console.log("User from proxy:", user)

    if (!user) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    console.log("Session from proxy:", session)
}



export const config = {
  matcher: [
    "/create-event",
    "/joined-events",
    "/managed-events",
    "/profile",
  ],
}