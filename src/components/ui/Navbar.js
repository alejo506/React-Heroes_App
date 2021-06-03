import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export const Navbar = () => {

    const [show, setShow]=React.useState(false);

    return (
        <nav className="navbar navbar-dark bg-dark navbar-expand-md ">
            
            <Link 
                className="navbar-brand" 
                to="/"
                style={{marginLeft:15}}
            >
                Asociaciones
            </Link>

            <button type="button" onClick={()=>setShow(!show)} className="navbar-toggler">
                    <span className="navbar-toggler-icon"></span>
                </button>
               
                <div className="collapse navbar-collapse" style={show?{display:"block"}:{display:'none'}}>
                    <ul className="navbar-nav ml-auto">

                    <NavLink 
                        activeClassName="active"
                        className="nav-item nav-link" 
                        exact
                        to="/marvel"
                    >
                        Marvel
                    </NavLink>
                    <NavLink 
                        activeClassName="active"
                        className="nav-item nav-link" 
                        exact
                        to="/dc"
                    >
                        DC
                    </NavLink>
                    <NavLink 
                        activeClassName="active"
                        className="nav-item nav-link" 
                        exact
                        to="/search"
                    >
                        Search
                    </NavLink>
                    <NavLink 
                        activeClassName="active"
                        className="nav-item nav-link" 
                        exact
                        to="/login"
                    >
                        Logout
                    </NavLink>
                    </ul>
                    </div>

            
        </nav>
    )
}