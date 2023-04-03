import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PetProfile } from "./components/Profile/PetProfile";
import { ProviderProfile } from "./components/Profile/ProviderProfile";
import './App.css';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Layout />}> */}  
        <Route path="/pet-profile" element={<PetProfile />} />
        <Route path="/provider-profile" element={<ProviderProfile />} />
          {/* </Route> */}
        </Routes>
      </BrowserRouter>
  );
}

export default App;
