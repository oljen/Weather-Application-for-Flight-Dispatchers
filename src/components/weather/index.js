import { h, render, Component } from 'preact';
import style from './style_weather';
import WeatherItem from '../weatherItems'
//The WeatherItem component is imported and rendered for each hour's weather information.

export default class Weather extends Component {
        // a constructor with initial set states
        constructor(props) {
            super(props);
            this.state = {
              displayFuture: false,
              startIdx: 0,
              endIdx: 4,
              added: 4,
            };
          }


        //The getCurrent function is called when the user clicks a 
        //button to display the current weather information, resetting 
        //the state to only show the current hour's weather information.
        getCurrent = () => {
            this.setState(() => ({
                startIdx: 0,
                endIdx: 4,
                displayFuture: false,
                added:4,
            }));
        };
        
        //The getNextHour function is called when the user clicks a button
        // to display the next hour's weather information. It updates the state 
        //by incrementing the endIdx and startIdx variables to display the next hour's 
        //weather information, and increments the added variable to keep track of how many 
        //hours of weather information have been displayed.
        getNextHour = () => {
            this.setState((prevState) => {
                const newEndIdx = prevState.endIdx + 1; // increment the number of elements to show by 1, but not beyond 9
                const newStartIdx = prevState.startIdx + 1;
                const newAdded = prevState.added + 1;
                
                if (newAdded > 8) 
                {
                    return null; // reached 24h forecast = 8 element = each element is the forcast over 3 hours
                } 
                else 
                {
                    return {
                        startIdx: newStartIdx,
                        endIdx: newEndIdx,
                        displayFuture: false,
                        added: newAdded,
                    };
                }
            });
        };

        //The render method displays the weather information for the current 
        //and next 3 hours. If the displayFuture flag is false, a button is 
        //displayed that allows the user to display the weather information 
        //for the next hour. If the displayFuture flag is true, the button 
        //is not displayed.
        render() {
            const { endIdx, startIdx } = this.state;

            return (
                <div className={style.cont}>
                    <div className={style.columnContainer}></div>
                    {this.props.data  ? (
                        <div className={style.columnContainer}>
                            {this.props.data.list.slice(startIdx, endIdx).map((item, idx) => (
                                <WeatherItem key={idx} item={item} displayFuture={this.state.displayFuture} index={idx} />
                            ))}
                            {!this.state.displayFuture ? (
                                <button class={style.nextButton} onClick={this.getNextHour}>  </button>
                            ) : null} 
                        </div>
                    ) : null}
                </div>
            );
        }
    }