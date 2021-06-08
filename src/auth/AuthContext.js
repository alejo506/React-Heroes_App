//Hacemos la importación de Context
import { createContext } from 'react';

//Este es nuestro context. Lo utilizaremos en HeroesApp.js, se puede utilizar en el index.js pero es mejor dejar nuestro index.js lo más limpio posible, lo hacemos el HeroesApp porque ahí es donde ya comienza a desplegarse toda mi aplicación
export const AuthContext = createContext();


