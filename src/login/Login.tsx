import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Utilisez useNavigate au lieu de useHistory
import './login.css';

export const Login: React.FC = () => {
  const navigate = useNavigate(); 

  const [user, setUser] = useState({
    email: 'tsiory@gmail.com',
    mdp: '123'
  });

  const handleLogin = async () => {
    try {
        
        const response = await fetch('https://vaikaback-production.up.railway.app/auth', {
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
<div className="login">
    <div className="login-container">
          <h2>Connexion</h2>
         
              <div className="input-group">
                  <input type="email" id="email" placeholder="Adresse e-mail" value={user.email} onChange={handleEmailChange}/>
              </div>
              <div className="input-group">
                  <input type="password" id="password" placeholder="Mot de passe" value={user.mdp}  onChange={handlePasswordChange} />
                  <span  className="toggle-password">Voir</span>
              </div>
              <button type="submit" onClick={handleLogin}>Se connecter</button>
          
      </div>
      </div>

  );
};
