import RegistrationForm from './components/RegistrationForm';
import UserList from './components/UserList';
import AnimatedCanvas from './components/AnimatedCanvas';
import { ToastContainer } from 'react-toastify';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="relative min-h-screen flex flex-col items-center px-4 py-10 space-y-16 text-white overflow-hidden">
      <AnimatedCanvas />

      <motion.header
        className="text-center max-w-4xl space-y-4 z-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <TypeAnimation
          sequence={[
            'Join CodingMeet',
            1500,
            'Learn Web Development',
            1500,
            'Absolutely Free',
            1500,
          ]}
          wrapper="h1"
          speed={50}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight drop-shadow-lg text-yellow-300"
          repeat={Infinity}
        />

        <motion.p
          className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.8 }}
        >
          Build real-world skills in HTML, CSS, JavaScript, and React. Perfect for beginners — 100% free courses, projects & community support.
        </motion.p>
      </motion.header>

      <div className="w-full max-w-4xl z-10">
        <RegistrationForm />
      </div>

      <UserList />

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar closeOnClick pauseOnHover />
    </div>
  );
}

export default App;
