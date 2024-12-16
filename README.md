Se especifican cambios realizados en el proyecto.

## Componente Login 

1. Se vinculan los campos de usuario y contraseña directamente con los datos internos del componente.

2. Se añadió un sistema de validación que verifica que los campos de usuario y contraseña no estén vacíos y que cumplan con los requisitos básicos. Se utiliza una función auxiliar (validateFields) que estandariza y centraliza la lógica de validación de campos. Esto facilita el mantenimiento y asegura consistencia en otras partes de la aplicación que puedan requerir validaciones similares. 

3. Manejo de errores, se gestionan errores tanto en las validaciones como en la autenticación.

4. Se implementó una integración con un servicio de autenticación que valida las credenciales del usuario contra un servidor.

## Componente ProductList

1. Se implementa sintaxis moderna de props y eventos de vue.

2. Mejora de la funcion toggleProductFavorite() en la que se implementa una version mejorada del caso de uso.

3. Se renombra la funcion por getProducts, para hacer implementacion del fetchservice.

4. Se implementa un boton y funcion para borrar el token de localStorage

## Capa de servicio fecthService 

1. Se crea la capa de servicio fecthService para alojar importacion de libreria axios y manejar desde acá los llamados externos que se requieran y no tener esas logicas en el componente.

2. Se crean las funciones loginService y fetchProducts, para llamados hacia api externa.