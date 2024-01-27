import { Navy } from "../nav/Navy";
import { Statistique } from "../stat/Statistique";
import Stat from "../statistique/Stat";
import './Acceuil.css';
export const Acceuil = () =>{
  const data = [10, 20, 15, 25, 30];
  const labels = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai'];
return(
 <div>
   <Navy/>
            <h3 className='text-center mt-3'>
                  Statistiques Des Voitures
            </h3>   
     <div className='stat row'>
            <div className='container col-lg-12 '>
              
                <div className="item">
                  <Statistique name="Voitures total" count={10}/>
                </div>
                <div className="item">
                  <Statistique name="Voitures Vendues" count={2}/>  
                </div>
                <div className="item ">
                <Statistique name="Voitures restant" count={10-2}/>
                </div>
              </div> 
            
           
     </div>
      <div className="row d-flex justify-content-center">
            <div className="col-lg-4 ">
              <h1>Statistiques de vente de voitures</h1>
                <Stat data={data} labels={labels}/>
              </div>
      </div>
    
    
 </div>
);
}