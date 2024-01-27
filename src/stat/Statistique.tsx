import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './statistique.css';
type StatistiqueProps = {
    name: String,
    count:number
}
export const Statistique=(props:StatistiqueProps)=> {
return(
    <div className="card mt-5 ml-5 mx-auto shadow" style={{ width: '18rem' }}>
          <div className="card-body">
            <h5 className="card-title text-center">{props.name}</h5>
            <p className="card-text text-center text-bold" style={{ fontWeight: 'bold' }}>{props.count}</p>
          </div>
    </div>
  
  );
}