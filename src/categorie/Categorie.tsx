import React, { useState } from 'react';
import { Navy } from '../nav/Navy';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Categorie = () => {
  let navigate = useNavigate();
  const [categorie, setCategorie] = useState<{ [key: string]: string }>({
    nom: '',
  });

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newData = { ...categorie };
    newData[e.target.name] = e.target.value;
    setCategorie(newData);
    console.log(newData);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const jwtToken = localStorage.getItem('jwtToken');
      if (!jwtToken) {
        console.error('Jetons JWT non trouvés');
        // Vous pouvez gérer la redirection vers la page de connexion ici
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      };

      // Vous pouvez également gérer le cas où la requête échoue avec try/catch
      const response = await axios.post(
        'https://vaika-production.up.railway.app/categorie',
        categorie,
        config
      );

      // Si la requête réussit, vous pouvez gérer la redirection ici
      console.log('Réponse de la requête :', response.data);
      navigate('/acceuil');
    } catch (error) {
      // Gérer les erreurs de la requête ici
      console.error('Erreur lors de la soumission du formulaire :', error);
    }
  };

  return (
    <div>
      <Navy />
      <div className="container">
        <div className="row log">
          <h1 className="text-center fw-normal mb-3">Ajout Categorie</h1>
          <div className="col-lg-4"></div>
          <div className="col-lg-4 shadow">
            <form onSubmit={onSubmit}>
              <div className="input-group mb-3 mt-5">
                <span className="input-group-text" id="basic-addon1">
                  Nom
                </span>
                <input
                  name="nom"
                  type={'text'}
                  value={categorie.nom}
                  className="form-control"
                  placeholder="Nom"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  onChange={onInputChange}
                  required
                />
              </div>
              <button className="btn btn-outline-primary col-lg-12 mt-3 mb-5" type="submit">
                Soumettre
              </button>
            </form>
          </div>
          <div className="col-lg-4"></div>
        </div>
      </div>
    </div>
  );
};
