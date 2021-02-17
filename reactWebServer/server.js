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

app.get( '*', (req, res) => {
	res.sendFile( __dirname + '/public/index.html' )
});
 
app.listen( port, () => {
	console.log(`Example app listening at http://localhost:${ port }`)
})