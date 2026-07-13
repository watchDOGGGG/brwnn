import { Routes, Route } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Programmes from "./pages/Programmes";
import Events from "./pages/Events";
import Membership from "./pages/Membership";
import Shop from "./pages/Shop";
import Resources from "./pages/Resources";
import Community from "./pages/Community";
import Contact from "./pages/Contact";

import DashboardHome from "./pages/dashboard/DashboardHome";
import Profile from "./pages/dashboard/Profile";
import PortalEvents from "./pages/dashboard/PortalEvents";
import PortalProgrammes from "./pages/dashboard/PortalProgrammes";
import CoursesResources from "./pages/dashboard/CoursesResources";
import PortalCommunity from "./pages/dashboard/PortalCommunity";
import Settings from "./pages/dashboard/Settings";

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/programmes" element={<Programmes />} />
        <Route path="/events" element={<Events />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/community" element={<Community />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardHome />} />
        <Route path="profile" element={<Profile />} />
        <Route path="events" element={<PortalEvents />} />
        <Route path="programmes" element={<PortalProgrammes />} />
        <Route path="courses" element={<CoursesResources />} />
        <Route path="community" element={<PortalCommunity />} />
        <Route path="wellbeing" element={<Settings title="Wellbeing Tracker" />} />
        <Route path="shop" element={<Settings title="Shop & Discounts" />} />
        <Route path="messages" element={<Settings title="Messages" />} />
        <Route path="announcements" element={<Settings title="Announcements" />} />
        <Route path="settings" element={<Settings title="Settings" />} />
      </Route>
    </Routes>
  );
}
