# E-backend-logger

## Instrucciones para ejecutar
Para poder ejecutar este proyecto es necesario ubicarse en la carpeta raíz del mismo y ejecutar ´´´npm install´´´ 

## Módulos instalados
Este proyecto cuenta con una amplia variedad de módulos de node js instalados que fueron de gran ayuda para el desarrollo del proyecto, entre los más importantes tenemos a "crypto": éste nos provee de todas las funcionalidades criptográficas, ofreciéndonos una amplia gama de algoritmos de cifrado al momento de utilizar credenciales.
"express-jwt": Este módulo nos provee de un middleware para el módulo de node js, Express js. Esto, con la finalidad de poder validar los JSON Web Tokens (JWTs) a través del módulo JWT.
"nodemon": este módulo es de gran ayuda durante el desarrollo ya que nos permite actualizar el servidor al instante que se haga un cambio en alguno de sus archivos. Con esto no tendremos que reiniciar el servidor cada que se haga un cambio en él.

## Configuración para poder ejecutar el proyecto
Para poder iniciar el servidor backend es necesario contar con las variables de entorno que contienen información especial: URI de la base de datos, puerto, modo en que se está corriendo el sistema, etc. Es una buena práctica, que al subir el proyecto a producción o incluso al repositorio mientras se está desarrollando, omitir subir el archivo que contenga éstas variables de entorno, esto por temas de seguridad (por ejemplo en la base de datos), sin embargo, para fines prácticos y que podamos ejecutar el proyecto de una manera sencilla, se optó desde un principio ir subiendo éste archivo al repositorio en cada commit.

Para ejecutar el archivo podemos escribir en una terminal: ´´´source ./config/env.sh´´´

Finalmente, para poder ejecutar el proyecto podremos ejecutarlo mediante ´´´npm run dev´´´ si es que estamos desarrollando en él. Pero si no, lo ideal es ejecutarlo mediante un ´´´npm run start´´´´.

## Iniciando el servidor
Para que fuera posible iniciar el servidor backend, fue necesario hacer una serie de cambios en el archivo principal de la aplicación (/app.js):
Primero se tuvo que importar todos los módulos de node que fueran necesarios en ese archivo en específico; posteriormente se tuvo que indicar una serie de configuraciones para el módulo express: Por ejemplo un parseo para JSON, indicar valores para el atributo "Access-Control-Allow-Origin", etc; posteriormente se conecta a la base de datos; se importaron los modelos/esquemas de la base de datos; y, finalmente, se inicia el servidor como tal. Todo esto fue dentro del archivo principal de la aplicación, es decir, no se utilizó como tal el archivo ubicado en la carpeta "/bin/www"

## Configuración en rutas
En cuanto al tema de las rutas de la aplicación se realizó como se indica en el archivo PDF donde vienen las instrucciones, sin embargo, se optó por desarrollar distintas rutas siguiendo una "estructura" modular, es decir, tenemos nuestro archivo principal de rutas, que a su vez, va a llamar a distintos archivos de rutas, donde cada uno representa un esquema de la base de datos.
Es importante mencionar que en la carpeta de los archivos de rutas tenemos a un archivo llamado "auth.js", este archivo nos va a ser de gran ayuda para estar haciendo las validaciones del token en cada petición que se haga al backend, es decir, con este archivo estaremos protegiendo nuestras rutas.
Por el lado del cliente cada que haga alguna petición http, será necesario que en los headers cuente con los atributos "Content-Type:application/json" y, principalmente, "Authorization: Bearer Token", en donde "Token", será el token generado al momento de iniciar sesión o registrarse en el sistema. Es importante mencionar que en éstas dos últimas funcionalidades, no se tiene que mandar en los headers el atributo "Authorization" ya que ahí tendríamos que colocar un token que justamente estamos tratando de generar.

## Ejemplo de petición HTTP
Por ejemplo, si quisiéramos obtener todos los registros del esquema Applications, tendríamos que colocar en la parte de la URL: ´´´http://localhost:3000/api/applications/logs/´´´
En el caso de que la aplicación estuviera alojada en un servidor remoto o desplegada en algún hosting, tendríamos que colocar la respectiva dirección IP o su respectivo nombre.
"/api" será la "entrada" de nuestra aplicación, seguida de lo que queramos obtener: "authorizations", "logs", "users". Finalmente estaremos utilizando el prefijo "/logs".
Posteriormente, Tendremos que indicar el tipo de petición HTTP y agregar los atributos "Content-Type" y "Authorization" en los headers. Y, dependiendo de si es GET o no, tendremos determinados valores en el cuerpo de la petición.
Finalmente, tendremos una respuesta del servidor, dependiendo de lo que hayamos solicitado y de si el token enviado fue correcto o válido. 