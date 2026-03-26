import { Footer } from "@/components/shared/Footer";
import { NavBar } from "@/components/shared/NavBar";
import { Toaster } from "@/components/ui/sonner";
import { AdminPage } from "@/pages/AdminPage";
import { LandingPage } from "@/pages/LandingPage";
import { LandlordPage } from "@/pages/LandlordPage";
import { TenantPage } from "@/pages/TenantPage";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";

function RootLayout() {
  return (
    <div className="min-h-screen bg-background font-sans flex flex-col">
      <NavBar />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
      <Toaster />
    </div>
  );
}

const rootRoute = createRootRoute({ component: RootLayout });

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: LandingPage,
});

const landlordRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/landlord",
  component: LandlordPage,
});

const tenantRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tenant",
  component: TenantPage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  landlordRoute,
  tenantRoute,
  adminRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
