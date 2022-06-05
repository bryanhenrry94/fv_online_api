const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../database.js');

// INSERT An formulario
router.post('/api/v1/formulario/', (req, res) => {
  const {documento, tipo, tipoid, email_cliente, estado, cliente, esbroker, email_broker} = req.body

  const query = `
    SET @documento = ?;
    SET @tipo = ?;
    SET @tipoid = ?;
    SET @email_cliente = ?;
    SET @estado = ?;
    SET @cliente = ?;
    SET @esbroker = ?;
    SET @email_broker = ?;

    CALL sp_formulario(@documento, @tipo, @tipoid, @email_cliente, @estado, @cliente, @esbroker, @email_broker);
  `;
  mysqlConnection.query(query, [documento, tipo, tipoid, email_cliente, estado, cliente, esbroker, email_broker], (err, rows, fields) => {
    if(!err) {

      mysqlConnection.query('SELECT hash FROM formulario WHERE documento = ?', [documento], (err, rows, fields) => {
        if (!err) {
          const hash = rows[0].hash;
    
          res.status(200).send({
            link: `http://localhost:3000/?hash=${hash}`
          })
        } else {
          console.log(err);
        }
      });
    } else {
      console.log(err);
    }
  });

});

// GET all Employees
router.get('/api/v1/formulario/', (req, res) => {
  mysqlConnection.query('SELECT * FROM formulario', (err, rows, fields) => {
    if(!err) {
      res.status(200).json(rows)
    } else {
      console.log(err);
    }
  });  
});

// GET An formulario
router.get('/api/v1/formulario/:hash', (req, res) => {
  const { hash } = req.params; 

  mysqlConnection.query('SELECT * FROM formulario WHERE hash = ?', [hash], (err, rows, fields) => {
    if (!err) {
      res.status(200).json(rows[0])
    } else {
      console.log(err);
    }
  });
});


/*
// INSERT An Employee
router.post('/', (req, res) => {
  const {id, name, salary} = req.body;
  console.log(id, name, salary);
  const query = `
    SET @id = ?;
    SET @name = ?;
    SET @salary = ?;
    CALL employeeAddOrEdit(@id, @name, @salary);
  `;
  mysqlConnection.query(query, [id, name, salary], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'Employeed Saved'});
    } else {
      console.log(err);
    }
  });

});

// GET all Employees
router.get('/', (req, res) => {
  mysqlConnection.query('SELECT * FROM employee', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });  
});

// GET An Employee
router.get('/:id', (req, res) => {
  const { id } = req.params; 
  mysqlConnection.query('SELECT * FROM employee WHERE id = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
    }
  });
});

// DELETE An Employee
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('DELETE FROM employee WHERE id = ?', [id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'Employee Deleted'});
    } else {
      console.log(err);
    }
  });
});

// INSERT An Employee
router.post('/', (req, res) => {
  const {id, name, salary} = req.body;
  console.log(id, name, salary);
  const query = `
    SET @id = ?;
    SET @name = ?;
    SET @salary = ?;
    CALL employeeAddOrEdit(@id, @name, @salary);
  `;
  mysqlConnection.query(query, [id, name, salary], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'Employeed Saved'});
    } else {
      console.log(err);
    }
  });

});

router.put('/:id', (req, res) => {
  const { name, salary } = req.body;
  const { id } = req.params;
  const query = `
    SET @id = ?;
    SET @name = ?;
    SET @salary = ?;
    CALL employeeAddOrEdit(@id, @name, @salary);
  `;
  mysqlConnection.query(query, [id, name, salary], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'Employee Updated'});
    } else {
      console.log(err);
    }
  });
});
*/

module.exports = router;