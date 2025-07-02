import RegistrationForm from './components/RegistrationForm';
import UserList from './components/UserList';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  localStorage.setItem("email", "sanjaychoudhury693@gmail.com")
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-700 via-purple-700 to-pink-600 flex flex-col items-center px-4 py-10 space-y-16 text-white">
        
        
        <header className="text-center max-w-4xl space-y-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight drop-shadow-lg">
            <span className="block text-yellow-300">Join CodingMeet</span>
            <span className="block text-white">Learn Web Development</span>
            <span className="block text-green-300">Absolutely Free </span>
          </h1>
          <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
            Build real-world skills in HTML, CSS, JavaScript, and React. Perfect for beginners — 100% free courses, projects & community support.
          </p>
        </header>

        
        <div className="w-full max-w-4xl">
          <RegistrationForm />
        </div>

    
        <UserList />

    
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar closeOnClick pauseOnHover />
      </div>
    </AuthProvider>
  );
}

export default App;
