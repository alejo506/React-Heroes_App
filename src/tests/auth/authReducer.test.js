const { authReducer } = require("../../auth/authReducer");
const { types } = require("../../types/types");

const user={
    name:"Alejandro",
    logged:true
}

describe('Pruebas en authReducer', () => {
    
    test('debe de retornar el estado por defecto ', () => {
        
        const state = authReducer({logged: false}, {}); //Recibe dos objetos como argumentos(state y action) por defectos
       
        expect(state).toEqual({logged:false});
        
    });

    test('debe de atenticar y colocar el name del usuario', () => {
        
        // creamos la accion(ation)
        const action = {
            type: types.login,
            payload: {
                name:"Nicole",
            }
        }

        //Estado inicial
        const state = authReducer({logged: false}, action); //No importa el estado inicial porque siempre enviamos un nuevo estado, en ese nuevo estado hace el cambio
    // console.log(state);

        expect(state).toEqual({logged:true, name:"Nicole"});

    });
    
    test('debe de borrar el name del usuario y logged en false', () => {
        
         // creamos la accion(ation)
         const action = {
            type: types.logout,
        }

        //Estado inicial
        const state = authReducer({logged: true, name: "Sofia"}, action); //Al ejecutar la accion borra el nombre y el estado de logged pasa a ser false
    // console.log(state);

        expect(state).toEqual({ logged:false });

        
    })
})
