import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UserProvider } from "./context/UserContext";
import { FeedbackProvider } from './context/FeedbackContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <FeedbackProvider>
        <App />
      </FeedbackProvider>
    </UserProvider>

   
  </StrictMode>,
)
