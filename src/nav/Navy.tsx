import 'bootstrap/dist/css/bootstrap.min.css';
import './Navy.css';
import { NavLink } from "react-router-dom";
export const Navy = () =>{
return(


 <div className="sidebar">
 <h2>ADMIN</h2>
 <nav>
     <ul>
         <li><NavLink  to="/acceuil">Accueil</NavLink></li>
         <li><NavLink  to="/annonce"> Annonce</NavLink></li>
         <li><NavLink  to="/cat"> Categorie</NavLink></li>
         <li><NavLink  to="/marque"> Marques</NavLink></li>
         <li><NavLink to="/model"> Model</NavLink></li>
         <li><NavLink  to="/carb"> Carburant</NavLink></li>
     </ul>
 </nav>
</div>
);


}