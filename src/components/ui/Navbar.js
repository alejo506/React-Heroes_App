import React, { useContext } from 'react'
import { Link, NavLink, useHistory } from 'react-router-dom'
import { AuthContext } from '../../auth/AuthContext';
import { types } from '../../types/types';

export const Navbar = () => { //En Navbar no se puede utilizar el {history} ya que history en Navbar tiene el valor de "undefined" es to es debido a que Navbar no se encuentra dentro de las rutas(Route), Navbar como tal es un componente que está por aparte, para hacer uso de rutas tengo que hacer uso obligatorio del customHook useHistory. Otra forma de hacer, pero, no es lo mejor, ya que, es para evitar escribir menos codigo, sería enviar el history al Navbar desde el componente de ruta DashboarRoutes

    // const [show, setShow] = React.useState(false);

    //Con user:{name} extraemos la propiedad "name" del objeto "user"
    const { user: { name }, dispatch } = useContext(AuthContext);
    
    
    const {replace} =useHistory();

    //Hacemos el Logout
    const handleLogout= ()=>{
        
        console.log('Click!');//Video 204.Cuando simulamos el evento click al hacer las pruebas del componente Nvbar, utilizamos este console para ver la simulacion del onClick
        
        replace('/login');

        dispatch({
            type: types.logout
        });


    }

    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <div className="nav-item ">
                    <Link
                        className="navbar-brand nav-link"
                        to="/"
                        style={{ marginLeft: 15 }}
                    >
                        Asociaciones
                    </Link>
                </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-1 mb-lg-0">
                        <div className="nav-item ">
                            <NavLink
                                activeClassName="active"
                                className="nav-link"
                                exact
                                to="/marvel"
                            >
                                Marvel
                    </NavLink>
                        </div>

                        <div className="nav-item ">

                            <NavLink
                                activeClassName="active"
                                className="nav-link"
                                exact
                                to="/dc"
                            >
                                DC
                    </NavLink>
                        </div>

                        <div className="nav-item">

                            <NavLink
                                activeClassName="active"
                                className="nav-link"
                                exact
                                to="/search"
                            >
                                Search
                    </NavLink>
                        </div>
                    </ul>

                    <div className="nav-item dropdown ">
                        <a className="navbar-brand nav-link dropdown-toggle" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <lord-icon
                                src="https://cdn.lordicon.com/dxjqoygy.json"
                                trigger="hover"
                                colors="primary:#e4e4e4,secondary:#e4e4e4"
                                stroke="60"
                                style={{ width: 38, height: 38 }}>
                            </lord-icon>
                            {/* {name} */} {/*Esto es para agregar el nombre del user logueado a la par del iconUser*/}
                        </a>
                        <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">

                            <span className="ms-3 textInfo" style={{color:"#5cb85c"}}> {name} {/*Esto es para agregar el nombre del user logueado a la par del iconUser*/}</span>
                            <button
                                
                                className="dropdown-item"
                                onClick ={handleLogout}
                            >
                                Logout
                            </button>

                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}