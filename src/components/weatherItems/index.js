import { h, render, Component } from 'preact';
import style from './style_display';

//This code exports a Preact component called WeatherItem, which
// takes in three props: item, displayFuture, and index.
export default class WeatherItem extends Component {
  render() {
    const { item, displayFuture, index } = this.props;
    const date = new Date(item.dt * 1000);
    const precipitation = item.pop * 100;

    //In the render() method of the WeatherItem component, the 
    //item prop is used to get the date and precipitation data, 
    //which is then displayed in different ways based on the value of 
    //the displayFuture prop.


    //Main component for displaying the weather when needed. 
    //Used for displaying weather and potential warnings when necessary.
  


    //If displayFuture is false, the component returns a container div 
    //that includes an image of the weather, the precipitation 
    //percentage, a weather alert if the precipitation is greater than 
    //40 or between 10-40, and the temperature in Celsius. The date and 
    //time is also displayed in a label.
    if (!displayFuture) 
    {
      return (
        <div className={style.container}>
          <label class = {style.time}>{date.toLocaleString('en-US', { hour: 'numeric', hour12: true })}</label>
          <div className = {style.rowContainer}>
            <img
              src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
              alt=""
              className={`${style.icon}`}
            />
            
            <label class={style.precipitation}>{precipitation.toFixed(0)}%</label>
            {precipitation > 40 ? (
                <div class={style.alert}>WEATHER WARNING</div>
              ) : precipitation > 10 ? (
                <div class={style.alertYellow}>POTENTIAL WEATHER THREAT</div>
              ) : null}
            
            <label class={style.temp}>{Math.round(item.main.temp)}°C</label>
          </div>
         
          
        </div>
      );
    }
    //If precipitation is greater than 40 or 10 weather alerts will show up on the bottom tab
    if (index % 8 === 0) 
    //If displayFuture is true, the component returns a smaller container div that only includes the date, 
    //weather image, precipitation percentage, temperature, and a weather alert if the precipitation
    // is greater than 40. The date is formatted to include the day of the week, day of the month, and month.


    {
      return (
        <div className={style.container}>
          <label>
            {date.toLocaleString('en-US', {
              weekday: 'short',
              day: 'numeric',
              month: 'short',
            })}
          </label>
          <div>
            <img
              src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
              alt=""
              className={style.icon}
            />
          </div>
          <label class={style.precipitation}>{precipitation.toFixed(0)}%</label>
          <label class = {style.temp}>{Math.round(item.main.temp)}°C</label>
          {precipitation > 40 && <div class={style.alert}>ALERT !</div>}
        </div>
      );
    }
  
    return null;
  }
  }