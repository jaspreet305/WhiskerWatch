import "./ProviderProfile.css";
import * as React from "react";
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState, useEffect, useParams } from 'react';

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

export function ProviderProfile() {

    const [favorited, setIsFavorited] = useState(false);

    const handleFavorite = () => {
        setIsFavorited(!favorited);
    }

    // let userId = useParams();
    let  userId = 1;
    const user = userData.find((user) => user.id === userId);
    let rating = user?.rating;

    return (
        <Container className="profile-page-container">
            <Grid className="provider-picture">
                <Grid>
                    <Button className="back-provider-button" variant="contained"> <ArrowBackIcon /></Button>
                    <Button onClick={handleFavorite} className="favorite-provider-button" variant="contained"> {favorited ? <FavoriteIcon /> : <FavoriteBorderIcon />}</Button>
                </Grid>
            </Grid>
            <Grid className="provider-info">
                <Grid className="provider-header">
                    <div className="provider-name">
                        <h1>{user?.name}</h1>
                    </div>
                    <div className="provider-rate">
                        <h1>{user?.cost}</h1><p> /hr</p>
                    </div>
                </Grid>
                <div className="info-row">
                    <Grid className="specific-info-provider">
                        <h3>AGE</h3>
                        <p>{user?.age}</p>
                    </Grid>
                    <Grid className="specific-info-provider">
                        <h3>RATING</h3>
                        {[...Array(rating)].map((index) => <StarIcon key={index} className="provider-rating" />)}
                    </Grid>
                    <Grid className="specific-info-provider">
                        <h3>GENDER</h3>
                        <p>{user?.sex}</p>
                    </Grid>
                </div>
                <div className="info-row">
                    <Grid className="specific-info-provider">
                        <h3>EXPERTISE</h3>
                        <p>{user?.expertise}</p>
                    </Grid>
                    <Grid className="specific-info-provider">
                        <h3>LOCATION</h3>
                        <p>{user?.location}</p>
                    </Grid>
                </div>
                <div className="info-row">
                    <Grid>
                        <h3>DETAILS</h3>
                        <p>{user?.details}</p>
                    </Grid>
                </div>
                <div>
                    <Button href="/book-appointment" className="contact-provider-button" variant="contained" >
                        Contact Provider
                    </Button>
                </div>
            </Grid>
        </Container>
    );
}