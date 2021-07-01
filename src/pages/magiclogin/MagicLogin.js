import React from 'react'
import { Magic } from 'magic-sdk';
import { OAuthExtension } from '@magic-ext/oauth';
import "./MagicLogin.css"
import { useHistory } from "react-router-dom";

const magic = new Magic(process.env.REACT_APP_MAGIC_API_KEY, {
    extensions: [new OAuthExtension()],
}); // ✨


const MagicLogin = () => {

    const handleLogin = async () => {
        await magic.oauth.loginWithRedirect({
            provider: 'google' /* '', 'facebook', 'apple', or 'github' */,
            redirectURI: 'http://localhost:3000/home'
        });
    }

    const history = useHistory();

    return (
        <div>
            <div className="header-container">
                <div className="header-left-holder">
                    <img alt={'logo'} style={{ width: 36, height: 'auto' }} onClick={() => {
                        history.push('/');
                    }} className="header-left-image clickable" src="./drop_logo.png" />

                </div>
            </div>
            <div className="magic-container">
                <div className="magic-login-box">
                    <h3>Passwordless Login</h3>
                    <button onClick={handleLogin}>Log In With Magic Link</button>
                </div>

            </div>
        </div>
    )
}

export default MagicLogin
