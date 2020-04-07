import React from 'react';
import '../App.css';
import {Link} from 'react-router-dom'

class NavBar extends React.Component{

    render () {
        return(
            <div className='navbar'>
                <div className='logo'>
                    <Link to='/' style={{ textDecoration: 'none', color: 'black'}}><h1>PickUP</h1></Link>
                </div>
            </div>
            
        
        );
    };

};

export default NavBar;