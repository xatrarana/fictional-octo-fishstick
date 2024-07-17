import { auth } from "@/auth";
import AdminRender from "@/layout/admin-render";
import SiteRender from "@/layout/site-renderer";

export default async function Home() {
  const session = await auth()
  return (
      <>
       {
        session && <AdminRender/>
       }
       {
        !session && <SiteRender/>
       }
      </>
  );
}
