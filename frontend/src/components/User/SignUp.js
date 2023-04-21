import "./SignUp.css";
import * as React from "react";
import { useContext, useEffect, useState } from "react";
import axios from "../../axios";
import { LoggedContext } from "../../utils/AuthContext";
import { useNavigate } from "react-router-dom";

export function SignUp() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailCorrect, setEmailCorrect] = useState(true);
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const [firstNameCorrect, setFirstNameCorrect] = useState(true);
  const [lastNameCorrect, setLastNameCorrect] = useState(true);

  const [loggedIn, setLoggedIn] = useContext(LoggedContext);

  // useEffect(() => {
  //     if(loggedIn) {
  //         navigate("/");
  //     }
  // }, [loggedIn, navigate]);

  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    data.set("email", data.get("email").toLowerCase());

    if (password !== confirmPassword) {
      setIsPasswordMatch(false);
      console.log("Passwords match: ", isPasswordMatch);
      return;
    }

    if (!emailRegex.test(email)) {
      setEmailCorrect(false);
    } else {
      setEmailCorrect(true);
    }

    if (!firstName) {
      setFirstNameCorrect(false);
    }

    if (!lastName) {
      setLastNameCorrect(false);
    }

    try {
      const response = await axios.post("user/signup", data);
      localStorage.setItem("userToken", response.data);
      setLoggedIn(true);
      navigate("/login");
      console.log(response);
    } catch (err) {
      if (err.response?.status === 409) {
        console.log(err);
      }
    }

    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <div className="SignUpPage">
      <h2 className="SignUpTitle" style={{ fontWeight: "bold" }}>
        Sign Up
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            required
          />
        </div>
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
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City"
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
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Re-enter Password"
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
