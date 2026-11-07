import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getBreedImages } from '../services/dogImageApi.js';
import { useContext } from 'react';
import { FavoritesContext } from '../context/FavoritesContext';

function BreedProfile(){
    const { breedName } = useParams();
    const { favorites, setFavorites } = useContext(FavoritesContext);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const isFavorite = favorites.includes(breedName);

   //Kuvien hakeminen Apista:
    useEffect(() => {
        async function fetchImages() {
            try {
                const data = await getBreedImages(breedName);
                setImages(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }


        fetchImages();
    }, [breedName]);

    // Suosikkeihin lisääminen:
    function toggleFavorite() {
        if (isFavorite) {
            setFavorites(favorites.filter(favorite => favorite !== breedName));
        } else {
            setFavorites([...favorites, breedName]);
        }
    }

    // Sivun sisältö:
    return(
        <div>
            <h1>Rodun tiedot</h1>
            <h1>{breedName.charAt(0).toUpperCase() + breedName.slice(1)}</h1>
            <p>Tutustu tähän koirarotuun ja sen kuviin.</p>
            <button
                className="btn favorite-button mb-3"
                onClick={toggleFavorite}
            >
                {isFavorite ? 'Poista suosikeista' : 'Lisää suosikkeihin'}
            </button>
            {loading && <p>Haetaan kuvia...</p>}

            {error && <p>{error}</p>}

            {!loading && !error && (
                <div className="row g-3">
                    {images.map((image, index) => (
                        <div className="col-12 col-sm-6 col-lg-4" key={index}>
                            <img
                                src={image}
                                alt={breedName}
                                className="img-fluid rounded"
                            />
                        </div>
                    ))}
                </div>
                )}
        </div>

    );
}

export default BreedProfile;