import { h } from 'preact';

function Popup(props){
  //This code exports a functional component named Popup. The 
  //component takes in a props object as an argument, which is used 
  //to pass down a function to handle the change event on the dropdown 
  //list.


  //The Popup component renders a <div> element with class "popup", 
  //which contains another <div> element with class "popup-inner". The 
  //inner <div> element contains a dropdown list with a class of 
  //"dropdown".
    const options = [
      //List of potential flights to choose.
        { value: ["London"], label: "London"},
        { value : ["Bonn"], label: 'Bonn' },
        { value: ["Sydney"], label: 'Sydney' },
        { value: ["Madrid"], label: "Madrid"},
        { value: ["Rome"], label: "Rome"},
        { value: ["Miami"], label: "Miami"},
      ];

    //The options for the dropdown list are defined in an array named 
    //options, with each option having a value and a label. The value 
    //property of an option is an array that contains the name of a 
    //city, while the label property is a string that displays the city 
    //name in the dropdown list.

    //The handleDropdownChange function is called when the user 
    //selects a different option from the dropdown list. The selected 
    //option's value is passed to the onDropdownChange function that 
    //is passed down through props.

      const handleDropdownChange = (event) => {
        const selectedValue = event.target.value;
        props.onDropdownChange(selectedValue);
      }

  return (
    //The dropdown list is generated using the map method on the 
    //options array. Each option in the array is mapped to an <option> 
    //element with the value and label properties set to the 
    //corresponding values from the options array.
    <div className="popup">
      <div className="popup-inner">
        <select class = {style.dropdown} id="dropdown" onChange={handleDropdownChange} value = "">
              {options.map((option) => (
                  <option key={option.value} value={option.value}>
                      {option.label}
                  </option>
              ))}
        </select>
      </div>
    </div>
  );
};

export default Popup;