const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const db = mysql.createPool({
  host: '',
  user: '',
  password: '',
  database: '',
});

//! appliction/json 방식의 Content-Type 데이터를 받아준다.
app.use(express.json());
//!
app.use(cors());
//! applictaion/x-www-from-urlencoded 방식의 Content-Type 데이터를 받아준다.
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/get', (req, res) => {
  const sql = `SELECT * FROM movie_reviews`;
  db.query(sql, (err, results) => {
    res.send(results);
  });
});

app.post('/api/insert', (req, res) => {
  const movieName = req.body.movieName;
  const movieReview = req.body.movieReview;

  const sql = `INSERT INTO movie_reviews (movieName, movieReview) VALUES (?, ?)`;
  db.query(sql, [movieName, movieReview], (err, results) => {
    console.log(results);
  });
});

app.delete('/api/delete/:movieName', (req, res) => {
  const movieName = req.params.movieName;

  const sql = `DELETE FROM movie_reviews WHERE movieName = ?`;
  db.query(sql, movieName, (err, results) => {
    if (err) console.log(err);
  });
});

app.put('/api/update', (req, res) => {
  const movieName = req.body.movieName;
  const review = req.body.movieReview;

  const sql = `UPDATE movie_reviews SET movieReview = ? WHERE movieName = ?`;
  db.query(sql, [review, movieName], (err, results) => {
    if (err) console.log(err);
  });
});

app.listen(3001, () => {
  console.log('running on port 3001');
});
