require( 'colors' );
const inquirer = require('inquirer');

const questionOpt = [
	{
		type: 'list',
		name: 'opcion',
		message: '¿Que deseas hacer?',
		choices: [ 
			{
				value: '1',
				name: `${ '1.'.green } Crear tarea` ,
			},
			{
				value: '2',
				name: `${ '2.'.green } Listar tareas`,
			},
			{
				value: '3',
				name: `${ '3.'.green } Listar tareas completadas`,
			},
			{
				value: '4',
				name: `${ '4.'.green } Listar tareas pendientes`,
			},
			{
				value: '5',
				name: `${ '5.'.green } Completar tarea(s)`,
			},	
			{
				value: '5',
				name: `${ '6.'.green } Borrar tarea(s)`,
			},
			{
				value: '0',
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

const listadoBorrarTareas = async ( tareas = [] ) => {

	const choices = tareas.map( ( tarea, i ) => { 
		
		const idx = `${ i +1 }`.green;

		return {
			value: tarea.id,
			name: idx,
		}
	 } );

	 console.log( choices );
}

module.exports = {
	inquirerMenu,
	pause,
	leerInput,
	listadoBorrarTareas,
}


