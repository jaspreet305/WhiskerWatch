import "./PetProfile.css";
import * as React from "react";
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useEffect, useState } from "react";
import axios from "../../axios";

export function PetProfile() {

    const [pet, setPet] = useState({});

    useEffect(() => { 
        axios.get("pet/64355e7872a61b3b2efbab56") // pet id hard coded for now. waiting for home page to be implemented
            .then((response) => {
                console.log(response);
                setPet(response?.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <Container className="profile-page-container">
            <Grid className="pet-picture">
                <Grid>
                    <Button className="back-pet-button" variant="contained"> <ArrowBackIcon /></Button>
                </Grid>
            </Grid>
            <Grid className="pet-info">
                <div className="pet-name">
                    <h1>{pet.name}</h1>
                </div>
                <div className="pet-breed">
                    <h2>{pet.breed}</h2>
                </div>
                <div className="info-row">
                    <Grid className="specific-info">
                        <h3>AGE</h3>
                        <p>{pet.age}</p>
                    </Grid>
                    <Grid className="specific-info">
                        <h3>HEALTH</h3>
                        <p>{pet.health?.charAt(0).toUpperCase() + pet?.health?.slice(1)}</p>
                    </Grid>
                    <Grid className="specific-info">
                        <h3>SEX</h3>
                        <p>{pet.sex?.charAt(0).toUpperCase() + pet?.sex?.slice(1)}</p>
                    </Grid>
                </div>
                <div className="info-row">
                    <Grid>
                        <h3>LOCATION</h3>
                        <p>{pet.location}</p>
                    </Grid>
                </div>
                <div className="info-row">
                    <Grid>
                        <h3>DETAILS</h3>
                        <p>{pet.details}</p>
                    </Grid>
                </div>
                <div className="info-row">
                    <Grid>
                        <h3>OWNER</h3>
                        <div className="owner">
                            <AccountCircleIcon className="owner-icon" />
                            <p> {pet.owner?.firstName} {pet.owner?.lastName} </p>
                        </div>
                    </Grid>
                </div>
                <div>
                    <Button className="contact-owner-button" variant="contained" >
                        Contact Owner
                    </Button>
                </div>
            </Grid>
        </Container>
    );
}