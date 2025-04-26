import type { Route } from "./+types/admin-layout";
import { Outlet } from "react-router";
import { SidebarComponent } from "@syncfusion/ej2-react-navigations"
import { MobileSidebar, NavItems } from "~/components";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Admin - Travel Agency" },
    { name: "description", content: "Travel Agency Platform" },
  ];
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