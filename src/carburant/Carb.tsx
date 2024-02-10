import React , { useState } from 'react'
import { Navy } from "../nav/Navy";
import axios from 'axios';
import { Link ,useNavigate } from 'react-router-dom'; 

export const Carb=()=> {
    let navigate = useNavigate() ;
    const[categorie,setCategorie] =useState<{ [key: string]: string }>({
        nom:''
      });
    const onInputChange=(e: React.ChangeEvent<HTMLInputElement>) =>{
        const newData = {...categorie}
        newData[e.target.name] = e.target.value
        setCategorie(newData);
        console.log(newData);
            }

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
                  await axios.post('https://vaikaback-production.up.railway.app/carburant', categorie,config);
                  navigate('/acceuil');
                } catch (error) {
                  console.error('Erreur lors de la soumission du formulaire :', error);
                }
              };
         
    return (
   <div>
  
         <Navy/>
      
        <div className='container'>
        <nav className="navbar">
        <ul>
            <li><Link  to="/listeCarb">Liste de carburant</Link></li>
        </ul>
    </nav>
            <div className="row log">
                  <h1 className='text-center fw-normal mb-3 '>Ajout Carburant</h1>
                      <div className="col-lg-4"></div>
                      <div className="col-lg-4 shadow ">
                        <form onSubmit={onSubmit}>
                        <div className="input-group mb-3 mt-5">
                                  <span className="input-group-text" id="basic-addon1">Nom</span>
                                  <input  name="nom"type={"text"}
                                  value={categorie.nom}
                                  className="form-control" placeholder="Nom" aria-label="Username" aria-describedby="basic-addon1"
                                  onChange={onInputChange} required/>
                              </div>
                              <button className='btn btn-outline-primary col-lg-12 mt-3 mb-5' type='submit'>Submit</button>
                              {/* <NavLink className="navbar-brand" to="/acceuil"><button className='btn btn-outline-primary col-lg-12 mt-3 mb-5'>Ajouter</button></NavLink> */}
                        </form>
                      </div>
                      <div className="col-lg-4"></div>
            </div>
        </div>
   </div>
    );


}