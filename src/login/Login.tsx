import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Utilisez useNavigate au lieu de useHistory
import './login.css';

export const Login: React.FC = () => {
  const navigate = useNavigate(); // Utilisez useNavigate au lieu de useHistory

  const [user, setUser] = useState({
    email: 'tsiory@gmail.com',
    mdp: '123'
  });

  const handleLogin = async () => {
    try {
        
        const response = await fetch('https://vaika-production.up.railway.app/auth', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              "email": user.email,
              "mdp": user.mdp
            }),
          });
    
          if (response.ok) {
            const data = await response.json();
            const token = data.token;
    

        if (token == null) {
          navigate('/');
          console.log(data);
        } else {
          localStorage.setItem('jwtToken', token);
          console.log(data);
          navigate('/acceuil');
        }
      } else {
        console.error('Erreur d\'authentification');
      }
    } catch (error) {
      console.error('Erreur réseau', error);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, email: e.target.value });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, mdp: e.target.value });
  };

  return (
    <div className='container mycomposant'>
      <div className="row log">
        <div className="col-lg-4"></div>
        <div className="col-lg-4">
          <h1 className='text-center fw-normal mb-3 mt-3'>Login</h1>
          <div className="input-group mb-3 mt-5">
            <span className="input-group-text" id="basic-addon1">@</span>
            <input
              type="email"
              className="form-control"
              value={user.email}
              placeholder="Email"
              aria-label="Email"
              aria-describedby="basic-addon1"
              onChange={handleEmailChange}
            />
          </div>
          <div className="input-group mb-3 mt-5">
            <span className="input-group-text" id="basic-addon1">Password</span>
            <input
              type="password"
              className="form-control"
              value={user.mdp}
              placeholder="Password"
              aria-label="Password"
              aria-describedby="basic-addon1"
              onChange={handlePasswordChange}
            />
          </div>
          <button type='button' onClick={handleLogin}>Login</button>
        </div>
        <div className="col-lg-4"></div>
      </div>
    </div>
  );
};
