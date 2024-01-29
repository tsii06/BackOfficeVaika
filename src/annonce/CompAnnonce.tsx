import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import axios from 'axios';  // N'oubliez pas d'importer axios
import  { useEffect, useState } from 'react';

type AnnonceProps = {
  titre: string;
  detail: string;
  utilisateur: string;
  imageSource: string;
  idA: string;
};

type Photo ={
  idAnnonce :string;
  path : string;
}

export const CompAnnonce = (props: AnnonceProps) => {
  const [categorie, setCategorie] = useState<Photo[]>([]);

  const loadPhoto = async () => {
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
      const result = await axios.get(`https://vaika-production.up.railway.app/photos/${props.idA}`, config);
      setCategorie(result.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des photos:', error);
    }
  }

  useEffect(() => {
    loadPhoto();
  }, [props.idA]);

  return (
    <div className='container'>
      <div className="card mx-auto" style={{ width: '18rem' }}>
      {categorie.length > 0 ? (
          <img src={"data:image/jpeg;base64," + categorie[0].path} className="card-img-top" alt="Annonce Preview" />
        ) : (
          <div className="placeholder-image">Chargement...</div>
        )}
        <div className="card-body">
          <h5 className="card-title text-center">{props.titre}</h5>
          <p className="card-text ">{props.detail}</p>
          <p className="card-text ">{props.utilisateur}</p>

          <div className="row">
            <div className="">
              <Link className=' col-lg-12 btn btn-outline-success mx-2' to={`/detail/${props.idA}`}>
                Detail
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
