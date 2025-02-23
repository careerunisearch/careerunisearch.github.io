import { useEffect } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import ReactGA from "react-ga4";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Intro from "./components/Intro";

// Khởi tạo Google Analytics với Measurement ID
ReactGA.initialize("G-1P92499427"); // Thay G-XXXXXXXXXX bằng Measurement ID của bạn

// Component để theo dõi thay đổi trang
function Analytics() {
  const location = useLocation();

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location.pathname });
  }, [location]);

  return null;
}

function App() {
  return (
    <div className="App">
      <Router>
        <Analytics /> {/* Theo dõi sự kiện chuyển trang */}
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/intro" element={<Intro />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
