const employees = [
	{
		id : 1,
		name : 'Erick', 
	},
	{
		id : 2,
		name : 'David', 
	},
	{
		id : 3,
		name : 'Anna', 
	},
];

const wages = [
	{
		id: 1,
		salary: 1000,
	},
	{
		id: 2,
		salary: 1500,
	},
];

const getEmployById = ( id ) => {

	return new Promise( ( resolve, reject ) => {
		
		const employ = employees.find( employ => employ.id === id );
		 employ ? resolve( employ ) : reject( `Empleado con ID ${ id } no existe.` );
	} );

}; //end function

const getSalaryById = ( id ) => {

	return new Promise( ( resolve, reject ) => {

		const salary = wages.find( salary => salary.id === id );
		salary ? resolve( salary ) : reject( `No existe el salario para el id ${ id }` );
		// salary.name = name;
	} );

}; //end function

const id = 2;

//Ejecucion de promesas
// getEmployById( id )
// 	.then( ( { name } )=> console.log( name ) )
// 	.catch( error => console.log( error ) );

// getSalaryById( id )
// 	.then( ( { salary } )=> console.log( salary ) )
// 	.catch( error => console.log( error ) );

// Promesas en cadena

//Solución Erick
// getEmployById( id )
// 	.then( employ => getSalaryById( employ.id ) )
// 	.then( ( { name, salary } ) => console.log( 'El empleado', name, 'tiene un salario de:', salary ) )
// 	.catch( error => console.log( error ) );

//Solución Profe
let name_employ;

getEmployById( id )
	.then( employ => { 

		name_employ = employ.name; 
		return getSalaryById( id );
	} )
	.then( salary => console.log( 'El empleado', name_employ, 'tiene un salario de:', salary.salary ) )
	.catch( error => console.log( error ) );