import React from 'react';
import {mount} from 'enzyme';
import { MemoryRouter, Route } from 'react-router-dom';
import { SearchScreen } from '../../../components/search/SearchScreen';

describe('Pruebas en <SearchScreen />', () => {

    test('debe de mostrarse correctamente con valores por defecto ', () => {
        
        const wrapper= mount(

            //Como vamos a trabajar con rutas utilizamos el MemoryRouter
            <MemoryRouter initialEntries={['/search']}> 
                {/*Trabajamos con rutas porque cuando escribimos algo en el input y le damos enter trabajamos con el url y estar leyendolo, por esa razón vamos a trabajar con el MemoryRouter */}
                <Route 
                    path="/search"
                    component={SearchScreen} //El componente con el que vamos a trabajar va a ser con el SearchScreen
                />        
            </MemoryRouter>
        );

        expect(wrapper).toMatchSnapshot();
        // expect(wrapper.find('.alert-info').exists()).toBe(true);
        expect(wrapper.find('.alert-info').text().trim()).toBe('Search a hero');
    });

    //En esta prueba simulamos que estamos en la ruta que se encuentyra en el url de la pagina Secarch y asegurarnos que la caja de texto tenga ese valor
    test('debe de mostrar a batman y el input con el valor del queryString ', () => {
       
        const wrapper= mount(

            //Como vamos a trabajar con rutas utilizamos el MemoryRouter
            <MemoryRouter initialEntries={['/search?q=batman']}> 
                {/*Trabajamos con rutas porque cuando escribimos algo en el input y le damos enter trabajamos con el url y estar leyendolo, por esa razón vamos a trabajar con el MemoryRouter */}
                <Route 
                    path="/search"
                    component={SearchScreen} //El componente con el que vamos a trabajar va a ser con el SearchScreen
                />        
            </MemoryRouter>
        );

        //Esperamos que el valor que se encuentra en la propiedad value del input contenga batman
        expect( wrapper.find('input').prop('value')).toBe('batman');
        expect(wrapper).toMatchSnapshot();
    });

    test('debe de mostrar un error si no se muestra el hero', () => {
       
        const wrapper= mount(

            //Como vamos a trabajar con rutas utilizamos el MemoryRouter
            <MemoryRouter initialEntries={['/search?q=batmanfgdfgdgrefd']}> 
                {/*Trabajamos con rutas porque cuando escribimos algo en el input y le damos enter trabajamos con el url y estar leyendolo, por esa razón vamos a trabajar con el MemoryRouter */}
                <Route 
                    path="/search"
                    component={SearchScreen} //El componente con el que vamos a trabajar va a ser con el SearchScreen
                />        
            </MemoryRouter>
        );

        //Esperamos que si existe la clase .alet-danger entonces es true, de lo contrario si no se muestra dicha clase entonces es false
        // expect( wrapper.find('.alert-danger').exists()).toBe(true);
        expect(wrapper.find('.alert-danger').text().trim()).toBe(`There is no a hero with batmanfgdfgdgrefd`);
        expect(wrapper).toMatchSnapshot();
    });

    //Esta prueba es dificil de hacer
    test('debe de llamar el push del history ', () => {
        //****** Lo que hace el formulario es cuando presionamos "Enter" entonces manda la informacion de la caja de texto al url y el url recarga mi componente *********

        // 1.Simulamos el history
        const historyMock = {
            push: jest.fn()
        };

        // 2.Montamos nuestro componente
        const wrapper= mount(

            // 3.Renderizamos el componente
            <MemoryRouter initialEntries={['/search?q=batmanfgdfgdgrefd']}> 
                <Route 
                    path="/search"
                    // 4. Necesitamos enviar el history por lo que hacemos lo siguiente en el component
                    component={ () => <SearchScreen history={historyMock} /> } //Recordemos que el callback () => recibe los props por defecto no es necesario agregarlos y si los quisieramos agregar lo ponemos de la siguiente forma (props)=> solo que no es necesario ya que los recibe por defecto, por lo tanto no es necesario poner los props, recordemos que en este caso la prop que estamos recibiendo del componente SearchScreen es history 
                />       
            </MemoryRouter>
        );

        // ******* Simulamos acciones en el formulario ********

        //5. Simulamos el cambio en la caja de texto
        //Enviamos como primer argumento el evento(change) y como segundo argumento el target
        wrapper.find('input').simulate('change',{
            target:{
                name: 'searchText', //El name de la caja de texto es searchText porque así funciona nuestro customHoon, podemos verlo en el componente SearchScreen
                value:'batman' //Cuando se realiza el push history.push(`?q=${searchText}`); envia este value del input al url. Para entenderlo mejor en este momento ?q=${searchText} es el mismo valor que tenemos en la caja de texto(value)
            }
        });
        
        //6. Simulamos en Onsubmit. Podemos utilizar el prop o el simulate cualquiera de los dos
        //Enviamos como primer argumento el evento onSubmit y recibimos y ejecutamos la función preventDefault
        wrapper.find('form').prop('onSubmit') ( { preventDefault(){} }); //Definimos la función colocando {} al final del preventDefault


        //7. Esperariamos que el historyMock.push haya sido llamado con ?q=${searchText}, cambiamos esto ultimo por el value del input ya que es lo mismo;
        expect( historyMock.push).toHaveBeenCalledWith(`?q=batman`);
    })
    
    
    
})
