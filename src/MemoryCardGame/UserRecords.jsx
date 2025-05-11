import { useEffect, useState } from 'react';
import axios from 'axios';
import './Play.css';
import { useNavigate } from 'react-router-dom';
import calmBackground from "../assets/images/calm-wallpaper.jpg";

const UserRecords = () => {
  const [records, setRecords] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/users/${localStorage.getItem('userEmail')}/game-data`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setRecords(response.data);
      } catch (err) {
        setError('Failed to fetch user records.');
      }
    };
    fetchRecords();
  }, []);

  return (
    <div className="background-container" 
      style={{
        backgroundImage: `url(${calmBackground})`,
      }}
    >
      <h1 className="game-title">Game Records</h1>
      {error && <p className="error">{error}</p>}
      <table style={{ backgroundColor: 'rgba(0,0,0,0.7)', color: '#fff', borderCollapse: 'collapse', width: '90%', maxWidth: '800px', fontFamily: 'Orbitron' }}>
        <thead>
          <tr>
            <th style={thStyle}>Date</th>
            <th style={thStyle}>Failed</th>
            <th style={thStyle}>Difficulty</th>
            <th style={thStyle}>Completed</th>
            <th style={thStyle}>Time Taken</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record, index) => (
            <tr key={index}>
              <td style={tdStyle}>{new Date(record.gameDate).toLocaleString()}</td>
              <td style={tdStyle}>{record.failed}</td>
              <td style={tdStyle}>{record.difficulty}</td>
              <td style={tdStyle}>{record.completed}</td>
              <td style={tdStyle}>{record.timeTaken}s</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => navigate('/play')} className="play-button" style={{ marginTop: '40px', marginBottom: '20px' }}>Back to Menu</button>
    </div>
  );
};

const thStyle = {
  border: '1px solid #ccc',
  padding: '10px',
  backgroundColor: '#4a4e69',
};

const tdStyle = {
  border: '1px solid #ccc',
  padding: '10px',
  textAlign: 'center',
};

export default UserRecords;
