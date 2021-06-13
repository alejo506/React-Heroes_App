import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import PropTypes from 'prop-types'; //Importamos los Protypes porque necesito obligarme a utilizarlo de manera correcta. Necesitamos al menos al isAuthenticated y el componente 

//Utilizamos las llaves porque vamos a recibir varios elementos en las properties
export const PrivateRoute = ({
    isAuthenticated, //De alguna manera tenemos que saber si está autenticado por lo que creamos una propiedad llamada "isAuthenticated"
    component: Component, //También necesitaremos el componente que la persona quiere renderizar. lo renombramos al componente como "Component" con C mayuscula porque si lo dejamos en minuscula se miraría como un elemento html
    ...rest  //Los demás argumentos como el exact, el path y todo lo demás necesitamos recuperlos y los almacenamos utilizando el operador ...rest(el resto), de esta manera, podremos pasarle dichos argumentos al componente de la manera en la que queramos
}) => {

    //--------------------------------------------------------------------------------------------------------------------------------------
    //193. Recordar la última pagina visitada. 
    //Del rest ocuparemos el location.pathname
    //No es necesario utilizar el customHook para acceder al "location" porque ya lo tenemos en el ..rest

    // console.log(rest.location.pathname); //Esto lo almacenamos en el LocalStorage
    //Almacenamiento del pathname en LocalStorage
    localStorage.setItem('last_Pathname', rest.location.pathname) //Le damos por nombre "last_Pathname". Almacenamos el pathname pero, no almacenamos el query, si quisieramos podemos almacenar el pathname y concatenarlo con el query (el query por ejemplo en el componente Search si busco algo en el input lo que escriba en ese input va a ser el query)
    //Ahora nos vamos al componente Login a implementarlo

    //--------------------------------------------------------------------------------------------------------------------------------------


    return (
        //Regresamos o retornamos un "Route". Vamos a regresar una ruta de "react-router DOM"
        //La ruta a a tener el ..rest(resto de propiedades que estamos recibiendo ahí, el exact, el path y todo lo demás)
        <Route {...rest} //El ...rest tiene almacena el exact, el path y demás cosas. El path, exact y más es enviado a este Route

            //Queremos retornar el componente de manera condicional
            component={(props) => (//El componente se va a llamr con este callback y va a recibir las "props", las props son el history, location y params. Como solo vamos a regresar algo quitamos las llaves {} y ponemos parentesis ()

                //Hacemos la condición con un oprador ternario
                (isAuthenticated)// Si está autenticado regresa el componente al cual el usuario quiere entrar, y le adicionamos con el operador express las "props", recordar que las props son history, location y params
                    ? (<Component {...props} />) // Recordemos que este componente hace referencia al component ubicado en el archivo AppRouter y que ese es component={DashboardRoutes}, eso quiere decir que si está autenticado nos devuelve al DashboardRoutes y que este tiene como ruta principal a /marvel.Como saber cual es el operador express y cual es el rest. La respuesta es que el que está en los argumentos es el ...rest y el que se encuentra en en el Component es el express, en este caso "...props" es el operador express, en conclusion dependiendo del lugar donde se use le cambia el nombre
                    //Component es el componente que queremos renderizar, eso quiere decir que si estamos logueados o autenticados manda todo lo mismo de igual forma (manda las ...props las cuales son el history, location y params). Con esto todo manda lo mismo, es decir todo queda igual.
                    //Si no está autenticado utilizamos el componente Redirect, para redirecionarlo a la pagina de Login
                    : (<Redirect to="/login" />) //Podemos agregar la ruta que la persona quiera, podemos leer el path y muchas cosas y almacenar eso en el LocalStorage o en una cookie, para que cuando el usuario se autentique vaya a la pagina que él quería   
            )}

        />
    )
}

//Los Proptypes nos permite utilizar nuestro componente PriveRoute de manera correcta. 
PrivateRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}


/*Una vez tenemos listo este componente PrivateRoute lo vamos a implementar en AppRouter, en AppRouter sustituimos el Route que contiene nuestro DashboardRoutes por el PrivateRoute para que proteja todas las rutas dentro del DashboardRoutes
Podemos utilizar nuestro PrivateRoute en el DashboarRoutes, pero, no es necesarios cambiar cada Route por PrivateRoute y que con tan solo proteger la Route de DashboardRoutes que se encuentra en AppRoute protejo a todas las que se encuentra en el DashboarRoutes*/