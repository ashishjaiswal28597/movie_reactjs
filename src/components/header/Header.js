import React, { useState , useEffect } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import {
  Container,
  Nav,
  Navbar,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";

const API_URL="https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US";
const API_SEARCH="https://api.themoviedb.org/3/search/movie?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&query"

const Header = () => {

  
  const [movies, setMovies]=useState([]);
  const [query,setQuery]=useState('');

  useEffect(() => {
    fetch(API_URL)
    .then((res)=>res.json())
    .then(data=>{
      console.log(data);
      setMovies(data.results);
    })
  }, [])

  const searchMovie = async(e)=>{
    e.preventDefault();
    console.log("Searching");
    try{
      const url=`https://api.themoviedb.org/3/search/movie?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&query=${query}`;
      const res= await fetch(url);
      const data= await res.json();
      console.log(data);
      setMovies(data.results);
    }
    catch(e){
      console.log(e);
    }
  }

  const changeHandler=(e)=>{
    setQuery(e.target.value);
  }

  return (
    <>
    
    <div className="header">
            <div className="headerLeft">
      <Navbar bg="dark" expand="lg" variant="dark">
        <Container fluid>
          <Navbar.Brand>
            <Link to="/" style={{ textDecoration: "none" }}>
              <span>MovieDB</span>
            </Link>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbarScroll"></Navbar.Toggle>

          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="ms-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link>
                <Link to="/movies/popular" style={{ textDecoration: "none" }}>
                  <span>Popular</span>
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/movies/top_rated" style={{ textDecoration: "none" }}>
                  <span>Top Reating</span>{" "}
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/movies/upcoming" style={{ textDecoration: "none" }}>
                  <span>Upcoming</span>
                </Link>
              </Nav.Link>
            </Nav>

            <Form className="d-flex" onSubmit={searchMovie}>
              <FormControl
                type="search"
                placeholder="Movie Search"
                className="me-2"
                aria-label="search"
                name="query"
                value={query}
                onChange={changeHandler}
              ></FormControl>
              <Button variant="secondary" type="submit">Search</Button>
            </Form>
          </Navbar.Collapse>

        </Container>
      </Navbar>

      </div>
      </div>

      {/* <div>
      {movies.length > 0 ?(
        <div className="container">
        <div className="grid">
          {movies.map((movieReq)=>
          <MovieBox key={movieReq.id} {...movieReq}/>)}
            </div>
    </div>
      ):(
        <h2>Sorry !! No Movies Found</h2>
      )}
    </div>  */}

    </>
  );
};

export default Header;
