import React from "react";
import "./Appointments.css";

export const Appointments = () => {
    return (
        <div className={"appointments-div"}>
            <div className={"appointments-div-2"}>
                <div className={"appointments-status-bar"}>
                    <div className={"appointments-right-side"}>
                        <img className={"appointments-battery"} src={"/img/battery.png"} />
                        <img className={"appointments-img"} src={"/img/wifi-3.svg"} />
                        <img className={"appointments-icon-bar-chart"} src={"/img/mobile-signal.svg"} />
                    </div>
                    <img className={"appointments-left-side"} src={"/img/left-side.png"} />
                </div>
                <div className={"appointments-overlap-group"}>
                    <img className={"appointments-vector"} src={"/img/vector.svg"} />
                    <div className={"appointments-rectangle"} />
                    <div className={"appointments-text-wrapper"}>Noah Assayag</div>
                    <img className={"appointments-image-removebg-preview"} src={"/img/image-removebg-preview-2.png"} />
                    <div className={"appointments-APPOINTMENT-DETAILS"}>Appointment Details</div>
                    <div className={"appointments-dog-sitter"}> Dog Sitter</div>
                    <div className={"appointments-AGE"}>Age</div>
                    <div className={"appointments-RATE"}>Rate</div>
                    <div className={"appointments-text-wrapper-2"}>21</div>
                    <div className={"appointments-RATING"}>Rating</div>
                    <div className={"appointments-EXPERTISE"}>Expertise</div>
                    <div className={"appointments-text-wrapper-3"}>$28/hour</div>
                    <p className={"appointments-date-august-at-am"}>
                        <span className={"appointments-span"}>Date:</span>
                        <span className={"appointments-text-wrapper-4"}>
              {" "}
                            August 27, 2024 at 10:00 am
              <br />
            </span>
                    </p>
                    <div className={"appointments-type-dog-walking"}>
                        <span className={"appointments-span"}>Type:</span>
                        <span className={"appointments-text-wrapper-4"}> Dog Walking</span>
                    </div>
                    <img className={"appointments-icon-star"} src={"/img/star.svg"} />
                    <img className={"appointments-icon-star-2"} src={"/img/star.svg"} />
                    <img className={"appointments-icon-star-3"} src={"/img/star.svg"} />
                    <img className={"appointments-icon-star-4"} src={"/img/star.svg"} />
                    <img className={"appointments-icon-star-5"} src={"/img/star.svg"} />
                </div>
                <div className={"appointments-text"}>
                    <h1 className={"appointments-h-1"}>Appointment Details</h1>
                </div>
                <div className={"appointments-overlap"}>
                    <div className={"appointments-text-wrapper-5"}>Cancel</div>
                </div>
                <div className={"appointments-overlap-group2"}>
                    <div className={"appointments-text-wrapper-5"}>Modify</div>
                </div>
                <div className={"appointments-text-wrapper-6"}>Modify</div>
                <div
                    className={"appointments-overlap-group3"}
                    style={{
                        backgroundImage: "url(/img/rectangle-26-1.svg)",
                    }}
                >
                    <img className={"appointments-arrow"} src={"/img/arrow-1-1.svg"} />
                </div>
            </div>
        </div>
    );
};
