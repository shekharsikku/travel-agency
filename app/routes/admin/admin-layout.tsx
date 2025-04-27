import type { Route } from "./+types/admin-layout";
import { Outlet, redirect } from "react-router";
import { SidebarComponent } from "@syncfusion/ej2-react-navigations"
import { MobileSidebar, NavItems } from "~/components";
import { getExistingUser, storeUserData } from "~/appwrite/auth";
import { account } from "~/appwrite/client";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Admin - Tourvisto" },
    { name: "description", content: "Travel Agency Platform" },
  ];
}

export async function clientLoader() {
  try {
    const user = await account.get();

    if (!user.$id) return redirect("/sign-in");

    const existingUser = await getExistingUser(user.$id);

    if (existingUser?.status === "user") return redirect("/travel");

    return existingUser?.$id ? existingUser : await storeUserData();
  } catch (error) {
    console.log("Error in client loader:", error)
    return redirect("/sign-in")
  }
}

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <MobileSidebar />

      <aside className="w-full max-w-[270px] hidden lg:block">
        <SidebarComponent width={270} enableGestures={false}>
          <NavItems />
        </SidebarComponent>
      </aside>

      <aside className="children">
        <Outlet />
      </aside>
    </div>
  )
}

export default AdminLayout;