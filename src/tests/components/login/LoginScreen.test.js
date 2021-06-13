import { mount } from 'enzyme';
import React from 'react';
import { AuthContext } from "../../../auth/AuthContext";
import { LoginScreen } from '../../../components/login/LoginScreen';
import { types } from '../../../types/types';

describe('Pruebas en el componente <LoginScreen />', () => {


    const history = {
        replace: jest.fn(),
    }
    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: false,

        }
    }

    const wrapper = mount(
        <AuthContext.Provider value={contextValue}>
            <LoginScreen history={history} />
        </AuthContext.Provider>
    )

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('debe de mostrarse correctamente ', () => {

        // console.log(wrapper.html());
        expect(wrapper).toMatchSnapshot();
    })


    test('deben de realizar el dispatch y la navegacion', () => {
    //Cuando damos click al boton "Enter"
        // wrapper.find('button').prop('onClick')(); //Esto lo omentamos porque lo vamos hacer diferente ya que vamos a utilizar el localStorage necesitamos que se llame a esta función(onClik) después
       const handleClick=wrapper.find('button').prop('onClick'); 
       
       
       handleClick(); //Acá la llamamos por primera y no tenemos nada almacenado en localStorage
       
       expect(contextValue.dispatch).toHaveBeenCalledWith({
           payload: { name: 'alejandro' },
           type: types.login
        });

        //Esperamos que el history sea llamado, no importa que tenga argumentos, lo unico que nos interesa es que sea llamado
        // expect(history.replace).toHaveBeenCalledTimes(1);
        //  expect(history.replace).toHaveBeenCalled();

        expect(history.replace).toHaveBeenCalledWith('/'); //Si el local Storage no tiene nada entonces llama a '/'

        //----------------------------------------------------------------------------
        //Ahora simulamos que el localStorage tiene almacenado algo
        localStorage.setItem('last_Pathname','/dc'); //Primero graba el last_Patchname y luego como segundo argumento le podemos enviar 'dc' u otro
        handleClick();//Volvemos a llamar la función handleClick despues de haber grabado en el localStorage, para que nos redirija a la ultima pagina a la cual ingresamos
        expect(history.replace).toHaveBeenCalledWith('/dc'); //Si el local Storage no tiene nada entonces llama a '/'

    });


})
