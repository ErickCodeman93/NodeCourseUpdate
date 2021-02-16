const fs = require( 'fs' );
const axios = require('axios');

class Busquedas {

	historial = [];
	dbPath = './data/data.json';
	
	constructor(){
		//TODO: leer BD si existe
		this.leerDB();
	}

	get historialCapitalizado(){

		return this.historial.map( lugar => {

			let palabras = lugar.split( ' ' );
			palabras = palabras.map( p => p.charAt( 0 ).toUpperCase() + p.slice( 1 ) );

			return palabras.join( ' ' );
			 
		});
	}

	get paramsMapBox(){

		return {
			'access_token' : process.env.MAPBOX_KEY,
			'limit' : 5,
			'language' : 'es',
		}
	}

	get paramsOpenWeather() {

		return {
			'appid': process.env.OPENWEATHER_KEY,
			'units': 'metric',
			'lang': 'es',
		}
	}

	async ciudad( lugar = ''){

		try {

			const instance = axios.create( {
				baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ lugar }.json`,
				params: this.paramsMapBox,
			} );
			
			const resp = await instance.get();

			return resp.data.features.map( lugar => ({
				id: lugar.id,
				nombre: lugar.place_name,
				lng: lugar.center[0],
				lat: lugar.center[1],		
			}) );

		} //end try 
		catch (error) {
		
			return[];
		} //end catch
		
	} 

	async climaLugar( lat, lon ){

		try {
			
			const instace = axios.create( {
				baseURL: 'https://api.openweathermap.org/data/2.5/weather',
				params: { ...this.paramsOpenWeather, lat, lon },
			} );

			const response= await instace.get();

			const { weather, main } = response.data;

			return {
				desc: weather ? weather[0]. description : null,
				min: main ? main.temp_min : null,
				max: main ? main.temp_max : null,
				temp: main ? main.temp: null,
			};

		} //end try
		catch (error) {
			console.log( error );
		} //end catch
	}

	agregarHistorial = ( historial = '' ) => {

		if( this.historial.includes( historial.toLowerCase() ) )
			return;

		this.historial = this.historial.splice( 0, 4 );

		//TODO: prevenir duplicado
		this.historial.unshift( historial.toLowerCase() );
		
		//Grabar en DB
		this.saveDB();
	}


	saveDB = () => {

		const payload = {
			historial: this.historial,
		}

		fs.writeFileSync( this.dbPath,JSON.stringify( payload ) );
	}

	leerDB = () => {

		if( ! fs.existsSync( this.dbPath ) ) return;

		const info = fs.readFileSync( this.dbPath, { encoding: 'utf-8' } );
		const data = JSON.parse( info );

		this.historial = data.historial;
	}
}

module.exports = Busquedas;