import { Routes, Route } from 'react-router-dom'
import Complaint from './components/Complaint'
import Admin from './components/Admin'

function App() {

  return (
    <Routes>
      <Route path="/submit" element={<Complaint />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  )
}

export default App