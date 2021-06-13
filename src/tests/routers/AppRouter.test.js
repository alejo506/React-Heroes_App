import React from 'react';
// import { shallow } from 'enzyme';
import { mount } from 'enzyme';

import { AppRouter } from '../../routers/AppRouter';
import { AuthContext } from '../../auth/AuthContext';


describe('Pruebas en <AppRouter/>', () => {

    //Necesitamos de los values(dispath y user) que provee el contexto. Esos values fueron pasados al contexto desde el componente HeroesApp
    const contextValue = {
        dispatch: jest.fn(), //El dispatch por ser una función, lo probamos con jest.fn(). Nos indica como fue llamada, con qué argumentos, cuantas veces fue llamada etc
        user: {//Nuestro objeto user tendrá el logged en false, es decir, que no se encuentra autenticado
            logged: false
        }
    }

    test('debe de mostrar el Login si no está autenticado ', () => {

        const wrapper = mount(
            //Tenemos que importar el context porque lo estamos utilizando en el componente AppRouter 
            //El context AuthContext es un higher order component por consecuencia tenemos que utilizar el mount en lugar de shallow        
            <AuthContext.Provider value={contextValue}>
                <AppRouter />
            </AuthContext.Provider>
        );
        console.log(wrapper.html());

        expect(wrapper).toMatchSnapshot();
    })

})

test('debe de mostrar el componente marvel si está autenticado', () => {

    const contextValue = {
        dispatch: jest.fn(), //El dispatch por ser una función, lo probamos con jest.fn(). Nos indica como fue llamada, con qué argumentos, cuantas veces fue llamada etc
        user: {//Nuestro objeto user tendrá el logged en false, es decir, que no se encuentra autenticado
            logged: true,
            name: 'Sofía'
        }
    }

    const wrapper = mount(
        <AuthContext.Provider value={ contextValue }>
            <AppRouter />
        </AuthContext.Provider>
    );
    console.log(wrapper.html());

    //Al estar autenticado se depliega un monton de elementos en el console.log, para hacer la prueba solo podemos tomar uno de esos elementos, por ejemplo, tomamos el "navbar" y si este existe entonces significa que estamos autenticados
    expect( wrapper.find('.navbar').exists()).toBe(true);

})

