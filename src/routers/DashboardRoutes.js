import React from 'react'
import { Redirect, Route, Switch } from 'react-router'
import { DcScreen } from '../components/dc/DcScreen'
import { HeroeScreen } from '../components/heroes/HeroeScreen'
import { MarvelScreen } from '../components/marvel/MarvelScreen'
import { SearchScreen } from '../components/search/SearchScreen'
import { Footer } from '../components/ui/Footer'
import { Navbar } from '../components/ui/Navbar'

export const DashboardRoutes = (/*{history}*/) => {
    return (
        <> {/*Este fragment se agrega porque hay más de un elemento html, hay un <Navbar/> y el <div/> */}
         
         <Navbar /*history={history}*/ /> {/*Se pasa el history al Navbar para utilizar la propiedad "history". Solo que en lugar de hacer esto, utilizamos el customHook useHistory en el ui/Navbar.*/}
         
          
            <div className="container mt-2">
                <Switch>
  
                    <Route exact path="/marvel" component={ MarvelScreen } />
                    {/* Este componente va a recibir un argumento por el url ":heroeId" */}
                    <Route exact path="/hero/:heroeId" component={ HeroeScreen } />
                    <Route exact path="/dc" component={ DcScreen } />
                    <Route exact path="/search" component={ SearchScreen } />

                    {/* Si no nos encontramos en alguna de la rutas anteriores(marvel,heroe/:heroeID o dc) entonces nos redireccione a path de marvel */}
                 {/*El Redirect también se puede utilizar para validaciones, por ejemplo, si algo no viene entonces que llame al Redirect  */}
                  <Redirect to="/marvel" />
                 
                </Switch>  
            </div>  

            <Footer/>
        </>
    )
}