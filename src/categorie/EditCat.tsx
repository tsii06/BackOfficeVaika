import React , { useState,useEffect } from 'react'
import { Navy } from "../nav/Navy";
import {NavLink, useParams } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

export const EditCat=()=> {
    const { id} = useParams<{ id: string }>();
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
            useEffect(()=>{
                loadCat();
            });
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
                  await axios.put(`https://vaikaback-production.up.railway.app/categorie/${id}`, categorie,config);
                  navigate('/listeC');
                } catch (error) {
                  console.error('Erreur lors de la soumission du formulaire :', error);
                }
              };
        
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
                const result = await axios.get(`https://vaikaback-production.up.railway.app/categorie/${id}`, config);
                
                // Mettez à jour seulement la propriété nom de l'état existant
                setCategorie((prevCategorie) => ({
                  ...prevCategorie,
                  nom: result.data.nom,
                }));
              } catch (error) {
                console.error('Erreur lors du chargement de la catégorie:', error);
              }
            };
            
         
    return (
   <div>
         <Navy/>
        <div className='container'>
            <div className="row log">
                  <h1 className='text-center fw-normal mb-3 '>Edit Categorie</h1>
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
                              <button className='btn btn-outline-primary col-lg-12 mt-3 mb-2' type='submit'>Submit</button>
                              <NavLink className="navbar-brand" to="/listeC"><button className='btn btn-outline-danger col-lg-12  mt-3 mb-2 '>Cancel</button></NavLink>
                        </form>
                      </div>
                      <div className="col-lg-4"></div>
            </div>
        </div>
   </div>
    );


}