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
	} );

}; //end function

const id = 3;

// Transforma una funcion normal en una promesa o asincrona
const getInfoUser = async ( id ) =>{

	try {
		
		const { id:id_user, name } = await getEmployById( id );
		const { salary } = await getSalaryById( id_user );
		return `El empleado ${ name } tiene un salario de $${ salary.toFixed(2) }`;

	} //end try
	catch ( error ) {
		throw error; 
	} //end catch

} //end function

getInfoUser( id )
	.then( response => console.log( response ) )
	.catch( error => console.log( error, 'Error!!!' ) );


