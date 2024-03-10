import {Link} from 'react-router-dom';
import './Navbar.css';
export const Navbar = () =>{
  return (
    <div className="navbarContainer">
  <Link to="/" className="navbarLink">Overview</Link>
  <Link to="/finedine" className="navbarLink">Finedine</Link>
  <Link to="/club" className="navbarLink">Club</Link>
  <Link to="/conferencehall" className="navbarLink">Hall</Link>
  <Link to="/managebooking" className="navbarLink">Manage</Link>
  <Link to="/adminlogin" className="navbarLink">StaffLogin</Link>
</div>

  );  
};