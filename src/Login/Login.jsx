import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import { loginUser, confirmUser } from '../utils/cognito';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const session = await loginUser(formData.email, formData.password);
      localStorage.setItem('token', session.getIdToken().getJwtToken());
      localStorage.setItem('userEmail', session.getAccessToken().decodePayload().username);
      onLogin();
      navigate('/play');
    } catch (error) {
      if (error.code === "UserNotConfirmedException") {
        setShowConfirmModal(true);
        return;
      }
      setError(error.message || 'Error logging in');
    }
  };

  const handleConfirm = async () => {
    try {
      await confirmUser(formData.email, confirmationCode);
      setShowConfirmModal(false);
      onLogin();
      navigate('/play');
    } catch (err) {
      setError(err.message || 'Error confirming code');
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
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
          <button type="submit" className={`${styles.button} ${styles.loginButton}`}>
            Login
          </button>
          <button type="button" onClick={handleRegisterRedirect} className={`${styles.button} ${styles.registerButton}`}>
            Register
          </button>
        </div>
        {error && <p className={styles.error}>{error}</p>}
      </form>

      {showConfirmModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Confirm your email</h3>
            <input
              type="text"
              placeholder="Verification Code"
              value={confirmationCode}
              onChange={(e) => setConfirmationCode(e.target.value)}
              className={styles.input}
            />
            <div className={styles.modalButtonGroup}>
              <button onClick={handleConfirm} className={`${styles.button} ${styles.loginButton}`}>
                Confirm
              </button>
              <button onClick={() => setShowConfirmModal(false)} className={`${styles.button} ${styles.registerButton}`}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;