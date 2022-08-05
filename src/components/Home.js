import React from 'react'
import { useEffect } from 'react'
import { Link , useNavigate} from 'react-router-dom'

const Home = () => {

  const navigate = useNavigate();
  useEffect (() =>
  {
    window.onpushstate = () =>{
      console.log("forward click")
      navigate('/');
    }})

  return (
    <div>
      <h3> Login to access the hardware management page</h3>
      <Link to="/loginrequest" > login </Link>
    

    </div>

  )
}

export default Home