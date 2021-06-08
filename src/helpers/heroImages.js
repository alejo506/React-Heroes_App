//Para renderizar las imagenes de manera dinamica desde la carpeta "src"
export const heroImages = require.context('../assets/heroes', true); // Esto es propio de webpack "require.context()" leer desde los recursos que dio el profesor. El segundo argumento(true) es para que busque imagenes en subdirectorios(otros directorios dentro del directio "assets")
