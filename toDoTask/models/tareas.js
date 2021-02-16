const { green } = require("colors");
const Tarea = require("./tarea");
require( 'colors' );

class Tareas {

	_listado = {};

	get listadoArr() {

		const listado = [];
		Object.keys( this._listado ).forEach( key => {
			
			const tarea = this._listado[ key ];
			listado.push( tarea );
		} );
		return listado;
	}

	constructor( desc ){

		this._listado = {};
		
	} //end constructor

	borrarTarea = ( id= '' ) => {
		if( this._listado[ id ] )
			delete this._listado[ id ];
	}

	cargarTareasFromArray = ( tareas = [] ) => {

		tareas.forEach( tarea => {
			this._listado[ tarea.id ] = tarea;
		} );
	}

	listadoCompleto = () =>{

		console.log();
		this.listadoArr.forEach( ( tarea, index ) => {

			const idx = `${ index + 1 }.`.green;
			const { desc, completadoEn } = tarea;
			const estado = completadoEn ? 'Completado'.green : 'Pendiente'.red;

			console.log( `${ idx } ${ desc } :: ${ estado }` );
		} );

	}

	listarCompletadas( completadas = true ){

		console.log();
		let contador = 1;
		this.listadoArr.forEach( ( tarea ) => {

		
			const { desc, completadoEn } = tarea;
			const estado = completadoEn ? 'Completado'.green : 'Pendiente'.red;

			if( completadas ){
				if( completadoEn ){
					console.log( `${ ( contador + '.' ).green } ${ desc } :: ${ completadoEn.green }` );
					contador ++;
				} //end if
			} //end if
			else{
				if( ! completadoEn ){
					console.log( `${ ( contador + '.' ).green } ${ desc } :: ${ estado }` );
					contador ++;
				}
			} //end else

		} );
	}

	crearTarea( desc = '' ) {

		const tarea = new Tarea( desc );
		this._listado[ tarea.id ] = tarea;
	}

	toggleCompletadas = ( ids = [] ) => {

		ids.forEach( id => {

			const tarea = this._listado[ id ];
			if( ! tarea.completadoEn )
				tarea.completadoEn = new Date().toISOString();
		} );

		this.listadoArr.forEach( tarea => {

			if( ! ids.includes( tarea.id ) )
				 this._listado[ tarea.id ].completadoEn = null
		});
	}

} //end class

module.exports = Tareas;