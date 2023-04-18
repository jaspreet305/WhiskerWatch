import "./PetProfile.css";
import * as React from "react";
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import axios from "../../axios";

export function PetProfile() {
    const { petId } = useParams();
    const navigate = useNavigate();
    const [pet, setPet] = useState({});

    useEffect(() => {
        axios.get(`pet/${petId}`)
            .then((response) => {
                console.log(response);
                setPet(response?.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const email = "test@gmail.com";

    const handleContactButton = () => {
        window.location.href = `mailto:${email}`;
    };

    const getPetPic = (pet) => {
        let petPic;
        switch (pet.petType) {
            case "dog":
                petPic = "https://www.gannett-cdn.com/presto/2020/03/17/USAT/c0eff9ec-e0e4-42db-b308-f748933229ee-XXX_ThinkstockPhotos-200460053-001.jpg?crop=1170%2C658%2Cx292%2Cy120&width=1200";
                break;
            case "bird":
                petPic = "https://cf.ltkcdn.net/birds/bird-species/images/orig/324030-1600x1066-sun-conure-care.jpg";
                break;
            case "cat":
                petPic = "https://cdn-prd.content.metamorphosis.com/wp-content/uploads/sites/6/2022/12/shutterstock_781327003-1.jpg";
                break;
            case "fish":
                petPic = "https://www.animalsaroundtheglobe.com/wp-content/uploads/2022/07/david-clode-iLwQIbWxv-s-unsplash.jpg";
                break;
            default:
                petPic = null;
        }
        return petPic;
    }

    return (
        <Container className="profile-page-container">
            <Grid className="pet-picture" style={{ backgroundImage: `url(${getPetPic(pet)})`, backgroundSize: 'cover'}}>
                <Grid>
                    <Button className="back-pet-button" variant="contained" onClick={() => navigate('/home-page')}> <ArrowBackIcon /></Button>
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
                    <Button onClick={handleContactButton} className="contact-owner-button" variant="contained" >
                        Contact Owner
                    </Button>
                </div>
            </Grid>
        </Container>
    );
}