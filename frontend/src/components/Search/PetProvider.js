import "./PetProvider.css";
import React, {useState} from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import {Box, ButtonGroup, Card, CardMedia, CardContent, Typography, TextField} from "@mui/material";

const userData = [
    {
        id: 1,
        name: "Noah Assayag",
        cost: "$28/hr",
        expertise: "sitter",
        age: 22,
        rating: 4.5,
        photo: "https://picsum.photos/200/300?random=1",
    },
    {
        id: 2,
        name: "Emma Thompson",
        cost: "$35/hr",
        expertise: "trainer",
        age: 30,
        rating: 4.8,
        photo: "https://picsum.photos/200/300?random=2",
    },
    {
        id: 3,
        name: "John Doe",
        cost: "$20/hr",
        expertise: "groomer",
        age: 40,
        rating: 4.2,
        photo: "https://picsum.photos/200/300?random=3",
    },
];

export function PetProvider() {
    const [filter, setFilter] = useState();
    const [searchValue, setSearchValue] = useState("");
    const [providers, setProviders] = useState(userData);
    const [disabledButtons, setDisabledButtons] = useState({
        all: false,
        trainers: false,
        sitters: false,
        groomers: false,
    });

    const handleSearch = (event) => {
        setSearchValue(event.target.value);
    };

    const handleFilter = (filter) => {
        if (filter === "") {
            setProviders(userData);
            setDisabledButtons({ all: true, trainers: false, sitters: false, groomers: false });
            return;
        }
        setFilter(filter);
        setProviders(userData.filter((provider) => provider.expertise === filter));
        setDisabledButtons({
            all: false,
            trainers: filter === "trainer",
            sitters: filter === "sitter",
            groomers: filter === "groomer",
        });
    };

    const searchProviders = providers.filter((provider) => {
        const lowercaseSearchValue = searchValue.toLowerCase();
        return provider.name.toLowerCase().includes(lowercaseSearchValue);
    });

    return (
        <Container>
            <Box sx={{mb: 3}}>
                <TextField label="Search" variant="outlined" fullWidth onChange={handleSearch}/>
            </Box>
            <ButtonGroup variant="contained" aria-label="outlined button group">
                <Button onClick={() => handleFilter("")} sx={{borderRadius: "30px"}}
                        disabled={disabledButtons.all}>All</Button>
                <Button onClick={() => handleFilter("trainer")} sx={{borderRadius: "30px"}}
                        disabled={disabledButtons.trainers}>Trainers</Button>
                <Button onClick={() => handleFilter("sitter")} sx={{borderRadius: "30px"}}
                        disabled={disabledButtons.sitters}>Sitters</Button>
                <Button onClick={() => handleFilter("groomer")} sx={{borderRadius: "30px"}}
                        disabled={disabledButtons.groomers}>Groomers</Button>
            </ButtonGroup>
            <Grid container spacing={2} sx={{mt: 3}}>
                {searchProviders.map((provider) => (
                    <Grid key={provider.id} item xs={12} sm={6} md={4}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="200"
                                image={provider.photo}
                                alt={provider.name}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {provider.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {provider.cost}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {provider.expertise}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {provider.age}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {provider.rating}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
