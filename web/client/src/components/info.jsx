/*****************************/
/*                           */
/*        COMPONENT          */
/*           NOT             */
/*          IN USE           */
/*                           */
/*                           */
/*****************************/

import React from 'react';
import '../App.css'
import { Link } from "react-router-dom"

function Info(){

    return(
        <div id="loginDiv">
            <h1>Welcome to PickUP</h1>
            <div>
                <Link to='/login'>Login</Link><br />
                <Link to='/register'>Register</Link><br />
            </div>
        </div>        
    );
};

export default Info;