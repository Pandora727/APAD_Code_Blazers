import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Welcome to Haas: Code Blazers</h1>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/" style={{ 
        }}>logoff</Link>
      </div>
    </nav>
  );
}
 
export default Navbar;