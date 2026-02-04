import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from "../src/component/navbar"
import Login from './pages/Login';
import Register from './pages/signup';
import Home from './pages/Home';
import FilterJob from './pages/FilterJob';
import Browes from './pages/Browes';
import Profile from './pages/Profile';
import Edit from './pages/Edit';
import Admincompanie from './compainepages/admincompanie';
import Createcompany from './compainepages/createcompany'
import SingleCompany from './compainepages/singleCompany';
import Alladminjobs from './compainepages/alladminJobs';
import AddJobs from './compainepages/AddJobs';
import Applicant from './compainepages/Applicant';



function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<FilterJob />} />
        <Route path="/Profile" element={<Profile />} />
         <Route path="/Edit" element={<Edit />} />
         <Route path='/admin/company/create' element={<Createcompany />} />
        <Route path="/Browser" element={<Browes />} />
        <Route path="/login" element={<Login />} />
        <Route path='/admin/companies/:id' element={<SingleCompany/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/Companies" element={<Admincompanie />} />
        <Route path="/admin/jobs" element={<Alladminjobs />} />
        <Route path='/admin/job/create' element={<AddJobs />} />
         <Route path='/admin/jobs/:id/applicants' element={<Applicant />} />
      </Routes>
    </>
  )
}

export default App
