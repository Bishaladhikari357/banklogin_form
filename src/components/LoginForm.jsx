import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import "./LoginForm.css"

const schema = z.object({
  phone: z.string()
    .regex(/^\d{10}$/, 'Phone must be 10 digits'), // Accept only 10 digits
  password: z.string().min(4, 'Password too short'),
});

export default function LoginForm() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Accept only digits in the phone number field
  const handlePhoneChange = (e) => {
    const onlyDigits = e.target.value.replace(/\D/g, ''); // Remove non-digits
    setPhone(onlyDigits);
  };

  const handleLogin = () => {
    const result = schema.safeParse({ phone, password });
    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const admins = JSON.parse(localStorage.getItem('admins') || '[]');

    const user = users.find(u => u.phone === phone && u.password === password);
    const admin = admins.find(a => a.phone === phone && a.password === password);

    if (user) {
      navigate('/user');
    } else if (admin) {
      navigate('/admin');
    } else {
      setError('Invalid credentials!');
    }
  };

  return (
    <div className='Logincontainer'>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
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
      <button onClick={handleLogin}>Login</button>
      <p>Don't have an account? <a href="/signup">Sign up</a></p>
    </div>
  );
}
