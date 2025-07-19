import {  Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
  return (
      <Routes>
        <Route path="/" element={<LoginForm/>} />
        <Route path="/signup" element={<SignupForm/>} />
        <Route path="/user" element={<UserDashboard/>} />
        <Route path="/admin" element={<AdminDashboard/>} />
      </Routes>
  );
}
