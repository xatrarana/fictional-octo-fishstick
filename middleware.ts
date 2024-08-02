import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import {
    apiAuthPrefix,
    publicRoutes,
    DEFAULT_LOGIN_REDIRECT_URL,
    authRoutes,
    adminSettingsRoutes,


} from "@/route"

const { auth } = NextAuth(authConfig);


export default auth((req) =>{
    const {nextUrl} = req;
    const isAutenticated = !!req.auth;


    const isAdminSettingsRoute = adminSettingsRoutes.includes(nextUrl.pathname);

    if(isAdminSettingsRoute && !isAutenticated){
        return Response.redirect(new URL("/auth/login",nextUrl));
    }

    if(isAdminSettingsRoute && req.auth?.user.roleId !== 1) return Response.redirect(new URL("/auth/login",nextUrl));

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


// export const config = {
//    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
//   };


export const config = {
    matcher: ['/admin', '/admin/:path*','/auth/login'],
  };