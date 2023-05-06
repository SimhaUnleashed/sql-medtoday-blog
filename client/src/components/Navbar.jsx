import React from 'react';
import { useContext } from 'react';
import {Link} from 'react-router-dom';

import { AuthContext } from '../context/authContext';
import Logo from '../img/logo.png';



const Navbar = () => {

    const{currentUser,logout,admin} = useContext(AuthContext)
   
  return (
    <div className='navbar'>
        <div className="container">
            <div className="logo">
                <Link to='/'>
                <img src={Logo} alt="" /></Link>
                
            </div>
            <div className="links">
                <Link className='link' to="/?cat=health">
                    <h6>Health |</h6>
                </Link>
               
                <Link className='link' to="/?cat=fitness">
                    <h6>Fitness |</h6>
                </Link>
                <Link className='link' to="/?cat=mindfulness">
                    <h6>Mindfulness |</h6>
                </Link>
                <Link className='link' to="/?cat=innovations">
                    <h6>Innovations |</h6>
                </Link>
                <Link className='link' to="/?cat=parenthood">
                    <h6>Parenthood |</h6>
                </Link>
                <Link className='link' to="/?cat=rnd">
                    <h6>R&D </h6>
                </Link>
                {(currentUser||admin) && <img className='person' src="https://img.freepik.com/free-icon/important-person_318-10744.jpg?w=2000" alt="" />}
                <span className='personName'>
                    
                    {(currentUser||admin)?.username}</span>
                {(currentUser||admin)? <Link className='logout' to="/login" onClick={logout}>Logout</Link>: <Link className='link' to="/login">Login</Link>}
                {(currentUser||admin)&& <span className='write'>
                    <Link className='link' to='/write'>Write</Link>
                </span>}

                {/* {admin && <img className='person' src="https://img.freepik.com/free-icon/important-person_318-10744.jpg?w=2000" alt="" />}
                <span className='personName'>
                    
                    {admin?.username}</span>
                {admin && <Link className='logout' to="/login" onClick={logout}>Logout</Link>}
                {admin&& <span className='write'>
                    <Link className='link' to='/write'>Write</Link>
                </span>} */}
            </div>
        </div>
    </div>
  )
}

export default Navbar