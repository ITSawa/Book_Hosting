import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../../../context/AppContext";
import { useNavigate } from "react-router-dom";
import { request } from "../../../../helpers/request";

function AuthPanel() {
    const [currentPanel, setCurrentPanel] = useState("login");
    const { account, setAccount } = useContext(AppContext);
    const navigate = useNavigate();

    const handlePanelChange = (panel) => {
        setCurrentPanel(panel);
    };

    useEffect(() => {
        if (account) {
            navigate('/account');
        }
    }, [account, navigate]);

    const [authData, setAuthData] = useState({
        name: "",
        email: "",
        password: "",
    })

    const handleAuth = async (type) => {
        if ( !authData.email || !authData.password || (type === "register" && !authData.name)) {
            return;
        }

        let result;
        type === "login" ?
            result = await request('/backend/login', 'POST', authData):
            result = await request('/backend/registration', 'POST', authData);
        
        if (result.user) {
            setAccount(result.user);
            navigate('/account');
            localStorage.setItem('authorized', true);
        } else {
            console.log('auth error');
        }
    }

    return (
        !account && (<div className="center auth-panel">
            <div>
                <div className="panel-container">
                    <div className="panel-header">
                    <button
                        className={`panel-button ${currentPanel === "login" ? "active" : ""}`}
                        onClick={() => handlePanelChange("login")}
                    >
                        Login
                    </button>
                    <button
                        className={`panel-button ${currentPanel === "register" ? "active" : ""}`}
                        onClick={() => handlePanelChange("register")}
                    >
                        Register
                    </button>
                    </div>

                    <div className={`auth-panel ${currentPanel}`}>
                    {currentPanel === "login" && (
                        <div className="login-form">
                            {/* <h2>Login</h2> */}
                            <div>
                                <div>
                                <label htmlFor="email">Email:</label>
                                <input type="email" value={authData.email} onChange={(e) => setAuthData({ ...authData, email: e.target.value })} required />
                                </div>
                                <div>
                                <label htmlFor="password">Password:</label>
                                <input type="password" value={authData.password} onChange={(e) => setAuthData({ ...authData, password: e.target.value })} required />
                                </div>
                                <button className="button" onClick={() => handleAuth("login")}>Login</button>
                            </div>
                        </div>
                    )}

                    {currentPanel === "register" && (
                        <div className="register-form">
                            {/* <h2>Register</h2> */}
                            <div>
                                <div>
                                <label htmlFor="name">Name:</label>
                                <input type="text" value={authData.name} onChange={(e) => setAuthData({ ...authData, name: e.target.value })} required />
                                </div>
                                <div>
                                <label htmlFor="email">Email:</label>
                                <input type="email" value={authData.email} onChange={(e) => setAuthData({ ...authData, email: e.target.value })} required />
                                </div>
                                <div>
                                <label htmlFor="password">Password:</label>
                                <input type="password" value={authData.password} onChange={(e) => setAuthData({ ...authData, password: e.target.value })} required />
                                </div>
                                <button className="button" onClick={() => handleAuth("register")}>Register</button>
                            </div>
                        </div>
                    )}
                    </div>
                </div>
            </div>
        </div>)
    );
}

export default React.memo(AuthPanel);