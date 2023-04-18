import React, {useContext, useEffect, useState} from "react";
import "./AppointmentsScreen.css";
import {useNavigate} from "react-router-dom";
import axios from "../../axios";
import {LoggedContext} from "../../utils/AuthContext";

const providers = [
    {
        id: 1,
        name: "Noah Assayag",
        cost: "$28",
        expertise: "Sitter",
        age: 22,
        rating: 5,
        sex: "Male",
        location: "Montreal, Quebec",
        photo: "https://i.pravatar.cc/300?u=a042581f4e895267f4d",
        details: "Noah Assayag is an animal lover who has had a dog for the past 12 years. He is a very experienced dog walker and caretaker! He specializes in dog walking, but can also provide other services such as grooming and dog watching. He has experience with all breeds, ranging from chihuahas to german shepherds. Noah himself is the owner of Beast, a shih tzu. He also owns three ducks, one octopus, 3 parrots and one salamander.",
        email: "assayagnoah@gmail.com"
    },
    {
        id: 2,
        name: "Emma Thompson",
        cost: "$35",
        expertise: "Trainer",
        age: 30,
        rating: 4,
        sex: "Female",
        location: "Beijing, China",
        photo: "https://i.pravatar.cc/300?u=a042581f4e295267f4d",
        details: "Emma is an experienced cat trainer who has a deep understanding of feline behavior and psychology. She has a natural affinity for cats and has honed her skills over many years of working with them. Emma's approach to cat training is both patient and firm, ensuring that her feline clients feel safe and comfortable while also making progress in their training. She understands that every cat is unique and tailors her training methods to suit each individual cat's personality and needs.",
        email: "emmathompson@gmail.com"
    },
    {
        id: 3,
        name: "John Doe",
        cost: "$20",
        expertise: "Groomer",
        age: 40,
        rating: 3,
        sex: "Male",
        location: "Nairobi, Kenya",
        photo: "https://i.pravatar.cc/300?u=a04q581f4e295267f4d",
        details: "John Doe is a professional dog groomer who has been working in the industry for over 10 years. He has experience with all breeds of dogs and specializes in grooming dogs with long hair. He is a very patient and gentle groomer who is able to calm even the most nervous dogs. He is also a very experienced dog walker and has experience with dogs of all sizes and temperaments. John is the owner of two dogs, a golden retriever named Max and a poodle named Charlie.",
        email: "johndoe@gmail.com"
    },
];

export const AppointmentsScreen = () => {
    const navigate = useNavigate();
    const [loggedIn] = useContext(LoggedContext);
    const [appointments, setAppointments] = useState([]);
    let timeOut = null;

    useEffect(() => {
        timeOut = setTimeout(() => {
            if (!loggedIn) {
                navigate("/login");
            }
        }, 500);
        return () => {
            if (timeOut) clearTimeout(timeOut);
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
                setAppointments(response.data || null);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    const backButton = () => {
        navigate("/home-page");
    }

    const seeDetails = (appointmentId, appointment, providerId) => {
        navigate(`/appointments/${appointmentId}/${appointment.date}/${providerId}`);
    }

    return (
        <div className={"appointments-screen-div"}>
            <div className={"appointments-screen-div-2"}>
                {appointments.map((appointment, index) => (
                    <div key={index} className={"appointments-screen-overlap-group"}
                         onClick={() => seeDetails(appointment._id, appointment, providers.find((p) => p.id.toString() === appointment.providerId).id)}>
                        <div className={"appointments-screen-rectangle"}/>
                        <div
                            className={"appointments-screen-text-wrapper-5"}>{providers.find((p) => p.id.toString() === appointment.providerId).name}</div>
                        <div
                            className={"appointments-screen-text-wrapper-6"}>{appointment.type.charAt(0).toUpperCase() + appointment.type.slice(1)}</div>
                        <div className={"appointments-screen-text-wrapper-7"}>{appointment.date.slice(0, 10)}</div>
                        <div className={"appointments-screen-text-wrapper-8"}>{appointment.time}</div>
                    </div>
                ))}
                <div className={"appointments-screen-text"}>
                    <h1 className={"appointments-screen-h-1"}>Appointments</h1>
                </div>
                <div
                    className={"appointments-screen-overlap-group4"}
                    style={{
                        backgroundImage: "url(/img/rectangle-26-1.svg)",
                    }}
                    onClick={backButton}
                >
                    <img className={"appointments-screen-arrow"} src={"/img/arrow-1-1.svg"}/>
                </div>
            </div>
        </div>
    );

};
