const mysql = require('mysql');
const db = mysql.createConnection({
  host: 'localhost',
  user: 'mauri',
  password: 'admin',
  database: 'sakila'
});

// Controladores para las rutas CRUD
const actorsController = {
  getAllActors: (req, res) => {
    const query = 'SELECT * FROM actor';

    db.query(query, (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener los actores' });
      } else {
        res.status(200).json(results);
      }
    });
  },

  getActorById: (req, res) => {
    const actorId = req.params.id;
    const query = 'SELECT * FROM actor WHERE actor_id = ?';

    db.query(query, [actorId], (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener el actor por ID' });
      } else {
        if (results.length === 0) {
          res.status(404).json({ error: 'Actor no encontrado' });
        } else {
          res.status(200).json(results[0]);
        }
      }
    });
  },

  createActor: (req, res) => {
    const { first_name, last_name } = req.body;
    const query = 'INSERT INTO actor (first_name, last_name) VALUES (?, ?)';

    db.query(query, [first_name, last_name], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al crear un nuevo actor' });
      } else {
        res.status(201).json({ message: 'Actor creado con éxito' });
      }
    });
  },

  updateActor: (req, res) => {
    const actorId = req.params.id;
    const { first_name, last_name } = req.body;
    const query = 'UPDATE actor SET first_name = ?, last_name = ? WHERE actor_id = ?';

    db.query(query, [first_name, last_name, actorId], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al actualizar el actor por ID' });
      } else {
        if (result.affectedRows === 0) {
          res.status(404).json({ error: 'Actor no encontrado' });
        } else {
          res.status(200).json({ message: 'Actor actualizado con éxito' });
        }
      }
    });
  },

  deleteActor: (req, res) => {
    const actorId = req.params.id;
    const query = 'DELETE FROM actor WHERE actor_id = ?';

    db.query(query, [actorId], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al eliminar el actor por ID' });
      } else {
        if (result.affectedRows === 0) {
          res.status(404).json({ error: 'Actor no encontrado' });
        } else {
          res.status(200).json({ message: 'Actor eliminado con éxito' });
        }
      }
    });
  }
};

module.exports = actorsController;
