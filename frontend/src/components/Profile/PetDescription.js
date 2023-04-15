import React, {useState} from 'react';
import './PetDescription.css';
import {FormControl} from '@mui/material';
import axios from '../../axios';
import {Link, useNavigate} from 'react-router-dom';

export const PetDescription = () => {
    const navigate = useNavigate();

    const [formValues, setFormValues] = useState({
        name: '',
        petType: '',
        gender: '',
        dateOfBirth: '',
        petDetails: '',
        age: '',
        healthStatus: '',
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        let data = new FormData(event.currentTarget);

        for (let pair of data.entries()) {
            console.log(pair[0]+ ', ' + pair[1]);
        }

        try {
            const response = await axios.post('/pet/', data, {
                headers: {
                    'x-auth-token': `${localStorage.getItem('userToken')}`,
                    // 'Content-Type': 'multipart/form-data',
                },
            });
            navigate('/home-page', {state: {petType: formValues.petType}});
            console.log('RESPONSE', response);

            console.log(response);
        } catch (err) {
            console.log(err);
        }
    };

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormValues((prevState) => ({...prevState, [name]: value}));
    };

    return (
        <div className={"sign-up-page-pet-with-photo-yes-screen-div"}>
            <div className={"sign-up-page-pet-with-photo-yes-screen-div-2"}>
                <div className={"sign-up-page-pet-with-photo-yes-screen-overlap"}>
                    <div className={"sign-up-page-pet-with-photo-yes-screen-next"}>
                        <div className={"sign-up-page-pet-with-photo-yes-screen-text-wrapper"}>Add pet</div>
                    </div>
                    <img className={"sign-up-page-pet-with-photo-yes-screen-vector-2"} src={"/img/vector.svg"}/>
                    <FormControl onSubmit={handleSubmit} component='form'>
                        <div className={"sign-up-page-pet-with-photo-yes-screen-name"}>
                            <input type="text" name={"name"} placeholder="Enter pet name" onChange={handleChange}
                                   required/>
                        </div>
                        <div className={"sign-up-page-pet-with-photo-yes-screen-overlap-wrapper"}>
                            <select name="petType" className="pet-type-dropdown" onChange={handleChange} required>
                                <option value="">Select pet type</option>
                                <option value="dog">Dog</option>
                                <option value="cat">Cat</option>
                                <option value="fish">Fish</option>
                                <option value="bird">Bird</option>
                            </select>
                        </div>
                        <div className={"sign-up-page-pet-with-photo-yes-screen-overlap-group3-wrapper"}>
                            <select name="sex" className="pet-type-dropdown" onChange={handleChange} required>
                                <option value="">Select pet gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        <div className={"sign-up-page-pet-with-photo-yes-screen-overlap-group4-wrapper"}>
                            <input type="text" name="date" placeholder="Enter pet date of birth" onChange={handleChange}
                                   pattern="\d{4}[-/]\d{2}[-/]\d{2}" required/>
                        </div>
                        <div className={"sign-up-page-pet-with-photo-yes-screen-overlap-group5-wrapper"}>
                            <input type="text" name={"details"}
                                   placeholder="Enter pet details" onChange={handleChange} required/>
                        </div>
                        <div className={"sign-up-page-pet-with-photo-yes-screen-overlap-group100-wrapper"}>
                            <input type="text" name={"age"}
                                   placeholder="Enter pet age" onChange={handleChange}
                                   pattern="^(1[0-9]{1,1}|[1-9][0-9]{0,1}|120)$" required/>
                        </div>
                        <div className={"sign-up-page-pet-with-photo-yes-screen-overlap-group101-wrapper"}>
                            <select name="health" className="pet-type-dropdown" onChange={handleChange} required>
                                <option value="" style={{color: "#f9c983"}}>Select pet type</option>
                                <option value="fit">Fit</option>
                                <option value="healthy">Healthy</option>
                                <option value="sick">Sick</option>
                                <option value="injured">Injured</option>
                            </select>
                        </div>
                        <div className={"sign-up-page-pet-with-photo-yes-screen-overlap-group-wrapper"}>
                            <button style={{background: "none", border: "none"}} type={"submit"}>
                                <div className={"sign-up-page-pet-with-photo-yes-screen-overlap-group6"}>
                                <div className={"sign-up-page-pet-with-photo-yes-screen-text-wrapper-7"}>Next</div>
                                </div>
                            </button>
                        </div>
                    </FormControl>
                </div>
                <div className={"sign-up-page-pet-with-photo-yes-screen-text"}>
                    <h1 className={"sign-up-page-pet-with-photo-yes-screen-h-1"}>Pet description</h1>
                </div>
                <div
                    className={"sign-up-page-pet-with-photo-yes-screen-overlap-group7"}
                    style={{
                        backgroundImage: "url(/img/rectangle-26-1.svg)",
                    }}
                >
                    <Link to={"/home-page"}>
                        <img className={"sign-up-page-pet-with-photo-yes-screen-arrow"} src={"/img/arrow-1-1.svg"}/>
                    </Link>
                </div>
            </div>
        </div>
    );
};
