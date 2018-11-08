var express = require('express');
var router = express.Router();

// GET assignations listing
router.get('/', function (req, res, next) {
  res.locals.connection.query('SELECT * FROM assignations',
    function (error, results, fields) {
      if (error) {
        res.json({ "status": 500, "error": error, "response": null });
        //If there is error, we send the error in the error section with 500 status
      } else {
        res.json({ "status": 200, "error": null, "response": results });
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
        res.json({ "status": 500, "error": error, "response": null });
        //If there is error, we send the error in the error section with 500 status
      } else {
        res.json({ "status": 200, "error": null, "response": results });
        //If there is no error, all is good and response is 200OK.
      }
    });
});

// POST assignations
router.post('/', function (req, res) {
  console.log(req.body);
  res.locals.connection.query('INSERT INTO assignations (user_id, gap_id) VALUES (?,?)',
    [req.body.user_id, req.body.gap_id],
    function (error, results) {
      if (error) {
        res.json({ "status": 500, "error": error, "response": null });
        //If there is error, we send the error in the error section with 500 status
      } else {
        res.json({ "status": 200, "error": null, "response": results });
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
        res.json({ "status": 500, "error": error, "response": null });
        //If there is error, we send the error in the error section with 500 status
      } else {
        res.json({ "status": 200, "error": null, "response": results });
        //If there is no error, all is good and response is 200OK.
      }
    });
});

module.exports = router;
