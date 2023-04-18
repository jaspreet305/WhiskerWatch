import {BrowserRouter, Routes, Route} from "react-router-dom";
import {PetProfile} from "./components/Profile/PetProfile";
import {ProviderProfile} from "./components/Profile/ProviderProfile";
import {SignUp} from "./components/User/SignUp";
import {Appointments} from "./components/Appointments/Appointments";
import {LoggedOut} from "./components/User/LoggedOut";
import {AppointmentsScreen} from "./components/Appointments/AppointmentsScreen";
import {HomePage} from "./components/HomePage/HomePage";
import {PetDescription} from "./components/Profile/PetDescription";
import {ProviderDescription} from "./components/Profile/ProviderDescription";
import {PetProviderSearch} from "./components/Search/PetProviderSearch";
import {BookAppointmentPortal} from "./components/Appointments/BookAppointmentPortal";
import {Login} from "./components/Login/Login";

import './App.css';
import AuthContext from "./utils/AuthContext";

function App() {
    return (
        <AuthContext>
            <BrowserRouter>
                <Routes>
                    {/* <Route path="/" element={<Layout />}> */}
                    <Route path="/signup" element={<SignUp/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/pet-profile/:petId" element={<PetProfile/>}/>
                    <Route path="/provider-profile/:providerId" element={<ProviderProfile/>}/>
                    <Route path="/appointments/:appointmentId/:appointment/:providerId" element={<Appointments/>}/>
                    <Route path="/logged-out" element={<LoggedOut/>}/>
                    <Route path="/appointments-screen" element={<AppointmentsScreen/>}/>
                    <Route path="/home-page" element={<HomePage/>}/>
                    <Route path="/pet-description" element={<PetDescription/>}/>
                    <Route path="/provider-description" element={<ProviderDescription/>}/>
                    <Route path="/search/:workerType?" element={<PetProviderSearch/>}/>
                    <Route path="/book-appointment/:providerId" element={<BookAppointmentPortal/>}/>
                </Routes>
            </BrowserRouter>
        </AuthContext>
    );
}

export default App;
