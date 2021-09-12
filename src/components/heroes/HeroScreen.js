import React, { useMemo } from "react";
import { Redirect, useParams } from "react-router-dom";
import { heroImages } from "../../helpers/heroImages";
import { getHeroesById } from "../../selectors/getHeroesById";
// import batman from "../../assets/heroes/dc-batman.jpg";


export const HeroScreen = ({ history }) => {
  const { heroeId } = useParams();

  //   const hero = getHeroesById(heroeId);
  const hero = useMemo(() => getHeroesById(heroeId), [heroeId]);

  if (!hero) {
    return <Redirect to="/" />;
  }

  const { id, superhero, publisher, alter_ego, first_appearance, characters } =
    hero;

  const handleReturn = () => {
    if (history.length <= 2) {
      history.push("/");
    } else {
      history.goBack();
    }
  };

  return (
    <div>
      <h1>HeroScreen</h1>
      <hr />
      <div className="row mt-5">
        <div className="col-6">
          <img
            // src={`../assets/heroes/${id}.jpg`} //Desde public/assets
            // src={batman} // import
            src={ heroImages(`./${id}.jpg`).default }
            className="img-thumbnail animate__animated animate__fadeInLeft"
            alt={superhero}
          />
        </div>

        <div className="col-6">
          <h3 className="card-title">{superhero}</h3>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              Alter ego: <b>{alter_ego}</b>
            </li>
            <li className="list-group-item">Publisher: {publisher}</li>
            <li className="list-group-item">
              First appearance: {first_appearance}
            </li>
          </ul>

          <h3>Characters</h3>
          <p>{characters}</p>

          <button className="btn btn-outline-info" onClick={handleReturn}>
            Return
          </button>
        </div>
      </div>
    </div>
  );
};
