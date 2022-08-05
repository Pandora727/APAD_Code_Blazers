import { Link } from 'react-router-dom';


const DirectBack = () => {

    return (
        <div>
            <h1>Account successfully created!</h1>
            <Link to="/loginrequest" >Click here to login...</Link>
        </div>
    )
}

export default DirectBack