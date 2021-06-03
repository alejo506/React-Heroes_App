import React from 'react'
// import { heroes } from '../../data/heroes'
import { HeroesList } from '../heroes/HeroesList'
import '../marvel/Marvel-DC.css'

export const MarvelScreen = () => {


    return (
        <div>
            {/* <h1>Marvel Screen</h1> */}

            <div className="contenedorPadre ">

                <div className="marvel-logo animate__animated animate__pulse">
                    <img src={`./assets/heroes/marvel-logo.png`} className="card-img" />
                </div>
            </div>


            <hr />

            <HeroesList publisher={'Marvel Comics'} /> {/*Esto es lo que le enviamos al publisher */}

        </div>
    )
}
