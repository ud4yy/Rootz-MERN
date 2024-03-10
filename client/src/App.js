import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import { Overview } from './pages/Overview';
import { Hall } from './pages/ConferenceHall';
import { Club } from './pages/Club';
import { Adminlogin } from './pages/AdminLogin';
import { FineDine } from './pages/Finedine';
import { Manage } from './pages/Manage';
import { Navbar } from './pages/Navbar';
import { BookingsList } from "./pages/BookingsList";

function App() {
  const isLoggedIn = !!localStorage.getItem('accessToken');

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Overview className="overview" />} />
          <Route path="/finedine" element={<FineDine />} />
          <Route path="/managebooking" element={<Manage />} />
          <Route path="/club" element={<Club />} />
          <Route path="/conferencehall" element={<Hall />} />
          <Route path="/adminlogin" element={<Adminlogin />} />
          <Route path="/bookings" element={<BookingsList />} /> {/* Updated path */}
          {isLoggedIn ? (
            <Route path="/bookings" element={<BookingsList />} />
          ) : (
            // Redirect to adminlogin if not logged in
            <Route path="/*" element={<Navigate to="/adminlogin" />} />
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
