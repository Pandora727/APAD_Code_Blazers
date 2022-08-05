import React from 'react'
import { useState} from 'react';
import Popup from './Popup';
import {Link, useNavigate, useLocation} from 'react-router-dom'



const ExistProject = () => {
  const [project_id, setProjectid] = useState('');
  const [isOpen, setIsopen] = useState(false);
  const [state, setState] = useState(0);
  const navigate = useNavigate();

  const location = useLocation();

  function handlesubmit(e) {
        e.preventDefault();  
        if(project_id.trim() === "")
        {
          setIsopen(true);
          setState(1);
        }
        else{
          fetch('/verify_projectid', {
            method: ['POST'],
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify({"project_id": project_id, "username": location.state.username})
          })    
            .then(response => response.json())
            .then(data => data.flag ? navigate('/projects/hardware_management_page',
                                               {replace:true, state:{'project_id':project_id, 'username': location.state.username} }): setIsopen(true))

        }    

          setProjectid('')
           
      }
  const togglePopup = () => {
    console.log("Inside toggle function")
    setIsopen(!isOpen);
    setState(0);
    }

  return (
    <>
    <form>
    <p> Hello User</p>
    <label>Access Existing Project:</label>
    <input name="project_id" type="text" value={project_id} 
      onChange={(e) => setProjectid(e.target.value)}/>
    <br/>
    <button type="submit" onClick={handlesubmit} class="btn btn-primary">
        submit
    </button>   
    {state ===0 && isOpen && <Popup
      content={<>
        <p> Entered Project ID doesn't exist </p>
      </>}
      handleClose={togglePopup}/>}
    {state ===1 && isOpen && <Popup
      content={<>
        <p> Project ID cannot be Empty enter Project ID again </p>
      </>}
      handleClose={togglePopup}/>}
    <br />
    <Link to={"/projects/create_new_project"} state={{username: location.state.username}} style={{ 
          color: 'black', 
          borderRadius: '8px' 
        }}>create new Project</Link>
    
  </form>
    
    </>
  )
}

export default ExistProject