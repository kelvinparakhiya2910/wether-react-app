import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext';
import Main from './Components/Main';
import Home from './Components/Home';
import ProtectedRoute from './Components/ProtectedRoute';
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Main />
            }
          />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
