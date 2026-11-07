import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FavoritesContext } from '../context/FavoritesContext';
import { useEffect, useState } from 'react';
import { getRandomBreedImage } from '../services/dogImageApi.js';
import { getFinnishBreedName } from '../utils/breedTranslations.js';


function Favorites() {
    const {favorites, setFavorites} = useContext(FavoritesContext);
    const [images, setImages] = useState({});
    const [loading, setLoading] = useState(true);

    // Haetaan suosikkien kuvat
    useEffect(() => {
        async function fetchFavoriteImages() {
            const imageResults = await Promise.all(
                favorites.map(async breed => {
                    try {
                        const image = await getRandomBreedImage(breed);
                        return { breed, image };
                    } catch {
                        return { breed, image: null };
                    }
                })
            );

            const imageObject = {};

            imageResults.forEach(result => {
                imageObject[result.breed] = result.image;
            });

            setImages(imageObject);
            setLoading(false);
        }

        if (favorites.length > 0) {
            setLoading(true);
            fetchFavoriteImages();
        } else {
            setImages({});
            setLoading(false);
        }
    }, [favorites]);

// Muodostetaan rodun näytettävä nimi
    function getDisplayBreedName(slug) {
        const parts = slug.split('/');

        if (parts.length === 2) {
            return `${parts[1]} ${parts[0]}`;
        }

        return parts[0];
    }

// Poistetaan suosikeista
    function removeFromFavorites(breed) {
        const updatedFavorites = favorites.filter(
            favorite => favorite !== breed
        );

        setFavorites(updatedFavorites);
    }

    if (loading) {
        return <p>Haetaan suosikkeja...</p>;
    }


    return (
        <div>
            <h1>Omat suosikit</h1>
            <p>Täällä näet tallentamasi koirarodut.</p>

            {favorites.length === 0 ? (
                <div>
                    <h3>Suosikkilistasi on vielä tyhjä</h3>
                    <p>Lisää kiinnostavia koirarotuja suosikkeihisi, niin löydät ne täältä helposti.</p>

                    <Link to="/breeds" className="btn btn-dark">
                        Tutustu koirarotuihin
                    </Link>
                </div>
            ) : (
                <div className="row g-4">
                    {favorites.map(breed => {
                        const englishName = getDisplayBreedName(breed);
                        const displayName = getFinnishBreedName(englishName);

                        return (
                            <div
                                className="col-12 col-sm-6 col-lg-4 col-xl-3 mb-4"
                                key={breed}
                            >
                                <div className="card h-100">
                                    {images[breed] ? (
                                        <img
                                            src={images[breed]}
                                            alt={displayName}
                                            className="card-img-top"
                                            style={{
                                                height: '220px',
                                                objectFit: 'cover'
                                            }}
                                        />
                                    ) : (
                                        <div
                                            className="d-flex justify-content-center align-items-center"
                                            style={{height: '220px'}}
                                        >
                                            Kuvaa ei saatavilla
                                        </div>
                                    )}

                                    <div className="card-body d-flex flex-column">
                                        <h5 className="card-title">
                                            {displayName}
                                        </h5>

                                        <Link
                                            to={`/breed/${encodeURIComponent(breed)}`}
                                            className="btn btn-dark mb-2"
                                        >
                                            Tutustu rotuun
                                        </Link>

                                        <button
                                            className="btn btn-outline-danger"
                                            onClick={() => removeFromFavorites(breed)}
                                        >
                                            Poista suosikeista
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
    export default Favorites;