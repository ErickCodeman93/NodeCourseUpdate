// Un callback es una funcion que se ejecuta en cierto momento del tiempo o eventualmente
// Es una funcion que se manda como argumento a otra funcion
/* Son muy usadas en node y basicamente se ejecutan cuando se realiza una condicion */ 

// Declaracion de la funcion
const getUserById = ( id, callback ) => {

	const user = {
		id,
		name: 'Erick',
	};

	setTimeout( () => {
		callback( user );
	}, 1500 );

} //end function

// Llamado de la funcion
getUserById( 23, ( { id, name } ) => {
	console.log( id );
	console.log( name.toUpperCase() );
} );
