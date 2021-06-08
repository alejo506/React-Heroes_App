import React, { useEffect, useReducer } from 'react'
import { AuthContext } from './auth/AuthContext'
import { authReducer } from './auth/authReducer'
import { AppRouter } from './routers/AppRouter'

const init = () => {//El init se va a encargar de revisar el LocalStorage a ver si tenemos ese objeto(user). Esto es lo que se ejecuta en el Init,luego se lo pasa al initialState({}) y de esta manera tendremos el estado actual de nuestra aplicación

    return JSON.parse(localStorage.getItem('user')) || {logged: false}//Como ese user es un objeto, utilizamos el JSON.parse para evaluar ese LocalStorage, y si existe lo va a retorna, por el contrario, retornar un objeto que tenga el logged establecido en false {logged:false}
}

export const HeroesApp = () => {
    
    //Como primer arguemento utilizamos el reducer ya creado, como segundo arguemento agregamos el initial state y por el momento va a ser un objeto vacío, como tercer argumento utilizamos el init porque vamos a leer el LocalStorage
    const [user, dispatch] = useReducer(authReducer, {}, init); //nuestro authReducer va a regresar un user
    
    //useEffect
    useEffect(() => { //Este efecto se utiliza porque si nos logueamos con un usuario y recargamos el navegador entonces se formatea, por loque al agregar el efecto aunque recarguemos(refrescar) la pagina no se pierde o formatea el usuario con el que me loguee

        //Cada vez que cambia el user se establece el valor del usuario y el JSON.stringify es para convertirlo en string porque el local Storage no acepta objetos
        localStorage.setItem('user',JSON.stringify(user));
        
    }, [user]); //El efecto se dispara cuando cambie los objetos user
    
    return (
            // El value es lo que vamos a distribuir en nuestra aplicación, vamos a distribuir un objeto, creamos un reducer
        <AuthContext.Provider value={{user, dispatch}}>   {/*El user y el dispatch es lo que vamos a distribuir con nuestro useContext. Ahora tenemos la habilidad de hacer dispatch u obtener el usuario a lo largo de cualquier parte de nuestra aplicación, inclusive estamos en nuestro LoginScreen o en las otras páginas donde ya estemos autenticados no importa porque HeroesApp es el segundo nivel más alto de nuestra aplicación despúes del index.js*/}
            <AppRouter />
        </AuthContext.Provider>

    )
}
