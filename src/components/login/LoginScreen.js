import React from 'react'

export const LoginScreen = ({history}) => { //Este history es una de las propiedades del sistema de rutas LoginScreen, se pueden ver esas propiedades en la pestaña componentes de nuestro navegador web y seleccionamos LoginScreen, para tener acceso a esas propiedades simplemente las extraemos desde los argumentos de LoginScreen utilizando el mismo nombre de la propiedad a utilizar

//Implementamos el metodo handleLogin

const handleLogin = () =>{
    // console.log("click")
    // history.push('/');//En el push agregamos la ruta a la cual queremos navegar. El problema del push() es que si le damos el click al boton "atras" del navegador nos devuelve al Login, para que no pase esto y reemplace el Login por otra página agregamos el replace
    history.replace('/'); //Con el replace lo que hace es reemplazar en la historia(history) que no visitó el Login, por lo tan al dar click al boton "atras" del navegador NO nos devuelve al Login
}


    return (
        <div className="container mt-5">
            <h1>Login </h1>
            <hr/>

            <button
            className="btn btn-primary"
            onClick={handleLogin}
            >
                Enter
            </button>
        </div>
    )
}
