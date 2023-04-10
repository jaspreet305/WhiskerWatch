import React from "react";
import "./HomePage.css";

export const HomePage = () => {
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
            </div>
            <div className={"home-page-screen-woman-wrapper"}>
              <img className={"home-page-screen-woman"} src={"/img/woman-1.png"} />
            </div>
            <div className={"home-page-screen-text-wrapper"}>My Pets</div>
            <div className={"home-page-screen-pet-pic"}>
              <img className={"home-page-screen-dog"} src={"/img/dog-1-1.png"} />
            </div>
            <div className={"home-page-screen-add-more"}>
              <img className={"home-page-screen-img-3"} src={"/img/.svg"} />
            </div>
            <div className={"home-page-screen-img-wrapper"}>
              <img className={"home-page-screen-img-3"} src={"/img/.svg"} />
            </div>
            <div className={"home-page-screen-text-wrapper-2"}>Hello,</div>
            <h1 className={"home-page-screen-h-1"}>Full Name!</h1>
          </div>
          <p className={"home-page-screen-p"}>What are you looking for?</p>
          <div className={"home-page-screen-text-wrapper-3"}>Appointments</div>
          <div className={"home-page-screen-training"}>
            <div className={"home-page-screen-div-3"}>
              <img className={"home-page-screen-pablo-dog-training"} src={"/img/pablo-dog-training-1.png"} />
              <div className={"home-page-screen-text-wrapper-4"}>Training</div>
            </div>
          </div>
          <div className={"home-page-screen-boarding"}>
            <div className={"home-page-screen-div-3"}>
              <img className={"home-page-screen-image"} src={"/img/image-3.png"} />
              <div className={"home-page-screen-pet-sitting"}>
                Pet <br />
                Sitting
              </div>
            </div>
          </div>
          <div className={"home-page-screen-text-wrapper-5"}>See all</div>
          <div className={"home-page-screen-grooming"}>
            <div className={"home-page-screen-div-3"}>
              <img className={"home-page-screen-urban-animal-care"} src={"/img/urban-animal-care-1-1.png"} />
              <div className={"home-page-screen-text-wrapper-6"}>Grooming</div>
            </div>
          </div>
          <div className={"home-page-screen-overlap-group3"}>
            <div className={"home-page-screen-rectangle"} />
            <div className={"home-page-screen-text-wrapper-7"}>Pet Provider name</div>
            <div className={"home-page-screen-text-wrapper-8"}>Appointment type</div>
            <div className={"home-page-screen-text-wrapper-9"}>27/08/2024</div>
            <div className={"home-page-screen-text-wrapper-10"}>10:00am</div>
          </div>
          <div
              className={"home-page-screen-overlap-group5"}
              style={{
                backgroundImage: "url(/img/rectangle-26-1.svg)",
              }}
          >
            <img className={"home-page-screen-arrow"} src={"/img/arrow-2-4.svg"} />
          </div>
        </div>
      </div>
  );
};
