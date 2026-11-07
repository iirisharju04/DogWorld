import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FavoritesContext } from '../context/FavoritesContext';

function Favorites() {
    const {favorites, setFavorites} = useContext(FavoritesContext);

    // Poistetaan suosikeista:
    function removeFromFavorites(breed) {
        const updatedFavorites = favorites.filter(
            (favorite) => favorite !== breed
        );

        setFavorites(updatedFavorites);
    }
    return (
        <div>
            <h1>Suosikit</h1>

            {favorites.length === 0 && (
                <p>Et ole vielä lisännyt suosikkeja.</p>
            )}

            {favorites.length > 0 && (
                <ul>
                    {favorites.map((breed) => (
                        <li key={breed}>
                            <Link to={`/breed/${breed}`}>
                                {breed.charAt(0).toUpperCase() + breed.slice(1)}
                            </Link>
                            <button
                                className="btn btn-danger btn-sm ms-2"
                                onClick={() => removeFromFavorites(breed)}
                            >
                                Poista suosikeista
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
export default Favorites;