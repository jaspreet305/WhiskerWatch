import React from "react";
import "./Appointments.css";
import axios from "../../axios";
import {useNavigate, useParams} from "react-router-dom";


export const Appointments = () => {
    let {appointmentId} = useParams();

    const cancelAppointment = async (appointmentId) => {
        try {
            const response = await axios.delete(`appointment/${appointmentId}`, {
                headers: {
                    'x-auth-token': `${localStorage.getItem('userToken')}`,
                }
            });
            navigate("/home-page");
            console.log('Appointment successfully canceled:', response.data);
        } catch (error) {
            console.error('Error canceling appointment:', error.message);
        }
    };

    const modifyAppointment = async (appointmentId, appointment) => {
        try {
            const response = await axios.put(`appointment/${appointment._id}`, {
                headers: {
                    'x-auth-token': `${localStorage.getItem('userToken')}`,
                }
            });
            console.log('Appointment successfully modified:', response.data);
        } catch (error) {
            console.error('Error modifying appointment:', error.message);
        }
    };

    const navigate = useNavigate();
    const handleModifyClick = () => {
        navigate("/book-appointment");
    };
    const handleArrowClick = () => {
        navigate("/appointments-screen");
    };

    return (
        <div className={"appointments-div"}>
            <div className={"appointments-div-2"}>
                <div className={"appointments-overlap-group"}>
                    <img className={"appointments-vector"} src={"/img/vector.svg"}/>
                    <div className={"appointments-rectangle"}/>
                    <div className={"appointments-text-wrapper"}>Noah Assayag</div>
                    <img className={"appointments-image-removebg-preview"} src={"/img/image-removebg-preview-2.png"}/>
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
              <br/>
            </span>
                    </p>
                    <div className={"appointments-type-dog-walking"}>
                        <span className={"appointments-span"}>Type:</span>
                        <span className={"appointments-text-wrapper-4"}> Dog Walking</span>
                    </div>
                    <img className={"appointments-icon-star"} src={"/img/star.svg"}/>
                    <img className={"appointments-icon-star-2"} src={"/img/star.svg"}/>
                    <img className={"appointments-icon-star-3"} src={"/img/star.svg"}/>
                    <img className={"appointments-icon-star-4"} src={"/img/star.svg"}/>
                    <img className={"appointments-icon-star-5"} src={"/img/star.svg"}/>
                </div>
                <div className={"appointments-text"}>
                    <h1 className={"appointments-h-1"}>Appointment Details</h1>
                </div>
                <div className={"appointments-overlap"} onClick={() => cancelAppointment(appointmentId)}>
                    <div className={"appointments-text-wrapper-5"}>Cancel</div>
                </div>
                <div className={"appointments-overlap-group2"} onClick={handleModifyClick}>
                    <div className={"appointments-text-wrapper-5"}>Modify</div>
                </div>
                <div
                    className={"appointments-overlap-group3"}
                    onClick={handleArrowClick}
                    style={{
                        backgroundImage: "url(/img/rectangle-26-1.svg)",
                    }}
                >
                    <img className={"appointments-arrow"} src={"/img/arrow-1-1.svg"}/>
                </div>
            </div>
        </div>
    );
}