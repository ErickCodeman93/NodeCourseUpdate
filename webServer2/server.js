require( 'dotenv' ).config();
const express = require('express');
const hbs = require('hbs');

const port = process.env.PORT;
const app = express();

//HandleBars
app.set('view engine', 'hbs');
hbs.registerPartials( __dirname + '/views/share' );
hbs.registerPartials( __dirname + '/views/content' );
 
//Servir contenido estático
app.use( express.static( 'public' ) );

app.get( '/', (req, res) => {
	res.render( 'home', {
		nombre: 'Erick Alva',
		titulo: 'Curso de node',
	});
});

app.get( '/generic', (req, res) => {
	res.render( 'pages', {
		nombre: 'Erick Alva',
		titulo: 'Curso de node',
		classBody: 'subpage',
		classAlt: 'alt',
		whichPartial: function() {
			return "generic";
	  }
	});
});

app.get( '/elements', (req, res) => {
	res.render( 'pages', {
		nombre: 'Erick Alva',
		titulo: 'Curso de node',
		classBody: 'subpage',
		classAlt: 'alt',
		whichPartial: function() {
			return "elements";
	  }
	});
});

app.get( '*', (req, res) => {
	res.sendFile( __dirname + '/public/404.html' )
});
 
app.listen( port, () => {
	console.log(`Example app listening at http://localhost:${ port }`)
})