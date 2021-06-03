import React from 'react'
// import { heroes } from '../../data/heroes'
import { HeroesList } from '../heroes/HeroesList'
import '../marvel/Marvel-DC.css'


export const DcScreen = () => {
    return (
        <div>
            {/* <h1 className="text-center fw-bold display-4" style={{backgroundColor:"rgb(12, 124, 236)", color:"white"}}>DC Screen</h1> */}
            <div className="contenedorPadre">
                <div className="dc-logo animate__animated animate__pulse">
                    <img src={`./assets/heroes/DC-logo.png`} className="card-img" />
                    {/* <h1 className="titulo display-1 fw-bold" >DC Comics</h1> */}
                </div>
            </div>


            {/* <div className="reset"></div> */}

            <hr />
            <HeroesList publisher="DC Comics" /> {/* Envia los publisher como un string si no agrego la expresión de JS {}, ver ejemplo en el MarvelScreen lo hice de la otra forma, cualquier de las dos formas es correcta */}
        </div>
    )
}
