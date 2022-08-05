import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import Popup from './Popup';


function  Hardware_Management() {
  const options = [
    { label: 'Hardware set 1', value: 'hwset_1' },
    { label: 'Hardware set 2', value: 'hwset_2' },
  ];


  const location = useLocation();
  const navigate = useNavigate('');

  const [HWdata , setHWdata] = useState('');
  const [HWname, setHWname] = useState('');
  const [project_details , setProject] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [openpopup, setOpenpopup] = useState(false);
  const [checkInState, setCheckInState] = useState(0);
  const [checkOutState, setCheckOutState] = useState(0);

  function default_hwdata(){
    setHWname("hwset_1");
    fetch('/get_hw_data', {
      method: ['POST'],
      headers: {'Content-Type': 'application/json',},
      body: JSON.stringify({"hw_name":"hwset_1", "project_id":location.state.project_id})
    })    
      .then(response => response.json())
      .then((data)=> {setHWdata(data['hwdata']); setProject(data['project_data'])})
      console.log("came out of default fucntion")
      
    
  };

  useEffect (() =>
  {
    default_hwdata();
    window.onpopstate = () =>{
      navigate('/');
    }

    // window.onpushstate = () =>{
    //   navigate('/');
    // }


  }, [])

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

  function checkin_handle(project_details){
    setCheckInState(2);
    setProject(project_details);
  }

  function checkout_handle(project_details, state){
    setCheckOutState(state);
    setProject(project_details);
  }

  function handleCheckinSubmit(event){
    event.preventDefault(); 
    if ((quantity === 0)|| (!quantity)  )
    {
      setOpenpopup(true);
    }
    else{

      fetch('/check_in', {
        method: ['POST'],
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify({"hw_name":HWname, "qty": quantity, "project_details": project_details})
      })    
        .then(response => response.json())
  
        .then(data=> {(data.state !==0) ? setCheckInState(1):  checkin_handle(data.project_details); setHWdata(data.hwdata)})
        setQuantity(0)
    }
  };
  function handleCheckoutSubmit(event){
    event.preventDefault(); 
    if ((quantity === 0)|| (!quantity)  )
    {
      setOpenpopup(true);
    }  
    else{
      fetch('/check_out', {
        method: ['POST'],
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify({"hw_name":HWname, "qty": quantity, "project_details": project_details})
      })    
        .then(response => response.json())
  
        .then(data=> {(data.state !==0)? checkout_handle(data.project_details, 1): checkout_handle(data.project_details, 2); setHWdata(data.hwdata)})
        setQuantity(0);
        console.log(project_details);
    }
  };

  const togglePopup = () => {
    setOpenpopup(false);
    setCheckOutState(0);
    setCheckInState(0);
    };

  return (
    
      <div>
        
        <select  onChange={handleChange} defaultValue={{label: "Hardware set 1", value : "hwset_1"}}>
        {options.map((option) => (
            <option value={option.value}>{option.label}</option>
          ))}
        
      </select>
      <p>Capacity :{HWdata.capacity}</p>
      <p>Availbility:{HWdata.availability}</p>
      <br />

      <p> Project_ID: {project_details.project_id}  </p>
      <p> No_hwset1_checked_out: {project_details.hwset_1} </p>
      <p> No_hwset2_checked_out: {project_details.hwset_2}</p>

      <br />
      <label>
        Quantity:
        <input type="number" name="Quantity" placeholder ="Quantity" value ={quantity}
         onChange={(e) => {Number.isInteger(setQuantity(e.target.value)) ? setQuantity(e.target.value) : setQuantity(parseInt(e.target.value)) } }/>
        </label>
        <br />
        <button  type="submit" onClick={handleCheckinSubmit} class="btn btn-primary">check in</button>
        <button  type="submit" onClick={handleCheckoutSubmit} class="btn btn-primary">check out</button>
        <br />

        <button  onClick={() => navigate('/projects', {replace:true, state:{'username': location.state.username} })} class="btn btn-primary"> Back to projects</button>
        {openpopup && <Popup
          content={<>
            <p> Quantity cannot be zero, enter quantity again to check-in/out </p>
          </>}
          handleClose={togglePopup}/>}
                  {checkInState ===1 && <Popup
          content={<>
            <p> Checking in the quantity will exceed the capacity of the hardware. So, checking in upto maximum quantity. </p>
          </>}
          handleClose={togglePopup}/>}
                  {checkOutState ===2 && <Popup
          content={<>
            <p> Check In successfull </p>
          </>}
          handleClose={togglePopup}/>}
           {checkOutState ===1 && <Popup
          content={<>
            <p> Quantity exceeds the availability of the hardware. So, checking out available quantity. </p>
          </>}
          handleClose={togglePopup}/>}
          {checkOutState === 2 && <Popup
          content={<>
            <p> Check out successfull </p>
          </>}
          handleClose={togglePopup}/>}

          {checkInState === 2 && <Popup
          content={<>
            <p> Check In successfull </p>
          </>}
          handleClose={togglePopup}/>}


         {checkInState === 1 && <Popup
          content={<>
            <p> Check In failed, Try check In again</p>
          </>}
          handleClose={togglePopup}/>}
      </div>   
  );
}

export default Hardware_Management;