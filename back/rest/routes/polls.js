var express = require('express');
var router = express.Router();


// GET polls listing
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

      res.locals.connection.query('SELECT * FROM polls',
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

// GET poll by url
router.get('/:url', function (req, res, next) {
  // console.log(req.params);

  const token = req.headers["authorization"].split(" ")[1];

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
      res.locals.connection.query('SELECT * FROM polls WHERE url="' + req.params.url.toUpperCase() + '"',
        function (error, results, fields) {
          if (error) {
            // console.log(error);
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

// POST poll
router.post('/', function (req, res) {
  // console.log(req.body["data"]);

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
      var md5 = require('md5');
      const url = md5(req.body.title + "Hashing text" + req.body.place);
      res.locals.connection.query('INSERT INTO polls (title, place, author, url) VALUES (?,?,?,?)',
        [req.body.title, req.body.place, req.body.author, url.toUpperCase()],
        function (error, results) {
          if (error) {
            // console.log(error);
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
              "response": url.toUpperCase()
            });
            //If there is no error, all is good and response is 200OK.
          }
        });
    }
  });
});

// PUT poll
router.put('/', function (req, res) {
  console.log(req);

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
      var md5 = require('md5');
      const url = md5(req.body.title + "Hashing text" + req.body.place);
      res.locals.connection.query('UPDATE polls SET title="' + req.body["title"] + '", place="' + req.body["place"] + '" WHERE poll_id = ' + req.body["poll_id"],
        function (error, results) {
          if (error) {
            console.log(error);
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
              "response": url.toUpperCase()
            });
            //If there is no error, all is good and response is 200OK.
          }
        });
    }
  });
});

// DELETE poll by id
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
      res.locals.connection.query('DELETE FROM polls WHERE poll_id=' + req.params.id,
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

module.exports = router;