import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './App.css';

function App() {
  const [movieName, setMovieName] = useState('');
  const [movieReview, setReview] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [newReview, setNewReview] = useState('');
  useEffect(() => {
    Axios.get('http://localhost:3001/api/get').then((response) => {
      setMovieList(response.data);
    }, []);
  });

  const submitReview = () => {
    Axios.post('http://localhost:3001/api/insert', {
      movieName,
      movieReview,
    });
    setMovieList([...movieList, { movieName, movieReview }]);
  };

  const deleteReview = (movie) => {
    Axios.delete(`http://localhost:3001/api/delete/${movie}`);
  };

  const updateReview = (movie) => {
    Axios.put('http://localhost:3001/api/update', {
      movieName: movie,
      movieReview: newReview,
    });
    setNewReview('');
  };

  return (
    <div className="App">
      <h1>CRUD APPLICATION</h1>
      <div className="form">
        <label>Movie Name :</label>
        <input
          type="text"
          name="movieName"
          onChange={(e) => {
            setMovieName(e.target.value);
          }}
        />
        <label>Review :</label>
        <input
          type="text"
          name="review"
          onChange={(e) => {
            setReview(e.target.value);
          }}
        />
        <button onClick={submitReview}>Submit</button>
        {movieList.map((value, idx) => {
          return (
            <div className="card" key={idx}>
              <h1>{value.movieName}</h1>
              <p>{value.movieReview}</p>
              <button
                onClick={() => {
                  deleteReview(value.movieName);
                }}
              >
                Delete
              </button>
              <input
                type="text"
                id="updateInput"
                onChange={(e) => {
                  setNewReview(e.target.value);
                }}
              />
              <button
                onClick={() => {
                  updateReview(value.movieName);
                }}
              >
                Update
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
