var express = require('express');
var router = express.Router();
var md5 = require('md5');

// GET users listing
router.get('/', function (req, res, next) {
  const token = req["headers"]["authorization"].split(" ")[1];

  nJwt.verify(token, secretKey, function (err, verifiedJwt) {
    if (err) {
      // console.error(err); // Token has expired, has been tampered with, etc
      res.status(401);
      res.json({
        "status": 401,
        "error": err,
        "response": null
      });
    } else {
      //      // console.log(verifiedJwt); // Will contain the header and body

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
    }
  });
});

// GET user by id
router.get('/:id', function (req, res, next) {
  // console.log(req.params);

  const token = req["headers"]["authorization"].split(" ")[1];

  nJwt.verify(token, secretKey, function (err, verifiedJwt) {
    if (err) {
      // console.error(err); // Token has expired, has been tampered with, etc
      res.status(401);
      res.json({
        "status": 401,
        "error": err,
        "response": null
      });
    } else {
      //      // console.log(verifiedJwt); // Will contain the header and body

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
    }
  });
});

// DELETE user by id
router.delete('/:id', function (req, res, next) {
  // console.log(req.params);

  const token = req["headers"]["authorization"].split(" ")[1];

  nJwt.verify(token, secretKey, function (err, verifiedJwt) {
    if (err) {
      // console.error(err); // Token has expired, has been tampered with, etc
      res.status(401);
      res.json({
        "status": 401,
        "error": err,
        "response": null
      });
    } else {
      //      // console.log(verifiedJwt); // Will contain the header and body

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
    }
  });
});

// REGISTER user
router.post('/register', function (req, res) {
  // console.log(req.body["data"]);

  // console.log("Checking username...");
  res.locals.connection.query('SELECT * FROM users WHERE username="' + req.body["data"].username + '"',
    function (error, results, fields) {
      if (error) {
        // console.log(error);

        res.status(500);
        res.json({
          "status": 500,
          "error": error,
          "response": null
        });
      } else {
        // If nor error on query, we check if already exists or not
        if (results.length > 0) {
          // console.log("Username already exists");

          res.status(500);
          res.json({
            "status": 500,
            "error": null,
            "response": "Username already exists"
          });
        } else {
          // Is username not exists, we check the email
          // console.log("Checking email...");

          res.locals.connection.query('SELECT * FROM users WHERE email="' + req.body["data"].email + '"',
            function (error, results, fields) {
              if (error) {
                // console.log(error);

                res.status(500);
                res.json({
                  "status": 500,
                  "error": error,
                  "response": null
                });
              } else {
                // If nor error on query, we check if already exists or not
                if (results.length > 0) {
                  // console.log("Email already exists");

                  res.status(500);
                  res.json({
                    "status": 500,
                    "error": null,
                    "response": "Email already exists"
                  });
                } else {
                  // If username and email not exist, we add the new user.
                  // console.log("Adding user...");
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
                        // console.log("User created succesful.")
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

// LOGIN user
router.post('/login', function (req, res) {
  // console.log(req.body);

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

          var claims = {
            user_id: results[0]["user_id"],
            username: results[0]["username"]
          }

          var jwt = nJwt.create(claims, secretKey);
          results.push(jwt.compact());

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