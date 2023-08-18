# DESCUBRE ANDALUCÍA

## [DESCUBRE ANDALUCÍA APP](https://tourism-web.adaptable.app/)

![App Logo](/public/images/background-andalucia.jpg)

## Descripción

- Descubre Andalucía, una web de turismo dónde podrás conocer diferentes sitios de interés en la Comunidad Autónoma del sur de España. 
 
## Acciones de Usuario

- **Inicio** - esta página está diseñada para cualquier persona que acceda a la web pueda visualizar el contenido, las 8 provincias de Andalucía. 

- **Detalles de Provincia** - cuando el usuario accede a los detalles de una provincia podrá visualizar los diferentes sitios de interés dentro de la misma pero para poder acceder a sus detalles deberá de iniciar sesión o registrarse. 

- **Inicio de sesión** - en la parte superior de la web mostrará un botón de inicio de sesión para que el usuario accede a la web con sus credenciales, correo electrónico y contraseña. 

- **Registrarse** - en la parte superior de la web mostrará un botón registro dónde el usuario, para poder acceder a la web deberá de registrarse rellenando un formulario con sus credenciales. 

- **Mi Perfil** - el usuario al iniciar sesión tendrá un botón llamado Mi Perfil dónde podrá acceder a los datos de su perfil, editarlos y ver una sección llamada Lugares Favoritos los cuáles han sido añadidos por el propio usuario, los cuáles también podrá quitarlos con un botón Eliminar Fav o incluso ver los detalles de ese sitio. 

- **Detalles de un Sitio** - una vez iniciada la sesión del usuario, desde la página de inicio podrá acceder a los detalles de una provincia y desde esta, podrá ver los diferentes sitios de interés y acceder a los detalles de estos. Además podrá crear una reseña con su valoración y comentario del sitio mostrado. También podrá ver los comentarios de los demás usuarios en ese sitio. 

- **Lista de Usuarios** - si posees una cuenta de administrador en la web e inicias sesión, podrá ver un botón que le mostrará como su nombre indica la lista de usuarios registrados en la app, dónde verá algunos datos de estos y podrá eliminarlos. 

- **Nuevo Sitio** - si posees una cuenta de administrador en la web e inicias sesión, podrá ver un botón que le permitirá crear un nuevo sitio rellenando un formulario con los datos necesarios para crearlo. 

- **Detalles de un Sitio** - si eres administrador, dentro de los detalles de un sitio perteneciente a una provincia concreta, podrá editar los datos de este sitio, eliminarlo y eliminar reseñas de los usuarios. 

- **Cerrar sesión** - el usuario una vez acceda a la web con sus credenciales, les mostrará un botón para poder cerrar sesión cuando desee. 


## Funcionalidades a implementar

- Poder filtrar los sitios de interés dentro de las provincias a través de los tipos de sitios a visitar, por ejemplo: montaña, playa, actividades, gastronomía...

- Permitir que el usuario pueda agregar imágenes de los sitios a sus reseñas.

- Mostrar una valoración media de los sitios dependiendo de las valoraciones de los usuarios. 

- Poder agregar más imágenes e información adicional a los sitios para poder ayudar al usuario a conocer mejor el sitio sin haber ido. 

## Tecnologías usadas

- Las tecnologías usadas son: HTML, CSS, Bootstrap, Cloudinary, Javascript, MongoDB, Node, Express, Handlebars, Sessions & Cookies.


## Rutas

- GET / 
  - renderiza la página de inicio.
- GET /auth/signup
  - renderiza el formulario de registro.
- POST /auth/signup
  - crea el usuario y envía los datos del formulario de registro.
  - redirige a la página de inicio. 
- GET /auth/login
  - renderiza la vista del formulario de login. 
- POST /auth/login
  - redirige a la página de inicio si el usuario existe. 
- GET /auth/logout
  - cierra la sesión del usuario.
  - redirige a la página de inicio. 
- GET /places/:province 
  - renderiza la vista de sitios dentro de una provincia.
- GET /places/create-place 
  - renderiza la vista de crear un sitio.  
- POST /places/create-place 
  - crea el nuevo sitio perteneciente a la provincia.
  - redirige a los detalles de la provincia.  
- GET /places/:placeId 
  - renderiza la vista de detalles un sitio.  
- GET /places/:placeId/update
  - renderiza la vista para editar un sitio. 
- POST /places/:placeId/update
  - actualiza el sitio. 
  - redirige a los detalles del sitio actualizado. 
- POST /places/:placeId/delete
  - elimina el sitio mostrado.     
  - redirige a la provincia.
- POST /comment/create/:placeId
  - crea un comentario en los detalles del sitio.     
  - redirige a los detalles del sitio.
- POST /delete/:placeId/:commentId
  - elimina un comentario.
  - redirige a los detalles del sitio. 
- GET /user/:userId 
  - renderiza la vista de perfil del usuario. 
- POST /user/:placeId/fav
  - añade a favoritos el sitio mostrado.
  - redirige a los detalles del sitio.  
- POST /user/:placeId/fav
  - eliminados de favoritos el sitio. 
  - redirige a los detalles del sitio. 
- GET /user/list-users
  - renderiza la vista de todos los usuarios al admin. 
- POST /user/:placeId/fav
  - elimina un usuario.
  - redirige a la vista de todos los usuarios.
- GET /user/update/
  - renderiza la vista de editar usuario.
- POST /user/update/
  - actualiza la información edita del usuario.
  - redirige al perfil del usuario.  

## Models


User model
 
```
username: String
email: String
password: String
confirmPassword: String
role: [String]
profileImg: String
dateborn: Date
placeFav: ObjectId<Place>
```

Place model

```
name: String
location: String
description: String
placeImg: String
province  [String]

``` 

Comment model

```
owner: ObjectId<User>
place: ObjectId<Place>
description: String
date: Date
``` 

## Enlaces

## Colaboradores

[Developer 1 Manu](https://github.com/Manudominguez1994)

[Developer 2 Antonio](https://github.com/antoniionavas)

### Projecto

[Repository Link](https://github.com/Manudominguez1994/ProjectModule2)

[Deploy Link](https://tourism-web.adaptable.app/)


### Presentación

[Slides Link](https://www.canva.com/design/DAFr4D1E_Pc/rg184JWBWSfKgsz-_MkkIw/watch?utm_content=DAFr4D1E_Pc&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink)
