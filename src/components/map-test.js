import React, { Component } from "react";
import Movie from "./maptestchildren";

const movies = [
  {
    title: "Matrix",
    description: "Hello"
  },
  {
    title: "Matrix2",
    description: "Hello"
  },
  {
    title: "Matrix3",
    description: "Hello"
  },
  {
    title: "Matrix4",
    description: "Hello"
  },
  {
    title: "Matrix5",
    description: "Hello"
  }
];

class MapTest extends Component {
  render() {
    return (
      <div>
        {movies.map(movie => (
          <Movie title={movie.title} description={movie.description} />
        ))}
      </div>
    );
  }
}

export default MapTest;
