import React from 'react';
import { mount } from "enzyme/build";
//Como queremos limpiar el Mock en historyMock importamos la sigueinte librería @testing-library/jest-dom
import '@testing-library/jest-dom';
import { Router,HashRouter, MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../../auth/AuthContext";
import { Navbar } from "../../../components/ui/Navbar";
import { types } from '../../../types/types';

describe('pruebas en el comoponente <Navbar />', () => {

    //-----------------------------------------------------------
    //Para hacer la prueba con el history. El historyMock se lo podemos enviar al Router y nuestro componente cuando va a usar el useHistory entonces va a ver y va a utilizar el history que tiene ese router(Ojo recordemos que en lugar del router estamos utilizando el HashRouter, pero como el HashRouter ignora el historial, obligatoriamente tengo que utilizar el Router para hacer la prueba)
    const historyMock = { //Podemos agregar las propiedades que queramos
        push: jest.fn(),
        replace: jest.fn(),
        location: {},
        listen: jest.fn(), //Al profe le dio un error que dice que history.listen not is a function, entonces lo agregó y simuló la función, ya que listen es una funcion
        createHref: jest.fn()  //createHref este igual dice que no es una función history.createHref is not a function, lo agregamos y simulamos la función para quitar el error
    }

    //-----------------------------------------------------------

    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: true,
            name: 'Valentina'
        }
    }
    //Como tenemos que utilizar Context y evaluar los hijos de un higher order component utilizamos el mount
    const wrapper = mount(
        <AuthContext.Provider value={contextValue}>
            {/* Error al no usar el MemoryRouter. Error: Uncaught [TypeError: Cannot destructure property 'replace' of '(0 , _reactRouterDom.useHistory)(...)' as it is undefined.] */}
            <MemoryRouter>
                {/* Para la prueba tengo que utilizar Router porque HasRouter ignora el historial . Advertencia: <HashRouter> ignora la propiedad del historial. Para usar un historial personalizado, use `import {Router}` en lugar de `import {HashRouter as Router}`.*/}
                <Router history={historyMock}>
                    <Navbar />
                </Router>
            </MemoryRouter>
        </AuthContext.Provider>
    );

    //Limpiar los Mocks. Siempre que hagamos algun mock es buena practica limpiarlo
    afterEach(() => {
        jest.clearAllMocks();
    })

    test('debe de mostrarse correctamente', () => {

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.textInfo').text().trim()).toBe('Valentina');
    });

    test('debe de llamar el Logout y usar el history ', () => {

    //-----------------------------------------------------------
        // En la funcion handleLogout desde nuestro componente Navbar agregamos un console.log('Click') para que se imprima y simule el evento onClick
        wrapper.find('.dropdown-item').prop('onClick')();

        const type = types.logout;

        expect(contextValue.dispatch).toHaveBeenCalledWith({ type });
    //-----------------------------------------------------------

    //history. La prueba del history sirve por si alguien quitara el history.replace('/login') de la función handleLogout desde el componente Navbar.js, entonces dará un error, eso quiere decir que va a necesitar de ese history para que funcione
    expect(historyMock.replace).toHaveBeenCalledWith('/login');

    })


});
