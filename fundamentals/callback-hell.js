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

const getEmployById = ( id, callback ) => {

	const employ = employees.find( employ => employ.id === id );

	if( employ )
		callback( null, employ );
	else
		callback( `Empleado con ID ${ id } no existe.` );
	
}; //end function

const getSalaryById = ( id, callback ) => {

	const salary = wages.find( salary => salary.id === id );

	if( salary )
		callback( null, salary )
	else
		callback( `No existe el salario para el id ${ id }` )
}; //end function

//AL llamado de funciones dentro otras funciones y que contienen callback se le llama Callback Hell;

const id = 3;

getEmployById( id, ( error, employ ) => {

	if( error )
		return console.log( error );

	const { name } = employ;

	getSalaryById( id, ( error, wages ) => {

		if( error )
			return console.log( error );
	
		const { salary } = wages;
		console.log( 'El empleado', name, 'tiene un salario de:', salary );
	} );

} );

