import "./PetProfile.css";
import * as React from "react";
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export function PetProfile() {

    return (
        <Container className="profile-page-container">
            <Grid className="pet-picture">
                <Grid>
                    <Button className="back-pet-button" variant="contained"> <ArrowBackIcon /></Button>
                </Grid>
            </Grid>
            <Grid className="pet-info">
                <div className="pet-name">
                    <h1>Beast</h1>
                </div>
                <div className="pet-breed">
                    <h2>Shih Tzu</h2>
                </div>
                <div className="info-row">
                    <Grid className="specific-info">
                        <h3>AGE</h3>
                        <p>12 years</p>
                    </Grid>
                    <Grid className="specific-info">
                        <h3>HEALTH</h3>
                        <p>Fit</p>
                    </Grid>
                    <Grid className="specific-info">
                        <h3>SEX</h3>
                        <p>Male</p>
                    </Grid>
                </div>
                <div className="info-row">
                    <Grid>
                        <h3>LOCATION</h3>
                        <p>Montreal, Quebec</p>
                    </Grid>
                </div>
                <div className="info-row">
                    <Grid>
                        <h3>DETAILS</h3>
                        <p>Beast enjoys the company of humans. He can sometimes be aggressive around other dogs, especially chihuahuas. Also, he will get really mad if you try to treat him like a child. He will like you if you respect him.</p>
                    </Grid>
                </div>
                <div className="info-row">
                    <Grid>
                        <h3>OWNER</h3>
                        <div className="owner">
                            <AccountCircleIcon className="owner-icon" />
                            <p> Noah Assayag </p>
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