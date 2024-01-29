import { useState, useEffect } from 'react';
import axios from 'axios';
import './stat.css';  // Importez le fichier CSS ici

type StatData = {
  utilisateur: {
    nom: string;
  };
  nombreVentes: number;
};

const StatByUse = () => {
  const [utilisateurs, setUtilisateurs] = useState<StatData[]>([]);

  useEffect(() => {
    const fetchUtilisateurs = async () => {
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

        const response = await axios.get('https://vaika-production.up.railway.app/statByUtilisateur', config);
        const { data } = response;

        setUtilisateurs(data);
        console.log(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    };

    fetchUtilisateurs();
  }, []);

  return (
    <div className='text-center mt-3'>
      <h2 className='stat-title'>Liste des utilisateurs et de leurs ventes</h2>
      <table className='user-table'>
        <thead>
          <tr>
            <th>Nom d'utilisateur</th>
            <th>Nombre de ventes</th>
          </tr>
        </thead>
        <tbody>
          {utilisateurs.map((utilisateur, index) => (
            <tr key={index} className='user-item'>
              <td>{utilisateur.utilisateur.nom}</td>
              <td>{utilisateur.nombreVentes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default StatByUse;
