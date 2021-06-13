
import React from 'react';
import { mount } from 'enzyme';

import { MemoryRouter } from 'react-router-dom';
import { DashboardRoutes } from '../../routers/DashboardRoutes';
import { AuthContext } from '../../auth/AuthContext';


describe('Pruebas en el <DashboardRoutes', () => {

    //Hacemos el uso del Context
    //Si estamos logueados necesitaremos el objeto user y hacer la simulacion del dispatch
    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: true,
            name: 'Natasha'
        }
    }

    test('debe de mostrarse correctamente ', () => {

        const wrapper = mount(
            // Tenemos que utilizar el Memory Router porque estamos trabajando con Route. Errores: You should not use <Switch> outside a <Router>. Otro error: You should not use <Link> outside a <Router>
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter>
                    <DashboardRoutes />
                </MemoryRouter>
            </AuthContext.Provider>

        );

        // console.log(wrapper.html());

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.textInfo').text().trim()).toBe('Natasha');
    })

})
