var express = require('express');
var router = express.Router();

// GET assignations listing
router.get('/', function (req, res, next) {
  res.locals.connection.query('SELECT * FROM assignations',
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

// GET assignation by id
router.get('/:id', function (req, res, next) {
  console.log(req.params);
  res.locals.connection.query('SELECT * FROM assignations WHERE assignation_id=' + req.params.id,
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

// GET assignation by id
router.get('/:gap_id/:user_id', function (req, res, next) {
  console.log("Getting id...");
  console.log(req.params);
  res.locals.connection.query('SELECT assignation_id FROM assignations WHERE user_id=' + req.params.user_id +
    ' AND gap_id=' + req.params.gap_id,
    function (error, results, fields) {
      if (error) {
        console.log("Error...");
        console.log(error);
        res.status(500);
        res.json({
          "status": 500,
          "error": error,
          "response": null
        });
        //If there is error, we send the error in the error section with 500 status
      } else {
        console.log("Todo ok");
        console.log(results);
        res.json({
          "status": 200,
          "error": null,
          "response": results
        });
        //If there is no error, all is good and response is 200OK.
      }
    });
});

// POST assignations
router.post('/', function (req, res) {
  console.log(req.body["data"]);

  const assignations = [];
  req.body["data"].forEach(d => {
    assignations.push([d["user_id"], d["gap_id"]])
  });

  res.locals.connection.query('INSERT INTO assignations (user_id, gap_id) VALUES ?', [assignations],
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

// DELETE assignation by id
router.delete('/:id', function (req, res, next) {
  console.log(req.params);
  res.locals.connection.query('DELETE FROM assignations WHERE assignation_id=' + req.params.id,
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

// DELETE assignation by id
router.delete('/:gap_id/:user_id', function (req, res, next) {
  console.log(req.params);
  res.locals.connection.query('DELETE FROM assignations WHERE user_id=' + req.params.user_id +
    ' AND gap_id=' + req.params.gap_id,
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