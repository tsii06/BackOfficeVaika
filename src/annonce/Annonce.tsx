
import { Navy } from "../nav/Navy";
import { CompAnnonce } from "./CompAnnonce";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link,useParams, useNavigate } from "react-router-dom";
type Category = {
    idAnnonce: string;
    dateAnnonce: string;
    utilisateur : {
        nom:string;
    }
    voiture:{
        idVoiture : number;
        marque: {
            nom: string ;
        }
        categorie : {
            nom : string;
        }
        modele : {
            nom : string ;
        }
        carburant:{
            nom : string;
        }
        annee : number;
        kilometrage : number;
        nombrePlace:number;
        prix:number;
    };

    statut:number;
    description:string;
    };
export const Annonce = () => {
  let navigate = useNavigate();
  const [cats, setCats] = useState<Category[]>([]);

  useEffect(() => {
    loadCat();
  }, []);

  const loadCat = async () => {
    try {
      const result = await axios.get("https://vaika-production.up.railway.app/annonces");
      setCats(result.data);
      console.log(result);
    } catch (error) {
      console.error("Erreur lors du chargement des catégories :", error);
    }
  };

  const deleteCat = async (idAnnonce: string) => {
    const jwtToken = localStorage.getItem('jwtToken');
    if (!jwtToken) {
      console.error('Jetons JWT non trouvés');
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    await axios.delete(`https://vaika-production.up.railway.app/annonce/${idAnnonce}`, config);
    loadCat();
    navigate('/listeM');
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID Annonce</th>
            <th>Date Annonce</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cats.map((cat) => (
            <tr key={cat.idAnnonce}>
              <td>{cat.idAnnonce}</td>
              <td>{cat.dateAnnonce}</td>
              <td>
                <Link className='btn btn-outline-primary mx-2' to={`/editMarque/${cat.idAnnonce}`}>
                  Edit
                </Link>
                <Link
                  className='btn btn-outline-danger mx-2'
                  to={`/deleteCat/${cat.idAnnonce}`}
                  onClick={() => deleteCat(cat.idAnnonce)}
                >
                  Delete
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Navy />
      <div className="container">
        {cats.map((cat) => (
          <div key={cat.idAnnonce} className="item mt-5">
            <CompAnnonce
              titre={cat.dateAnnonce}
              detail={cat.description}
              utilisateur={cat.utilisateur.nom}
              imageSource={'/bm.jpg'}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
