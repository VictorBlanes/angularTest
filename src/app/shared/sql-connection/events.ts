const express = require('express');

function createRouter(db) {
  const router = express.Router();

  router.post('/event', (req, res, next) => {
    db.query(
      'INSERT INTO testTable (message, userName, date) VALUES (?,?,?)',
      [req.body.message, req.body.userName, new Date(req.body.date)],
      (error) => {
        if (error) {
          console.error(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });

  router.get('/search', (req, res, next) => {
    db.query(
      'SELECT message, userName, date FROM testtable',
      (error, results) => {
        if (error) {
          console.error(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json(results);
        }
      }
    );
  });

  return router;
}

module.exports = createRouter;
