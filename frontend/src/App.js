import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PetProfile } from "./components/Profile/PetProfile";
import './App.css';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Layout />}> */}  
        <Route path="/pet-profile" element={<PetProfile />} />
          {/* </Route> */}
        </Routes>
      </BrowserRouter>
  );
}

export default App;
