require( 'colors' );
const inquirer = require('inquirer');

const questionOpt = [
	{
		type: 'list',
		name: 'opcion',
		message: '¿Que deseas hacer?',
		choices: [ 
			{
				value: 1,
				name: `${ '1.'.green } Buscar ciudad` ,
			},
			{
				value: 2,
				name: `${ '2.'.green } Historial`,
			},
			{
				value: 0,
				name: `${ '0.'.green } Salir`,
			},
		 ],
	}
];


const inquirerMenu = async () => {

	// console.clear();
	console.log( '================================================'.green );
	console.log( ' Selecciona una opción'.white );
	console.log( '================================================\n'.green );

	const { opcion } = await inquirer.prompt( questionOpt );

	return opcion;
} 

const pause = async () => {

	const questionPause = [
		{
			type: 'input',
			name: 'enter',
			message: `Presione ${ 'ENTER'.green } para continuar`,
		}
	];

	console.log( '\n' );
	await inquirer.prompt( questionPause );

}

const leerInput = async ( msg ) =>{

	const question = [
		{
			type: 'input',
			name: 'desc',
			message: msg,
			validate( value ){

				if( value.length === 0 )
					return 'Por favor ingrese un valor';

				return true; 
			}
		}
	];

	const { desc } = await inquirer.prompt( question );
	return  desc;
}

const listarLugares = async ( lugares = [] ) => {

	console.log();

	const choices = lugares.map( ( lugar, i ) => { 
		
		const idx = `${ i +1 }`.green;

		return {
			value: lugar.id,
			name: `${ idx } ${ lugar.nombre }`,
		}
	 } );

	 choices.unshift({
		value : '0',
		name: '0.'.green + 'Cancelar' 

	 });

	 const preguntas = [{
		type: 'list',
		name: 'id',
		message: 'Seleccione lugar: ',
		choices

	 }];

	 const { id } = await inquirer.prompt( preguntas );

	 return id;

}

const confirmar = async ( message ) => {

	const pregunta = [{
		type: 'confirm',
		name: 'ok',
		message
	}];
	
	const { ok } = await inquirer.prompt( pregunta );
	return ok;
}

const mostrarListadoCheckList = async ( tareas = [] ) => {

	console.log();

	const choices = tareas.map( ( tarea, i ) => { 
		
		const idx = `${ i +1 }`.green;

		return {
			value: tarea.id,
			name: `${ idx } ${ tarea.desc }`,
			checked: tarea.completadoEn ? true : false,
		}
	 } );

	
	 const preguntas = [{
		type: 'checkbox',
		name: 'ids',
		message: 'Seleccione',
		choices

	 }];

	 const { ids } = await inquirer.prompt( preguntas );

	 return ids;

}

module.exports = {
	inquirerMenu,
	pause,
	leerInput,
	listarLugares,
	confirmar,
	mostrarListadoCheckList,
}


