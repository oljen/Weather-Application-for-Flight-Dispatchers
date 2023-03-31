// Importing necessary modules
import { h, render, Component } from 'preact';
import style from './style_header'; // Importing the style for the header component

// Creating a component called Header which extends the Component class from preact
export default class Flights extends Component {
    constructor(props) {
        super(props); // Calling the parent constructor

        // No need to initialize any state variables
    }

    // The render method is where the component's UI is defined
    render() {
        let location, temp, date, temp_min, temp_max;

        // Check if the data prop has been passed to the component
        if (this.props.data) {
            // If data is available, extract necessary information from it
            location = this.props.data['name'];
            temp = parseInt(this.props.data['main']['temp']);
            temp_min = parseInt(this.props.data['main']['temp_min']);
            temp_max = parseInt(this.props.data['main']['temp_max']);
            date = new Date().toLocaleString('en-US', {weekday: 'short', month: 'short', day: 'numeric'});
        }

        console.log(typeof(date)) // Log the type of date variable

        // Return the header component's HTML structure with data if available, else return null
        return (
            this.props.data ? (
                <div class={style.header}>
                    <div class={style.locationBox}>
                        <div class={style.city}>{location}</div>
                        <span class={style.temp}>{temp}°</span>
                        <div class={style.date}>{date}</div>
                        <div>
                            <span>L:{temp_min}° </span>
                            <span>H:{temp_max}°</span>
                        </div>
                    </div>
                </div>
            ) : null 
        );
    }
}
