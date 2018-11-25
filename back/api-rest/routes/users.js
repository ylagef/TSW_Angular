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
        res.status(500);
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
        res.status(500);
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
        res.status(500);
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

// REGISTER user
router.post('/register', function (req, res) {
  console.log(req.body["data"]);

  console.log("Checking username...");
  res.locals.connection.query('SELECT * FROM users WHERE username="' + req.body["data"].username + '"',
    function (error, results, fields) {
      if (error) {
        console.log(error);

        res.status(500);
        res.json({
          "status": 500,
          "error": error,
          "response": null
        });        
      } else {
        // If nor error on query, we check if already exists or not
        if (results.length > 0) {
          console.log("Username already exists");

          res.status(500);
          res.json({
            "status": 500,
            "error": null,
            "response": "Username already exists"
          });
        } else {
          // Is username not exists, we check the email
          console.log("Checking email...");
          res.locals.connection.query('SELECT * FROM users WHERE email="' + req.body["data"].email + '"',
            function (error, results, fields) {
              if (error) {
                console.log(error);

                res.status(500);
                res.json({
                  "status": 500,
                  "error": error,
                  "response": null
                });  
              } else {
                // If nor error on query, we check if already exists or not
                if (results.length > 0) {
                  console.log("Email already exists");

                  res.status(500);
                  res.json({
                    "status": 500,
                    "error": null,
                    "response": "Email already exists"
                  });
                } else {
                  // If username and email not exist, we add the new user.
                  console.log("Adding user...");
                  res.locals.connection.query('INSERT INTO users (username, name, email, password) VALUES (?,?,?,?)',
                    [req.body.data.username, req.body.data.name, req.body.data.email, req.body.data.password],
                    function (error, results) {
                      if (error) {
                        res.status(500);
                        res.json({
                          "status": 500,
                          "error": "Error on user insert",
                          "response": null
                        });
                        //If there is error, we send the error in the error section with 500 status
                      } else {
                        console.log("User created succesful.")
                        res.json({
                          "status": 200,
                          "error": null,
                          "response": results
                        });
                        //If there is no error, all is good and response is 200OK.
                      }
                    });
                }
              }
            });
        }
      }
    });


});


// POST user
router.post('/login', function (req, res) {
  console.log(req.body);
  let hashedPass = md5(req.body.password);

  res.locals.connection.query('SELECT user_id, username, name, email FROM users WHERE username="' + req.body.username + '" AND password="' + hashedPass + '"',
    function (error, results, fields) {
      if (error) {
        res.status(500);
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