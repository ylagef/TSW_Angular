var express = require('express');
var router = express.Router();

// GET users listing
router.get('/', function (req, res, next) {
  res.locals.connection.query('SELECT * FROM users',
    function (error, results, fields) {
      if (error) {
        res.json({
          "status": 500,
          "error": error,
          "response": null
        });
        //If there is error, we send the error in the error section with 500 status
      } else {
        res.json({
          "status": 200,
          "error": null,
          "response": results
        });
        //If there is no error, all is good and response is 200OK.
      }
    });
});

// GET user by id
router.get('/:id', function (req, res, next) {
  console.log(req.params);
  res.locals.connection.query('SELECT * FROM users WHERE user_id=' + req.params.id,
    function (error, results, fields) {
      if (error) {
        res.json({
          "status": 500,
          "error": error,
          "response": null
        });
        //If there is error, we send the error in the error section with 500 status
      } else {
        res.json({
          "status": 200,
          "error": null,
          "response": results
        });
        //If there is no error, all is good and response is 200OK.
      }
    });
});

const bcrypt = require('bcrypt');

// POST user
router.post('/', function (req, res) {
  console.log(req.body);
  let hashedPass = bcrypt.hashSync(req.body.password, 10);
  console.log("Hashed pass: " + hashedPass);
  res.locals.connection.query('INSERT INTO users (username, name, email, password) VALUES (?,?,?,?)',
    [req.body.username, req.body.name, req.body.email, hashedPass],
    function (error, results) {
      if (error) {
        res.json({
          "status": 500,
          "error": error,
          "response": null
        });
        //If there is error, we send the error in the error section with 500 status
      } else {
        res.json({
          "status": 200,
          "error": null,
          "response": results
        });
        //If there is no error, all is good and response is 200OK.
      }
    });
});

// DELETE user by id
router.delete('/:id', function (req, res, next) {
  console.log(req.params);
  res.locals.connection.query('DELETE FROM users WHERE user_id=' + req.params.id,
    function (error, results, fields) {
      if (error) {
        res.json({
          "status": 500,
          "error": error,
          "response": null
        });
        //If there is error, we send the error in the error section with 500 status
      } else {
        res.json({
          "status": 200,
          "error": null,
          "response": results
        });
        //If there is no error, all is good and response is 200OK.
      }
    });
});

module.exports = router;