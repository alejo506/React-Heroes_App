import React from 'react';
import { Link } from 'react-router-dom';
import './HeroCard.css'
//Como tenemos las imagenes en el directorio "src" en lugar de assets utilizamos el webpack para mostrar las imagenes de manera dinamica(que cambien dependiendo de su id), hacemos la importacion desde heroeScreen
import { heroImages } from '../../helpers/heroImages';



export const HeroCard = ({ id, superhero, publisher, alter_ego, first_appearance, characters }) => {


    return (
        <Link to={`./hero/${id}`} > {/*Con este link envia el id a la ruta ./hero */}
 
                <div className="card my-card ">
                    {/* <img src={`./assets/heroes/${id}.jpg`} className="card-img" alt={superhero} /> */}
                    <img src={ heroImages(`./${id}.jpg`).default} className="card-img" alt={superhero} />
                    <div className="profile-name">{superhero}</div>
                    <div className="profile-position">{alter_ego}</div>
                    <div className="profile-overview">
                        <div className="profile-overview">

                            <h3>{publisher}</h3>
                            <p>Primera aparición: <br />{first_appearance}</p>
                            {
                                // Si los alter_ego son diferentes a los characters entonces que muestre los otros caracteres en párrafos, un personaje puede tener varios characters(nombres)
                                (alter_ego !== characters)
                                && <p>{characters}</p>
                            }

                        </div>
                    </div>
                </div>

        </Link>
    )
}
