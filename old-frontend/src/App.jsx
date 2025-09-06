import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegistrationForm from "./pages/RegistrationForm";
import AdminDashboard from "./pages/AdminDashboard";
import AnimatedCanvas from "./components/AnimatedCanvas";
import { ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import "react-toastify/dist/ReactToastify.css";
import HackathonPage from "./pages/HackathonPage";
import Premium from "./components/Premium";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen relative text-white overflow-hidden">
        <AnimatedCanvas />

        {/* Main content must grow */}
        <main className="flex-grow flex flex-col items-center px-4 py-10">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <motion.header
                    className="text-center max-w-4xl space-y-4 z-10"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                  >
                    <TypeAnimation
                      sequence={[
                        "Join CodingMeet",
                        1500,
                        "Learn Web Development",
                        1500,
                        "Absolutely Free",
                        1500,
                      ]}
                      wrapper="h1"
                      speed={50}
                      className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight drop-shadow-lg text-yellow-300"
                      repeat={Infinity}
                    />
                    <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
                      Build real-world skills in HTML, CSS, JavaScript, and React.
                      Perfect for beginners — 100% free courses, projects & community support.
                    </p>
                  </motion.header>

                  <Premium />

                  <div className="w-full max-w-4xl pb-22 z-10">
                    <RegistrationForm />
                  </div>
                </>
              }
            />

            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/hackathon" element={<HackathonPage />} />
          </Routes>
        </main>

        <Footer />

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar
          closeOnClick
          pauseOnHover
        />
      </div>
    </Router>
  );
}

export default App;
