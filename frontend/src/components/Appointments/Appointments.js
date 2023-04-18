import React from "react";
import "./Appointments.css";
import axios from "../../axios";
import {useNavigate, useParams} from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";

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
]

export const Appointments = () => {
    let {appointmentId} = useParams();
    let {appointment} = useParams();
    let {providerId} = useParams();

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

    const navigate = useNavigate();

    const handleArrowClick = () => {
        navigate("/appointments-screen");
    };

    return (
        <div className={"appointments-div"}>
            <div className={"appointments-div-2"}>
                <div className={"appointments-overlap-group"}>
                    <img className={"appointments-vector"} src={"/img/vector.svg"}/>
                    <div className={"appointments-rectangle"}/>
                    <div
                        className={"appointments-text-wrapper"}>{providers.find((p) => p.id.toString() === providerId).name}</div>
                    <img className={"appointments-image-removebg-preview"}
                         src={providers.find((p) => p.id.toString() === providerId).photo}/>
                    <div className={"appointments-APPOINTMENT-DETAILS"}>Appointment Details</div>
                    <div
                        className={"appointments-dog-sitter"}>{providers.find((p) => p.id.toString() === providerId).expertise}</div>
                    <div className={"appointments-AGE"}>Age</div>
                    <div className={"appointments-RATE"}>Rate</div>
                    <div
                        className={"appointments-text-wrapper-2"}>{providers.find((p) => p.id.toString() === providerId).age}</div>
                    <div className={"appointments-RATING"}>Rating</div>
                    <div className={"appointments-EXPERTISE"}>Expertise</div>
                    <div
                        className={"appointments-text-wrapper-3"}>{providers.find((p) => p.id.toString() === providerId).cost}/hour
                    </div>
                    <p className={"appointments-date-august-at-am"}>
                        <span className={"appointments-span"}>Date:</span>
                        <span className={"appointments-text-wrapper-4"}>
              {" "}
                            {appointment.slice(0, 10)}
                            <br/>
            </span>
                    </p>
                    <div className={"appointments-type-dog-walking"}>
                        <span className={"appointments-span"}>Type:</span>
                        <span
                            className={"appointments-text-wrapper-4"}> {providers.find((p) => p.id.toString() === providerId).expertise.slice(0, -2) + "ing"}</span>
                    </div>
                    <img className={"appointments-icon-star"} src={"/img/star.svg"}/>
                    <img className={"appointments-icon-star-2"} src={"/img/star.svg"}/>
                    <img className={"appointments-icon-star-3"} src={"/img/star.svg"}/>
                    <img className={"appointments-icon-star-4"} src={"/img/star.svg"}/>
                </div>
                <div className={"appointments-text"}>
                    <h1 className={"appointments-h-1"}>Appointment Details</h1>
                </div>
                <div className={"appointments-overlap"} onClick={() => cancelAppointment(appointmentId)}>
                    <div className={"appointments-text-wrapper-5"}>Cancel</div>
                </div>
                <div className={"appointments-overlap-group2"}>
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