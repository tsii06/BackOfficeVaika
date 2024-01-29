import React from 'react';
import './App.css';
import './all.css';
import { Acceuil } from './Home/Acceuil';
import { Annonce } from './annonce/Annonce';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { Login } from './login/Login';
import { Marque } from './marque/Marque';
import { Modele } from './modele/Modele';
import { Categorie } from './categorie/Categorie';
import { AllCat } from './categorie/AllCat';
import { EditCat } from './categorie/EditCat';
import { AllMarque } from './marque/AllMarque';
import { EditMarque } from './marque/EditMarque';
import { EditModele } from './modele/EditModele';
import { AllModele } from './modele/AllModele';
import { AllCarb } from './carburant/AllCarb';
import { EditCarb } from './carburant/EditCarb';
import { Carb } from './carburant/Carb';
import { Detail } from './annonce/Detail';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element = {<Login/>}/> 
        <Route path="/acceuil" element = {<Acceuil/>}/>
      
        {/* categorie */}
        <Route path="/cat"  element={<Categorie/>} />
        <Route path="/listeC" element={<AllCat/>} />
        <Route path="/editCat/:id" element={<EditCat/>} />
        {/* marque  */}
        <Route path="/marque" element={<Marque/>} />
        <Route path="/listeM" element={<AllMarque/>} />
        <Route path="/editMarque/:id" element={<EditMarque/>} />
        {/* modele */}
        <Route path="/model" element={<Modele/>} />
        <Route path="/listeMo" element={<AllModele/>} />
        <Route path="/editModele/:id" element={<EditModele/>} />
            {/* carb */}
        <Route path="/carb" element={<Carb/>} />
        <Route path="/listeCarb" element={<AllCarb/>} />
        <Route path="/editCarb/:id" element={<EditCarb/>} />
        {/* annonce */}
        <Route path="/annonce" element={<Annonce/>}></Route>
        {/* detailAnnonce */}
        <Route path="/detail/:id" element={<Detail/>} />

      </Routes>
    </Router>
  );
}

export default App;
