import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './auth.context.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import ProjectRoutes from "./Routes.jsx";

createRoot(document.getElementById('root')).render(
 <AuthProvider>
  <Router>
    <ProjectRoutes/> // handles all the routing 
  </Router>
 </AuthProvider>
 // warped by auth provider (have auth context )- it is provided to entire application 
 // no matter in any route / component we get info about the auth(userId or token)
)
 