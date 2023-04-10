import React from "react";
import { Link } from "react-router-dom";
import "./LoggedOut.css";

export const LoggedOut = () => {
  return (
    <div className={"logged-out-div"}>
      <div className={"logged-out-div-2"}>
        <div className={"logged-out-status-bar"}>
          <div className={"logged-out-connections"}>
            <div className={"logged-out-battery"}>
              <div className={"logged-out-overlap-group"}>
                <div className={"logged-out-capacity"} />
              </div>
              <img className={"logged-out-cap"} src={"/img/cap.svg"} />
            </div>
            <div className={"logged-out-wifi"}>
              <img className={"logged-out-img"} src={"/img/wifi-1.svg"} />
            </div>
            <div className={"logged-out-cellular-connection"}>
              <img className={"logged-out-img-2"} src={"/img/cellular-connection-2.svg"} />
            </div>
          </div>
          <div className={"logged-out-time"}>
            <div className={"logged-out-text-wrapper"}>9:27</div>
          </div>
        </div>
        <div className={"logged-out-overlap"}>
          <div className={"logged-out-register"}>REGISTER</div>
          <Link to="/signup">
            <div className={"button-button"} style={{
              backgroundColor: "#f8c982",
              border: "unset",
              borderColor: "unset",
              left: "0",
              position: "absolute",
              top: "0",
            }}>
              <div className={"button-log-in"} style={{
                color: "#ffffff",
                left: "51px",
                top: "18px",
              }}>
                {"REGISTER"}
              </div>
            </div>
          </Link>
        </div>
        <Link to="/login">
          <div className={"logged-out-button"}>
            <div className={"logged-out-log-in"}>LOG IN</div>
          </div>
        </Link>
        <div className={"logged-out-shape"} />
        <img className={"logged-out-image"} src={"/img/image-1.png"} />
      </div>
    </div>
  );
};
