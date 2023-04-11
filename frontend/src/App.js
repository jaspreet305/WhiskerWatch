import {BrowserRouter, Routes, Route} from "react-router-dom";
import {PetProfile} from "./components/Profile/PetProfile";
import {ProviderProfile} from "./components/Profile/ProviderProfile";
import {SignUp} from "./components/User/SignUp";
import {Login} from "./components/Login/Login";

import "./App.css";
import AuthContext from "./utils/AuthContext";

function App() {
    return (
        <AuthContext>
            <BrowserRouter>
                <Routes>
                    {/* <Route path="/" element={<Layout />}> */}
                    <Route path="/signup" element={<SignUp/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/pet-profile" element={<PetProfile/>}/>
                    <Route path="/provider-profile" element={<ProviderProfile/>}/>

                    {/* </Route> */}
                </Routes>
            </BrowserRouter>
        </AuthContext>
    );
}

export default App;
