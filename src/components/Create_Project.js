import React from 'react';
import {useState} from 'react';
import Popup from './Popup';
import {useNavigate, useLocation} from 'react-router-dom';

const Create_Project = () => {
  const [project_id, setProjectid] = useState('');
  const [project_name, setProjectname] = useState('');
  const [project_desc, setProjectdesc] = useState('');
  const [popup_open, setpopup_open]  = useState(false);
  const [pj_state, setStatevar] = useState(0);
  const navigate = useNavigate();

  const location = useLocation();
  console.log(location.state);

  function handleClick(e) {
    e.preventDefault(); 
    if ((project_id === "") || (project_name === ""))
    {
     console.log("came inside the if block") 
     setStatevar(pj_state + 1);
     setpopup_open(!popup_open);
    }
    else
      {
        console.log("came inside the if block")
        
        fetch('/create_projectid', {
          method: ['POST'],
          headers: {'Content-Type': 'application/json',},
          body: JSON.stringify({"project_id": project_id, 
                                "project_name": project_name,
                                "project_desc":project_desc,
                                "owner": location.state.username,
                                 "username": location.state.username})
        })    
          .then(response => response.json())
          .then(data => (data.state !==0) ? setpopup_open(!popup_open):
                                             navigate('/projects/hardware_management_page',
                                             {replace:true, state:{'project_id':project_id, 'username': location.state.username} }))
        console.log(pj_state, popup_open);
        setProjectid('') 
        setProjectname('')
        setProjectdesc('') 
      }

    }
  
  const togglePopup = () => {
    console.log("Inside toggle function");
    setpopup_open(!popup_open);
    setStatevar(0);
    }
  
  return (
    <>
    <form>
        <label>
            Project ID:
        </label>
        <input
        name="project_id" type="text" placeholder='project_id' value={project_id}
        onChange={(e) => setProjectid(e.target.value)}
        />
        <br/> 
        <label>
            Project name:
        </label>
        <input
        name="project_name" type="text" placeholder='project_name' value={project_name}
        onChange={(e) => setProjectname(e.target.value)}
        />
        <br/>        
        <label>
            Project Desc:
        </label>
        <input
        name="project_desc" type="text" placeholder='description' value={project_desc}
        onChange={(e) => setProjectdesc(e.target.value)}
        />
        <br />
        <button onClick={handleClick} class="btn btn-primary">
            submit            
        </button>
        {pj_state=== 0 && popup_open &&<Popup
        content={<>
          <p> Entered Project ID or Name exists </p>
        </>}
      handleClose={togglePopup}/>}
      {pj_state=== 1 && popup_open &&<Popup
        content={<>
          <p>Project ID and name cannot be Empty </p>
        </>}
      handleClose={togglePopup}/>}

    </form>

    </>
  )
}

export default Create_Project