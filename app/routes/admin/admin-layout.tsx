import { Outlet } from "react-router";

const AdminLayout = () => {
  return (
    <div className="admin-layout">AdminLayout

      <aside className="children">
        <Outlet />
      </aside>
    </div>
  )
}

export default AdminLayout;