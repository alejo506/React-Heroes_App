import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route

} from "react-router-dom";
import { LoginScreen } from "../components/login/LoginScreen";
import { MarvelScreen } from "../components/marvel/MarvelScreen";

import { Navbar } from "../components/ui/Navbar";
import { DashboardRoutes } from "./DashboardRoutes";

export const AppRouter = () => {
    return (
        <Router>
            <div>

                <Switch>

                    {/* exact para que la ruta siempre sea exacta */}
                    <Route exact path="/login" component={LoginScreen} />
                    {/*No se agreg el exact porque se presentan inconvenientes */}
                    <Route path="/" component={DashboardRoutes} />
               
                </Switch>
            </div>
        </Router>
    )
}
