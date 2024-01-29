import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

type StatistiqueProps = {
    name: String,
    count:number
}
export const Statistique=(props:StatistiqueProps)=> {
return(

 
          <div className="stat">
              <h3>{props.name}</h3>
              <p id="total-cars">{props.count}</p>
          </div>
      

  );
}