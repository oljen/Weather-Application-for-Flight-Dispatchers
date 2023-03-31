import { h } from 'preact';
import style from './style.banner';

function banner(props) {
  // An array of options, each containing a label and a list of values.
  // These will be used to populate the dropdown list of available flights.
  const options = [
    { value: ["London", "Paris", "Hanoi"], label: "STN - CDG"},
    { value : ["Bonn", "Sydney", "Hanoi"], label: 'CGN - SYD' },
    { value: ["Sydney", "Madrid", "Hanoi"], label: 'SYD - MAD' },
    { value: ["Madrid", "London", "Hanoi"], label: "MAD - STN"},
    { value: ["Rome", "Paris", "Hanoi"], label: "FCO - CDG"},
    { value: ["Miami", "Rome", "Hanoi"], label: "MIA - FCO"},
  ];

  // This function is called when the value of the dropdown is changed.
  // It gets the selected value and passes it to the parent component via props.
  const handleDropdownChange = (event) => {
    const selectedValue = event.target.value;
    props.onDropdownChange(selectedValue);
  }

  return (
    // The header element with a class of 'banner'.
    //Below is the structure for the top banner which spans across the top of the page. 
    //Each h1 has an image with it which is composed on the left of the tag.
    //We also have a drop down for selecting flights which consists of the array options above. 
    <header class = {style.banner}>
      <div class = {style.rowContainer}> 
      
      

        <div>
          <img className={style.todayImage} src='../../assets/backgrounds/map.png' alt='image1' />
          <h1 class = {style.today}> Today</h1>
        </div>

        <h1>

        <div>
          <img className={style.flightsImage} src='../../assets/backgrounds/planes.png' alt='image1' />
          <label class = {style.flights} htmlFor="dropdown">Flights</label>
          <select class = {style.dropdown} id="dropdown" onChange={handleDropdownChange} value = "">
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                  {option.label}
              </option>
            ))}
          </select>
        </div>
        
        </h1>

        <div>
          <img className={style.airImage} src='../../assets/backgrounds/air.png' alt='image1' />
          <h1 class = {style.air}> Air </h1>
        </div>

        <h1>Help</h1>
      </div>
      
    </header>
  );
}

export default banner;