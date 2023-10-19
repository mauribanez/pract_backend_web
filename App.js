const express = require('express');
const app = express();
const actorsRouter = require('./routes/actors');

// Conectar a la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'tu_usuario',
  password: 'tu_contraseña',
  database: 'tu_base_de_datos'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Conectado a la base de datos');
});

// Middleware para manejar datos JSON en las solicitudes
app.use(express.json());

// Rutas
app.use('/api', actorsRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`);
});
