import { db } from "@/lib/db";

export async function getFirstSmtpConnection(){
    try{
        const smtp = await db.smtp.findFirst()
        return {
            servername: smtp?.servername,
            port: smtp?.port,
            username: smtp?.username,
            password: smtp?.password,
            displayname: smtp?.displayname,
            to:smtp?.toEmail,
            from:smtp?.fromEmail
        }
    }
    catch(error){
        return null;
    }
}