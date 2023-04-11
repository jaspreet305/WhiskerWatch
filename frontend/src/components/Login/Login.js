import "./Login.css";
import * as React from "react";
import {useContext, useEffect, useState} from "react";
import {Divider} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import {Typography, Button} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import axios from "../../axios";
import {LoggedContext} from "../../utils/AuthContext";
import {useNavigate} from "react-router-dom";

export function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [authenticated, setAuthenticated] = useState(null);
    const [loggedIn, setLoggedIn] = useContext(LoggedContext);

    useEffect(() => {
        if(loggedIn) {
            navigate("/");
        }
    }, [loggedIn, navigate]);

    const handleSignIn = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log(data);
        try {
            const response = await axios.post("user/login", data);
            localStorage.setItem("userToken", response.data);
            setAuthenticated(true);
            setLoggedIn(true);
            navigate('/');
            console.log(response.data);
        } catch (err) {
            setAuthenticated(false);
            console.log(err);
        }
    };

    return (
        <div className="LoginPage">
            <h2
                className="LoginTitle"
                style={{fontWeight: "bold", textAlign: "center"}}
            >
                Hello Again!
            </h2>
            <h2
                className="LoginTitleText"
                style={{fontWeight: "normal", textAlign: "center"}}
            >
                Its pawsome to have you back.
            </h2>
            <form onSubmit={handleSignIn}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="example@gmail.com"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />
                </div>

                <button type="submit" className="LoginButton">
                    Login
                </button>
            </form>
            <div>
                <h1></h1>
                <Divider>
                    <Typography variant="body1" sx={{color: "text.secondary"}}>
                        Or Login With
                    </Typography>
                </Divider>
                <p></p>
            </div>

            <div className="GoogleButtonsContainer">
                <div className="GoogleIconPosition">
                    <Button className="GoogleButtonContainer">
                        <GoogleIcon className="GoogleIcon"/>
                    </Button>
                </div>
                <div className="GoogleIconPosition">
                    <Button className="GoogleButtonContainer">
                        <FacebookIcon className="FacebookIcon"/>
                    </Button>
                </div>
            </div>

            <div
                className="CreateAccountLinkContainer"
                style={{textAlign: "center"}}
            >
                <span>Don't have an account? </span>
                <a href="/signup" className="CreateAccountLink">
                    Sign Up Now!
                </a>
            </div>
        </div>
    );
}