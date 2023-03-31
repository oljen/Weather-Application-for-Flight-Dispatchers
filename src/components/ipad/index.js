// import preact 
import { h, render, Component } from 'preact';
import Flights from '../flights'
import Weather from '../weather'
import Banner from '../banner'
import Location from '../location'
//defines a component called Ipad which acts as a root 
//component and hosts other components like Flights, Weather, 
//Banner, and Location. It also fetches weather data from the 
//OpenWeatherMap API using jquery and updates the state of the component.

import style from './style';

import $ from 'jquery';


const API_KEY = "7e4b4125fd7471b2df46e860f3eefec2"



//The Ipad component has a constructor that initializes its state with some 
//default values. It also calls the fetchCurrentWeatherData, fetchForecastData, 
//fetchStart, and fetchDes methods to fetch weather data for the current location, 
//forecast data for the next 4 days, and the start and destination locations, respectively.

// Essentially root component - hosts all other components
export default class Ipad extends Component {
    // a constructor with initial set states
    constructor(props){
        super(props);
        this.state = {
            location: "London",
            displaySearchPanel: false,
            start: "London",
            end: "London",
            nearest: "",
            popUpShowUp: false
        };

        // fecthing the data
        this.fetchCurrentWeatherData();
        this.fetchForecastData();
        this.fetchStart();
        this.fetchDes();
    }

    //There are several methods defined in the component such as fetchCurrentWeatherData, 
    //fetchForecastData, fetchStart, fetchDes, displaySearchPanel, handleInputChange, handleCurrLocation, 
    //checkLocation, handleDropdownChange, handlePopup, and check.

    // fetch current weather data 
    fetchCurrentWeatherData = () => {
        var url = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.location}&units=metric&APPID=${API_KEY}`;
        $.ajax({
            url: url,
            dataType: "jsonp",
            success : (parsed_json) => {
                this.setState({
                    currWeather: parsed_json
                });
            },
            error : function(req, err){ console.log('API call failed ' + err); }
        })
    }

    // NEW (display start weather)
    fetchStart = () => {
        var url = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.start}&units=metric&APPID=${API_KEY}`;
        $.ajax({
            url: url,
            dataType: "jsonp",
            success : (parsed_json) => {
                this.setState({
                    startWeather: parsed_json
                });
            },
            error : function(req, err){ console.log('API call failed ' + err); }
        })
    }

    // NEW (display destination weather)
    fetchDes = () => {
        var url = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.end}&units=metric&APPID=${API_KEY}`;
        $.ajax({
            url: url,
            dataType: "jsonp",
            success : (parsed_json) => {
                this.setState({
                    desWeather: parsed_json
                });
            },
            error : function(req, err){ console.log('API call failed ' + err); }
        })
    }

    fetchForecastData = () => {
        var url = `http://api.openweathermap.org/data/2.5/forecast?q=${this.state.location}&units=metric&APPID=${API_KEY}`;
        $.ajax({
            url: url,
            dataType: "jsonp",
            success : (parsed_json) => {
                this.setState({
                    forecast: parsed_json
                });
            },
            error : function(req, err){ console.log('API call failed ' + err); }
        })
    }

    // switches between showing the information / search panels
    // triggered by the bottom buttons - Search / Go Back
    displaySearchPanel = (value) => {
        this.setState({ displaySearchPanel: value });
    }

    // triggered from the Search component - new location selected    
	handleInputChange = (event) => {
        const { value } = event.target;
        this.setState({ location: value });
        this.fetchCurrentWeatherData();
        this.fetchForecastData();
    };

    handleCurrLocation = () => {
		this.setState({ location: "London" });
        this.fetchCurrentWeatherData();
        this.fetchForecastData();
	}

	checkLocation = () => {
		console.log(this.state.location)
	}

    // handleChange = (event) => {
    //     const startLocation = event.target.value;
    //     this.setState({start: startLocation})
    //     this.fetchStart();
    //     console.log(this.state.start)
    // }

    // handleChangeDes = (event) => {
    //     const DesLocation = event.target.value;
    //     this.setState({des: DesLocation})
    //     this.fetchDes();
    //     console.log(this.state.des)
    // }


    handleDropdownChange = (value) => {
        const location = value.split(",")
        this.setState({
            start: location[0],
            end: location[1],
            nearest: location[2],
        });
        this.fetchStart();
        this.fetchDes();
        console.log(location)
    }

    handlePopup = () => {
        const temp = this.state.desWeather['main']['temp'];
        if(temp > 11){
            this.setState({popUpShowUp: true});
        }
        
        console.log(temp + " " +  this.state.popUpShowUp)
    }

    check = (value) => {
        const location = value
        this.setState({
            popUpShowUp: false,
            end: location
        });
        this.fetchDes();
        console.log(this.state.popUpShowUp + " :" + location)
    }


	//The render method returns a div container that contains a Banner component, 
    //an input field for changing the location, and a button that triggers the handlePopup 
    //method.
	render() {

		//Render process for displaying weather on the main application. 
		return (
            
			<div class={ style.container }>
                <button class = {style.alert} onClick={this.handlePopup}>Check destination's weather</button>
                
                {/* INPUT LOCATION */}
                <Banner onDropdownChange = {this.handleDropdownChange}/>
                <input class = {style.input} type="text" value = "" onChange = {this.handleInputChange} placeholder = "CHANGE LOCATION"/>
                <div>
                    <button class = {style.changeLocation} onClick={this.checkLocation}>change location</button>
                    <button class = {style.currentLocation} onClick={this.handleCurrLocation}>current location</button>
                    
                </div>              
				<div class={ style.header }>
					<div>
                        <img class = {style.image} src = '../../assets/backgrounds/planes.png' alt = "plane image" />
                            <div class = {style.rowContainer}>
                                
                                <Location class = {style.header} data ={this.state.currWeather}/>

                                {/* NEW 2 header for displaying the start and des weather */}
                                <div class = {style.rectangle}>
                                    <Flights class = {style.header} data={this.state.startWeather}/>
                                    <Flights class = {style.header} data={this.state.desWeather}/>
                                </div>
                            </div>
					</div>

                    <div class = {style.bottom}>
                        <div class = {style.box}>
                            <Weather data = {this.state.forecast}/>
                        </div>
                    </div>
                    
				</div>
				
				
			</div>
		);
	}
}
