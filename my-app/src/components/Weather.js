import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ListGroup from 'react-bootstrap/ListGroup';
class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      forecastArr: this.props.weatherData
    }
  }
  render() {
    return (
      <>
        {this.props.weatherData.length !== 0 && this.props.showWeather &&
          <div className='gird'>

            {this.props.weatherData.map((day, i) => (

              <ListGroup>
                <ListGroup.Item action variant="Info">
                  {this.props.weatherData[i].date}
                  {this.props.weatherData[i].description}
                </ListGroup.Item>
              </ListGroup>

            ))
            }


          </div>
        }
        {this.props.showWeather === false &&

          <ListGroup>
            <ListGroup.Item action variant="danger">
              {this.props.weatherData.data}
            </ListGroup.Item>
          </ListGroup>

        }
      </>
    )
  }
}
export default Weather;