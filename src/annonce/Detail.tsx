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

type Photo ={
  idAnnonce :string;
  path : string;
}
export const Detail = () => {
  let navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [cats, setCats] = useState<Category | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
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
      const [categoryResult, photosResult] = await Promise.all([
        axios.get(`https://vaika-production.up.railway.app/annonce/${id}`, config),
        axios.get(`https://vaika-production.up.railway.app/photos/${id}`,config), // Replace with your actual photo API endpoint
      ]);

      setCats(categoryResult.data);
      setPhotos(photosResult.data);
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
        'Content-Type': 'application/json',
      },
    };
    try {
      const response = await axios.patch(
        `https://vaika-production.up.railway.app/annonce/${idCategorie}/statut?statut=2`,
        null, // Utilisez null pour le corps de la requête si aucun corps n'est nécessaire
        config
      );
      console.log('Réponse de l\'API :', response);
      navigate('/annonce');
    } catch (error) {
        console.log("kd");
    }
  }

  useEffect(() => {
    loadCat();
  });

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

  
               <h2>Photos</h2>
                <div className="photo-grid">
                  {photos.length > 0 ? (
                    photos.map((photo, index) => (
                      <img key={index} src={`data:image/jpeg;base64,${photo.path}`} className="card-img-top" />
                    ))
                  ) : (
                    <div className="placeholder-image">Aucune photo disponible.</div>
                  )}
                </div>
               <div className="buttons">
                
                   <Link className='btn btn-primary mx-2' to={"/annonce"}>Retour</Link>
                   <Link to={""} onClick={() => patchCat(cats.idAnnonce)} className="btn btn-success ml-2">Valider</Link>
               </div>
           </div>

  
       </div>

        )}
      </div>
    </div>
  );
};
