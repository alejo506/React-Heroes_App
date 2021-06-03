import { heroes } from "../data/heroes";

export const getHeroeById = ( id ) => { //Recibimos el id //Este es el id que escribimos


   //Ponemos el find, eso quiere decir que apenas encuentre uno eso sería todo
    return heroes.find( hero => hero.id === id)//Caso contrario filtramos el arreglo
}