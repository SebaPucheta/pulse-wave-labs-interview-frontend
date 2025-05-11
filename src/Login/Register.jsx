import { useState } from 'react';
import styles from './Register.module.css';
import { registerUser } from '../utils/cognito';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData.email, formData.password);
      alert("Your registration was succesfully, please login");
      navigate('/login');
    } catch (error) {
      setMessage(error.message || 'Error registering');
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input
          type="text"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className={styles.input}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button type="submit" className={`${styles.button} ${styles.registerButton}`}>
            Register
          </button>
          <button type="button" onClick={handleLoginRedirect} className={`${styles.button} ${styles.loginButton}`}>
            Login
          </button>
        </div>
        {message && <p className={styles.message}>{message}</p>}
      </form>
    </div>
  );
};

export default Register;