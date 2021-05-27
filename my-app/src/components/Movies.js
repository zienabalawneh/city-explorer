import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
class Movies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movieArr: this.props.weatherData
    }
  }
  render() {
    return (
      <>
        {this.props.moviesData.length !== 0 && this.props.showMovies &&
          <div className='gird'>
            {this.props.moviesData.map((day, i) => (

                <Card style={{ width: '18rem' }} className='box'>
                  <Card.Header>{this.props.moviesData[i].title}</Card.Header>
                  <ListGroup variant="Secondary">
                  <ListGroup.Item>Title: {this.props.moviesData[i].title}</ListGroup.Item>
                  <ListGroup.Item>Overview: {this.props.moviesData[i].overview}</ListGroup.Item>
                  <ListGroup.Item>Average Votes: {this.props.moviesData[i].average_votes}</ListGroup.Item>
                  <ListGroup.Item>Total Votes: {this.props.moviesData[i].total_votes}</ListGroup.Item>
                  <Card.Img variant="top" src={this.props.moviesData[i].image_url} />
                  {/* <ListGroup.Item>Image Url: {this.props.moviesData[i].image_url}</ListGroup.Item> */}
                  <ListGroup.Item>Popularity: {this.props.moviesData[i].popularity}</ListGroup.Item>
                  <ListGroup.Item>Release Date: {this.props.moviesData[i].released_on}</ListGroup.Item>
                </ListGroup>

              </Card>
            ))
            }
          </div>
        }
        {this.props.showMovies === false &&
          <ListGroup variant="danger">
            <ListGroup.Item>Title:  {this.props.moviesData}</ListGroup.Item>
          </ListGroup>

        }
      </>
    )
  }
}
export default Movies;
