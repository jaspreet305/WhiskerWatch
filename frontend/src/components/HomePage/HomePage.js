import React from "react";
import "./HomePage.css";
import { Link, useNavigate } from "react-router-dom";
import {useContext, useEffect, useState} from 'react';
import jwt from 'jwt-decode';
import axios from '../../axios'
import {LoggedContext} from "../../utils/AuthContext";
export const HomePage = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [loggedIn] = useContext(LoggedContext);
  const [firstAppointment, setFirstAppointment] = useState(null);

  useEffect(() => {
    if (!loggedIn) {
      navigate("/login");
    }
  }, [loggedIn, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      const userToken = localStorage.getItem('userToken');
      try {
        const response = await axios.get(`/appointment/`, {
          headers: {
            'x-auth-token': userToken,
          }
        });
        setFirstAppointment(response.data[0] || null);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const userToken = localStorage.getItem('userToken');
      let userId;
      if (userToken) {
        userId = jwt(userToken)._id;
      }

      try {
        const response = await axios.get(`/user/${userId}`);
        setUser(response.data);
      } catch (err) {
        console.log(err);
        localStorage.removeItem('userToken')
        navigate("/login");
      }
    };

    fetchData();
  }, []);

  function goToPetProfile(petId) {
    navigate(`/pet-profile/${petId}`);
  }

  const petPics = user.pets
      ? user.pets.map((pet) => {
        let petPic;
        switch (pet.petType) {
          case "dog":
            petPic = <img className={"home-page-screen-animal"} src={"/img/dog-1-1.png"} />;
            break;
          case "bird":
            petPic = <img className={"home-page-screen-animal"} src={"/img/bird.png"} />;
            break;
          case "cat":
            petPic = <img className={"home-page-screen-animal"} src={"/img/cat.png"} />;
            break;
          case "fish":
            petPic = <img className={"home-page-screen-animal"} src={"/img/fish.png"} />;
            break;
          default:
            petPic = null;
        }
        return (
            <div key={pet._id} className={"home-page-screen-img-wrapper"} onClick={() => goToPetProfile(pet._id)}>
              {petPic}
            </div>
        );
      })
      : [];

  const addPetDiv = (
      <div className={"home-page-screen-add-more"} onClick={() => navigate("/pet-description")}>
        <img className={"home-page-screen-img-3"} src={"/img/1200px-Plus_symbol.svg"} />
      </div>
  );

  const numPetDivs = petPics.length;
  const remainingPetDivs = numPetDivs < 3 ? Array.from({ length: 3 - numPetDivs - 1 }, (_, i) => (
      <div  className={"home-page-screen-add-more"} onClick={() => navigate("/pet-description")}>
          <img className={"home-page-screen-img-3"} src={"/img/1200px-Plus_symbol.svg"} />
      </div>
  )) : [];

  const petDivs = [...petPics, ...(numPetDivs < 3 ? [...remainingPetDivs, addPetDiv] : [])];

  console.log(user)
    return (
      <div className={"home-page-screen-div"}>
        <div className={"home-page-screen-div-2"}>
          <div className={"home-page-screen-overlap"}>
            <div className={"home-page-screen-status-bar"}>
              <div className={"home-page-screen-right-side"}>
                <img className={"home-page-screen-battery"} src={"/img/battery.png"} />
                <img className={"home-page-screen-img"} src={"/img/wifi-3.svg"} />
                <img className={"home-page-screen-icon-bar-chart"} src={"/img/mobile-signal.svg"} />
              </div>
              <img className={"home-page-screen-left-side"} src={"/img/left-side.png"} />
            </div>
            <div className={"home-page-screen-message"}>
              <img className={"home-page-screen-img-2"} src={"/img/image-2.svg"} />
            </div>
            <div className={"home-page-screen-bell"}>
              <img className={"home-page-screen-img-2"} src={"/img/-3.svg"} />
            </div>
            <div className={"home-page-screen-location"}>
              <img className={"home-page-screen-icon-location-pin"} src={"/img/-2.svg"} />
              <div className={"home-page-screen-icon-location-text"}>{user.city}</div>
            </div>
            <div className={"home-page-screen-woman-wrapper"}>
              <img className={"home-page-screen-woman"} src={"/img/woman-1.png"} />
            </div>
            <div className={"home-page-screen-text-wrapper"}>My Pets</div>
            <div className={"home-page-screen-pet-pic-container "}>{petDivs}</div>
            <div className={"home-page-screen-text-wrapper-2"}>Hello,</div>
            <h1 className={"home-page-screen-h-1"}>{(user.firstName && user.lastName) ? user.firstName + " " + user.lastName : "Full Name"}</h1>
          </div>
          <p className={"home-page-screen-p"}>What are you looking for?</p>
          <div className={"home-page-screen-text-wrapper-3"}>Appointments</div>
          <Link to={{ pathname: "/search/trainer" }}>
          <div className={"home-page-screen-training"}>
            <div className={"home-page-screen-div-3"}>
              <img className={"home-page-screen-pablo-dog-training"} src={"/img/pablo-dog-training-1.png"} />
              <div className={"home-page-screen-text-wrapper-4"}>Training</div>
            </div>
          </div>
            </Link>
          <Link to={{ pathname: "/search/sitter" }}>
          <div className={"home-page-screen-boarding"}>
            <div className={"home-page-screen-div-3"}>
              <img className={"home-page-screen-image"} src={"/img/image-3.png"} />
              <div className={"home-page-screen-pet-sitting"}>
                Pet <br />
                Sitting
              </div>
            </div>
          </div>
            </Link>
          <div className={"home-page-screen-text-wrapper-5"}>See all</div>
            <Link to={{ pathname: "/search/groomer" }}>
          <div className={"home-page-screen-grooming"}>
            <div className={"home-page-screen-div-3"}>
              <img className={"home-page-screen-urban-animal-care"} src={"/img/urban-animal-care-1-1.png"} />
              <div className={"home-page-screen-text-wrapper-6"}>Grooming</div>
            </div>
          </div>
            </Link>
          {firstAppointment ? (
              <div className={"home-page-screen-overlap-group3"}>
                <div className={"home-page-screen-rectangle"} />
                <div className={"home-page-screen-text-wrapper-7"}>{firstAppointment.name}</div>
                <div className={"home-page-screen-text-wrapper-8"}>{firstAppointment.type}</div>
                <div className={"home-page-screen-text-wrapper-9"}>{firstAppointment.date}</div>
                <div className={"home-page-screen-text-wrapper-10"}>{firstAppointment.time}</div>
              </div>
          ) : (
                <div className={"home-page-screen-text-wrapper-11"}>No appointments</div>
          )}

          <Link to={"/appointments-screen"}>
          <div
              className={"home-page-screen-overlap-group5"}
              style={{
                backgroundImage: "url(/img/rectangle-26-1.svg)",
              }}
          >
            <img className={"home-page-screen-arrow"} src={"/img/arrow-2-4.svg"} />
          </div>
          </Link>
        </div>
      </div>
  );
};

