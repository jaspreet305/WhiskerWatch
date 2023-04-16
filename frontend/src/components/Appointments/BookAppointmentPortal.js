import React, {useEffect} from "react";
import "./BookAppointmentPortal.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';
import {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import jwt from "jwt-decode";
import axios from "../../axios";

const userData = [
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

export const BookAppointmentPortal = () => {
    let {providerId} = useParams();
    let userId;
    const userToken = localStorage.getItem('userToken');
    if (userToken)
        userId = jwt(userToken)._id;

    const provider = userData.find((p) => p.id.toString() === providerId);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setAppointment({
            user: null,
            providerId: null, type: appointmentType.toLowerCase(), date: selectedDate, time: selectedTime
        })
        console.log(`Selected date:`, date);
    };

    const timeOptions = [
        {value: '09:00', label: '09:00 AM'},
        {value: '09:30', label: '09:30 AM'},
        {value: '10:00', label: '10:00 AM'},
        {value: '10:30', label: '10:30 AM'},
        {value: '11:00', label: '11:00 AM'},
        {value: '11:30', label: '11:30 AM'},
        {value: '12:00', label: '12:00 PM'},
        {value: '12:30', label: '12:30 PM'},
        {value: '13:00', label: '13:00 PM'},
        {value: '13:30', label: '13:30 PM'},
        {value: '14:00', label: '14:00 PM'},
        {value: '14:30', label: '14:30 PM'},
    ];

    const appointmentType = provider?.expertise.slice(0, -2) + "ing";

    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);

    const [appointment, setAppointment] = useState({
        user: null,
        providerId: null,
        type: appointmentType.toLowerCase(),
        date: selectedDate,
        time: selectedTime
    });

    const confirmAppointment = async (appointment) => {
        appointment.providerId = providerId;
        appointment.user = userId;
        console.log(`The appointment is:`, appointment);
        try {
            const response = await axios.post("/appointment/", appointment, {
                headers: {
                    'x-auth-token': `${localStorage.getItem('userToken')}`,
                },
            });
            navigate('/home-page');
            console.log(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleTimeChange = (selectedOption) => {
        setSelectedTime(selectedOption);
        setAppointment({
            user: null,
            providerId: null, type: appointmentType.toLowerCase(), date: selectedDate, time: selectedOption.label
        })
        console.log(`Selected time:`, selectedOption);
    };

    const navigate = useNavigate();

    const handleArrowClick = () => {
        navigate("/search");
    };

    return (
        <div className={"book-appointment-portal-div"}>
            <div className={"book-appointment-portal-book-appointment-portal"}>
                <div className={"book-appointment-portal-overlap"} onClick={handleArrowClick}>
                    <h1 className={"book-appointment-portal-explore"}>Explore</h1>
                    <img className={"book-appointment-portal-arrow"} src={"/img/arrow-1-1.svg"}/>
                    <img className={"book-appointment-portal-rectangle"} src={"/img/rectangle-26-1.svg"}/>
                    <img className={"appointments-arrow"} src={"/img/arrow-1-1.svg"}/>
                </div>
                <div className={"book-appointment-portal-overlap-group4"}>
                    <div className={"book-appointment-portal-text-wrapper"}>Date</div>
                    <div className={"book-appointment-portal-calendar-april"}>
                        <DatePicker
                            inline
                            selected={new Date()}
                            onChange={handleDateChange}
                            calendarClassName={"book-appointment-portal-custom-calendar"}
                            style={{zIndex: 1000}}
                        />
                    </div>
                </div>
                <div className={"book-appointment-portal-text-wrapper-7"}>Time
                </div>
                <div className={"book-appointment-portal-text-wrapper-4"}>Appointment Type</div>
                <div className={"book-appointment-portal-overlap-group5"}>
                    <img className={"book-appointment-portal-arrow-2"} src={"/img/arrow-2.svg"}/>
                    <div className={"book-appointment-portal-text-wrapper-5"}>{appointmentType}</div>
                </div>
                <div className={"book-appointment-portal-overlap-group1"}>
                        <Select
                            value={selectedTime}
                            onChange={handleTimeChange}
                            options={timeOptions}
                            menuPortalTarget={document.body}
                            closeMenuOnSelect={false}
                        />
                        <img className={"book-appointment-portal-img"} src={"/img/arrow-1-2.svg"}/>
                </div>
                <button onClick={() => confirmAppointment(appointment)} style={{border: "none"}}
                        className={"book-appointment-portal-overlap-group2"}>
                    <div className={"book-appointment-portal-text-wrapper-6"}>Confirm Appointment</div>
                </button>
            </div>
        </div>
    );
};