import { Navy } from "../nav/Navy";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from "react-router-dom";
import './Detail.css';
type Category = {
  idAnnonce: string;
  dateAnnonce: string;
  utilisateur: {
    nom: string;
  }
  voiture: {
    idVoiture: number;
    marque: {
      nom: string;
    }
    categorie: {
      nom: string;
    }
    modele: {
      nom: string;
    }
    carburant: {
      nom: string;
    }
    annee: number;
    kilometrage: number;
    nombrePlace: number;
    prix: number;
  };
  statut: number;
  description: string;
};

export const Detail = () => {
  let navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [cats, setCats] = useState<Category | null>(null);

  const loadCat = async () => {
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

    try {
      const result = await axios.get(`https://vaika-production.up.railway.app/annonce/${id}`, config);
      setCats(result.data);
    } catch (error) {
      console.error('Erreur lors du chargement de la catégorie :', error);
    }
  };

  const patchCat = async (idCategorie: string) => {
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
    await axios.patch(`https://vaika-production.up.railway.app/annonce/${idCategorie}/statut`, config)
    loadCat();
    navigate('/listeC');
  }

  useEffect(() => {
    loadCat();
  }, [id]);

  return (
    <div>
      <Navy />
      <div className='containers'>
        {cats && (
           <div className="container">
           <div className="car-details">
               <h1>Date : {cats.dateAnnonce}</h1>
               <div className="details">
                   <div className="detail">
                       <p>Marque :</p>
                       <span id="brand">{cats.voiture.marque.nom}</span>
                   </div>
                   <div className="detail">
                       <p>Modèle :</p>
                       <span id="model">{cats.voiture.modele.nom}</span>
                   </div>
                   <div className="detail">
                       <p>Année :</p>
                       <span id="year">{cats.voiture.annee}</span>
                   </div>
                   <div className="detail">
                       <p>Prix :</p>
                       <span id="price"> {cats.voiture.prix}</span>
                   </div>
                   <div className="detail">
                       <p>Nombre de place :</p>
                       <span id="price"> {cats.voiture.nombrePlace}</span>
                   </div>
                   <div className="detail">
                       <p>Carburant :</p>
                       <span id="price"> {cats.voiture.carburant.nom}</span>
                   </div>
                   <div className="detail">
                       <p>Kilometrage :</p>
                       <span id="price"> {cats.voiture.kilometrage}</span>
                   </div>
                 
               </div>
               <h5>Description :</h5>
               <p id="description">{cats.description}</p>
               <div className="buttons">
                
                   <Link className='btn btn-primary mx-2' to={"/annonce"}>Retour</Link>
                   <Link to={""} onClick={() => patchCat(cats.idAnnonce)} className="btn btn-success ml-2">Valider</Link>
                   <Link  to={""} onClick={() => patchCat(cats.idAnnonce)} className="btn btn-danger ml-2">Refuser</Link>
               </div>
           </div>
           <h2>Photos</h2>
           <div className="photo-grid">
            
            <img src="camaro.jpg" alt="Photo de la voiture"/>
            <img src="camaro.jpg" alt="Photo de la voiture"/>
            <img src="camaro.jpg" alt="Photo de la voiture"/>
            <img src="camaro.jpg" alt="Photo de la voiture"/>
        </div>
       </div>

        )}
      </div>
    </div>
  );
};
