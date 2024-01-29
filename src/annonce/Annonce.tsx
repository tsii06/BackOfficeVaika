
import { Navy } from "../nav/Navy";
import { CompAnnonce } from "./CompAnnonce";
import axios from 'axios';
import  { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import './Annonce.css'
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
      const result = await axios.get("https://vaika-production.up.railway.app/annonce/statut/1",config);
      setCats(result.data);
      console.log(result);
    } catch (error) {
      console.error("Erreur lors du chargement des catégories :", error);
    }
  };



  return (
    <div>
      <Navy />
      <div className="content">
        <h2>Liste d' annonces </h2>
        {cats.map((cat) => (
          <div key={cat.idAnnonce} className="annonce">
           
            <CompAnnonce
              titre={cat.dateAnnonce}
              detail={cat.description}
              utilisateur={cat.utilisateur.nom}
              imageSource={'/bm.jpg'}
              idA={cat.idAnnonce}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
