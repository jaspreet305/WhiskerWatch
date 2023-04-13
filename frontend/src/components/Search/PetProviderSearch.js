import React from "react";
import "./PetProviderSearch.css";
import {useParams} from "react-router-dom";

export const PetProviderSearch = () => {
    const {workerType} = useParams();
    const [workerTypeState, setWorkerTypeState] = React.useState(workerType || "none");

    const [search, setSearch] = React.useState("");
    const [petProviders] = React.useState([
        {
            id: 1,
            name: "Noah Assayag",
            cost: "$28/hr",
            expertise: "sitter",
            age: 22,
            rating: 4.5,
            sex: "Male",
            photo: "https://i.pravatar.cc/300?u=a042581f4e895267f4d",
        },
        {
            id: 2,
            name: "Emma Thompson",
            cost: "$35/hr",
            expertise: "trainer",
            age: 30,
            rating: 4.8,
            sex: "Female",
            photo: "https://i.pravatar.cc/300?u=a042581f4e295267f4d",
        },
        {
            id: 3,
            name: "John Doe",
            cost: "$20/hr",
            expertise: "groomer",
            age: 40,
            rating: 4.2,
            sex: "Male",
            photo: "https://i.pravatar.cc/300?u=a04q581f4e295267f4d",
        },
    ]);

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function onSearchChange(event) {
        setSearch(event.target.value);
    }


    return (
        <div className={"pet-provider-search-div"}>
            <div className={"pet-provider-search-div-2"}>
                <div className={"pet-provider-search-overlap"}>
                    <h1 className={"pet-provider-search-explore"}>Explore</h1>
                    <input className={"pet-provider-search-rectangle"} placeholder={"Search"} onChange={onSearchChange}/>
                    {/*<div className={"pet-provider-search-rectangle"}/>*/}
                    {/*<div className={"pet-provider-search-search"}>Search</div>*/}
                    <img className={"pet-provider-search-icon-search"} src={"/img/search.svg"}/>
                </div>
                <div className={"pet-provider-search-overlap-buttons"}>
                    <div className={workerTypeState === "sitter" ? "pet-provider-search-overlap-selected" : "pet-provider-search-overlap-unselected"} onClick={() => setWorkerTypeState("sitter")}>
                        <div className={"pet-provider-search-text-wrapper"}>Sitters</div>
                    </div>
                    <div className={workerTypeState === "trainer" ? "pet-provider-search-overlap-selected" : "pet-provider-search-overlap-unselected"} onClick={() => setWorkerTypeState("trainer")}>
                        <div className={"pet-provider-search-text-wrapper"}>Trainers</div>
                    </div>
                    <div className={workerTypeState === "groomer" ? "pet-provider-search-overlap-selected" : "pet-provider-search-overlap-unselected"} onClick={() => setWorkerTypeState("groomer")}>
                        <div className={"pet-provider-search-text-wrapper"}>Groomers</div>
                    </div>
                </div>
                <div className={"pet-provider-container"}>
                    {petProviders.filter((petProvider) => search === "" ? true : (petProvider.name.toLowerCase().includes(search.toLowerCase()) || petProvider.expertise.toLowerCase().includes(search.toLowerCase())))
                        .filter((petProvider) => workerTypeState === "none" ? true : petProvider.expertise === workerTypeState).map((petProvider) => (
                      <div className={"pet-provider-search-overlap-group"}>
                        <div className={"pet-provider-search-text-wrapper-4"}>{petProvider.name}</div>
                        <div className={"pet-provider-search-dog-sitter"}>{capitalizeFirstLetter(petProvider.expertise)}</div>
                        <div className={"pet-provider-search-age"}>Age</div>
                        <div className={"pet-provider-search-text-wrapper-5"}>Cost</div>
                        <div className={"pet-provider-search-element-stars"}>{petProvider.rating} Stars</div>
                        <div className={"pet-provider-search-element-yrs"}>{petProvider.age} Yrs</div>
                        <div className={"pet-provider-search-text-wrapper-6"}>Rating</div>
                        <div className={"pet-provider-search-text-wrapper-7"}>Expertise</div>
                        <div className={"pet-provider-search-text-wrapper-8"}>{petProvider.sex}</div>
                        <div className={"pet-provider-search-text-wrapper-9"}>{petProvider.cost}</div>
                        <div className={"pet-provider-search-rectangle-14"}/>
                        <div className={"pet-provider-search-text-wrapper-10"}>{petProvider.name}</div>
                        <div className={"pet-provider-search-dog-sitter-2"}>{capitalizeFirstLetter(petProvider.expertise)}</div>
                        <div className={"pet-provider-search-AGE"}>Age</div>
                        <div className={"pet-provider-search-RATE"}>Rate</div>
                        <div className={"pet-provider-search-element-5-stars"}>{petProvider.rating} Stars</div>
                        <div className={"pet-provider-search-element-21-yrs"}>{petProvider.age} Yrs</div>
                        <div className={"pet-provider-search-RATING"}>Rating</div>
                        <div className={"pet-provider-search-EXPERTISE"}>Expertise</div>
                        <div className={"pet-provider-search-text-wrapper-11"}>{petProvider.cost}</div>
                        <img className={"pet-provider-search-image-removebg-preview"}
                             src={petProvider.photo}/>
                    </div>
                    ))}
                </div>
                <img className={"pet-provider-search-left-side"} src={"/img/left-side.png"}/>
                <div className={"pet-provider-search-right-side"}>
                    <img className={"pet-provider-search-battery"} src={"/img/battery-5.png"}/>
                    <img className={"pet-provider-search-img"} src={"/img/wifi-10.svg"}/>
                    <img className={"pet-provider-search-icon-bar-chart"} src={"/img/mobile-signal-5.svg"}/>
                </div>
            </div>
        </div>
    );
};
