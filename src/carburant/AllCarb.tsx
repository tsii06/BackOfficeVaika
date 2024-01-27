import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navy } from "../nav/Navy";
import { Link,useParams, useNavigate } from "react-router-dom";

type Category = {
  idCarburant: string;
    nom: string;
  };
export const AllCarb = ()=>{
  let navigate = useNavigate() ;
    const [cats,setCats] = useState<Category[]>([]);
    useEffect(()=>{
        loadCat();
    },[]);
    const loadCat = async () => {
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
          const result = await axios.get("https://vaika-production.up.railway.app/carburants",config);
          setCats(result.data);
      } catch (error) {
          console.error("Erreur lors du chargement des catégories :", error);
      }
  };
  // delete
  const { id} = useParams<{ id: string }>();
  const deleteCat= async(idCategorie:string)=>{
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
    await axios.delete(`https://vaika-production.up.railway.app/carburant/${idCategorie}`,config)
    loadCat();
    navigate('/listeCarb');
}
    return(
      <div>
        <Navy></Navy>
        <div className='container'>
      <div className='py-4 '>
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nom</th>
              <th scope="col">action</th>
            </tr>
          </thead>
          <tbody>
          {cats.map((cat) => (
            <tr key={cat.idCarburant}>
                <th scope="row">{cat.idCarburant}</th>
                <td>{cat.nom}</td>
                <td>
                    <Link 
                        className='btn btn-outline-primary mx-2' 
                        to={`/editCarb/${cat.idCarburant}`}
                    >
                        Edit
                    </Link>
                </td>
                <td>
                    <Link 
                        className='btn btn-outline-danger mx-2' 
                        to={`/deleteCat/${cat.idCarburant}`}
                        onClick={()=>deleteCat(cat.idCarburant)}
                    >
                    Delete
                    </Link>
                </td>
            </tr>
        ))}
          </tbody>
        </table>
      </div>
    </div>
      </div>





    );
}
