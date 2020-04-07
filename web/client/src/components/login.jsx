import React from 'react';

function Login(){
    const doLogin = async event =>
    {
        event.preventDefault();
        alert('This is when it would do the login function if we had one');
    };

    return(
        <div id="loginDiv">
            <form onSubmit={doLogin}>
                <span id="inner-title">PLEASE LOG IN</span><br />
                <input type="text" id="loginName" placeholder="Username" required/><br />
                <input type="password" id="loginPassword" placeholder="Password" required/><br />
                <input type="submit" id="loginButton" class="buttons" value = "Login" onClick={doLogin} />
            </form>
            <span id="loginResult"></span>
        </div>    
    );
};

export default Login;