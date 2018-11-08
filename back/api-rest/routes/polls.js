var express = require('express');
var router = express.Router();

// GET polls listing
router.get('/', function (req, res, next) {
  res.locals.connection.query('SELECT * FROM polls',
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

// GET poll by id
router.get('/:id', function (req, res, next) {
  console.log(req.params);
  res.locals.connection.query('SELECT * FROM polls WHERE poll_id=' + req.params.id,
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

// POST poll
router.post('/', function (req, res) {
  console.log(req.body);
  var md5 = require('md5');
  const url = md5(req.body.title + "Hashing text");
  res.locals.connection.query('INSERT INTO polls (title, place, author, url) VALUES (?,?,?,?)',
    [req.body.title, req.body.place, req.body.author, url],
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

// DELETE poll by id
router.delete('/:id', function (req, res, next) {
  console.log(req.params);
  res.locals.connection.query('DELETE FROM polls WHERE poll_id=' + req.params.id,
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
