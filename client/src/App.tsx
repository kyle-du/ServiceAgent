import { Routes, Route, Navigate } from 'react-router-dom'
import Complaint from './components/Complaint'
import Admin from './components/Admin'

function App() {

  return (
    <Routes>
      <Route path = "/" element={<Navigate to="/submit" replace />}/>
      <Route path="/submit" element={<Complaint />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  )
}

export default App