import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Breeds from './pages/Breeds';
import BreedProfile from './pages/BreedProfile';
import Favorites from './pages/Favorites';
import Compare from './pages/Compare';

import Navbar from './components/Navbar';
import {FavoritesProvider} from "./context/FavoritesContext.jsx";

function App() {
    return (
        <FavoritesProvider>
        <BrowserRouter>
            <Navbar />

            <main className="container mt-4">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/breeds" element={<Breeds />} />
                    <Route path="/breed/:breedName" element={<BreedProfile />} />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="/compare" element={<Compare />} />
                </Routes>
            </main>
        </BrowserRouter>
        </FavoritesProvider>

    );
}

export default App;