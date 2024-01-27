import 'bootstrap/dist/css/bootstrap.min.css';
type AnnonceProps = {
    titre:String,
    detail:String,
    utilisateur:string;
    imageSource: string;
  }
export const CompAnnonce = (props:AnnonceProps)=>{
return(
  <div className='container'>
  <div className="card mx-auto" style={{ width: '18rem' }}>
    <img src={props.imageSource} className="card-img-top" alt="..." />
    <div className="card-body">
      <h5 className="card-title text-center">{props.titre}</h5>
      <p className="card-text text-center">{props.detail}</p>
      <p className="card-text text-center">{props.utilisateur}</p>

      <div className="row">
        <div className="col-lg-4 col-md-4">
          <a href="#" className="btn btn-outline-primary ml-2">Valider</a>
        </div>
        <div className="col-lg-4 col-md-4">
        </div>
        <div className="col-lg-4 col-md-4">
          <a href="#" className="btn btn-outline-danger ml-2">Refuser</a>
        </div>
      </div>
    </div>
  </div>
</div>



);




}