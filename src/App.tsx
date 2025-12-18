import { Route, Routes } from "react-router";
import { VisitedPage } from "./pages/VisitedPage";
import { Layout } from "./layout/Layout";
import { StatsPage } from "./pages/StatsPage";
import { TripsPage } from "./pages/TripsPage";
import { SettingsPage } from "./pages/SettingsPage";
import { AuthCheck } from "./AuthCheck";
import { LoginPage } from "./pages/LoginPage";
import { TimeLinePage } from "./pages/TimelinePage";

export const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route element={<AuthCheck />}>
          <Route path="/" element={<VisitedPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path={"stats"} element={<StatsPage />} />
          <Route path={"trips"} element={<TripsPage />} />
          <Route path={"timeline"} element={<TimeLinePage />} />
          <Route path={"settings"} element={<SettingsPage />} />
        </Route>
      </Route>
    </Routes>
  );
};
