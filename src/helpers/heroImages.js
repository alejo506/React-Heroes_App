//Al realizar las pruebas en el componente AppRouter da un error con el require.context porque este permetenece a webpack y no a javascript, po lo que se realice la instalacion de require-context.macro "npm install --save-dev require-context.macro" , hice la imporcion y sustituí require.context por requireContext
import requireContext from 'require-context.macro';

//Renderiza las imagenes de manera dinamica desde la carpeta "src"
export const heroImages = requireContext('../assets/heroes', true); // Esto es propio de webpack "require.context()" leer desde los recursos que dio el profesor. El segundo argumento(true) es para que busque imagenes en subdirectorios(otros directorios dentro del directio "assets")


// export const heroImages = require.context('../assets/heroes', true);