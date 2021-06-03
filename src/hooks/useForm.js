import { useState } from "react"

export const useForm = (initialState = {}) => {

   
    const [values, setValues] = useState(initialState);

     //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------- 

    // *** Función para limpiar los inputs después de escribir algo ***
    const reset= () =>{
        setValues( initialState );
    }

    //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------- 

    // *** Función handledInputChange ***
    //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------- 
    const handledInputChange = ({ target }) => {

        setValues({
            ...values,
            [target.name]: target.value //se entiende que el value que tiene el input, que llega por medio del evento, asignaselo a la propiedad del state que tenga ese nombre hasta ahí se entiende bien
        });

    }
     //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------- 

    
    return [ values, handledInputChange, reset ]; //Puedo retornar un arreglo u objeto, en este caso retornaremos un arreglo
}
