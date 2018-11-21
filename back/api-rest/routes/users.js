var express = require('express');
var router = express.Router();
var md5 = require('md5');
var nJwt = require('njwt');
var secureRandom = require('secure-random');

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

// POST user
router.post('/login', function (req, res) {
  console.log(req.body);
  let hashedPass = md5(req.body.password);
  console.log("Hashed pass: " + hashedPass);
  res.locals.connection.query('SELECT user_id, username, name, email FROM users WHERE username="' + req.body.username + '" AND password="' + hashedPass + '"',
    function (error, results, fields) {
      if (error) {
        res.json({
          "status": 500,
          "error": error,
          "response": null
        });
        //If there is error, we send the error in the error section with 500 status
      } else {
        if (results.length == 1) {
          console.log(results);

          var claims = {
            iss: "http://myapp.com/", // The URL of your service
            sub: "users/user1234", // The UID of the user in your system
            scope: "self, admins"
          }
          var secretKey = secureRandom(256, {
            type: 'Buffer'
          }); // Create a highly random byte array of 256 bytes
          var jwt = nJwt.create(claims, secretKey);
          // console.log(jwt.compact());
          console.log(results.push(jwt.compact()));

          res.json({
            "status": 200,
            "error": null,
            "response": results
          });
        } else {
          res.status(400);

          res.json({
            "status": 400,
            "error": "User is not on db",
            "response": null
          });

        }
        //If there is no error, all is good and response is 200OK.
      }
    });
});

module.exports = router;