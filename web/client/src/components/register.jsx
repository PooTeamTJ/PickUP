import React from 'react';

function Register(){
    const doRegister = async event =>
    {
        event.preventDefault();
        alert('This is when it would register the user but we don\'t have that done yet');
    };

    return(
        <div id="loginDiv">
            <form onSubmit={doRegister}>
                <span id="inner-title">PLEASE REGISTER IN</span><br />
                <input type="text" id="registerName" placeholder="Username" required/><br />
                <input type="text" id="registerEmail" placeholder="Email" required/><br />
                <input type="password" id="registerPassword" placeholder="Password" required/><br />
                <input type="password" id="registerPassword" placeholder="Confirm Password" required/><br />
                
                <input type="submit" id="loginButton" class="buttons" value = "Register" onClick={doRegister} />
            </form>
            <span id="registerResult"></span>
        </div>    
    );
};

export default Register;