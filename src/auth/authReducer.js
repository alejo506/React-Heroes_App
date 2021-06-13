import { types } from "../types/types";

// //Este será el estado si nuestro usuario está autenticado, y si no está autenticado no va a tener la propiedad "name" y el logged estará en "false"
// const state = {
//     name: 'Alejandro',
//     logged: true
// }
//Exportamos el reducer
export const authReducer = ( state = {}, action)=>{//El reducer recibe el state elcual es un objeto. La action es la accion que vamos a realizar

    
    
    switch ( action.type ) {//Evaluaremos el action.type
        //Las dos acciones que vamos a realizar es el Login y el Logout
        case types.login:
            
        return{
            //Retornamos todo lo que viene en el action.payload (...action.payload)
            ...action.payload, //Tomamos lo que viene en el payload de la accion y se establece abajo el logged en true, esto es porque si enviamos un name:'Alejandro' este va a ser el payload de la de accion y si recibe dicha propiedad entonces el logged cambia a true por el contrario, si no enviamos el name:'Alejandro' solo se establece la propiedad logged en false(en este caso es logout)
            logged: true //La autenticación del usuario. Si pasa la autenticación va a ser tru
        }
        
        case types.logout:
            
            return { //En el logout no nos interesará nada del payload, solo retornaremos el estamos de la propiedad logged en "false"
                logged: false
            }
            
            default:
                return state; //Retornamos el estado tal y como se encuentra originalmente
            }
            
}