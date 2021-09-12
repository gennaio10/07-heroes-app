import React from "react";
import { Link } from "react-router-dom";
import { heroImages } from "../../helpers/heroImages";

export const HeroCard = ({
  id,
  superhero,
  alter_ego,
  first_appearance,
}) => {
  return (
    <div className="card mb-3" style={{ maxWidth: 300 }}>


      <img src={ heroImages(`./${id}.jpg`).default } alt={superhero} />


      <div className="col-md-8">
        <div className="card-body">
          <h5 className="card-title">{superhero}</h5>
          <p className="card-text">{alter_ego}</p>
          <p className="card-text">
            <small className="text-muted">{first_appearance}</small>
          </p>
          <Link to={`./hero/${id}`}>Mas...</Link>
        </div>
      </div>
    </div>
  );
};
