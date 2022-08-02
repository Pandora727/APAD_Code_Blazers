import './App.css';
import React, { useState } from 'react';
import Popup from './components/Popup';
import resource from './components/resource';

function App() {
  const options = [
    { label: 'Hardware set 1', value: 'hwset_1' },
    { label: 'Hardware set 2', value: 'hwset_2' },
  ];

  const [capacity, setCapacity] = useState('');
  const [availability, setAvailability] = useState('');
  const [HWdata , setHWdata] = useState('');
  const [HWname, setHWname] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [openpopup, setOpenpopup] = useState(false);
  const [state, setState] = useState(0);

  function handleChange (event) {
    event.preventDefault();
    setHWname(event.target.value)
    fetch('/get_hw_data', {
      method: ['POST'],
      headers: {'Content-Type': 'application/json',},
      body: JSON.stringify({"hw_name":event.target.value})
    })    
      .then(response => response.json())

      .then(data=> setHWdata(data))
    
  };
  function handleCheckinSubmit(event){
    event.preventDefault(); 
    if ((quantity === 0)|| (!quantity)  )
    {
      console.log("inside if")
      setOpenpopup(true);
    }
    else{
      console.log('Inside else')
      fetch('/check_in', {
        method: ['POST'],
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify({"hw_name":HWname, "qty": quantity})
      })    
        .then(response => response.json())
  
        .then(data=> {(data.state !==0)? setState(1) : setState(2); setHWdata(data.hwdata)})
        setQuantity(0)
    }
  };
  function handleCheckoutSubmit(event){
    event.preventDefault(); 
    if ((quantity === 0)|| (!quantity)  )
    {
      console.log("inside if")
      setOpenpopup(true);
    }  
    else{
      console.log('Inside else')
      fetch('/check_out', {
        method: ['POST'],
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify({"hw_name":HWname, "qty": quantity})
      })    
        .then(response => response.json())
  
        .then(data=> {(data.state !==0)? setState(1) : setState(2); setHWdata(data.hwdata)})
        setQuantity(0)
    }
  };

  const togglePopup = () => {
    setOpenpopup(false);
    setState(0)
    };

  return (
    
      <div>
        <select  onChange={handleChange} defaultValue={{label: "Hardware set 1", value: 'hwset_1'}}>
        {options.map((option) => (
            <option value={option.value}>{option.label}</option>
          ))}
        
      </select>
      <p>Capacity :{HWdata.capacity}</p>
      <p>Availbility:{HWdata.availability}</p>
      <label>
        Quantity:
        <input type="number" name="Quantity" placeholder ="Quantity" value ={quantity}
         onChange={(e) => {Number.isInteger(setQuantity(e.target.value)) ? setQuantity(e.target.value) : setQuantity(parseInt(e.target.value)) } }/>
        </label>
        <button style={{backgroundColor:'white'}} type="submit" onClick={handleCheckinSubmit}>check in</button>
        <button style={{backgroundColor:'white'}} type="submit" onClick={handleCheckoutSubmit}>check out</button>
        {openpopup && <Popup
          content={<>
            <p> Quantity cannot be zero, enter quantity again to check-in/out </p>
          </>}
          handleClose={togglePopup}/>}
                  {state ===1 && <Popup
          content={<>
            <p> quantity exceeds the capacity of the hardware </p>
          </>}
          handleClose={togglePopup}/>}
                  {state ===2 && <Popup
          content={<>
            <p> success </p>
          </>}
          handleClose={togglePopup}/>}
      </div>

   
  );
}

export default App;
