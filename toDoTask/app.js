require( 'colors' );

const { saveDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, pause, leerInput, listadoBorrarTareas, confirmar, mostrarListadoCheckList } = require('./helpers/inquire');
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
				const ids = await mostrarListadoCheckList( tareas.listadoArr );
				tareas.toggleCompletadas( ids );
				
			break;

			case '6':
				const id = await listadoBorrarTareas( tareas.listadoArr );

				if( id !== '0' ){
					const ok = await confirmar('¿Estas seguro que deseas borrarlo?');
					
					if( ok ){
						tareas.borrarTarea( id );
						console.log( 'Tarea borrada correctamente' );
					} //end if
				} //end if
			break;
		
		} //end switch

		saveDB( tareas.listadoArr );
		await pause();

	} //end do 
	while( opt !== '0' )

}

main();