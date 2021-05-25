import React from 'react';
import axios from 'axios';

class Weather extends React.Component {

    constructor(props) {
      super(props);
  
      this.state = {
      day1:'',
      day2:'',
      day3:'',
      displayMap:this.props.displayMap,
      errorMess: false,
      }
    }
  
    info= async () => {
     
      let serverRoute = process.env.REACT_APP_SERVER; 
      let lon= Math.round(this.props.lon);
      let lat= Math.round(this.props.lat);
      console.log(lon,lat);
      let url = `${serverRoute}/getLocation?city_name=${this.props.cityName}&lon=${lon}&lat=${lat}`;
      let locItem = await axios.get(url);
        
      
     console.log(locItem);
     this.setState({
      day1:locItem.data.Data[0],
      day2:locItem.data.Data[1],
      day3:locItem.data.Data[2]
    });
  
     
    

    }
   callInfo=()=>{
     if(this.state.displayMap){
      this.info();
      this.setState({
        displayMap:false
      })
     }
     
   }
  
   
  
  
    render() {
  
     this.callInfo();
  
      return (
  
  
        <>
        <p>{this.state.day1.description}</p>
        <p>{this.state.day2.description}</p>
        <p>{this.state.day3.description}</p>
        </>
  
  
  
  
      );
  
  
  
  
  
  
    }
  
  
  
  }
  
  export default Weather;
  