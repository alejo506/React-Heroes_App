import { heroes } from '../data/heroes';
import { useForm } from '../hooks/useForm';


export const getHeroesByName = (name='') => { //Recibe lo que se escribe en el input del componente SarchScreen.js. Lo inicializamos como un string vacio para que regrese todos

//Condicional si no recibe un string
if(name === ''){ //Si el name es igual a un string vacío, esto es porque si no hemos escrito nada, puede que estemos en la pantalla inicial y no queremos revisar ningun elemento, pero en el momento que el name tenga un valor aplica el filter(filtro)
    return [];
}

    name= name.toLocaleLowerCase();//toLocaleLowerCase para pasarlo a minuscula
    return heroes.filter(heroName => heroName.superhero.toLocaleLowerCase().includes(name))//El includes es para que el name que está recibiendo como argumento lo va a regresar. 
    //El filter practicamente me permite buscar cada super heroe por el nombre, si agrego una "b" entonces van apareciendo super heroes que empiecen con esa letra, el include es para 
    //que devuelva solo 1 personaje y no todos. El name es el pasó de ser "searchText" a "q" en el archivo SearchScreen, es lo que escribimos en la caja de texto
}
