import { h, render, Component } from 'preact';
import style from './style_header';

//This code imports the necessary modules for the component, 
//including the h function for creating virtual DOM nodes, render 
//for rendering those nodes to the real DOM, and Component for 
//defining a new component. It also imports a style object from a 
//separate file called style_header.

//Location file for the current location, Similar to the flights file
//but handles the weather structure for the current location OR any location the user chooses.

//This code defines a new component called Location that extends 
//the Component class. It also defines a constructor method that 
//calls the super method to initialize the component with the props 
//passed in.
export default class Location extends Component {
    constructor(props) {
        super(props);
    }

//This code defines the render method for the component, which is 
//responsible for rendering the component to the screen. It initializes 
//several variables (location, temp, date, temp_min, and temp_max) 
//to undefined. It then checks if there is data passed in through 
//props.data. If there is, it populates those variables with data from 
//the props.data object, including the location name, temperature, 
//minimum and maximum temperature, and the current date.

    render() {
        let location, temp, date, temp_min, temp_max;
        // props.data = current weather forecast
        if (this.props.data) {
            location = this.props.data['name'];
            temp = parseInt(this.props.data['main']['temp']);
            temp_min = parseInt(this.props.data['main']['temp_min']);
            temp_max = parseInt(this.props.data['main']['temp_max']);
            date = new Date().toLocaleString('en-US', {weekday: 'short', month: 'short', day: 'numeric'});
        }

        console.log(typeof(date))

        return (
            this.props.data ? (
              //Similar structure to displaying weather.
                <div class={style.header}>
                    <div class={style.locationBox}>
                        <div class={style.city}>{location}</div>
                        <span class={style.temp}>{temp}°</span>
                        <div class={style.date}>{date}</div>
                          {temp > 20 ? (
                            // Checking temperatures to decide icons.
                                <img className={style.image} src='../../assets/backgrounds/sun.png' alt='image1' />
                              ) : temp > 15 ? (
                                <img className={style.image} src='../../assets/backgrounds/cloudy.png' alt='image2' />
                              ) : temp > 10 ? (
                                <img className={style.image} src='../../assets/backgrounds/cloud.png' alt='image3' />
                              ) : temp > 0 ? (
                                <img className={style.image} src='../../assets/backgrounds/cloud.png' alt='image4' />
                              ) : (
                                <img className={style.image} src='../../assets/backgrounds/snow.png' alt='image5' />
                              )}

                        <div>
                            <span>L:{temp_min}° </span>
                            <span>H:{temp_max}°</span>
                        </div>
                    </div>
                </div>
            ) : null 
        );
    }
    //This code completes the render method by returning a JSX expression 
    //that defines the structure and content of the component. It 
    //checks if there is props.data, and if so, renders the 
    //location name, current temperature, date, and a weather icon 
    //based on the current temperature. It also renders the minimum 
    //and maximum temperature for the day. If there is no props.data, 
    //it returns null to render nothing.
}