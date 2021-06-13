import React from 'react';
// import { shallow } from "enzyme";
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import { PrivateRoute } from '../../routers/PrivateRoute';

describe('Pruebas en el componente PrivateRoute', () => {

//LocalStorage necesita el pathname. hacemos la simulación del mismo
const props ={ //Dentro de esta se encuentra las props de ...rest, por ejemplo, location, params etc. 
    location: { //Entramos al objeto location
        pathname: '/marvel' //Tenemos acceso al pathname. Agregamos cualquier ruta. Si no agregamos el pathname al momento de hacer la prueba del Storage esto se muestra como undefined
    }
}

// video 200, hacemos la prueba del LocalStorage
Storage.prototype.setItem = jest.fn(); //Simulamos la función con jest.fn()

    test('debe de mostrar el componente si está autenticado y guardar localStorage', () => {

        const wrapper = mount(//El mount no funcionó porque tenia instalado la version de react-17 y en enzyme aún no está la version 17, se cambiaron las dependencias en package.json 

            //Nos dá un error que nos dice que no se puede mostrar una ruta(Route, la ruta es PrivateRoute en nuestro componente) fuera de un <Router/>, para solventar nos dirigimos a la documentación de React Router Dom y buscamos el <MemoryRouter/> el cual es un higher order component para hacer pruebas de nuestros Routers con ciertas rutas. Para evaluar el PrivateRoute se requiere que el <Route/> siempre esté dentro de un <Router/> y el <MemoryRouter/> nos permite simular el envío de información de las diferentes rutas donde nos encontremos para poderlas evaluar
            <MemoryRouter>

                <PrivateRoute
                //Pasamos los argumentos de PrivateRoute, en este caso el isAuthenticated y el component
                isAuthenticated = {true} // es un valor booleano. Está en true porque estamos autenticados
                component= { () => <span>Listo!</span> } //El componente lo inventamos, en este caso, enviamos un elemento span. Si envio solo el span, lo toma como un objeto, tenemos que enviar el componente como una función
                {...props} 
                />
            </MemoryRouter>
        );

        // console.log(wrapper.html()); //Para renderizar el componente, en este ejemplo, lo que sea que el <PrivateRoute/> reciba en la propertie component, esn este caso la propertie component recibe <span>Listo!</span>

        //Esperamos que el span exista, por tanto, tiene que ser true si existe
        expect( wrapper.find('span').exists() ).toBe(true); //Da error si dejamos el Shallow, ya que, el como tenemos un higher order comoponent el cual es <MemoryRouter></MemoryRouter> no podremos utilizar el Shallow, porque el Shallow solo renderiza el <MemoryRouter/>(higher order component), y necesitamos renderizar todo tanto el <MemoryRouter/> como todo lo que se encuentre dentro de el mismo, para solucionar esto tenemos que utilizar mount

        expect(localStorage.setItem ).toHaveBeenCalledWith('last_Pathname', '/marvel');
    });

    test('debe de bloquear el componente si no está autenticado ', () => {
        
        const wrapper = mount(

            <MemoryRouter>

                <PrivateRoute
                isAuthenticated = {false} //Si es false no muestra nada en el componente
                component= { () => <span>Listo!</span> } 
                {...props} 
                />
            </MemoryRouter>
        );

        console.log("->"+wrapper.html()+"No se muestra nada"); //Si no está autenticado(isAuthenticated = false) entonces el wrapper.html() no devuelve nada, concatenamos solo para visualizar algo, pero como tal no muestra nada

        //Al agregar toBe(false) wrapper.find('span') no existe 
        expect( wrapper.find('span').exists() ).toBe(false); 
    })
    
    
    
})
