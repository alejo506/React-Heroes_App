import React, { useMemo } from 'react'
import { Redirect, useHistory, useParams } from 'react-router'
import { getHeroeById } from '../../selectors/getHeroeById';
import './HeroeScreen.css';

//Necesitamos extraer los id enviados el componente HeroeCard.js por el URL
//Con este CustomHook extraeremos los parametros que vayan por el URL
export const HeroeScreen = ({ history }) => { //Esta propiedad la extraemos de HeroScreen, ir a la pestaña componets desde el navegador y al final HeroeScreen. utilizaremos el history para devolvernos a la página anterior
    //----------------------------------------------------------------------------------------------------------------   
    // const params=useParams();
    // console.log(params);// {heroeId: "marvel-spider"} //Devuelve un objeto
    const { heroeId } = useParams();
    // console.log(heroeId);

    //----------------------------------------------------------------------------------------------------------------   
    //Necesitamos toda la información del Heroe. Hacemos uso del selector getHeroeById
    // const hero = getHeroeById(heroeId);
    // console.log(hero);

    //useMemo. Si el heroeId no cambia no tiene porque volver a generar o ejecutar este codigo
    const hero = useMemo(() => getHeroeById(heroeId), [heroeId]);

    if (!hero) { //Si hero no existe "undefined" entonces obligatoriamente tiene que retornar algo, en este caso retorna el componente <Redirect to="/"/> para que redireccione a la pagina de Marvel
        return <Redirect to="/" />
    }

    // const { replace } = useHistory(); //Esto se utiliza en la linea 41

    const handleBack = () => { //Necesitaremos la propiedad history -> goBack

        //Primera forma de hacer que vuelva a la pagina anterior cuando estamos navegando en incognito, pero la mejor manera de hacerlo es utilizando el customHook de history ,ver en la segunda forma 
        if(history.length <= 2){ //Si la longitud del historial es menor a 2, osea, es 1 entonces redirige a marvel
            history.push('/');
        } else{

            history.goBack(); //Devolverse a la pagina anterior
        }
        //-----------------------------------------------------------------------------------------------

        //Segunda forma utilizando el useHistory
        // replace(`/${publisher === "DC Comics" ? "dc" : "marvel"}`); //Si el publisher fuera igual a DC Comics vaya a la ruta dc de lo contrario publisher es igual a Marvel Comics por lo tanto va a la ruta marvel, tendriamos que cambiarlo si tuvieramos más de 2 publisher, tal ves con un switch(me permite tener varios casos). OJO: si utilizo el history.replace tendría que poner la barra al frente de dc y marver, ejemplo: /dc y /marvel 
    }

    //Desestructuramos el objeto, quitamos el "id" porque el id es heroeId. Tenemos un proble y es que si escribimos cualquier cosa en el url que no sea un id nos dará undefine y por ende un error y tenemos que manejar eso 
    const { superhero, publisher, alter_ego, first_appearance, characters } = hero;

    //usehistory
    //-----------------------------------------------------------------------------------------------



    return (

        <div className="d-flex justify-content-center">

        <div className="card mb-3 mt-5" >
            <div className="row g-0">
                <div className="col-md-4 col-md-auto col-sm-12  img-card animacion">
                    <img
                        src={`../assets/heroes/${heroeId}.jpg`}
                        className="img-thumbnail"
                        
                        />
                </div>
                <div className="col-md-8 col-md-auto col-sm-12 ">
                    <div className="card-body">
                        <h5 className="card-title display-3 mb-4 ms-4">{superhero}</h5>
                        <ul className="card-text list- group list-group-flush">
                            <li className="card-text list-group-item"><p className="mov-izq-der"><b> Alter ego:</b > {alter_ego}</p></li>
                            <li className="card-text list-group-item"><p className="mov-izq-der"><b> Publisher:</b> {publisher}</p></li>
                            <li className="card-text list-group-item"><p className="mov-izq-der"><b> First appearance:</b> {first_appearance}</p></li>
                        </ul>
                        <br />
                        <div style={{ marginLeft: 47 }}>

                            <h5 className="mov-izq-der"  > Characters</h5>
                            <p className="mb-5 mov-izq-der">{characters}</p>
                            <button
                                className="btn-lg mov-izq-der"
                                onClick={handleBack}
                                >
                                Back
                </button>
                        </div>


                    </div>
                </div>
            </div>
        </div>
                                    </div>
        // <div className="row mt-5">
        //     <div className="col-3" style={{border:"dotted",borderColor:"red"}}>
        //         <img 
        //             src={`../assets/heroes/${ heroeId }.jpg`}
        //             className="img-thumbnail"
        //         />
        //     </div>
        
        //     <div className="col-7">
        //         <h3> {superhero}</h3>
        //         <ul className="list- group list-group-flush">
        //             <li className="list-group-item"><b> Alter ego:</b> {alter_ego}</li>
        //             <li className="list-group-item"><b> Publisher:</b> {publisher}</li>
        //             <li className="list-group-item"><b> First appearance:</b> {first_appearance}</li>
        //         </ul>
        
        //         <h5> Characters</h5>
        //         <p>{characters}</p>
        
        //         <button 
        //         className="btn btn-outline-info"
        //         onClick={handleBack}
        //         >
        //             Back
        //         </button>
        //     </div>
        
        // </div>
        )
    }
    