import React from 'react';
import '../App.css';
import NavBar from '../components/navbar';
import Register from '../components/register';

const RegisterPage = () =>{
    return(
        <div>
            <NavBar />
            <Register />
        </div>
    );
};

export default RegisterPage