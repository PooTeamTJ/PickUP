import React from 'react';
import '../App.css'
import {Redirect, Link } from "react-router-dom"

function Info(){

    return(
        <div id="loginDiv">
            <h>Welcome to PickUP</h>
            <div>
                <Link to='/login'>Login</Link><br />
                <Link to='/register'>Register</Link><br />
            </div>
        </div>        
    );
};

export default Info;