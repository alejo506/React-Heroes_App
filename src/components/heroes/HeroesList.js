import React, { useMemo } from 'react';
import { getHeroesByPublisher } from '../../selectors/getHeroesByPublisher';
import { HeroCard } from './HeroCard';

export const HeroesList = ({ publisher }) => { //Recibimos el publisher desde DCScreen y MarvelScreen. publisher se en encuentra en nuestro arreglo de heroes y solo tendremos 2 tipos de publisher(DC Comics y Marvel Comics)

    // utilizamos nuestro selector
    // Como NO vamos a mutar la información simplemente creamos la constante heroes
    // const heroesss = getHeroesByPublisher( publisher ); // Enviamos el publisher

    //Creamos nuestra variable memorizada. 178-useMemo. Si el publisher no cambia no tiene porque volver a generar la información, por eso utilizamos el useMemo para memorizar
    const heroesss = useMemo(() => getHeroesByPublisher(publisher), [publisher]); //Se ejecuta la función solamente si el [publisher] cambia 
    return (
        //Quitamos la etiqueta <ul/> y añadimos el </div> para trabajar con las cards de Boostrap

        //    <div className="row row-cols-md-3  ">
        <div className="container">
            <div className=" row row-cols-1 row-cols-md-2 g-4 g-lg-3 row-cols-xl-4 g-xl-auto row-cols-xs-2 g-xs-2 animate__animated animate__fadeIn">

                {/*Ahora barremos cada uno de los elementos para mostrarlos en pantalla */}
                {//Estos {} es para utilizar la expresión de JS

                    heroesss.map(hero => ( //Este () es para retornar un objeto
                        // Cambiamos el <li/> por <HeroCard/>
                        <HeroCard
                            key={hero.id}
                            {...hero} /*Enviamos el operador express a HeroCard para extraer cada una de las propiedades de hero */
                        />

                    ))
                }


            </div>
        </div>
    )
}
