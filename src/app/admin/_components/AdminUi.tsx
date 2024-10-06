import React from "react";
import AdminDashboardCards from "./admin-dashboard-cards";
import { admin_ui_routes, user_ui_routes } from "@/config/admin.config";

const AdminUi = () => {
  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-xl font-semibold">Users</h3>
      <div className="grid lg:grid-cols-4 grid-cols-3 gap-x-2 gap-y-3">
        {user_ui_routes.map((item: any, index: any) => (
          <AdminDashboardCards key={index} name={item.name} url={item.path} />
        ))}
      </div>
      <h3 className="text-xl font-semibold">Admin</h3>
      <div className="grid lg:grid-cols-4 grid-cols-3 gap-x-2 gap-y-3">
        {admin_ui_routes.map((item: any, index: any) => (
          <AdminDashboardCards key={index} name={item.name} url={item.path} />
        ))}
      </div>
    </div>
  );
};

export default AdminUi;
