import React, { useContext } from 'react'
import { AuthContext } from '../../auth/AuthContext';
import { types } from '../../types/types';

export const LoginScreen = ({ history }) => { //Este history es una de las propiedades del sistema de rutas LoginScreen, se pueden ver esas propiedades en la pestaña componentes de nuestro navegador web y seleccionamos LoginScreen, para tener acceso a esas propiedades simplemente las extraemos desde los argumentos de LoginScreen utilizando el mismo nombre de la propiedad a utilizar


    const { dispatch } = useContext(AuthContext)

    const obj = {
        name: 'alejandro'
    }

    console.log('Click!!!!');
    //Implementamos el metodo handleLogin
    const handleLogin = () => {

        //1. Video 193 Recordando la última pagina visitada(esto solo lo hacemos en el PrivateRoute y Login), solo hicimos esto en las rutas privadas(PrivateRoute), primero se realizo el almacenamiento en LocalStorage desde PrivateRoute y luego acá en Login lo implementamos
        const lastPathname = localStorage.getItem('last_Pathname') || '/'; //El mismo nombre que utilizamos en setItem en PrivateRoute es el mismo que utilizamos dentro del get('last_Pathname') acá. También existe la situción de que un usuario sea la primera vez que entre a la aplicación o que hayan purgado(formateado) el localStorage, en ese caso last_Pathname no tendría nada, por esa razón utlizamos los signos || para indicar que si no existe el last_Pathname, entonces se redireccione al valor '/' el cual es la ruta principal de nuestro DashboardRoutes que redirecciona a /marvel

        // console.log("click")
        // history.push('/');//En el push agregamos la ruta a la cual queremos navegar. El problema del push() es que si le damos el click al boton "atras" del navegador nos devuelve al Login, para que no pase esto y reemplace el Login por otra página agregamos el replace
        // history.replace('/'); //Con el replace lo que hace es reemplazar en la historia(history) que no visitó el Login, por lo tan al dar click al boton "atras" del navegador NO nos devuelve al Login

        //Hacemos uso de nuestra función dispatch, NO enviamos la propiedad logged porque ya está establecida en true cuando enviamos un usuario
        dispatch(
            {
                type: types.login, //Para evitar errores se utiliza de esta forma, de esa manera obligamos a que se ejecute el Login que es lo que queremos hacer en este caso
                payload: obj
            }
        )

        //2. Video 193 Recordando la última pagina visitada. Cambiamos "history.replace('/');" por lastPathname
        history.replace(lastPathname); //Con el replace lo que hace es reemplazar en la historia(history) que no visitó el Login, por lo tan al dar click al boton "atras" del navegador NO nos devuelve al Login


    }


    return (
        <div className="container mt-5">
            <h1>Login </h1>
            <hr />

            <button
                className="btn btn-primary"
                onClick={handleLogin}
            >
                Enter
            </button>
        </div>
    )
}
