import "./ProviderProfile.css";
import * as React from "react";
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState } from 'react';

export function ProviderProfile() {

    const [favorited, setIsFavorited] = useState(false);

    const handleFavorite = () => {
        setIsFavorited(!favorited);
    }

    return (
        <Container className="profile-page-container">
            <Grid className="provider-picture">
                <Grid>
                    <Button className="back-provider-button" variant="contained"> <ArrowBackIcon/></Button>
                    <Button onClick={handleFavorite} className="favorite-provider-button" variant="contained"> {favorited ? <FavoriteIcon /> : <FavoriteBorderIcon/> }</Button>
                </Grid>
            </Grid>
            <Grid className="provider-info">
                <Grid className="provider-header">
                    <div className="provider-name">
                        <h1>Noah Assayag</h1>
                    </div>
                    <div className="provider-rate">
                        <h1>$28</h1><p> /hr</p>
                    </div>
                </Grid>
                <div className="info-row">
                    <Grid className="specific-info-provider">
                        <h3>AGE</h3>
                        <p>22</p>
                    </Grid>
                    <Grid className="specific-info-provider">
                        <h3>RATING</h3>
                        {[...Array(5)].map((index) => <StarIcon key={index} className="provider-rating" />)}
                    </Grid>
                    <Grid className="specific-info-provider">
                        <h3>GENDER</h3>
                        <p>Male</p>
                    </Grid>
                </div>
                <div className="info-row">
                    <Grid className="specific-info-provider">
                        <h3>EXPERTISE</h3>
                        <p>Petsitter</p>
                    </Grid>
                    <Grid className="specific-info-provider">
                        <h3>LOCATION</h3>
                        <p>Montreal, Quebec</p>
                    </Grid>
                </div>
                <div className="info-row">
                    <Grid>
                        <h3>DETAILS</h3>
                        <p>Noah Assayag is an animal lover who has had a dog for the past 12 years. He is a very experienced dog walker and caretaker! He specializes in dog walking, but can also provide other services such as grooming and dog watching. He has experience with all breeds, ranging from chihuahas to german shepherds. Noah himself is the owner of Beast, a shih tzu. He also owns three ducks, one octopus, 3 parrots and one salamander.</p>
                    </Grid>
                </div>
                <div>
                    <Button className="contact-provider-button" variant="contained" >
                        Contact Provider
                    </Button>
                </div>
            </Grid>
        </Container>
    );
}