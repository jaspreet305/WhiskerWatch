import React from "react";
import "./BookAppointmentPortal.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export const BookAppointmentPortal = () => {
  const handleDateChange = (date) => {
    console.log(date);
  };

  const timeOptions = [
    { value: '09:00', label: '09:00 AM' },
    { value: '09:30', label: '09:30 AM' },
    { value: '10:00', label: '10:00 AM' },
  ];
  
  const [selectedTime, setSelectedTime] = useState(null);

  const handleTimeChange = (selectedOption) => {
    setSelectedTime(selectedOption);
    console.log(`Selected time:`, selectedOption);
  };

  const navigate = useNavigate();

  const handleArrowClick = () => {
    navigate("/search");
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      height: '50px',
      borderRadius: '8px',
      border: state.isFocused ? '1px solid #F8D1CB' : '1px solid #E5E5E5',
      boxShadow: state.isFocused ? '0 0 4px #F8D1CB' : 'none',
      '&:hover': {
        border: state.isFocused ? '1px solid #F8D1CB' : '1px solid #E5E5E5',
      }
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#F8D1CB' : 'white',
      color: state.isSelected ? 'white' : '#495057',
      '&:hover': {
        backgroundColor: '#F8D1CB',
        color: 'white',
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#495057',
    }),
  };
  
  return (
    <div className={"book-appointment-portal-div"}>
      <div className={"book-appointment-portal-book-appointment-portal"}>
        <div className={"book-appointment-portal-overlap"} onClick={handleArrowClick}>
          <h1 className={"book-appointment-portal-explore"}>Explore</h1>
          <img className={"book-appointment-portal-arrow"} src={"/img/arrow-1-1.svg"} />
          <img className={"book-appointment-portal-rectangle"} src={"/img/rectangle-26-1.svg"} />
          <img className={"appointments-arrow"} src={"/img/arrow-1-1.svg"} />
        </div>
        <div className={"book-appointment-portal-overlap-group4"}>
          <div className={"book-appointment-portal-text-wrapper"}>Date</div>
          <div className={"book-appointment-portal-calendar-april"}>
            <DatePicker
              inline
              selected={new Date()}
              onChange={handleDateChange}
              calendarClassName={"book-appointment-portal-custom-calendar"}
              style={{ zIndex: 1000 }}
            />
          </div>
        </div>
        <div className={"book-appointment-portal-text-wrapper-7"}>Time
        </div>
        <div className={"book-appointment-portal-text-wrapper-4"}>Appointment Type</div>
        <div className={"book-appointment-portal-overlap-group5"}>
          <img className={"book-appointment-portal-arrow-2"} src={"/img/arrow-2.svg"} />
          <div className={"book-appointment-portal-text-wrapper-5"}>Dog Walking</div>
        </div>
        <div className={"book-appointment-portal-overlap-group2"}>
          <div className={"book-appointment-portal-text-wrapper-6"}>Confirm Appointment</div>
        </div>
        <div className={"book-appointment-portal-overlap-group1"}>         
        <div className={"book-appointment-portal-time-selection-wrapper"}>
            <Select
              value={selectedTime}
              onChange={handleTimeChange}
              options={timeOptions}
              isSearchable={false}
              styles={customStyles}
              className={"book-appointment-portal-select"}
            />
          <img className={"book-appointment-portal-img"} src={"/img/arrow-1-2.svg"} />
          <div className={"book-appointment-portal-text-wrapper-8"}></div>
        </div>
      </div>
    </div>
    </div>
  );  
};