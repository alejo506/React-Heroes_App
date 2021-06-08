import React from 'react';
// import { heroes } from '../../data/heroes'
import { HeroesList } from '../heroes/HeroesList';
import '../marvel/Marvel-DC.css';

//Como el Logo de Marvel es estático utilizamos el import en lugar de heroImages(este se importa desde heroeScreen)
import marvel from '../../assets/heroes/marvel-logo.png';


export const MarvelScreen = () => {


    return (
        <div>
            {/* <h1>Marvel Screen</h1> */}

            <div className="contenedorPadre ">

                <div className="marvel-logo animate__animated animate__pulse">
                    {/* <img src={`./assets/heroes/marvel-logo.png`} className="card-img" /> */} {/*Esto se utiliza cuando la imagen está en public/assets/heroes */}
                    <img src={marvel} className="card-img" /> {/*Imagen estatica desde la carpeta "src" utilizamos el import */}

                </div>
            </div>


            <hr />

            <HeroesList publisher={'Marvel Comics'} /> {/*Esto es lo que le enviamos al publisher */}

        </div>
    )
}
