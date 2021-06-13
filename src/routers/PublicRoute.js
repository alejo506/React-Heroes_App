import React from 'react'
import { Redirect, Route } from 'react-router'
import PropTypes from 'prop-types';

// Esta ruta es similar a la de PrivateRoute solo que tiene un cambio

export const PublicRoute = ({ //Se utiliza llaves porque PublicRoute RECIBE por argumento lo definido PublicRoute que se enceuntra en AppRouter
    isAuthenticated,
    component: Component, //componente es renombrado Component en este archivo
    ...rest
}) => {
    return (

        <Route {...rest} // ...rest = pacth, exatc, etc...
         
        component = { (props) => ( //Con esete callback recibimos las props

            //De esta manera si estamos autenticados y alguien pone en el url para ir al Login, no lo va a permitir
            (!isAuthenticated)// Si NO está autenticado mostramos el componente
                ? (<Component { ...props } />) //Este Component recibe lo del component que se ubica en el archivo AppRouter.Muestra el componente que está solicitando únicamente si NO está autenticado. Recordemos que este componente hace referencia al component ubicado en el archivo AppRouter y que ese es component={LoginScreen}, eso quiere decir que si NO está autenticado nos devuelve al Login.El componente recibe todas las props(history, location y params).
                : (<Redirect to="/" />) //Si está autenticado lo enviamos al DashboarRoute y no al Login
             
        
            )}

        
        />
        
    )
}

PublicRoute.propTypes ={
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}