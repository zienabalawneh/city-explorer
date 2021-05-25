import React from 'react';
import axios from 'axios';
import Weather from './componant/Weather';


class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      searchQ: '',
      Data: '',
      displayMap: false,
      errorMess: false,

    }
  }

  location = async (e) => {
    e.preventDefault();



    let LocUrl = `https://eu1.locationiq.com/v1/search.php?key=f5de8e48adbdc6&q=${this.state.searchQ}&format=json`;


    try {

      let loc = await axios.get(LocUrl);


      this.setState({
        Data: loc.data[0],
        displayMap: true
      })

    }

    catch {
      this.setState({
        displayMap: true,
        errorMess: true
      })
    }

  }


  updateSearchQ = (e) => {
    this.setState({ searchQ: e.target.value, })
  }


  render() {



    return (


      <>
        <h1>City Explorer</h1>
        <form onSubmit={this.location}  >
          <input type="text" placeholder="add a city" onChange={this.updateSearchQ} />

          <input type="submit" placeholder="LOCATION" />
        </form>

        <p>{this.state.Data.display_name}</p>

        { this.state.displayMap &&
          <img src={`https://maps.locationiq.com/v3/staticmap?key=f5de8e48adbdc6&center=${this.state.Data.lat},${this.state.Data.lon}`} alt='' />
        }
          {this.state.displayMap&&
          
          <Weather cityName={this.state.searchQ} displayMap={this.state.displayMap} lat={this.state.Data.lat} lon={this.state.Data.lon} /> }
      </>




    );






  }



}

export default App;
