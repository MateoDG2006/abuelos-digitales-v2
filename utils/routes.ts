import { createBrowserRouter } from "react-router";
import { Welcome } from "../pages/Welcome";
import { Onboarding } from "../pages/Onboarding";
import { RoleExplanation } from "../pages/RoleExplanation";
import { Register } from "../pages/Register";
import { Login } from "../pages/Login";
import { Dashboard } from "../pages/Dashboard";
import { Calendar } from "../pages/Calendar";
import { Search } from "../pages/Search";
import { Profile } from "../pages/Profile";
import { Settings } from "../pages/Settings";
import { Tutorial } from "../pages/Tutorial";
import { MainLayout } from "../components/MainLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Welcome,
  },
  {
    path: "/onboarding",
    Component: Onboarding,
  },
  {
    path: "/role/:roleType",
    Component: RoleExplanation,
  },
  {
    path: "/register/:roleType",
    Component: Register,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/tutorial",
    Component: Tutorial,
  },
  {
    path: "/app",
    Component: MainLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "calendar", Component: Calendar },
      { path: "search", Component: Search },
      { path: "profile", Component: Profile },
      { path: "settings", Component: Settings },
    ],
  },
]);
