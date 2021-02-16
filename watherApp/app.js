require('dotenv').config();

const { leerInput, inquirerMenu, pause, listarLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

const main = async () => {

	let opt;

	const busquedas = new Busquedas();

	do{

	 	opt = await inquirerMenu();
		 
		switch ( opt ) {
			case 1:
				//Mostar lugares
				const input = await leerInput('Ciudad: ');
				const lugares = await busquedas.ciudad( input );
				//Lista lugares en la consola
				const id = await listarLugares( lugares );

				if( id === '0' ) continue;

				//Lugar
				const lugarSeleccionado = lugares.find( lugar => lugar.id === id );

				//Guardar en DB
				busquedas.agregarHistorial( lugarSeleccionado.nombre );

				//Clima
				const clima = await busquedas.climaLugar( lugarSeleccionado.lat, lugarSeleccionado.lng );

				//Mostrar Resultado
				console.log('\nInformación de la ciudad \n'.green );
				console.log('Ciudad:', lugarSeleccionado.nombre );
				console.log('Lat:', lugarSeleccionado.lat );
				console.log('Lng:', lugarSeleccionado.lng );
				console.log('Temperatura:', clima.temp );
				console.log('Mínima:', clima.min );
				console.log('Máxima:', clima.max );
				console.log('Como esta el clima:', clima.desc );
				
			break;

			case 2:
				
				busquedas.historialCapitalizado.forEach( ( e, i ) => {

					let idx = `${ i + 1 }`.green;
					console.log( idx, e );
				});

			break;
		
		} //end switch

		if( opt !== 0 ) await pause();

	} //end while
	while( opt !== 0 );
}

main();