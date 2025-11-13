import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';
import AddJob from './pages/AddJob';
import ProtectedRoute from './components/ProtectedRoute';

//routing struncture for the app
export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            
            <Route 
              path="/add-job"
              element={
                <ProtectedRoute>
                  <AddJob />
                </ProtectedRoute>
              } />

              {/* <Route path="*" element={<Navigate to="/login"/>} /> */}
        </Routes>
      </Router>
    </AuthProvider>
  )
}