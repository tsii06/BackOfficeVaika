import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navy.css';
import { NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
export const Navy = () =>{
return(

<nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
      <NavLink className="navbar-brand" to="/acceuil">Navbar</NavLink>
    {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button> */}
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink className="nav-link active" to="/annonce"> Annonce</NavLink>
        </li>
        <li className="nav-item">
        <NavLink className="nav-link active" to="/cat"> Categorie</NavLink>
        </li>
         <li className="nav-item">
        <NavLink className="nav-link active" to="/marque"> Marques</NavLink>
        </li>
         <li className="nav-item">
        <NavLink className="nav-link active" to="/model"> Model</NavLink>
        </li>
        <li>
        <NavLink className="nav-link active" to="/carb"> Carburant</NavLink>
        </li>
            <NavDropdown title="Liste" id="basic-nav-dropdown">
              <NavLink className="nav-link active" to="/listeC"> Liste Categorie</NavLink>
              <NavLink className="nav-link active" to="/listeM"> Liste Marque</NavLink>
              <NavLink className="nav-link active" to="/listeMo"> Liste Modele</NavLink>
              <NavLink className="nav-link active" to="/listeCarb"> Liste Carburant</NavLink>


              {/* <NavDropdown.Item href="listeMo">Liste Model</NavDropdown.Item>
              <NavDropdown.Item href="listeC">Liste Categorie</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="listeMa">Liste Marque</NavDropdown.Item> */}
            </NavDropdown>
        {/* <li className="nav-item">
          <a className="nav-link" href="#">Link</a>
        </li> */}

      
      </ul>
      <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>
);


}