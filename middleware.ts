import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import {
    apiAuthPrefix,
    publicRoutes,
    DEFAULT_LOGIN_REDIRECT_URL,
    authRoutes,


} from "@/route"

const { auth } = NextAuth(authConfig);


export default auth((req) =>{
    const {nextUrl} = req;
    const isAutenticated = !!req.auth;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);

    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);


    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    if(isApiAuthRoute){
        return ;
    }


    if(isAuthRoute){
        if(isAutenticated){
            return  Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT_URL,nextUrl));
        }

        return;
    }

    if(!isAutenticated && !isPublicRoute){
        return Response.redirect(new URL("/auth/login",nextUrl));
    }

    return;
})


export const config = {
   matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
  };