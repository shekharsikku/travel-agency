import {
  type RouteConfig,
  index,
  layout,
  route,
  prefix,
} from "@react-router/dev/routes";

export default [
  layout("routes/admin/admin-layout.tsx", [
    route("dashboard", "routes/admin/dashboard.tsx"),
    route("all-users", "routes/admin/all-users.tsx"),
    ...prefix("trips", [
      index("routes/admin/trips.tsx"),
      route("create", "routes/admin/create-trip.tsx"),
      route(":tripId", "routes/admin/trip-detail.tsx"),
    ]),
  ]),
  layout("routes/root/root-layout.tsx", [
    index("routes/root/travel-redirect.tsx"),
    ...prefix("travel", [
      index("routes/root/travel-page.tsx"),
      route(":tripId", "routes/root/travel-detail.tsx"),
      route(":tripId/success", "routes/root/payment-success.tsx"),
    ]),
  ]),
  route("sign-in", "routes/root/sign-in.tsx"),
  route("api/create-trip", "routes/api/create-trip.ts"),
  route("api/get-trips", "routes/api/get-trips.ts"),
] satisfies RouteConfig;
