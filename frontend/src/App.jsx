import { Routes, Route } from 'react-router-dom'

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import VehiclesPage from './pages/VehiclePage'
import VehicleDetailPage from './pages/VehicleDetailPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/login" element={<LoginPage />} />

      <Route path="/register" element={<RegisterPage />} />

      <Route path="/vehicles" element={<VehiclesPage />} />
      
      <Route path="/vehicles/:id" element={<VehicleDetailPage />} />
    </Routes>
  )
}

export default App