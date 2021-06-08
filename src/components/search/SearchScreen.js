import React, { useMemo } from 'react';
import queryString from 'query-string';
import { useLocation } from 'react-router';
import { heroes } from '../../data/heroes'
import { useForm } from '../../hooks/useForm';
import { HeroCard } from '../heroes/HeroCard';
import { getHeroesByName } from '../../selectors/getHeroesByName';

export const SearchScreen = ({ history }) => {//1.QueryString. Hacemos el history para poder hacer un push()

    //3.QueryString. Utilizamos el hook para extraer la "location "de searchScreen, esta "location" se pudo hacer igual al history, pero, es solo para ver el ejemplo utilizando el customHook
    const location = useLocation();
    // console.log(location); //location.search para imprimir la propiedad search de la location
    //4.QueryString. Uso de npm query-string
    // console.log(location.search);
    // console.log(queryString);
    //Pasamos nuestro objeto location.search a queryString
    // console.log(queryString.parse(location.search));
    //5.QueryString. Desestructuramos para extraer solo el query que nos interesa el cual es solo uno en este caso solo utilizaremos el query "q"
    const { q = '' } = queryString.parse(location.search);//Inicializamos el query en como string vacío para que no sea undefined en caso de que no tenga un valor
    // console.log(q); //Imprime batman

    //----------------------------------------------------------------------------------------------------------------------------------------------

    //Uso del customHook useForm
    const [values, handledInputChange,reset] = useForm({ //Primero necesitamos el name del input
        // searchText:''. Lo incializamos como un string vacío
        searchText: q // 6.QueryString. Agregamos como valor inicial de nuestro searchText el query(q), de esta forma si se realiza un refresh de nuestra pagina, se mantendrá como valor incicial el "q", por lo tanto muestra el superheroe que se encuentra en el query
    });


    //----------------------------------------------------------------------------------------------------------------------------------------------

    //Segundo paso, extraemos el searchText de nuestro values. Hacemos la desestructuracion.
    //Utilizamos el searchText que extraimos desde values para usarlo en el form(en values="searchText")
    const { searchText } = values;
    //----------------------------------------------------------------------------------------------------------------------------------------------

    //Creamos una costante para almacenar los heroes y luego realizar el map()
    // const heroesFiltered = heroes;
    //Utilizamos la función para obtener los heroes filtrados. Video 182
    // Utilizamos el useMemo porque cada vez que digitamos una tecla del teclado vuelve a ejecutar esta función, entonces, ahora solo se ejecuta cuando cambie el query(q)
    // const heroesFiltered = useMemo(() => getHeroesByName( searchText ), [q]); //El searchText representa al "name" en el archivo getHeroesByName
    const heroesFiltered = useMemo(() => getHeroesByName(q), [q]); //Si lo agrego como la linea de arriba, la linea 42 va a funcionar, pero, muestra una advertencia "React useMemo has a missing dependency": 'searchText'", eso quiere decir que useMemo tiene una dependencia faltante debido a que searchText tendría que estar como dependencia en lugar de la "q" 
    //Tambien gracias al useMemo si le damos click a un personaje y luego le damos en el boton "Back" me muestra la busqueda tal y como se realizó la última vez, ya que, estamos trabajando en base al Query String y la funcíon getHeroesByName no se está disparando gracias al useMemo porque tenemos memorizados esos valores

    //----------------------------------------------------------------------------------------------------------------------------------------------

    
    const handleSearch = (e) => {
        e.preventDefault();//Para que NO haga el refresh de la pagina
        // console.log(searchText);//Imprimimos lo que sea que la persona escriba y damos a la tecla "Enter"

        //2.Query String. Cuando la persona ingresa al texto(el que imprimimos en consola(searchText)), hacemos el push()
        history.push(`?q=${searchText}`);//Añadimos una "?q" de query(se puede agregar otra cosa en lugar de la "q") y luego agregamos el texto que buscamos(serachText);
        
    }
    return (
        <div>
            <h1>Search Screen</h1>
            <hr />

            <div className="row">
                <div className="col-10">

                    <h4>Search form</h4>
                    <hr />


                    <form onSubmit={handleSearch} className="d-flex">

                        <input
                            type="search"
                            placeholder="Find your heroe"
                            className="form-control me-2"
                            aria-label="Search"
                            autoComplete="off"
                            name="searchText"
                            values={searchText}
                            onChange={handledInputChange}
                        />
                        <button
                            type="submit" /*Esto es para cuando le demos click al boton o teclemos Enter entonces que haga el posteo */
                            className="btn m-1 btn-block btn-outline-primary"
                        >
                            Search...
                    </button>
                    </form>


                </div>



            </div>
            {/* Aquí colocamos el resultado de un arreglo */}

            <h4 className="mt-4"> Results </h4>
            <hr />

                {
                    (q === '') 
                    &&
                    <div className="text-center alert alert-info">
                        Search a hero
                    </div>
                }

                {
                    (q !== '' && heroesFiltered.length === 0) //Si el query es distinto de vacío y si la longitud del heroesFiltered es 0 entonces haga lo siguiente: 
                    &&
                    <div className="text-center alert alert-danger">
                        There is no a hero with <strong>{q}</strong> 
                    </div>
                }
            <div className="row row-cols-auto row-cols-lg-3 g-auto g-lg-3 row-cols-xl-4 g-xl-auto row-cols-xs-2 g-xs-2 animate__animated animate__fadeIn">
                
                
                {/* Colocamos la expression de JS */}
                {
                    heroesFiltered.map(herOe => ( //El parentesis ver es porque retorna un objeto

                        <HeroCard
                            key={herOe.id}
                            //Eviamos todas las propiedades del heroe
                            {...herOe}
                        />
                    ))
                }
            </div>
        </div>
    )
}
