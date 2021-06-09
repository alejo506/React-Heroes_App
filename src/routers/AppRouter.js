import React, { useContext } from "react";
import {
    BrowserRouter as Router,
    HashRouter,
    Switch,
    // Route

} from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import { LoginScreen } from "../components/login/LoginScreen";
import { MarvelScreen } from "../components/marvel/MarvelScreen";

import { Navbar } from "../components/ui/Navbar";
import { DashboardRoutes } from "./DashboardRoutes";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRouter = () => {

    // Nos vamos a components en el navegador y nos dirigimos a HeroesApp y ahí nos daremos cuenta si está autenticado o no, para hacer eso vamos a hacer el useContext
    const {user} = useContext(AuthContext);
    // console.log(user);

    return (
        <HashRouter>
        {/* <Router> */}
            <div>


                <Switch>

                    {/* exact para que la ruta siempre sea exacta */}
                    <PublicRoute
                     exact path="/login" 
                     component={LoginScreen} 
                     isAuthenticated = {user.logged}
                     />

                    {/*No se agrega el exact porque se presentan inconvenientes */}
                    <PrivateRoute 
                    path="/" //El path no lo recibe ni la propiedad isAuthenticated ni el component, lo recibe el operador ..rest(recibe el resto o lo demás, en este caso recibe el path , el exact y otros, en este caso solo recibe el path porque es el unico que se encuetra acá)  
                    component={DashboardRoutes} //Este es el componente que carga si está autenticado, este componente lo recibe el PrivateRoute
                    isAuthenticated= {user.logged} //Enviamos el valor de la propiedad logged para saber si está o no autenticado, este valor lo recibe la propiedad isAutheticated en el componente PrivateRoute.js
                    /> {/*Implementamos nuestro PrivateRoute. Por ejemplo, el path que se encuentra aquí no está como isAutheticated(autenticado) ni component(Componente), entonces el path cae en el ...rest(todo esto en el archivo PrivateRoute.js)*/}
               
                </Switch>
            </div>
        {/* </Router> */}
                    </HashRouter>
    )
}
