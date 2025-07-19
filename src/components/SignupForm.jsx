import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // ⬅️ Link imported from 'react-router-dom'
import { z } from 'zod';
import "./SignupForm.css"
// Validate exactly 10 digits for phone
const schema = z.object({
  phone: z.string().regex(/^\d{10}$/, 'Phone must be 10 digits'),
  password: z.string().min(4, 'Password too short'),
  role: z.enum(['user', 'admin']),
});

export default function SignupForm() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handlePhoneChange = (e) => {
    const digitsOnly = e.target.value.replace(/\D/g, '');
    setPhone(digitsOnly);
  };

  const handleSignup = () => {
    const result = schema.safeParse({ phone, password, role });
    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }

    const key = role === 'admin' ? 'admins' : 'users';
    const accounts = JSON.parse(localStorage.getItem(key) || '[]');

    const exists = accounts.find(a => a.phone === phone);
    if (exists) {
      setError('Account with this phone already exists.');
      return;
    }

    accounts.push({ phone, password });
    localStorage.setItem(key, JSON.stringify(accounts));

    alert(`${role} account created successfully!`);
    navigate('/');
  };

  return (
    <div className='Signupcontainer'>
      <h2>Create Account</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <select value={role} onChange={e => setRole(e.target.value)}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>

      <input
        type="text"
        placeholder="Phone Number"
        value={phone}
        onChange={handlePhoneChange}
        maxLength={10}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <button onClick={handleSignup}>Sign Up</button>

      {/* 🔗 Login link below signup button */}
      <p>Already have an account? <Link to="/">Login</Link></p>
    </div>
  );
}
