import { heroes } from "../data/heroes";

export const getHeroesByPublisher = ( publisher ) => { //Recibimos el publisher desde HeroesList

    // Creamos una validación por si se escribe un tipo de publisher que no existe entonces dé un error
    const validPublishers = ['DC Comics', 'Marvel Comics']; // Si envía cualquier cosa que NO esté dentro de este arreglo entonces que envíe un error

    if(!validPublishers.includes( publisher )){ //Barremos el valiPublishers y debe incluir el pusblisher que estamos enviando por argumento
    
        // Si encuentra el publisher entonces devuelve un true y si no ejecuta el error
        throw new Error(`Publisher "${ publisher}" no es correcto`);

    }
    //Hace el filtrado del arreglo y nos devuelve el hero siempre y cuando hero.publisher sea igual al publisher que recibimos por argumento
    return heroes.filter( hero => hero.publisher === publisher)//Caso contrario filtramos el arreglo
}