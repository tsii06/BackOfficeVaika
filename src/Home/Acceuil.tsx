import { Navy } from "../nav/Navy";
import Stat from "../statistique/Stat";
import StatByUse from "../statistique/StatByUse";
import './Acceuil.css';

export const Acceuil = () => {
  return (
    <div>
      <Navy />

      {/* <div className="row bg-white"> */}
        {/* <h3 className='text-center text-white mt-3'>
          Chart
        </h3> */}
      <div className="container">
      <div>
          <div className="col-lg-10">
            <Stat title="Graphique nombre de vente par date" />
          </div>
          <div className="col-lg-10">
            <StatByUse />
          </div>
      </div>
        </div>
      {/* </div> */}
    </div>
  );
}