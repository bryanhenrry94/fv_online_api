const express = require('express')
const cors = require('cors');
const app = express()

// Settings
app.set('port', process.env.PORT || 8081);

// Middlewares
app.use(express.json());

// Cors, acceso a las api desde el siguiente sitio
app.use(cors({
  origin: 'http://localhost:3000'
}));

// Routes
app.use(require('./routes/formulario'));

// Starting the server
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});