import React from 'react';
import axios from 'axios';
import Weather from './components/Weather';
import Movies from './components/Movies';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';



export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      cityData: '',
      displayMap: false,
      errorMessage: false,
      errorCode: '',
      weatherItem: [],
      showWeather: false,
      latitude: '',
      longitude: '',
      moviesArr: [],
      showMovies: false
    }
  }
  getCity = async (event) => {
    event.preventDefault();
    let serverRoute = process.env.REACT_APP_SERVER;

    let cityUrl = `https://eu1.locationiq.com/v1/search.php?key=pk.63a606d76ae82f65d9961e057fb86606&q=${this.state.searchQuery}&format=json`;
    try {

      let cityResult = await axios.get(cityUrl);
      this.setState({
        cityData: cityResult.data[0],
        displayMap: true,
        errorMessage: false,
        latitude: cityResult.data[0].lat,
        longitude: cityResult.data[0].lon
      })
    }
    catch (error) {
      this.setState({
        displayMap: false,
        errorMessage: true,
        errorCode: error,
      })
    }



    //-----------------------------------------------------------PartWeather-------------------------------------------------------------


    try {
      // const url = `http://localhost:3001/weather?city=amman&lon=35.9239625&lat=31.9515694`;
      //  const url = `${serverRoute}/weather?city=${this.state.searchQuery}&lon=${this.state.longitude}&lat=${this.state.latitude}`;

      let importedWeatherData = await axios.get(`${serverRoute}/weather?`, { params: { city: this.state.searchQuery } });
      // const recipes = await axios.get(`${server}/recipes`, { params: { ingredient: this.state.ingredient } });

      this.setState({
        weatherItem: importedWeatherData.data,
        showWeather: true,
        // latitude: this.state.cityData.lat,
        // longitude: this.state.cityData.lon
      })
    } catch (error) {
      this.setState({
        weatherItem: error.response,
        showWeather: false
      })
    }

    //-----------------------------------------------------------PartMovie-------------------------------------------------------------
    try {

      let importedMoviesData = await axios.get(`${serverRoute}/movie?`, { params: { city: this.state.searchQuery } });


      this.setState({
        moviesArr: importedMoviesData.data,
        showMovies: true,
        // latitude: this.state.cityData.lat,
        // longitude: this.state.cityData.lon
      })
    } catch (err) {
      this.setState({
        moviesArr: err.message,
        showMovies: false
      })
    }
  }

  updateSearchQuery = (event) => {
    this.setState({
      searchQuery: event.target.value
    })
  }
  render() {
    return (
      <>
        <Row>
          <Col>

            <h1>City Explorer</h1>
            <Form onSubmit={this.getCity}>
              <Form.Group controlId="formBasicEmail">
                <Form.Control type="text" placeholder="Enter City Name" onChange={this.updateSearchQuery} size="sm" />
              </Form.Group>
              <Button variant="dark" type="submit" size="sm">
                Explore!
              </Button>
            </Form>



          </Col>

          <Col>

            {this.state.displayMap &&
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={`https://maps.locationiq.com/v3/staticmap?key=pk.ac59253e8de69d4b78490835a252e7bb&center=${this.state.cityData.lat},${this.state.cityData.lon}`} />
                <Card.Body>
                  <Card.Title>{this.state.cityData.display_name}</Card.Title>
                  <Card.Text>

                  </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroup>latitude {this.state.cityData.lat}</ListGroup>
                  <ListGroup>longitude {this.state.cityData.lon}</ListGroup>
                </ListGroup>
              </Card>

            }

          </Col>
        </Row>

        {this.state.errorMessage &&
          <Alert variant="danger">
            Please Enter a Valid City Name, Error Code:<br />
            {this.state.errorCode.response.status}
          </Alert>
        }

        {this.state.displayMap && <Weather weatherData={this.state.weatherItem} showWeather={this.state.showWeather}></Weather>}

        {this.state.displayMap && <Movies moviesData={this.state.moviesArr} showMovies={this.state.showMovies}></Movies>}
      </>
    );
  }
}
export default App;

