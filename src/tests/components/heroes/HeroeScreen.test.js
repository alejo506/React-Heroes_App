import React from 'react';
import { shallow } from 'enzyme';
import { HeroeScreen } from '../../../components/heroes/HeroeScreen';
import { mount } from 'enzyme/build';
import { MemoryRouter, Route } from 'react-router-dom';

describe('Pruebas en <HeroeScreen />', () => {

    //Este historyMock se utilizó en la prueba 1 y 3 
    //Este es el history que recibe por argumento el componente HeroeScreen
    const historyMock = {
        length: 10, //Simular que existen 10 registros en el history
        push: jest.fn(),
        goBack: jest.fn()
    }

    //Prueba 1
    test('debe de mostrar el componente Redirect si no hay argumentos en el URL', () => {

        const wrapper = mount(
            //Necesitamos los params: Da el siguiente error:Cannot read property 'match' of undefined. El match es propiamente del Router porque necesitamos esos params. Esto lo solucionamos utilizando el higher-order-component
            //Utilizamos el hiher-order-component para evaluar lo que se encuentra dentro de ellos, por eso utilizamos mount
            <MemoryRouter initialEntries={['/hero']}>
                <HeroeScreen history={historyMock} />
            </MemoryRouter>
        )
        //El HTML de Redirect es un string vacio
        //  expect(wrapper).toMatchSnapshot();

        //Si no existe el argumento por el URL, entonces , nos muestra el componente Redirect que se encarga de sacar al usuario. Por lo que el valor de hero: undefined y el valor de heroId: undefined
        expect(wrapper.find('Redirect').exists()).toBe(true);

        /*En el snapshot devuelve un string vacio "", porque en el componente HeroeScreen, como el hero y heroId aun no tienen un valor o mejor dicho no tenemos un heroe entonces lo que pasa es que se ejecuta el redirect cuyo html es un string vacio "". Esto es correcto porque ese debería de ser nuestro comportamiento por defecto si no mandamos un url o argumento correcto. Seguido de esto en el MemoryRouter colocamos el initialEntries, el initialEntries va a ser un objeto que vamos a definir con el url y los argumentos que necesitamos enviarle, en este caso solo el /hero */
        // exports[`Pruebas en <HeroeScreen /> debe de mostrarse correctamente 1`] = `""`;
    });

    //Prueba 2
    test('debe de mostrar un heroe si el parámetro existe y se encuentra ', () => {
        //Comprobamos que nuestro url sea recibimos por el componente, por lo tanto, para hacer la prueba elegimos a uno de nuestros heroes, solo uno podemos escoger y entramos para que se despliegue la informacion del mismo. El heroe que escojamos se tiene que ver en la aplicacion, por lo tanto necesitamos ejecutar el npm start
        
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-captain']}>
                {/* Creamos un ruta ficticia, con el path que tiene nuestro DashboardRoutes, ese path es para mostrar la ruta(Route) y que mediante el initialEntries, esa es la ruta en la que se encuentra mi Router de manera ficticia, y el componente que vamos a mostrar es nuestro HeroeScreen */}
                <Route path="/hero/:heroeId" component={HeroeScreen} />
            </MemoryRouter>
        );
        
        //la clase d-flex debe de existir en nuestro componente 
        expect(wrapper.find('.d-flex').exists()).toBe(true);
    })

    //Prueba 3
    test('debe de regresar a la pantalla anterior con push ', () => {

        const historyMock = {
            length: 1, //Si es el push es menor a 2, el push se llama cuando el history es menor a 2. Ver en el condicional de handleBack en el archivo HeroeScreen
            push: jest.fn(),
            goBack: jest.fn()
        }

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-captain']}>
                {/*El componente HeroScreen es uno de los que se renderiza de manera condicional, por consecuencia podemos enviarle props y no nos impide fingir el argumento que le queremos enviar({history})  */}
                <Route path="/hero/:heroeId"
                    component={(props) => <HeroeScreen history={historyMock} />} /*Si lo hacemos como funcion de flecha colocando los props, eso significa que recibimos los props que le va a enviar el <Route/> a este componente, y el unico prop que nos interesa y que le vamos a enviar es el history   */
                />
            </MemoryRouter>
        );
        
        //------------------------------------------------------------------------------
        // Hacemos la iteracion con el boton
        
        wrapper.find('button').prop('onClick')();
        
        //esparamos que el history.push ejecute la ruta '/' ya que el push es menor 1
        expect(historyMock.push).toHaveBeenCalledWith('/');
        
        // esperamos que el goBack no haya sido llamado
        expect(historyMock.goBack).not.toHaveBeenCalled();
        
        //------------------------------------------------------------------------------

        
    });
    
    test('debe de regresar a la pantalla anterior con el goBack ', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-captain']}>
                {/*El componente HeroScreen es uno de los que se renderiza de manera condicional, por consecuencia podemos enviarle props y no nos impide fingir el argumento que le queremos enviar({history})  */}
                <Route path="/hero/:heroeId"
                    component={(props) => <HeroeScreen history={historyMock} />} /*Si lo hacemos como funcion de flecha colocando los props, eso significa que recibimos los props que le va a enviar el <Route/> a este componente, y el unico prop que nos interesa y que le vamos a enviar es el history   */
                />
            </MemoryRouter>
        );

        //------------------------------------------------------------------------------
        // Hacemos la iteracion con el boton

        wrapper.find('button').prop('onClick')();

        //esparamos que el push sea llamado 0 veces, solo por hacerlo diferente utilizamos el toHaveBeenCalledTimes(0) en lugar del .not.toHaveBeenCalled(), solo para que veamos que se puede hacer en cualquiera de las dos formas
        expect(historyMock.push).toHaveBeenCalledTimes(0);

        // esperamos que el goBack sea llamado
        expect(historyMock.goBack).toHaveBeenCalled();
    })
    
    test('debe de llamar el redirect si el heroe no existe, es decir, si digitamos cualquier cosa en el url que no sea un heroe entonces ejecuta el Redirect ', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-captain24324234sesdfs']}> {/*Enviamos cualquier cosa en el url que no sea un heroe, Ej: /hero/marvel-captain24324234sesdfs */}
                {/*El componente HeroScreen es uno de los que se renderiza de manera condicional, por consecuencia podemos enviarle props y no nos impide fingir el argumento que le queremos enviar({history})  */}
                <Route path="/hero/:heroeId"
                    component={(props) => <HeroeScreen history={historyMock} />} /*Si lo hacemos como funcion de flecha colocando los props, eso significa que recibimos los props que le va a enviar el <Route/> a este componente, y el unico prop que nos interesa y que le vamos a enviar es el history   */
                />
            </MemoryRouter>
        );

        //------------------------------------------------------------------------------
      
// console.log(wrapper.find('Redirect').exists());

// expect(wrapper.find('Redirect').exists()).toBe(false);

// console.log(wrapper.text().trim());
        // Si el heroe no existe no muestra nada
        expect(wrapper.text().trim()).toBe('');

    })


});
