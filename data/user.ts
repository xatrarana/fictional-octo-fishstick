import { db } from "@/lib/db";


export const getUserByEmail = async (email: string) => {
    try {
        
        const user = await db.user.findUnique({
            where: {
                email
            }
        })

        return user;
    } catch (error) {
        return null;    
    }
}
export const getUserById = async (id: string) => {
    try {
        
        const user = await db.user.findUnique({
            where: {
                id
            }
        })
        return user;
    } catch (error) {
        return null;    
    }
}

export const getUserVerificationMethods = async (identifier: string) => {
    try {
        const user = await db.user.findFirst({
           where: {
            OR: [
                {username: identifier},
                {email: identifier}
            ]
           }
        });

        return user;
    } catch (error) {
        return null;
    }
}

export const getUserByUsername = async (username: string) => {
    try {
        const user = await db.user.findUnique({
            where: {username : username}
        })

        return user;
    } catch (error) {
       return null; 
    }
}

export async function checkUserHasUsername(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    return !!user?.username;
  }