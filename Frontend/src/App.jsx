import { Box, Card } from "@mui/material";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import ChangePassword from "./components/change-password/ChangePassword";
import ForgotPassword from "./components/forgot-password/ForgotPassword";
import DemoCardDetails from "./components/framer/DemoCardDetails";
import FramerCard from "./components/framer/FramerCard";
import FramerCardData from "./components/framer/FramerCardData";
import LandingPage from "./components/landing/LandingPage";
import Login from "./components/login/Login";
import Navbar from "./components/navbar/Navbar";
import PrimaryUserDetails from "./components/Profile/primary-user-details/PrimaryUserDetails";
import Registration from "./components/registration/Registration";

const AppContent = () => {
  return (
    <Card>
      <Box
        style={{
          height: "100vh",
          width: "100vw",
          overflow: "auto",
          backgroundPosition: "center -17%",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          maxWidth: "100%",
          maxHeight: "100vh",
        }}
      >
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/framer-data" element={<FramerCardData />} />
          <Route path="/profiles" element={<FramerCard />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route
            path="/all-details/:mobileNumber"
            element={<DemoCardDetails />}
          />
          <Route path="/grid" element={<PrimaryUserDetails />} />
        </Routes>
      </Box>
    </Card>
  );
};

function App() {
  return (
    <div className="app">
      <Router>
        <AppWrapper />
      </Router>
    </div>
  );
}

const AppWrapper = () => {
  const location = useLocation();

  const hideNavbarRoutes = [
    "/login",
    "/register",
    "/forgot-password",
    "/change-password",
  ];

  const hideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}
      <AppContent />
    </>
  );
};

export default App;
