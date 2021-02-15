require( 'colors' );

const { saveDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, pause, leerInput, listadoBorrarTareas } = require('./helpers/inquire');
const Tareas = require('./models/tareas');

console.clear();

const main = async () => {

	let opt = '';
	const tareas = new Tareas();

	const tareasDB = leerDB(); 

	if( tareasDB.length )	
		tareas.cargarTareasFromArray( tareasDB );
	

	do{

		opt = await inquirerMenu();
		
		switch ( opt ) {
			case '1':
				const desc = await leerInput( 'Descripción: ' );
				tareas.crearTarea( desc );
				
			break;

			case '2':
				tareas.listadoCompleto();
			break;

			case '3':
				tareas.listarCompletadas();
			break;

			case '4':
				tareas.listarCompletadas( false );
			break;

			case '5':
				console.log( 'Hola' );
			break;

			case '6':
				const id = await listadoBorrarTareas( tareas.listadoArr );
				console.log( id );
			break;
		
		} //end switch

		saveDB( tareas.listadoArr );
		await pause();

	} //end do 
	while( opt !== '0' )

}

main();