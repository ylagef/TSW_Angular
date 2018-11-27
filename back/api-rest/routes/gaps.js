var express = require('express');
var router = express.Router();

// GET gaps listing
router.get('/', function (req, res, next) {
  res.locals.connection.query('SELECT * FROM gaps',
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

// GET gap by id
router.get('/:id', function (req, res, next) {
  console.log(req.params);
  res.locals.connection.query('SELECT * FROM gaps WHERE gap_id=' + req.params.id,
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

// GET gap by id
router.get('/poll/:id', function (req, res, next) {
  console.log(req.params);
  res.locals.connection.query('SELECT * FROM gaps WHERE poll_id=' + req.params.id,
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

// POST gap
router.post('/', function (req, res) {
  console.log(req.body["data"]);

  const gaps = [];
  req.body["data"].forEach(d => {
    gaps.push([d["poll_id"], d["start_date"], d["end_date"]])
  });

  console.log(gaps);

  res.locals.connection.query('INSERT INTO gaps (poll_id, start_date, end_date) VALUES ?', [gaps],
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
          "response": results
        });
        //If there is no error, all is good and response is 200OK.
      }
    });
});

// DELETE gap by id
router.delete('/:id', function (req, res, next) {
  console.log(req.params);
  res.locals.connection.query('DELETE FROM gaps WHERE gap_id=' + req.params.id,
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

module.exports = router;