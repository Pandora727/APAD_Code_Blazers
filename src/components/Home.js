import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  // const navigate = useNavigate();

  return (
    <div>
      <h3> Login to access the hardware management page</h3>
      <Link to="/loginrequest" > login </Link>
    

    </div>

  )
}

export default Home