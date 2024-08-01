import { useSession } from "next-auth/react";


/**
 * 
 * This hook is used to get the current user from the session
 * @returns user object from session
 */
export const useCurrentUser = () => {
    const session = useSession();
    return session.data?.user;
}


