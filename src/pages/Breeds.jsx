
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    getAllBreeds,
    getRandomBreedImage
} from '../services/dogImageApi.js';
import {
    getFinnishBreedName,
    matchesBreedSearch
} from '../utils/breedTranslations.js';

function Breeds() {
    const [breeds, setBreeds] = useState([]);
    const [images, setImages] = useState({});
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [imageLoading, setImageLoading] = useState(false);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const breedsPerPage = 12;

    // Haetaan koirarodut APIsta
    useEffect(() => {
        async function fetchBreeds() {
            try {
                const data = await getAllBreeds();

                const breedList = [];

                // Käydään läpi kaikki rodut ja alarodut
                Object.keys(data).forEach(breed => {
                    if (data[breed].length === 0) {
                        breedList.push({
                            name: breed,
                            slug: breed
                        });
                    } else {
                        data[breed].forEach(subBreed => {
                            breedList.push({
                                name: `${subBreed} ${breed}`,
                                slug: `${breed}/${subBreed}`
                            });
                        });
                    }
                });

                breedList.sort((a, b) =>
                    a.name.localeCompare(b.name)
                );

                setBreeds(breedList);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchBreeds();
    }, []);

    // Haetaan kuvat vain nykyisen sivun roduille
    useEffect(() => {
        async function fetchImages() {
            const filteredBreeds = breeds.filter(breed =>
                matchesBreedSearch(breed.name, search)
            );

            const startIndex = (currentPage - 1) * breedsPerPage;

            const visibleBreeds = filteredBreeds.slice(
                startIndex,
                startIndex + breedsPerPage
            );

            setImageLoading(true);

            const imageResults = await Promise.all(
                visibleBreeds.map(async breed => {
                    try {
                        const image = await getRandomBreedImage(breed.slug);

                        return {
                            slug: breed.slug,
                            image: image
                        };
                    } catch (error) {
                        console.error(
                            `Kuvan hakeminen epäonnistui: ${breed.slug}`,
                            error
                        );

                        return {
                            slug: breed.slug,
                            image: null
                        };
                    }
                })
            );

            setImages(previousImages => {
                const updatedImages = { ...previousImages };

                imageResults.forEach(result => {
                    updatedImages[result.slug] = result.image;
                });

                return updatedImages;
            });

            setImageLoading(false);
        }

        if (breeds.length > 0) {
            fetchImages();
        }
    }, [breeds, search, currentPage]);

    // Hakua vastaavat rodut
    const filteredBreeds = breeds.filter(breed =>
        matchesBreedSearch(breed.name, search)
    );

    // Sivujen määrä
    const totalPages = Math.ceil(
        filteredBreeds.length / breedsPerPage
    );

    // Nykyisen sivun rodut
    const startIndex = (currentPage - 1) * breedsPerPage;

    const visibleBreeds = filteredBreeds.slice(
        startIndex,
        startIndex + breedsPerPage
    );

    if (loading) {
        return <p>Haetaan koirarotuja...</p>;
    }

    if (error) {
        return <p className="text-danger">{error}</p>;
    }

    return (
        <div>
            <div className="text-center mb-4">
                <h1>Koirarodut</h1>
                <p>Tutustu erilaisiin koirarotuihin ja löydä suosikkisi!</p>
            </div>

            <div className="mb-4">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Etsi koirarotua..."
                    value={search}
                    onChange={(event) => {
                        setSearch(event.target.value);
                        setCurrentPage(1);
                    }}
                />
            </div>

            <p className="text-muted">
                Löytyi {filteredBreeds.length} koirarotua
            </p>

            <div className="row g-4">
                {visibleBreeds.map(breed => (
                    <div
                        className="col-12 col-sm-6 col-lg-4 col-xl-3 mb-3"
                        key={breed.slug}
                    >
                        <div className="card h-100">

                            {images[breed.slug] ? (
                                <img
                                    src={images[breed.slug]}
                                    className="card-img-top"
                                    alt={getFinnishBreedName(breed.name)}
                                    style={{
                                        height: '220px',
                                        objectFit: 'cover'
                                    }}
                                />
                            ) : (
                                <div
                                    className="d-flex justify-content-center align-items-center"
                                    style={{ height: '220px' }}
                                >
                                    {imageLoading
                                        ? 'Haetaan kuvaa...'
                                        : 'Kuvaa ei saatavilla'}
                                </div>
                            )}

                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">
                                    {getFinnishBreedName(breed.name)}
                                </h5>

                                <Link
                                    to={`/breed/${encodeURIComponent(breed.slug)}`}
                                    className="btn btn-dark mt-auto"
                                >
                                    Tutustu rotuun
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredBreeds.length === 0 && (
                <p className="text-center">
                    Hakusanalla ei löytynyt koirarotuja.
                </p>
            )}

            {totalPages > 1 && (
                <div className="d-flex justify-content-center align-items-center gap-3 mt-3 mb-4">
                    <button
                        className="btn btn-outline-dark"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                    >
                        Edellinen
                    </button>

                    <span>
                        Sivu {currentPage} / {totalPages}
                    </span>

                    <button
                        className="btn btn-outline-dark"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}
                    >
                        Seuraava
                    </button>
                </div>
            )}
        </div>
    );
}

export default Breeds;
